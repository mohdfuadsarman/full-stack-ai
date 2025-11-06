const express = require('express');
const router = express.Router();
const {
    signup,
    login,
    getCurrentUser,
    logout,
    changePassword
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes (require authentication)
router.get('/me', authenticateToken, getCurrentUser);
router.post('/logout', authenticateToken, logout);
router.put('/change-password', authenticateToken, changePassword);

module.exports = router;