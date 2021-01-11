const db = require('../utils/db');

module.exports = {
    getRatingByCourseID: async (courseID) => {
        const sql = `SELECT * from Rating where courseID = ${courseID}`; 
        const rates = await db.load(sql);
        return rates;
    },
    createRating:async(courseID,studentID,NoStars,comment)=>{
        const sql = `insert into Rating (studentID,courseID,NoStars,comment) values(${studentID},${courseID},${NoStars},'${comment}');`; 
        const rates = await db.load(sql);
        return rates;
    },
    getRatingBystudentID: async (studentID) => {
        const sql = `SELECT * from Rating where studentID = ${studentID}`; 
        const rates = await db.load(sql);
        return rates;
    },
}; 