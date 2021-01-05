const db = require('../utils/db');

module.exports = {
    getProfile: async (studentID) => {
        const sql = `SELECT * FROM Student where studentID = ${studentID};` 
        const student = await db.load(sql);
        return student;
    },
}; 