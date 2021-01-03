const db = require('../utils/db');

module.exports = {
    top: async () => {
        const sql = `SELECT * FROM Course ORDER BY RAND() LIMIT 4;` 
        const guest = await db.load(sql);
        return guest;
    },
    topview: async () => {
        const sql = `SELECT * FROM Course ORDER BY views DESC LIMIT 10;`
        const guest = await db.load(sql);
        return guest;
    },
    newest: async () => {
        const sql = `SELECT * FROM Course ORDER BY created DESC`
        const guest = await db.load(sql);
        return guest;
    },
    mostwatched: async () => {
        const sql = `(SELECT temp.categoryID, MAX(temp.totalviews) as totalviews, temp.categoryName as categoryName
        FROM (SELECT SUM(c1.NoStudents) as totalviews, c2.categoryID, c2.categoryName
        FROM Course as c1 JOIN Category as c2 ON c1.categoryID = c2.categoryID GROUP BY c2.categoryID) temp);`
        const guest = await db.load(sql);
        return guest;
    }
}; 