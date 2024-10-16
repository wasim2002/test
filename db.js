
const mysql = require("mysql");
const connProperties = require("./helpers/dbConfig");
const pool = mysql.createPool(connProperties.connection);

pool.getConnection((err, result) => {
    if (err) {
        console.log("Database Connection Failed", err);
    } else {
        console.log("Database Connection Success", "state : " + result.state);
    }
});

const getConnection = function (callback) {
    pool.getConnection(function (error, connection) {
        if (error) {
            return callback(error);
        }
        callback(error, connection);
    });
};

module.exports = {
    getConnection: getConnection,
};
