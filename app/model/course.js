const db = require('../utils/db');

module.exports = {
    getRegisteredCourseByStudentID: async (studentID) => {
        const sql = `SELECT a.* FROM Course as a, RegisteredCourse as b, student as c where  c.studentID = ${studentID} and c.studentID = b.studentID and b.courseID = a.courseID;` 
        const courses = await db.load(sql);
        return courses;
    },
    getWatchListbyStudentID: async(studentID)=>{
        const sql = `SELECT a.* FROM Course as a, WatchList as b, student as c where  c.studentID = ${studentID} and c.studentID = b.studentID and b.courseID = a.courseID;` 
        const courses = await db.load(sql);
        return courses;
    },
    getCourseByID: async(courseID)=>{
        const sql = `SELECT * from Course where courseID = ${courseID}`
        const courses = await db.load(sql);
        return courses;
    }
}; 