function filterCourses(courses, keyword) {
    const lower = keyword.toLowerCase();
    return courses.filter(course => {
        return (
            (course.category && course.category.toLowerCase().includes(lower)) ||
            (course.title && course.title.toLowerCase().includes(lower)) ||
            (course.description && course.description.toLowerCase().includes(lower)) ||
            (course.skills && course.skills.some(skill => skill.toLowerCase().includes(lower))) ||
            (course.prerequisites && course.prerequisites.toLowerCase().includes(lower))
        );
    });
}

module.exports = filterCourses;
