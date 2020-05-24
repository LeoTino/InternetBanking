var express = require('express'),
    axios = require('axios');

var userRepo = require('../repos/userRepo'),
    authRepo = require('../repos/authRepo');

var router = express.Router();

router.post('/', (req, res) => {
    userRepo.add(req.body)
        .then(insertId => {
            res.statusCode = 201;
            res.json(req.body);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end();
        });
});

router.post('/captcha', (req, res) => {
    var secret = '6LderVAUAAAAANlZ_RuqdomfqVp90ElsfXDP2WOX';
    var captcha_response = req.body.captcha_response;

    var url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captcha_response}`;
    axios.post(url, {
            // secret: _secret,
            // response: captcha_response
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            }
        })
        .then(function(response) {
            // console.log(response.data);
            // res.end('ok');
            res.json(response.data);
        })
        .catch(function(error) {
            res.end('fail');
        });
});

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
                            user: userObj,
                            access_token: token,
                            refresh_token: refreshToken
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

router.post('/renew-token', (req, res) => {
    var rToken = req.body.refreshToken;
    authRepo.verifyRefreshToken(rToken)
        .then(rows => {
            if (rows.length === 0) {
                res.statusCode = 400;
                res.json({
                    msg: 'invalid refresh-token'
                });

                throw new Error('abort-chain'); // break promise chain

            } else {
                return rows[0].ID;
            }
        })
        .then(id => userRepo.load(id))
        .then(rows => {
            var userObj = rows[0];
            var token = authRepo.generateAccessToken(userObj);
            res.json({
                access_token: token
            });
        })
        .catch(err => {
            if (err.message !== 'abort-chain') {
                console.log(err);
                res.statusCode = 500;
                res.end('View error log on console.');
            }
        });
});

router.post('/logout', authRepo.verifyAccessToken, (req, res) => {
    // var info = req.token_payload.info;
    var user = req.token_payload.user;
    authRepo.deleteRefreshToken(user.f_ID)
        .then(affectedRows => {
            res.json({
                msg: 'success'
            });
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});

router.post('/change-pwd', (req, res) => {
    userRepo.changePassword(req.body)
        .then(affectedRows => {
            res.json({
                msg: 'success'
            });
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});

module.exports = router;