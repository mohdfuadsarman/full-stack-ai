const { readJsonFile, writeJsonFile } = require('../utils/fileHelper');
const sanitizeUser = require('../utils/sanitizeUser');

const getAllUsers = async (req, res) => {
    try {
        let users = await readJsonFile('userList.json');
        const { role, isActive } = req.query;

        if (role) users = users.filter(u => u.role.toLowerCase() === role.toLowerCase());
        if (isActive !== undefined) {
            const activeStatus = isActive === 'true';
            users = users.filter(u => u.isActive === activeStatus);
        }

        users.sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin));
        const safeUsers = users.map(sanitizeUser);

        res.status(200).json({ users: safeUsers, totalUsers: safeUsers.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const users = await readJsonFile('userList.json');
        const user = users.find(u => u.id === userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ user: sanitizeUser(user) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password, role = 'student', profile = {} } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password required' });

        const users = await readJsonFile('userList.json');
        if (users.find(u => u.email === email)) return res.status(409).json({ message: 'Email already exists' });

        const newId = Math.max(...users.map(u => u.id), 0) + 1;
        const newUser = {
            id: newId,
            name,
            email,
            password,
            role,
            avatar: `https://images.unsplash.com/photo-${Date.now()}?w=150&h=150&fit=crop&crop=face`,
            dateJoined: new Date().toISOString().split('T')[0],
            lastLogin: new Date().toISOString(),
            isActive: true,
            profile,
            enrolledCourses: [],
            completedCourses: [],
            courseProgress: {},
            certifications: [],
            preferences: {},
            stats: {}
        };

        users.push(newUser);
        await writeJsonFile('userList.json', users);

        res.status(201).json({ message: 'User created successfully', user: sanitizeUser(newUser) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const updateData = req.body;

        const users = await readJsonFile('userList.json');
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

        // Prevent email conflicts
        if (updateData.email && users.some(u => u.email === updateData.email && u.id !== userId)) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const allowedUpdates = ['name', 'email', 'role', 'isActive', 'profile', 'preferences'];
        allowedUpdates.forEach(field => {
            if (updateData[field] !== undefined) {
                users[userIndex][field] = field === 'profile' || field === 'preferences'
                    ? { ...users[userIndex][field], ...updateData[field] }
                    : updateData[field];
            }
        });

        users[userIndex].lastLogin = new Date().toISOString();
        await writeJsonFile('userList.json', users);

        res.status(200).json({ message: 'User updated successfully', user: sanitizeUser(users[userIndex]) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const users = await readJsonFile('userList.json');
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

        // Soft delete
        users[userIndex].isActive = false;
        users[userIndex].lastLogin = new Date().toISOString();
        await writeJsonFile('userList.json', users);

        res.status(200).json({ message: 'User deactivated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserStats = async (req, res) => {
    try {
        const users = await readJsonFile('userList.json');
        const totalUsers = users.length;
        const activeUsers = users.filter(u => u.isActive).length;
        const inactiveUsers = totalUsers - activeUsers;

        const roleDistribution = users.reduce((acc, u) => {
            acc[u.role] = (acc[u.role] || 0) + 1;
            return acc;
        }, {});

        const avgHoursLearned = Math.round((users.reduce((sum, u) => sum + (u.stats?.totalHoursLearned || 0), 0) / totalUsers) || 0);
        const totalCoursesCompleted = users.reduce((sum, u) => sum + (u.stats?.coursesCompleted || 0), 0);

        const recentUsers = users
            .sort((a, b) => new Date(b.dateJoined) - new Date(a.dateJoined))
            .slice(0, 5)
            .map(u => ({ id: u.id, name: u.name, dateJoined: u.dateJoined, role: u.role }));

        res.status(200).json({ totalUsers, activeUsers, inactiveUsers, roleDistribution, avgHoursLearned, totalCoursesCompleted, recentUsers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserStats };
