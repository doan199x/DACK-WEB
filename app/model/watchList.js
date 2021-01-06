const db = require('../utils/db');

module.exports = {
    removeWatchList: async (studentID,courseID) => {
        const sql = `DELETE from WatchList where studentID=${studentID} and courseID =${courseID}` 
        const result = await db.load(sql);
        return result;
    }
}; 