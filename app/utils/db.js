const mysql = require('mysql')


exports.load = (sql) => {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: process.env.HOST,
            port: process.env.PORT,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        });

        con.connect((err) => {
            if (err)
                reject(err);
        });

        con.query(sql, (error, results, fields) => {
            if (error)
                reject(error);

            resolve(results);
        });

        con.end();
    });
};