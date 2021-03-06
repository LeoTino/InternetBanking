var express = require('express');
var transferRepo = require('../repos/transferRepo');


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

router.post('/truTien', (req, res) => {

    transferRepo.truTien(req.body)
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

router.post('/load-info-receive-from-stk', (req, res) => {

    transferRepo.loadInfoReceiveFromStk(req.body).then(rows => {
            if (rows.length > 0) {
                res.json(rows);
            } else {
                res.statusCode = 200;
                res.end();
            }
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});


router.get('/create-signature', (req, res) => {

    transferRepo.loadPrivateKey().then(data => {
        res.json(transferRepo.createSignature(data));
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
    });

});

router.post('/create-hash', (req, res) => {

    transferRepo.createHash(req.body).then(data => {
        res.json({hashStr:data});
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
    });

});
module.exports = router;