var express = require('express');
var transferRepo = require('../repos/transferRepo');

var router = express.Router();

router.post('/internal', (req, res) => {
    var thongTinCT = {
        soTienNguoiNhan : 0,
        soTaiKhoanNguoiNhan:"",
        soTienNguoiChuyen : 0,
        soTaiKhoanNguoiChuyen:""

    }
    console.log(req.body);
    transferRepo.transferInternal(req.body)
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

module.exports = router;