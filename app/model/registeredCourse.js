const db = require('../utils/db');

module.exports = {
    getByStudentIDCourseID: async (studentID, courseID) => {
        const sql = `SELECT * from registeredCourse where courseID = ${courseID} and studentID = ${studentID}`;
        const result = await db.load(sql);
        return result;
    },
    updateCurLesson: async (studentID, courseID, curLesson) => {
        const sql = `UPDATE registeredCourse set curLesson=${curLesson} where courseID = ${courseID} and studentID = ${studentID}`;
        const result = await db.load(sql);
        return result;
    }
}; 