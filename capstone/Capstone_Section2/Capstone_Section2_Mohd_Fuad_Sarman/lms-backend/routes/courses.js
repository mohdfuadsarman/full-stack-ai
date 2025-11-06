const express = require('express');
const router = express.Router();
const { getAllCourses } = require('../controllers/coursesController');

router.get('/', getAllCourses);

module.exports = router;
