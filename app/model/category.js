const db = require('../utils/db');

module.exports = {
    getAll: async () => {
        const sql = `SELECT * from Category`; 
        const result = await db.load(sql);
        return result;
    },
    create: async(categoryName,postCategoryID)=>{
        const sql = `INSERT into Category (categoryName,postCategoryID) values('${categoryName}',${postCategoryID})`; 
        const result = await db.load(sql);
        return result;
    },
    delete: async(categoryID)=>{
        const sql = `DELETE FROM Category where CategoryID = ${categoryID}`; 
        const result = await db.load(sql);
        return result;
    },
    getByPostCategoryID: async(postCategoryID)=>{
        const sql = `SELECT * from Category where postCategoryID = ${postCategoryID} `; 
        const result = await db.load(sql);
        return result;
    },
    update: async (categoryID,categoryName) => {
        const sql = `UPDATE Category set categoryName='${categoryName}' where categoryID=${categoryID}`;
        const result = await db.load(sql);
        return result;
    }
}; 