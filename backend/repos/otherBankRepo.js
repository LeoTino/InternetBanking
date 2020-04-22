var db = require('../fn/mysql-db');


// {
//    "soTk":"028100023232"   
// }

exports.queryInfoAccount = function(data) {
    
    var sql = `SELECT tk.SoTaiKhoan, kh.Ten,tk.SoTien
    FROM TAI_KHOAN tk
    LEFT JOIN KHACH_HANG kh ON tk.MaKhachHang = kh.MaKhachHang
    WHERE tk.SoTaiKhoan = '${data.soTk}'`

    return db.load(sql);
}

//json request :
// {
//     "taiKhoanNguon":"028100023233",
//     "soTienChuyen":1000000
// }

//trừ tiền 
exports.withdraw = data=> {
    var sqlNguoiChuyen = `UPDATE tai_khoan SET SoTien=SoTien-${data.soTienChuyen}
    WHERE SoTaiKhoan = ${data.taiKhoanNguon}`;
    return db.update2(sqlNguoiChuyen);
}


//json request:

// {
//     "soTienChuyen":10000000,
//     "soTaikhoanNhan":"02810434343"
// }
//Nộp tiền 

exports.payInto = data=> {
    var sqlNguoiNhan = `UPDATE tai_khoan SET SoTien=SoTien+${data.soTienChuyen}
        WHERE SoTaiKhoan = ${data.soTaikhoanNhan}`;
    return db.update2(sqlNguoiNhan);
}