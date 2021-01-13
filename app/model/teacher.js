const db = require('../utils/db');

module.exports = {
    checkLogin: async(email, password)=>{
        //const sql = `SELECT * FROM Teacher where email = '${email}' and password = '${password}'`;
        const sql = `SELECT password FROM Teacher where email = '${email}'`
        const teachers = await db.load(sql);
        return teachers;
    }
}; 