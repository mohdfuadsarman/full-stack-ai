const express = require('express');
const cors = require('cors')
const db = require('./db/database');
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())

app.get('/students', async (req, res) => {
  try {
    console.log('Received request to retrieve all students');
    const students = await db.getAllStudents();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).send(`An unexpected error occurred while retrieving the list of students. Error: ${err.message}`);
  }
});

// This has to come first (specialized route) before the /students/:id route to avoid conflicts
app.get('/students/search', async (req, res) => {
  try {
    const { name, email, program } = req.query;
    if (!name && !email && !program) {
      return res.status(400).send('At least one search parameter (name, email, or program) must be provided.');
    }
    console.log(`Received request to search students with params:`, req.query);
    const students = await db.searchStudents({ name, email, program });
    if (students && students.length > 0) {
      res.status(200).json(students);
    } else {
      res.status(404).send('No students found matching the provided criteria.');
    }
  } catch (err) {
    res.status(500).send(`An unexpected error occurred while searching for students. Error: ${err.message}`);
  }
});

app.get('/students/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    console.log(`Received request to retrieve student with ID: ${studentId}`);
    if (!Number.isInteger(Number(studentId)) || Number(studentId) <= 0) {
      return res.status(400).send('A valid student ID must be provided in the URL.');
    }
    const student = await db.getStudentById(studentId);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).send(`No student found in the database with the provided ID: ${studentId}.`);
    }
  } catch (err) {
    res.status(500).send(`An unexpected error occurred while retrieving the student with ID ${studentId}. Error: ${err.message}`);
  }
});

app.post('/students', async (req, res) => {
  try {
    console.log('Received request to create a new student with data:', req.body);
    const { name, email, program } = req.body;
    if (!name || typeof name !== "string" || name.trim() === '') {
      return res.status(400).send('Name is required and must be a non-empty string to create a student.');
    }
    const student = await db.createStudent(name, email, program);
    if (!student || !student.id) {
      return res.status(400).send('Failed to create student.');
    }
    res.status(201).send(`Student created with ID: ${student.id}`);
  } catch (err) {
    res.status(500).send(`An unexpected error occurred while creating student. Error: ${err.message}`);
  }
});

app.delete('/students/clear', async (req, res) => {
  try {
    console.log('Received request to clear all students');
    const result = await db.clearAllStudents();
    if (result.changes > 0) {
      res.status(200).send('All students cleared successfully');
    } else {
      res.status(404).send('No students found to clear');
    }
  } catch (err) {
    res.status(500).send(`An unexpected error occurred while clearing all students. Error: ${err.message}`);
  }
});

app.delete('/students/reset', async (req, res) => {
  try {
    console.log('Received request to reset students table');
    const result = await db.resetStudentsTable();
    if (result.changes > 0) {
      res.status(200).send('Students table reset successfully');
    } else {
      res.status(404).send('No students found to reset');
    }
  } catch (err) {
    res.status(500).send(`An unexpected error occurred while resetting the students table. Error: ${err.message}`);
  }
});

app.put('/students/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    console.log(`Received request to update student with ID: ${studentId} with data:`, req.body);
    if (!Number.isInteger(Number(studentId)) || Number(studentId) <= 0) {
      return res.status(400).send('A valid student ID must be provided in the URL.');
    }
    const { name, email, program } = req.body;
    if (!name || typeof name !== "string" || name.trim() === '') {
      return res.status(400).send('Name is required and must be a non-empty string to create a student.');
    }
    const updatedStudent = await db.updateStudent(studentId, name, email, program);
    if (updatedStudent.changes > 0) {
      const student = await db.getStudentById(studentId);
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).send(`No student found in the database with the provided ID: ${studentId}.`);
      }
    } else {
      res.status(404).send(`No student found in the database with the provided ID: ${studentId}.`);
    }
  } catch (err) {
    res.status(500).send(`An unexpected error occurred while updating student with ID ${studentId}. Error: ${err.message}`);
  }
});

app.delete('/students/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    console.log(`Received request to delete student with ID: ${studentId}`);
    if (!Number.isInteger(Number(studentId)) || Number(studentId) <= 0) {
      return res.status(400).send('A valid student ID must be provided in the URL.');
    }
    const deletedStudent = await db.deleteStudent(studentId);
    if (deletedStudent.changes > 0) {
      res.status(200).send(`Student with ID ${studentId} deleted successfully`);
    } else {
      res.status(404).send(`No student found in the database with the provided ID: ${studentId}.`);
    }
  } catch (err) {
    res.status(500).send(`An unexpected error occurred while deleting student with ID ${studentId}. Error: ${err.message}`);
  }
});

app.listen(port, function () {
  console.log(`Express app listening on port ${port}!`);
});
