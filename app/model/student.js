const db = require('../utils/db');

module.exports = {
    getProfile: async (studentID) => {
        const sql = `SELECT * FROM Student where studentID = ${studentID};` 
        const student = await db.load(sql);
        return student;
    },
    updateProfile: async(studentID, profile)=>{
        const sql = `UPDATE Student SET name='${profile.name}', phone='${profile.phone}', dateOfBirth='${profile.dateOfBirth}', email ='${profile.email}', avatarPath = '${profile.avatarPath}'
        WHERE studentID = ${studentID}`;
        const result = await db.load(sql);
        return result;
    },
    getAvatarPath: async(studentID)=>{
        const sql = `SELECT avatarPath FROM Student where studentID = ${studentID};` 
        const student = await db.load(sql);
        return student;
    },
    checkLogin: async(email, password)=>{
        const sql = `SELECT * FROM Student where email = '${email}' and password = '${password}'`;
        const student = await db.load(sql);
        return student;
    }
}; 