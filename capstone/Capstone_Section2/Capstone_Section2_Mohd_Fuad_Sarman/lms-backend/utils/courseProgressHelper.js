function updateCourseProgress(user, courseId, progress = 0, completedAt = null) {
    if (!user.courseProgress) user.courseProgress = {};
    if (!user.completedCourses) user.completedCourses = [];
    if (!user.certifications) user.certifications = [];
    if (!user.stats) user.stats = { totalHoursLearned: 0, coursesCompleted: 0, coursesInProgress: 0, streakDays: 0, badgesEarned: 0 };

    const prevProgress = user.courseProgress[courseId] || 0;
    const wasCompleted = user.completedCourses.includes(courseId);

    user.courseProgress[courseId] = progress;

    let status = 'in-progress';
    if (progress === 100 || completedAt) {
        status = 'completed';
        if (!wasCompleted) {
            user.completedCourses.push(courseId);
            user.stats.coursesCompleted += 1;

            // Add simple certification
            user.certifications.push({
                courseId,
                certificateId: `CERT-${courseId}-${new Date().getFullYear()}-${user.id}`,
                issuedDate: new Date().toISOString().split('T')[0]
            });
        }
        user.courseProgress[courseId] = 100;
    } else if (progress === 0) {
        status = 'not-started';
        if (wasCompleted) {
            user.completedCourses = user.completedCourses.filter(id => id !== courseId);
            user.stats.coursesCompleted = Math.max(0, user.stats.coursesCompleted - 1);
            user.certifications = user.certifications.filter(c => c.courseId !== courseId);
        }
    }

    // Update coursesInProgress count
    user.stats.coursesInProgress = Object.values(user.courseProgress).filter(p => p > 0 && p < 100).length;

    // Update last login
    user.lastLogin = new Date().toISOString();

    return status;
}

module.exports = { updateCourseProgress };
