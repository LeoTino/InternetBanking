var mysql = require('mysql');
var opts = require('../fn/opts');

var createConnection = () => {
    return mysql.createConnection({
        host: opts.DB.HOST,
        port: opts.DB.PORT,
        user: opts.DB.USER,
        password: opts.DB.PWD,
        database: opts.DB.DB_NAME
    });
}

exports.load = function(sql) {
    return new Promise((resolve, reject) => {
        var cn = createConnection();
        cn.connect();
        cn.query(sql, function(error, rows, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(rows);
            }

            cn.end();
        });
    });
}
exports.loadNotPromise = function(sql) {
    
        var cn = createConnection();
        cn.connect();
        console.log(sql);
        return cn.query(sql);
}
exports.insert = function(sql) {
    return new Promise((resolve, reject) => {
        var cn = createConnection();
        cn.connect();
        cn.query(sql, function(error, value) {
            if (error) {
                reject(error);
            } else {
                resolve(value.insertId);
            }

            cn.end();
        });
    });
}

exports.delete = function(sql) {
    return new Promise((resolve, reject) => {
        var cn = createConnection();
        cn.connect();
        cn.query(sql, function(error, value) {
            if (error) {
                reject(error);
            } else {
                resolve(value.affectedRows);
            }

            cn.end();
        });
    });
}

exports.update = function(sql) {
    new Promise((resolve, reject) => {
        var cn = createConnection();
        cn.connect();
        cn.query(sql, function(error, value) {
            if (error) {
                reject(error);
            } else {
                resolve(value.insertId);
            }

            cn.end();
        });
    });
}

exports.update2 = function(sql) {
    return new Promise((resolve, reject) => {
        var cn = createConnection();
        cn.connect();
        cn.query(sql, function(error, value) {
            if (error) {
                reject(error);
            } else {
                resolve(value.insertId);
            }

            cn.end();
        });
    });
}

exports.sqlCreateAcc = function(sql) {
     new Promise((resolve, reject) => {
        var cn = createConnection();
        cn.connect();
        cn.query(sql, function(error, value) {
            if (error) {
                reject(error);
            } else {
                resolve(value.insertId);
            }

            cn.end();
        });
    });
}