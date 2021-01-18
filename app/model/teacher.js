const db = require('../utils/db');

module.exports = {
    checkLogin: async (email, password) => {
        //const sql = `SELECT * FROM Teacher where email = '${email}' and password = '${password}'`;
        const sql = `SELECT password FROM Teacher where email = '${email}'`
        const teachers = await db.load(sql);
        return teachers;
    },
    getAll: async () => {
        const sql = `SELECT * FROM Teacher;`
        const result = await db.load(sql);
        return result;
    },
    findLikeName: async (input) => {
        const sql = `select* from Teacher where name like '%${input}%';`;
        const result = await db.load(sql);
        return result;
    },
    findByEmail: async (email) => {
        const sql = `select* from Teacher where email = '${email}'`;
        const result = await db.load(sql);
        return result;
    },
    add: async (name, email, password, avatarPath) => {
        const sql = `INSERT into Teacher (name,email,password,avatarPath) values('${name}','${email}','${password}','${avatarPath}')`;
        const result = await db.load(sql);
        return result;
    },
    ban: async (teacherID) => {
        const sql = `UPDATE Teacher set ban=true where teacherID =${teacherID}`;
        const result = await db.load(sql);
        return result;
    },
    unban: async (teacherID) => {
        const sql = `UPDATE Teacher set ban=false where teacherID =${teacherID}`;
        const result = await db.load(sql);
        return result;
    },
    getByID:async(teacherID)=>{
        const sql = `SELECT* from Teacher where teacherID = ${teacherID}`;
        const result = await db.load(sql);
        return result;
    }
}; 