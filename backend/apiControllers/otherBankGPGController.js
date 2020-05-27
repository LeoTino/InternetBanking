var express = require('express');
var bankRepo = require('../repos/otherBankRepo');
var bcrypt = require('bcrypt');
var userRepo = require('../repos/userRepo'),
authRepo = require('../repos/authRepo');
var router = express.Router();
//Try vấn thông tin tài khoản
router.post('/info-account', (req, res) => {
    bankRepo.queryInfoAccount(req.body).then(rows => {
       
        bcrypt.genSalt(12, function(err, salt) {
            bcrypt.hash("4423394649620200521nhom9", salt, function(err, hash) {
                console.log("hash moi:"+hash);
            });
        });
        var hashString = req.body.soTk+req.body.timer+"nhom21";
        console.log("hashString:"+hashString);
        bcrypt.compare(hashString, req.body.hashCode, function(err, result) {
            if(result){
                bankRepo.queryInfoAccount(req.body).then(dataResp=>{
                    res.json(dataResp);
                })
            }else{
                res.json({status:"false"});
            }
             
        });
        // console.log("hash la"+hash);
        //res.json({status:"false"});
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
    });
});

//Nộp tiền vào tài khoản
router.post('/payInto', (req, res) => {

    bankRepo.payInto(req.body)
        .then(insertId => {
            console.log("insertId"+insertId);
            var poco = {
                status : insertId
            };
            res.statusCode = 200;
            res.json(poco);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});
//Trừ tiền tài khoản 
router.post('/withdraw', (req, res) => {

    bankRepo.withdraw(req.body)
        .then(insertId => {
            var poco = {
                status : "success"
            };
            res.statusCode = 201;
            res.json(poco);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});

//Get list bank
router.get('/get-list-info-bank', (req, res) => {

    bankRepo.getListInfoBank(req.body)
        .then(rows => {
            res.statusCode = 200;
            res.json(rows);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});

//add a bank
router.post('/add-other-bank', (req, res) => {

    bankRepo.addOtherBank(req.body)
        .then(insertId => {
            var poco = {
                status : "success"
            };
            res.statusCode = 201;
            res.json(poco);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});

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

router.post('/login', (req, res) => {
    userRepo.login(req.body.user, req.body.pwd)
        .then(userObj => {
            if (userObj) {
                var token = authRepo.generateAccessToken(userObj);
                var refreshToken = authRepo.generateRefreshToken();
                console.log(userObj);
                authRepo.updateRefreshToken(userObj.Id, refreshToken)
                    .then(rs => {
                        res.json({
                            auth: true,
                            access_token: token
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.statusCode = 500;
                        res.end('View error log on console.');
                    });
            } else {
                res.json({
                    auth: false
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});

module.exports = router;