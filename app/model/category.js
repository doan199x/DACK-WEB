const db = require('../utils/db');

module.exports = {
    getAll: async () => {
        const sql = `SELECT * from Category`; 
        const cateogries = await db.load(sql);
        return cateogries;
    },
}; 