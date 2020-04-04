var express = require('express');
var categoryRepo = require('../repos/categoryRepo'),
    productRepo = require('../repos/productRepo'),
    opts = require('../fn/opts');

var router = express.Router();

router.get('/', (req, res) => {
    categoryRepo.loadAllWithDetails().then(rows => {
        res.json(rows);
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
    });

    // categoryRepo.loadAll().then(rows => {
    //     res.json(rows);
    // }).catch(err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end('View error log on console.');
    // });
});

// 
// categories/5

router.get('/:id', (req, res) => {
    if (req.params.id) {
        var id = req.params.id;

        if (isNaN(id)) {
            res.statusCode = 400;
            res.end();
            return;
        }

        categoryRepo.load(id).then(rows => {
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

router.post('/', (req, res) => {
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


router.delete('/:id', (req, res) => {
    if (req.params.id) {
        var id = req.params.id;

        if (isNaN(id)) {
            res.statusCode = 400;
            res.end();
            return;
        }

        categoryRepo.delete(id).then(affectedRows => {
            res.json({
                affectedRows: affectedRows
            });
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

// router.get('/:id/products', (req, res) => {
//     var id = req.params.id;
//     productRepo.loadByCat(id).then(rows => {
//         res.json(rows);
//     }).catch(err => {
//         console.log(err);
//         res.statusCode = 500;
//         res.end('View error log on console.');
//     });
// });

router.get('/:id/products', (req, res) => {
    var page = 1;
    if (req.query.page) {
        page = +req.query.page;
    }

    var id = req.params.id;
    productRepo.loadByCatPage(id, page).then(rows => {
        var hasMore = rows.length > opts.GENERAL.PRODUCTS_PER_PAGE;
        if (hasMore) {
            rows.pop();
        }

        var data = {
            hasMore: hasMore,
            products: rows
        }
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
    });
});

module.exports = router;