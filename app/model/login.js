const db = require('../utils/db');
module.exports = {
    result: async (email,password) => {
        const sql = `SELECT position FROM account WHERE (email = "${email}" and password = "${password}");` 
        const login = await db.load(sql);
        return login;
    },
};