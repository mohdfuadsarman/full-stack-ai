const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: String,
  address: String,
  principal: String
}, {
  versionKey: false // Completely disable versioning
});

module.exports = mongoose.model('School', schoolSchema);

