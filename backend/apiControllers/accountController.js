var express = require('express');
var accountRepo = require('../repos/accountRepo');

var router = express.Router();

//Api localhost:3000/employment/createAccount
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

//url : localhost:3000/employment/refill
//method : post
// {
//     "inforUser":"admin",
//     "soTien":100000
//     "maGiaoDichVien": "admin"//Mã giao dịch viên thực hiện nạp tiền.
//   }
router.post('/refill', (req, res) => {
    accountRepo.refill(req.body)
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
router.post('/history-account', (req, res) => {
    accountRepo.getHistTransaction(req.body)
        .then(dataResp => {
            res.statusCode = 200;
            res.json(dataResp);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});


router.post('/add-debit-account', (req, res) => {
    accountRepo.addDebitAccount(req.body)
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