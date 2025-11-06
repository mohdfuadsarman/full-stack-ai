const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readJsonFile, writeJsonFile } = require('../utils/fileHelper');
const { initializeUser } = require('../utils/userCourseHelper');
const { validateSignup, validatePassword } = require('../utils/validators');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const USER_FILE = 'userList.json';

const generateToken = user =>
    jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });

const sanitizeUser = ({ password, ...rest }) => rest;

const getUsers = () => readJsonFile(USER_FILE);
const saveUsers = users => writeJsonFile(USER_FILE, users);

const signup = async (req, res) => {
    try {
        const { name, email, password, role = 'student', profile = {} } = req.body;

        const validationError = validateSignup({ name, email, password, role });
        if (validationError) return res.status(400).json({ message: validationError });

        const users = await getUsers();
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
            return res.status(409).json({ message: 'Email already exists' });

        // const hashedPassword = await bcrypt.hash(password, 12);
        const hashedPassword = password;
        const newUser = {
            id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role,
            avatar: `https://images.unsplash.com/photo-${Date.now()}?w=150&h=150&fit=crop&crop=face`,
            dateJoined: new Date().toISOString().split('T')[0],
            lastLogin: new Date().toISOString(),
            isActive: true,
            profile: {
                bio: profile.bio || '',
                location: profile.location || '',
                phone: profile.phone || '',
                dateOfBirth: profile.dateOfBirth || '',
                linkedin: profile.linkedin || '',
                github: profile.github || ''
            },
            enrolledCourses: [],
            completedCourses: [],
            courseProgress: {},
            certifications: [],
            preferences: {
                emailNotifications: true,
                pushNotifications: false,
                language: 'en',
                timezone: 'UTC',
                theme: 'light'
            },
            stats: {
                totalHoursLearned: 0,
                coursesCompleted: 0,
                coursesInProgress: 0,
                averageRating: 0,
                streakDays: 0,
                badgesEarned: 0
            }
        };

        users.push(newUser);
        await saveUsers(users);

        res.status(201).json({
            message: 'User registered successfully',
            user: sanitizeUser(newUser),
            token: generateToken(newUser)
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

        const users = await getUsers();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!user || !user.isActive) return res.status(401).json({ message: 'Invalid email or password' });

        // const isPasswordValid = await bcrypt.compare(password, user.password);
        const isPasswordValid = password === user.password;
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password' });

        user.lastLogin = new Date().toISOString();
        initializeUser(user);
        await saveUsers(users);

        res.status(200).json({
            message: 'Login successful',
            user: sanitizeUser(user),
            token: generateToken(user)
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const users = await getUsers();
        const user = users.find(u => u.id === req.user.id && u.isActive);
        if (!user) return res.status(404).json({ message: 'User not found or deactivated' });

        res.status(200).json({ user: sanitizeUser(user) });
    } catch (err) {
        console.error('GetCurrentUser error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const logout = (_, res) =>
    res.status(200).json({ message: 'Logged out successfully. Please remove the token from client storage.' });

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const validationError = validatePassword(newPassword);
        if (!currentPassword || !newPassword) return res.status(400).json({ message: 'Both current and new password are required' });
        if (validationError) return res.status(400).json({ message: validationError });

        const users = await getUsers();
        const user = users.find(u => u.id === req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // if (!(await bcrypt.compare(currentPassword, user.password)))
        if (currentPassword !== user.password)
            return res.status(401).json({ message: 'Current password is incorrect' });

        // user.password = await bcrypt.hash(newPassword, 12);
        user.password = newPassword;
        user.lastLogin = new Date().toISOString();
        await saveUsers(users);

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error('ChangePassword error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { signup, login, getCurrentUser, logout, changePassword };
