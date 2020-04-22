var express = require('express');
var notifyRepo = require('../repos/notifyRepo');

var router = express.Router();

//Tạo thông báo 

router.post('/add-notify', (req, res) => {

    notifyRepo.addNotify(req.body)
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

//Xem danh sách thông báo

router.post('/load-notify', (req, res) => {
    notifyRepo.loadNotify(req.body)
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

//Chấp nhận thông báo :

router.post('/accept-notify', (req, res) => {
    notifyRepo.acceptNotify(req.body)
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


//Hủy thông báo : 

router.post('/reject-notify', (req, res) => {
    notifyRepo.rejectNotify(req.body)
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


module.exports = router;