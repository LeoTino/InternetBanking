var express = require('express');
var debtRepo = require('../repos/debtRepo');

var router = express.Router();

//Tạo nhắc nợ

router.post('/add-debt', (req, res) => {

    debtRepo.addDebt(req.body)
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

//Xem danh sách nhắc nợ

router.post('/load-debt', (req, res) => {
    debtRepo.loadDebt(req.body)
        .then(rows => {
            res.statusCode = 201;
            res.json(rows);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});

//Hủy nhắc nợ :

router.post('/delete-debt', (req, res) => {
    debtRepo.deleteDebt(req.body)
        .then(insertId => {
            res.statusCode = 201;
            res.json("success");
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});


//Thanh toán nhắc nợ : 

router.post('/payment-debt', (req, res) => {
    debtRepo.paymentDebt(req.body)
        .then(insertId => {
            console.log("gia tri la"+insertId);
            res.statusCode = 201;
            res.json({status:insertId});
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});


module.exports = router;