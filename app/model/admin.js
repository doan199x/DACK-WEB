const db = require('../utils/db');

module.exports = {
    checkLogin: async(email, password)=>{
        const sql = `SELECT * FROM Admin where email = '${email}' and password = '${password}'`;
        const admins = await db.load(sql);
        return admins;
    }
}; 