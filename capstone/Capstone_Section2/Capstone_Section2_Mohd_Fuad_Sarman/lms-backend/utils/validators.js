const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = password => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters long';
    return null;
};

const validateRole = role => {
    const validRoles = ['student', 'instructor', 'admin'];
    if (!validRoles.includes(role)) return `Role must be one of: ${validRoles.join(', ')}`;
    return null;
};

const validateSignup = ({ name, email, password, role }) => {
    if (!name || !email || !password) return 'Name, email, and password are required';
    if (!validateEmail(email)) return 'Please provide a valid email address';

    const passwordError = validatePassword(password);
    if (passwordError) return passwordError;

    if (role) {
        const roleError = validateRole(role);
        if (roleError) return roleError;
    }

    return null;
};

module.exports = {
    validateEmail,
    validatePassword,
    validateRole,
    validateSignup
};
