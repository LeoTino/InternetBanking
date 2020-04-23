var db = require('../fn/mysql-db');


exports.add = function(tenDangNhap,otpCode) {

    var sql = `INSERT INTO OTP(TenDangNhap,OtpCode) values('${tenDangNhap}','${otpCode}')
                ON DUPLICATE KEY UPDATE
                OtpCode = '${otpCode}'`;
    return db.insert(sql);
}

exports.compare = function(req) {

    var sql = `SELECT * FROM otp WHERE TenDangNhap='${req.tenDangNhap}' and OtpCode='${req.otpcode}'`;
    return db.load(sql);
}