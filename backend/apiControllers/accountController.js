var express = require('express');
var accountRepo = require('../repos/accountRepo');

var router = express.Router();
//json 
// {
// 	"ten":"Trần Anh Khoa",
// 	"diaChi":"Bình Thạnh",
// 	"tenDangNhap":"khoatq",
// 	"matKhau":"123",
// 	"email":"trananhkhoa@gmail.com",
// 	"phone":"0947232743"
	
// }
router.post('/createAccount', (req, res) => {
    console.log("gia tria la " + req);
    accountRepo.createAccount(req.body)
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

// {
//     "inforUser":"admin",
//     "soTien":100000
//     "maGiaoDichVien": "admin"//Mã giao dịch viên thực hiện nạp tiền.
//   }
router.post('/refill', (req, res) => {
    accountRepo.refill(req.body)
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
router.post('/history-account', (req, res) => {
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