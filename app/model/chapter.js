const db = require('../utils/db');

module.exports = {
    getChaptersByCourseID: async (courseID) => {
        const sql = `SELECT * from Chapter where courseID = ${courseID}`;
        const chapters = await db.load(sql);
        return chapters;
    },
    getChaptersOutlineByCourseID: async (courseID) => {
        const sql = `SELECT * from Chapter where courseID = ${courseID} and isOutline = true`;
        const chapters = await db.load(sql);
        return chapters;
    },
    delete: async (chapterID) => {
        const sql = `DELETE from Chapter where chapterID = ${chapterID}`;
        const result = await db.load(sql);
        return result;
    },
    add: async (chapterName, courseID, isOutline) => {
        const sql = `INSERT into Chapter (chapterName,courseID,isOutline) values('${chapterName}',${courseID},${isOutline})`;
        const result = await db.load(sql);
        return result;
    },
}; 