var express = require('express');
var bankRepo = require('../repos/otherBankRepo');
var bcrypt = require('bcrypt');

var router = express.Router();
//Try vấn thông tin tài khoản
router.post('/info-account', (req, res) => {
    bankRepo.queryInfoAccount(req.body).then(rows => {
        var mockupData = {
            ten : 'Nguyen Van A',
            soTk : '0281434343434',
            tenNganhang :'Ngan Hang ACB'
        }

        bcrypt.genSalt(12, function(err, salt) {
            bcrypt.hash("4423394649620200521nhom9", salt, function(err, hash) {
                console.log("hash moi:"+hash);
            });
        });
        var hashString = req.body.soTk+req.body.timer+"nhom21";
        console.log("hashString:"+hashString);
        bcrypt.compare(hashString, req.body.hashCode, function(err, result) {
            console.log("result la:"+result);
            if(result){
                res.json(mockupData);
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


module.exports = router;