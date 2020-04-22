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

router.post('/outsite', (req, res) => {
    categoryRepo.add(req.body)
        .then(insertId => {
            var poco = {
                CatID: insertId,
                CatName: req.body.CatName
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

//Hủy nhắc nợ :

router.post('/set-up-user-receive', (req, res) => {
    transferRepo.setupUserReceive(req.body)
        .then(insertId => {
            var poco = {
                Id: insertId
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


//Thanh toán nhắc nợ : 

router.post('/getUserReceive', (req, res) => {

    transferRepo.loadUserReceive(req.body).then(rows => {
            if (rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.statusCode = 204;
                res.end();
            }
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});

module.exports = router;