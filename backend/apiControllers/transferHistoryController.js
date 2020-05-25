var express = require('express');
var transferHisRepo = require('../repos/transferHistoryRepo');

var router = express.Router();

router.post('/getHistory', (req, res) => {
        transferHisRepo.loadDanhSachGd(req.body).then(rows => {
            console.log("data return la"+rows);
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


module.exports = router;