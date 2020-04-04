var db = require('../fn/mysql-db'),
    opts = require('../fn/opts');

exports.loadAll = function() {
    var sql = 'select * from products';
    return db.load(sql);
}

exports.loadPage = function(page) {
    var offset = (page - 1) * opts.GENERAL.PRODUCTS_PER_PAGE;
    var sql = `select * from products limit ${opts.GENERAL.PRODUCTS_PER_PAGE + 1} offset ${offset}`;
    return db.load(sql);
}

exports.load = function(id) {
    var sql = `select * from products where ProID = ${id}`;
    return db.load(sql);
}

exports.loadByCat = function(catId) {
	var sql = `select * from products where CatID = ${catId}`;
	return db.load(sql);
}

exports.loadByCatPage = function(catId, page) {
    const limit = opts.GENERAL.PRODUCTS_PER_PAGE + 1;
    const offset = (page - 1) * opts.GENERAL.PRODUCTS_PER_PAGE;
    const sql = `select * from products where CatID = ${catId} limit ${limit} offset ${offset}`;
    return db.load(sql);
}