var express = require('express');
var adminRepo = require('../repos/adminRepo');

var router = express.Router();

// Api : localhost:3000/admin/load-empl
// Method :Get 
router.get('/load-empl', (req, res) => {
    adminRepo.loadEmpl(req.body)
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

// Api : localhost:3000/admin/manage-empl
// Method :Post 
// Body:
// {
//     "id":5,
// "ten":"Trần Anh Tai abca",
// "diaChi":"Bình Thạnh abc",
// "role":2,
// "tenDangNhap": "admin1",
// "matKhau":"admin1",
// "phone":"094343434343",
//  "email":"quocquoc42@gmail.com",
//  "method":3//1 insert, 2 update 3 delete
// }


router.post('/manage-empl', (req, res) => {
    adminRepo.manageEmpl(req.body)
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