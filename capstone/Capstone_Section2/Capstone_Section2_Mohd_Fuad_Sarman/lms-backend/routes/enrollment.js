const express = require('express');
const router = express.Router();
const { enrollUser, unenrollUser, getUserCourses, batchEnrollUser } = require('../controllers/enrollmentController');

router.post('/', enrollUser);
router.delete('/', unenrollUser);
router.post('/batch', batchEnrollUser);
router.get('/user/:id', getUserCourses);

module.exports = router;
