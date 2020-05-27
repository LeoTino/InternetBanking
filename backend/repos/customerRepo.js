var md5 = require('crypto-js/md5');

var db = require('../fn/mysql-db');

exports.truyVanTaiKhoan = function(user) {
    var sql = `SELECT * FROM tai_khoan WHERE MaKhachHang='${user}' and Active=0`;
    return db.load(sql);
}