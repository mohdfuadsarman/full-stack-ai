const { readJsonFile } = require('../utils/fileHelper');
const filterCourses = require('../utils/filterCourses');

const getRecommendations = async (req, res) => {
    try {
        const interest = req.query.interest;
        if (!interest) return res.status(400).json({ message: 'Missing interest parameter.' });

        const allCourses = await readJsonFile('courseList.json');
        const matchedCourses = filterCourses(allCourses, interest);

        if (matchedCourses.length === 0) {
            const availableCategories = [...new Set(allCourses.map(c => c.category).filter(Boolean))];
            return res.status(404).json({
                type: 'error',
                message: `No courses found for interest: "${interest}". Try searching for specific technologies, programming languages, or topics.`,
                suggestions: availableCategories.slice(0, 5),
                recommendations: []
            });
        }

        // Sort by rating (desc), then enrolledStudents
        matchedCourses.sort((a, b) => b.rating - a.rating || b.enrolledStudents - a.enrolledStudents);

        // Limit top 6
        const topRecommendations = matchedCourses.slice(0, 6);

        res.status(200).json({
            type: 'courses',
            interest,
            totalFound: matchedCourses.length,
            courses: topRecommendations
        });
    } catch (err) {
        console.error('Error in getRecommendations:', err);
        res.status(500).json({
            type: 'error',
            message: 'Internal server error. Please try again later.'
        });
    }
};

module.exports = { getRecommendations };
