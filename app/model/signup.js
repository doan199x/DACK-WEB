const db = require('../utils/db');
module.exports = {
    checkEmail: async (email) => {
        const sql = `SELECT COUNT(*) as count FROM Student WHERE (email = "${email}");` 
        const isExisted = await db.load(sql);
        return isExisted;
    },
    otp: async (email,otp,password) => {
        const sql = `INSERT INTO OTP(email,OTP,password) VALUES ("${email}",${otp}, "${password}");` 
        const isCreated = await db.load(sql);
        return isCreated;
    },
    removeOTP: async (email) => {
        const sql = `DELETE FROM OTP WHERE (email = "${email}");` 
        const deleted = await db.load(sql);
        return deleted;
    },
    checkOTP: async (email,otp) => {
        const sql = `select * from OTP WHERE (email = "${email}" and otp = ${otp});` 
        const check = await db.load(sql);
        return check;
    },
    signup: async (email,password) => {
        const sql = `INSERT INTO Student(email,password) VALUES ("${email}","${password}");` 
        const signup = await db.load(sql);
        return signup;
    },
};