const { readJsonFile, writeJsonFile } = require('../utils/fileHelper');
const { updateCourseProgress } = require('../utils/courseProgressHelper');

const trackProgress = async (req, res) => {
    try {
        const { userId, courseId, progress, lessonId, timeSpent, completedAt } = req.body;
        if (!userId || !courseId) return res.status(400).json({ message: 'Missing userId or courseId.' });

        const users = await readJsonFile('userList.json');
        const userIndex = users.findIndex(u => u.id === parseInt(userId));
        if (userIndex === -1) return res.status(404).json({ message: 'User not found.' });

        const user = users[userIndex];
        if (!user.enrolledCourses.includes(parseInt(courseId))) {
            return res.status(400).json({ message: 'User not enrolled in this course.' });
        }

        const status = updateCourseProgress(user, parseInt(courseId), progress, completedAt);

        if (timeSpent) user.stats.totalHoursLearned += Math.round(timeSpent / 60);

        users[userIndex] = user;
        await writeJsonFile('userList.json', users);

        res.status(200).json({
            message: 'Progress tracked successfully',
            data: {
                userId: user.id,
                courseId: parseInt(courseId),
                progress: user.courseProgress[courseId],
                lessonId: lessonId || null,
                timeSpent: timeSpent || 0,
                lastAccessed: user.lastLogin,
                completedAt: status === 'completed' ? completedAt || user.lastLogin : null,
                status
            },
            userStats: user.stats
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserProgress = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const courseId = req.params.courseId ? parseInt(req.params.courseId) : null;
        if (!userId) return res.status(400).json({ message: 'User ID is required.' });

        const users = await readJsonFile('userList.json');
        const user = users.find(u => u.id === userId);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        const enrolledCourses = user.enrolledCourses || [];
        const courseProgress = user.courseProgress || {};
        const completedCourses = user.completedCourses || [];
        const certifications = user.certifications || [];
        const stats = user.stats || {};

        if (courseId) {
            if (!enrolledCourses.includes(courseId)) return res.status(400).json({ message: 'User not enrolled in this course.' });
            const progress = courseProgress[courseId] || 0;
            const isCompleted = completedCourses.includes(courseId);
            const status = progress === 100 || isCompleted ? 'completed' : progress > 0 ? 'in-progress' : 'not-started';
            const certification = certifications.find(c => c.courseId === courseId) || null;

            res.status(200).json({ userId, courseId, progress, status, isCompleted, lastAccessed: user.lastLogin, certification });
        } else {
            const allProgress = enrolledCourses.map(id => {
                const progress = courseProgress[id] || 0;
                const isCompleted = completedCourses.includes(id);
                const status = progress === 100 || isCompleted ? 'completed' : progress > 0 ? 'in-progress' : 'not-started';
                return { courseId: id, progress, status, isCompleted };
            });

            res.status(200).json({
                userId,
                user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar, role: user.role },
                courses: allProgress,
                stats,
                certifications,
                totalEnrolled: enrolledCourses.length,
                totalCompleted: completedCourses.length,
                lastAccessed: user.lastLogin
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { trackProgress, getUserProgress };
