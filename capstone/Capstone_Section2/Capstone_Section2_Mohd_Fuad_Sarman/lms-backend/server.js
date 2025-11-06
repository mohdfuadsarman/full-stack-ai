const express = require('express');
const app = express();
const PORT = 5001;

// Middleware
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const coursesRoutes = require('./routes/courses');
const enrollmentRoutes = require('./routes/enrollment');
const progressRoutes = require('./routes/progress');
const recommendationRoutes = require('./routes/recommendation');
const usersRoutes = require('./routes/users');

// Use routes
app.use('/auth', authRoutes);
app.use('/courses', coursesRoutes);
app.use('/enroll', enrollmentRoutes);
app.use('/track-progress', progressRoutes);
app.use('/recommend', recommendationRoutes);
app.use('/users', usersRoutes);

app.get('/', (req, res) => res.send('Welcome to the LMS backend!'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
