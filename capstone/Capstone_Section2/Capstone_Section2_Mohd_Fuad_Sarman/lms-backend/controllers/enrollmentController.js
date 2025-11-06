const { readJsonFile, writeJsonFile } = require('../utils/fileHelper');
const { initializeUser, updateInProgressCount, getCourseStatus } = require('../utils/userCourseHelper');

async function enrollUser(req, res) {
    try {
        const { courseId, userId } = req.body;
        if (!courseId || !userId) return res.status(400).json({ message: 'Missing userId or courseId in request.' });

        const users = await readJsonFile('userList.json');
        const courses = await readJsonFile('courseList.json');

        const user = users.find(u => u.id === parseInt(userId));
        if (!user) return res.status(404).json({ message: 'User not found.' });

        const course = courses.find(c => c.id === parseInt(courseId));
        if (!course) return res.status(404).json({ message: 'Course not found.' });

        initializeUser(user);

        if (user.enrolledCourses.includes(parseInt(courseId))) {
            return res.status(409).json({
                message: `User ${userId} already enrolled in course ${courseId}.`,
                course: { id: course.id, title: course.title, progress: user.courseProgress[courseId] || 0 }
            });
        }

        user.enrolledCourses.push(parseInt(courseId));
        user.courseProgress[courseId] = 0;
        user.lastLogin = new Date().toISOString();
        updateInProgressCount(user);

        await writeJsonFile('userList.json', users);

        res.status(201).json({
            message: `User ${userId} enrolled in course ${courseId} successfully.`,
            enrollment: {
                userId: user.id,
                courseId: course.id,
                courseName: course.title,
                enrolledAt: user.lastLogin,
                progress: 0,
                status: 'not-started'
            },
            userStats: user.stats
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function unenrollUser(req, res) {
    try {
        const { courseId, userId } = req.body;
        if (!courseId || !userId) return res.status(400).json({ message: 'Missing userId or courseId in request.' });

        const users = await readJsonFile('userList.json');
        const user = users.find(u => u.id === parseInt(userId));
        if (!user) return res.status(404).json({ message: 'User not found.' });

        if (!user.enrolledCourses?.includes(parseInt(courseId))) {
            return res.status(409).json({ message: `User ${userId} not enrolled in course ${courseId}.` });
        }

        initializeUser(user);

        user.enrolledCourses = user.enrolledCourses.filter(id => id !== parseInt(courseId));
        user.completedCourses = (user.completedCourses || []).filter(id => id !== parseInt(courseId));
        delete user.courseProgress[courseId];
        user.certifications = (user.certifications || []).filter(c => c.courseId !== parseInt(courseId));
        user.lastLogin = new Date().toISOString();
        updateInProgressCount(user);

        await writeJsonFile('userList.json', users);

        res.status(200).json({
            message: `User ${userId} unenrolled from course ${courseId} successfully.`,
            unenrollment: { userId: user.id, courseId, unenrolledAt: user.lastLogin },
            userStats: user.stats
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getUserCourses(req, res) {
    try {
        const userId = parseInt(req.params.id);
        if (!userId) return res.status(400).json({ message: 'User ID is required.' });

        const users = await readJsonFile('userList.json');
        const courses = await readJsonFile('courseList.json');

        const user = users.find(u => u.id === userId);
        if (!user) return res.status(404).json({ message: `User ${userId} not found.` });

        initializeUser(user);

        const userCourses = (user.enrolledCourses || []).map(courseId => {
            const course = courses.find(c => c.id === courseId);
            return course ? {
                ...course,
                progress: user.courseProgress[courseId] || 0,
                isCompleted: user.completedCourses?.includes(courseId) || false,
                status: getCourseStatus(user, courseId)
            } : null;
        }).filter(Boolean);

        res.status(200).json({
            userId,
            user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar, role: user.role, stats: user.stats },
            totalCourses: userCourses.length,
            courses: userCourses
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function batchEnrollUser(req, res) {
    try {
        const { courseIds, userId } = req.body;
        if (!userId || !Array.isArray(courseIds)) return res.status(400).json({ message: 'Missing userId or courseIds array.' });

        const users = await readJsonFile('userList.json');
        const courses = await readJsonFile('courseList.json');

        const user = users.find(u => u.id === parseInt(userId));
        if (!user) return res.status(404).json({ message: 'User not found.' });

        initializeUser(user);

        const results = courseIds.map(id => {
            const course = courses.find(c => c.id === parseInt(id));
            if (!course) return { courseId: id, success: false, error: 'Course not found' };
            if (user.enrolledCourses.includes(parseInt(id))) return { courseId: id, courseName: course.title, success: false, error: 'Already enrolled' };
            user.enrolledCourses.push(parseInt(id));
            user.courseProgress[id] = 0;
            return { courseId: id, courseName: course.title, success: true, progress: 0 };
        });

        user.lastLogin = new Date().toISOString();
        await writeJsonFile('userList.json', users);

        const successCount = results.filter(r => r.success).length;
        res.status(200).json({
            message: `Batch enrollment completed. ${successCount} courses enrolled successfully.`,
            userId: user.id,
            results,
            totalEnrolled: user.enrolledCourses.length
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { enrollUser, unenrollUser, getUserCourses, batchEnrollUser };
