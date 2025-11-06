const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'students.db');

const db = new sqlite3.Database(dbPath);

// Initialize the database
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      program TEXT NOT NULL,
      UNIQUE(name, email)
    )
  `);
});

const getAllStudents = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM students', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const getStudentById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const searchStudents = ({ name, email, program }) => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM students WHERE 1=1';
    const params = [];

    if (name) {
      query += ' AND LOWER(name) LIKE ?';
      params.push(`%${name.toLowerCase()}%`);
    }
    if (email) {
      query += ' AND LOWER(email) = ?';
      params.push(email.toLowerCase());
    }
    if (program) {
      query += ' AND LOWER(program) = ?';
      params.push(program.toLowerCase());
    }

    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const createStudent = (name, email, program) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO students (name, email, program) VALUES (?, ?, ?)',
      [name, email, program],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
};

const updateStudent = (id, name, email, program) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE students SET name = ?, email = ?, program = ? WHERE id = ?',
      [name, email, program, id],
      function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      }
    );
  });
};

const deleteStudent = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM students WHERE id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve({ changes: this.changes });
    });
  });
};

const clearAllStudents = () => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM students', function (err) {
      if (err) reject(err);
      else resolve({ changes: this.changes });
    });
  });
};

const resetStudentsTable = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('DELETE FROM students', function (err) {
        if (err) return reject(err);
        // Reset the AUTOINCREMENT counter
        db.run('DELETE FROM sqlite_sequence WHERE name="students"', function (err2) {
          if (err2) reject(err2);
          else resolve({ changes: this.changes });
        });
      });
    });
  });
};

// Export functions
module.exports = {
  getAllStudents,
  getStudentById,
  searchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  clearAllStudents,
  resetStudentsTable
};
