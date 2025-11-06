const express = require('express');
const router = express.Router();
const School = require('../models/schoolModel');

// Create school
router.post('/', async (req, res) => {
  try {
    const school = await School.create(req.body);
    res.status(201).json(school);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create school', error: err.message });
  }
});

// Get all schools
router.get('/', async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch schools', error: err.message });
  }
});

// Get single school
router.get('/:id', async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.json(school);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch school', error: err.message });
  }
});

// Update school
router.put('/:id', async (req, res) => {
  try {
    const school = await School.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.json(school);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update school', error: err.message });
  }
});

// Delete school
router.delete('/:id', async (req, res) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.json({ message: 'School deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete school', error: err.message });
  }
});

module.exports = router;
