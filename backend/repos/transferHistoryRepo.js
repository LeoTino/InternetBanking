var db = require('../fn/mysql-db');


exports.loadDanhSachGd = (loaiGD ,soTaiKhoan)=> {
    console.log("loai giao dich la"+loaiGD);
    console.log("so tai khoan la " + soTaiKhoan);
    var sql = `SELECT * FROM lich_su_giao_dich
     WHERE LOAIGIAODICH='${loaiGD}' 
     AND (SO_TAI_KHOAN_NGUOI_GUI='${soTaiKhoan}' OR SO_TAI_KHOAN_NGUOI_NHAN='${soTaiKhoan}')`;
    return db.load(sql);
}

