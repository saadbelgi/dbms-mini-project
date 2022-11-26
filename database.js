const mysql = require('mysql');
const util = require('util');

function makeDb(config) {
    const connection = mysql.createConnection(config);
    return {
        query(sql, args) {
            return util.promisify(connection.query)
                .call(connection, sql, args);
        },
        close() {
            return util.promisify(connection.end).call(connection);
        }
    };
}
const conn = makeDb({
    host: 'localhost',
    user: 'root',
    password: 'Saad2*04',
    database: 'dbmsproj'
});

module.exports = conn;