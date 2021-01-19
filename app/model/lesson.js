const db = require('../utils/db');

module.exports = {
    getLessonsByChapterID: async (chapterID) => {
        const sql = `SELECT * from Lesson where chapterID = ${chapterID}`;
        const lessons = await db.load(sql);
        return lessons;
    },
    getLessonByID: async (lessonID) => {
        const sql = `SELECT * from Lesson where lessonID = ${lessonID}`;
        const lesson = await db.load(sql);
        return lesson;
    },
    delete: async (lessonID) => {
        const sql = `DELETE from Lesson where lessonId=${lessonID}`;
        const result = await db.load(sql);
        return result;
    },
    add: async (lessonName, videoPath, chapterID) => {
        const sql = `INSERT into Lesson (lessonName,videoPath,chapterID) values('${lessonName}','${videoPath}','${chapterID}')`;
        const result = await db.load(sql);
        return result;
    },
    update: async (lessonName, videoPath, lessonID) => {
        const sql = `UPDATE Lesson set lessonName = '${lessonName}',videoPath = '${videoPath}' where lessonID=${lessonID}`;
        const result = await db.load(sql);
        return result;
    },
    getLessonsByCourseID: async(courseID)=>{
        const sql = `Select a.* from Lesson as a, Chapter as b, Course as c where a.chapterID = b.chapterID and b.courseID = c.courseID and c.courseID = ${courseID}`;
        const result = await db.load(sql);
        return result;
    }
}; 