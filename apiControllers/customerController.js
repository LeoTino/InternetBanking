var express = require('express'),
    axios = require('axios');

var userRepo = require('../repos/userRepo'),
    customerRepo = require('../repos/customerRepo'),
    authRepo = require('../repos/authRepo');

var router = express.Router();

router.get('/getAccounts/:user', (req, res) => {
    if (req.params.user) {
        var user = req.params.user;


        customerRepo.truyVanTaiKhoan(user).then(rows => {
            if (rows.length > 0) {
                console.log(rows);
                res.json(rows);
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