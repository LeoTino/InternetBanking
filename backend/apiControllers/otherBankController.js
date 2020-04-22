var express = require('express');
var bankRepo = require('../repos/otherBankRepo');

var router = express.Router();
//Try vấn thông tin tài khoản
router.post('/info-account', (req, res) => {
    bankRepo.queryInfoAccount(req.body).then(rows => {
        res.json(rows);
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
module.exports = router;