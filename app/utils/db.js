const mysql = require('mysql')

exports.load = (sql) => {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: '123@',
            database: 'onlinecourse'
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