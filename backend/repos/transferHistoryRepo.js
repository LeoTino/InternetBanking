var db = require('../fn/mysql-db');


//json request:
//Method : Post 
// localhost:3000/debt/update-debt
// {
//     "loaiGD":"NHAN_TIEN",  //NHAN_TIEN,CHUYEN_TIEN,THANH_TOAN_NHAC_NO
//     "soTaiKhoan":"02810002228"
// }
// Load danh sách giao dịch
exports.loadDanhSachGd = (loaiGD ,soTaiKhoan)=> {
    var sql = `SELECT * FROM lich_su_giao_dich
     WHERE LOAIGIAODICH='${loaiGD}' 
     AND (SO_TAI_KHOAN_NGUOI_GUI='${soTaiKhoan}' OR SO_TAI_KHOAN_NGUOI_NHAN='${soTaiKhoan}')`;
    return db.load(sql);
}

