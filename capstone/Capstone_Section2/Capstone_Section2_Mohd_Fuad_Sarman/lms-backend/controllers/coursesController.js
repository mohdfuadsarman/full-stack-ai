const fs = require('fs');
const path = require('path');

const getAllCourses = (req, res) => {
    try {
        const filePath = path.join(__dirname, '../data/courseList.json');
        const coursesData = fs.readFileSync(filePath, 'utf8');
        const courses = JSON.parse(coursesData);
        res.status(200).json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAllCourses };
