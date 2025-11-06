const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  studentName: String,
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  enrollmentDate: { type: Date, default: Date.now }
}, {
  versionKey: false // Completely disable versioning
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
