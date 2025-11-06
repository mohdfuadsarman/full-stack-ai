const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School' }
}, {
  versionKey: false // Completely disable versioning
});

module.exports = mongoose.model('Course', courseSchema);
