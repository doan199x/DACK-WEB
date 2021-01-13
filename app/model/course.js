const db = require('../utils/db');

module.exports = {
    getRegisteredCourseByStudentID: async (studentID) => {
        const sql = `SELECT a.* FROM Course as a, RegisteredCourse as b, student as c where  c.studentID = ${studentID} and c.studentID = b.studentID and b.courseID = a.courseID;` 
        const result = await db.load(sql);
        return result;
    },
    getWatchListbyStudentID: async(studentID)=>{
        const sql = `SELECT a.* FROM Course as a, WatchList as b, student as c where  c.studentID = ${studentID} and c.studentID = b.studentID and b.courseID = a.courseID;` 
        const result = await db.load(sql);
        return result;
    },
    getCourseByID: async(courseID)=>{
        const sql = `SELECT * from Course where courseID = ${courseID}`
        const result = await db.load(sql);
        return result;
    },
    updateAverageStar:async(courseID,stars)=>{
        const sql = `UPDATE Course set averageStar = ${stars} where courseID = ${courseID}`; 
        const result = await db.load(sql);
        return result;
    },
    getCourseByCategoryID:async(categoryID)=>{
        const sql = `SELECT* from Course where categoryID = ${categoryID}`; 
        const result = await db.load(sql);
        return result;
    },
    getAll: async()=>{
        const sql = `SELECT* from Course`; 
        const result = await db.load(sql);
        return result;
    },
    delete: async(courseID,lessonsID)=>{
        await db.load(`DELETE from RegisteredCourse where courseID = ${courseID}`)
        await db.load(`DELETE from Sale where courseID = ${courseID}`)
        await db.load(`DELETE from BillDetail where courseID = ${courseID}`)
        await db.load(`DELETE from WatchList where courseID = ${courseID}`)
        await db.load(`DELETE from Rating where courseID = ${courseID}`)
        for (var i=0;i<lessonsID.length;i++){
            await db.load(`DELETE from Lesson where lessonID=${lessonsID[i]}`);
        }
        await db.load(`DELETE from Chapter where courseID=${courseID}`);
        await db.load(`DELETE from Course where courseID = ${courseID}`);
    },
    findLikeName: async(input)=>{
        const sql = `select* from Course where name like '%${input}%';`; 
        const result = await db.load(sql);
        return result;
    }
}; 