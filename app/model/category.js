const db = require('../utils/db');

module.exports = {
    getAll: async () => {
        const sql = `SELECT * from Category`; 
        const result = await db.load(sql);
        return result;
    },
    create: async(categoryName)=>{
        const sql = `INSERT into Category (categoryName) values('${categoryName}')`; 
        const result = await db.load(sql);
        return result;
    },
    delete: async(categoryID)=>{
        const sql = `DELETE FROM Category where CategoryID = '${categoryID}'`; 
        const result = await db.load(sql);
        return result;
    }
}; 