const db = require('../utils/db');

module.exports = {
    getLessonsByChapterID: async (chapterID) => {
        const sql = `SELECT * from Lesson where chapterID = ${chapterID}`; 
        const lessons = await db.load(sql);
        return lessons;
    },
}; 