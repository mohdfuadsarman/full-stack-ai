const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const schoolRoutes = require('./routes/schoolRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

const app = express();

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/schoolSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(' Connected to MongoDB: schoolSystem'))
.catch(err => console.error(' MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/schools', schoolRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// Serve static homepage
app.use(express.static(path.join(__dirname, 'public')));

// Fallback for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`School API running at http://localhost:${PORT}`);
});
