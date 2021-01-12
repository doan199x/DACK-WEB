const db = require('../utils/db');

module.exports = {
    getAll: async () => {
        const sql = `SELECT * from PostCategory`;
        const result = await db.load(sql);
        return result;
    },
    update: async (postCategoryID,postCategoryName) => {
        const sql = `UPDATE PostCategory set postCategoryName='${postCategoryName}' where postCategoryID=${postCategoryID}`;
        const result = await db.load(sql);
        return result;
    },
    delete: async(postCategoryID)=>{
        const sql = `DELETE from PostCategory where postCategoryID=${postCategoryID}`;
        const result = await db.load(sql);
        return result; 
    },
    create: async(postCategoryName)=>{
        const sql = `INSERT into postCategory (postCategoryName) values('${postCategoryName}')`; 
        const result = await db.load(sql);
        return result;
    },
}; 