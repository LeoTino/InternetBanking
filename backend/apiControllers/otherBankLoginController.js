var express = require('express');
var bankRepo = require('../repos/otherBankRepo');
var bcrypt = require('bcrypt');
var userRepo = require('../repos/userRepo'),
authRepo = require('../repos/authRepo');
var router = express.Router();

router.post('/login', (req, res) => {
    userRepo.login(req.body.user, req.body.pwd)
        .then(userObj => {
            if (userObj) {
                var token = authRepo.generateAccessToken(userObj);
                var refreshToken = authRepo.generateRefreshToken();
                console.log(userObj);
                authRepo.updateRefreshToken(userObj.Id, refreshToken)
                    .then(rs => {
                        res.json({
                            auth: true,
                            access_token: token
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.statusCode = 500;
                        res.end('View error log on console.');
                    });
            } else {
                res.json({
                    auth: false
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});

module.exports = router;