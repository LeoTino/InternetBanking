var md5 = require('crypto-js/md5');

var db = require('../fn/mysql-db');
var bcrypt = require('bcrypt');
var opts = require('../fn/opts');

exports.add = function(poco) {
    // poco = {
    //     Username: 1,
    //     Password: 'new name',
    //     Name: 'name',
    //     Email: 'email',
    //     DOB: '2000-09-01',
    //     Permission: 0
    // }

    var md5_password = md5(poco.Password);
    var sql = `insert into users(f_Username, f_Password, f_Name, f_Email, f_DOB, f_Permission) values('${poco.Username}', '${md5_password}', '${poco.Name}', '${poco.Email}', '${poco.DOB}', ${poco.Permission})`;
    return db.insert(sql);
}


// api :localhost:3000/users/login
// Method:post
// Body :
// {
// 	"user":"admin",
// 	"pwd":"admin"
// }
exports.login = function(userName, password) {
   
    return new Promise((resolve, reject) => {
                //var md5_password = md5(password);
            var sql = `select * from khach_hang where TenDangNhap = '${userName}'`;
            console.log("sql la "+sql);
            db.load(sql)
                .then(rows => {
                    if (rows.length === 0) {
                        resolve(null);
                    } else {
                        var user = rows[0];
                        bcrypt.compare(password+opts.KEY_BANK.VALUE,user.MatKhau, function(err, result) {
                            console.log("makhau la"+user.MatKhau);
                            console.log("kết qua "+result);
                            if(result){
                               resolve(user);
                            }else{
                                resolve(false);
                            }
                             
                        });
                    }
                })
                .catch(err => reject(err));
        
    });
}

// api :localhost:3000/users/login
// Method:post
// Body :
// {
// 	"user":"admin",
// 	"pwd":"admin"
// }
exports.login = function(userName, password) {
   
    return new Promise((resolve, reject) => {
                //var md5_password = md5(password);
            var sql = `select * from khach_hang where TenDangNhap = '${userName}'`;
            console.log("sql la "+sql);
            db.load(sql)
                .then(rows => {
                    if (rows.length === 0) {
                        resolve(null);
                    } else {
                        var user = rows[0];
                        bcrypt.compare(password+opts.KEY_BANK.VALUE,user.MatKhau, function(err, result) {
                            console.log("makhau la"+user.MatKhau);
                            console.log("kết qua "+result);
                            if(result){
                               resolve(user);
                            }else{
                                resolve(false);
                            }
                             
                        });
                    }
                })
                .catch(err => reject(err));
        
    });
}

exports.load = function(id) {
    var sql = `select * from khach_hang where id = ${id}`;
    return db.load(sql);
}

exports.findByTenDangNhap =  function(userName) {
    return new Promise((resolve, reject) => {
        //var md5_password = md5(password);
        var sql = `select * from khach_hang where TenDangNhap = '${userName}'`;
        db.load(sql)
            .then(rows => {
                if (rows.length === 0) {
                    resolve(null);
                } else {
                    var user = rows[0];
                    resolve(user);
                }
            })
            .catch(err => reject(err));
    });
}

// Api : localhost:3000/users/change-pwd
// Method :Post 
// Body:
// {
//     "user":"admin",
//      "currentPwd":"1234",
//      "newPwd":"12345"
// }
exports.changePassword =  function(data) {
    var passEnc = "";
    return new Promise((resolve, reject) => {
        //var md5_password = md5(password);
                bcrypt.genSalt(12, function(err, salt) {
                    bcrypt.hash(data.newPwd+opts.KEY_BANK.VALUE, salt, function(err, hash) {
                        data.newPwd = hash;
                        var sqlUser = `SELECT * FROM khach_hang WHERE TenDangNhap='${data.user}'`;
                        db.load(sqlUser)
                            .then(rows => {
                                if (rows.length !== 0) {
                                    bcrypt.compare(data.currentPwd+opts.KEY_BANK.VALUE, rows[0].MatKhau, function(err, result) {
                                        console.log("result la:"+result);
                                        if(result){
                                            var sqlUpdate = `UPDATE khach_hang SET MatKhau='${data.newPwd}' WHERE Id=${rows[0].Id}`
                                            db.update(sqlUpdate);
                                            resolve(true);
                                        }else{
                                            res.json(false);
                                        }
                                         
                                    });
                                   
                                } else {
                                    resolve("User don't exist !");
                                }
                            })
                            .catch(err => reject(err));
                    });
                });
       
    });
}