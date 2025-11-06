function initializeUser(user) {
    if (!user.enrolledCourses) user.enrolledCourses = [];
    if (!user.courseProgress) user.courseProgress = {};
    if (!user.stats) user.stats = {
        totalHoursLearned: 0,
        coursesCompleted: 0,
        coursesInProgress: 0,
        averageRating: 4.0,
        streakDays: 0,
        badgesEarned: 0
    };
}

function updateInProgressCount(user) {
    user.stats.coursesInProgress = Object.values(user.courseProgress).filter(p => p > 0 && p < 100).length;
}

function getCourseStatus(user, courseId) {
    const progress = user.courseProgress[courseId] || 0;
    if (user.completedCourses?.includes(courseId) || progress === 100) return 'completed';
    if (progress > 0) return 'in-progress';
    return 'not-started';
}

module.exports = { initializeUser, updateInProgressCount, getCourseStatus };
