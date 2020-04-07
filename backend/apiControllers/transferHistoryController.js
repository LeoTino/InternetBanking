var express = require('express');
var transferHisRepo = require('../repos/transferHistoryRepo');

var router = express.Router();

router.get('/:soTaiKhoan/:loaiGiaoDich', (req, res) => {
    console.log("giatri la : "+req.params.loaiGiaoDich);
    console.log("giatri la : "+req.params.soTaiKhoan);
    if (req.params.loaiGiaoDich) {
        var loaiGD = req.params.loaiGiaoDich;
        var soTaiKhoan = req.params.soTaiKhoan;
        transferHisRepo.loadDanhSachGd(loaiGD,soTaiKhoan).then(rows => {
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
    } else {
        res.statusCode = 400;
        res.json({
            msg: 'error'
        });
    }
});


module.exports = router;