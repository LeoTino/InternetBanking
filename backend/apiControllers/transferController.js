var express = require('express');
var transferRepo = require('../repos/transferRepo');
const request = require("request");


var router = express.Router();

router.post('/internal', (req, res) => {

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

router.post('/set-up-user-receive', (req, res) => {
    transferRepo.setupUserReceive(req.body)
        .then(insertId => {
            var poco = {
                Id: insertId
            };
            res.statusCode = 201;
            res.json("success");
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});

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




router.post('/load-info-receive', (req, res) => {

    transferRepo.loadInfoReceive(req.body).then(rows => {
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

router.post('/load-list-info-receive', (req, res) => {

    transferRepo.loadListInfoReceive(req.body).then(rows => {
            if (rows.length > 0) {
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
});


router.get('/create-signature', (req, res) => {
    const verifyCaptchaOptions = {
        uri: "https://www.google.com/recaptcha/api/siteverify",
        json: true,
        form: {
            secret: process.env.CAPTCHA_SECRET,
            response: req.body.recaptchaToken
        }
    };
    request.post(verifyCaptchaOptions, function (err, response, body) {
        if (err) {
            console.log("Error la"+err)
        }

        if (!body.success) {
            console.log("loi la :"+{message: body["error-codes"].join(".")});
        }

        //Save the user to the database. At this point they have been verified.
        console.log("Thanh Cong");
     }
    );

    transferRepo.loadPrivateKey().then(data => {
        res.json(transferRepo.createSignature(data));
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
    });

});
module.exports = router;