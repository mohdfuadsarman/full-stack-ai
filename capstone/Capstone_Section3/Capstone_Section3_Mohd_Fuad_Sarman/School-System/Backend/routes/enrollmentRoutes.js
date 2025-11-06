const express = require('express');
const router = express.Router();
const Enrollment = require('../models/enrollmentModel');

// Create enrollment
router.post('/', async (req, res) => {
  try {
    const enrollment = await Enrollment.create(req.body);
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create enrollment', error: err.message });
  }
});

// Get all enrollments
router.get('/', async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate('courseId');
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch enrollments', error: err.message });
  }
});

// Get single enrollment
router.get('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id).populate('courseId');
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch enrollment', error: err.message });
  }
});

// Delete enrollment
router.delete('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    res.json({ message: 'Enrollment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete enrollment', error: err.message });
  }
});

module.exports = router;
