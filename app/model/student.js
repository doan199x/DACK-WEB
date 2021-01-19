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
        //const sql = `SELECT * FROM Student where email = '${email}' and password = '${password}'`;
        const sql = `SELECT password FROM Student where email = '${email}'`
        const student = await db.load(sql);
        return student;
    },
    getAll:async()=>{
        const sql = `SELECT * FROM Student;` 
        const result = await db.load(sql);
        return result;
    },
    findLikeName: async(input)=>{
        const sql = `select* from Student where name like '%${input}%';`; 
        const result = await db.load(sql);
        return result;
    },
    delete: async(studentID)=>{
        const sql = `DELETE from Student where studentID = ${studentID}`; 
        const result = await db.load(sql);
        return result;
    },
    findByEmail : async(email)=>{
        const sql = `select* from Student where email = '${email}'`; 
        const result = await db.load(sql);
        return result;
    },
    updateBalance : async(studentID,newBalance)=>{
        const sql=`UPDATE Student set balance = ${newBalance} where studentID = ${studentID}`;
        const result = await db.load(sql);
        return result;
    },
    ban: async (studentID) => {
        const sql = `UPDATE Student set ban=true where studentID =${studentID}`;
        const result = await db.load(sql);
        return result;
    },
    unban: async (studentID) => {
        const sql = `UPDATE Student set ban=false where studentID =${studentID}`;
        const result = await db.load(sql);
        return result;
    },
    updatePassword:async(studentID, newPassword)=>{
        const sql = `UPDATE Student set password='${newPassword}' WHERE studentID = ${studentID}`;
        const result = await db.load(sql);
        return result;
    }
}; 