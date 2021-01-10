const db = require('../utils/db');

module.exports = {
    getChaptersByCourseID: async (courseID) => {
        const sql = `SELECT * from Chapter where courseID = ${courseID}`; 
        const chapters = await db.load(sql);
        return chapters;
    },
    getChaptersOutlineByCourseID:async (courseID) => {
        const sql = `SELECT * from Chapter where courseID = ${courseID} and isOutline = true` ; 
        const chapters = await db.load(sql);
        return chapters;
    },
}; 