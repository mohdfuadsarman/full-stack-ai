const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'pets.db');

const db = new sqlite3.Database(dbPath);

// Initialize the database
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS pets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      age INTEGER NOT NULL,
      owner TEXT NOT NULL,
      UNIQUE(name, type, owner)
    )
  `);
});

const getAllPets = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM pets', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const getPetById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM pets WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const getPetsByName = (name) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM pets WHERE name LIKE ?', [`%${name}%`], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const getPetsByType = (type) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM pets WHERE type = ?', [type], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const getPetsByAgeRange = (minAge, maxAge) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM pets WHERE age BETWEEN ? AND ?', [minAge, maxAge], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const getPetsByOwner = (owner) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM pets WHERE owner = ?', [owner], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const createPet = (name, type, age, owner) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO pets (name, type, age, owner) VALUES (?, ?, ?, ?)',
      [name, type, age, owner],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
};

const updatePet = (id, name, type, age, owner) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE pets SET name = ?, type = ?, age = ?, owner = ? WHERE id = ?',
      [name, type, age, owner, id],
      function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      }
    );
  });
};

const deletePet = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM pets WHERE id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve({ changes: this.changes });
    });
  });
};

const clearAllPets = () => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM pets', function (err) {
      if (err) reject(err);
      else resolve({ changes: this.changes });
    });
  });
};

const resetPetsTable = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('DELETE FROM pets', function (err) {
        if (err) return reject(err);
        // Reset the AUTOINCREMENT counter
        db.run('DELETE FROM sqlite_sequence WHERE name="pets"', function (err2) {
          if (err2) reject(err2);
          else resolve();
        });
      });
    });
  });
};

// Export functions
module.exports = {
  getAllPets,
  getPetById,
  getPetsByName,
  getPetsByType,
  getPetsByAgeRange,
  getPetsByOwner,
  createPet,
  updatePet,
  deletePet,
  clearAllPets,
  resetPetsTable
};