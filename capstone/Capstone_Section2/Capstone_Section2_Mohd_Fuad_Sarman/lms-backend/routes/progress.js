const express = require('express');
const router = express.Router();
const { trackProgress, getUserProgress } = require('../controllers/progressController');

router.post('/', trackProgress);
router.get('/user/:userId', getUserProgress);
router.get('/user/:userId/course/:courseId', getUserProgress);

module.exports = router;
