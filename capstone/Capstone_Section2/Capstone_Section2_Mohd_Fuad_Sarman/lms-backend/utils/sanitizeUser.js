function sanitizeUser(user) {
    const { password, ...safeUser } = user;
    safeUser.enrolledCourses = safeUser.enrolledCourses?.length || 0;
    safeUser.completedCourses = safeUser.completedCourses?.length || 0;
    return safeUser;
}

module.exports = sanitizeUser;
