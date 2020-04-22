var randtoken = require('rand-token'),
    jwt = require('jsonwebtoken'),
    moment = require('moment');

var db = require('../fn/mysql-db'),
    opts = require('../fn/opts');

exports.createAccount = infoAcc => {
    var date = new Date();
    var maKhachHang = date.getFullYear().toString() + date.getMonth().toString() + date.getDay().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString();
    var maTaiKhoan = date.getYear().toString() + date.getMonth().toString() + date.getDay().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString();
    var soTaiKhoan = "0281"+maKhachHang;
    var sqlCreateAcc = `insert into tai_khoan(MaTaiKhoan, MaKhachHang,SoTaiKhoan, LoaiTaiKhoan,SoTien) 
    values('${maTaiKhoan}', '${maKhachHang}','${soTaiKhoan}', '0', '0')`;
    var sql = `insert into khach_hang(Ten, DiaChi,MaKhachHang, TenDangNhap,MatKhau,Email,Phone) 
                values('${infoAcc.ten}', '${infoAcc.diaChi}','${maKhachHang}', '${infoAcc.tenDangNhap}', '${infoAcc.matKhau}', '${infoAcc.phone}', '${infoAcc.email}')`;
    db.sqlCreateAcc(sqlCreateAcc);
    return db.insert(sql);
}

// {
//     "inforUser":"admin",
//     "soTien":100000
//     "maGiaoDichVien": "admin"//Mã giao dịch viên thực hiện nạp tiền.
//   }
exports.refill = infoTransfer => {
    var sqlNguoiNhan = `UPDATE TAI_KHOAN T
        left join KHACH_HANG K ON T.MaKhachHang = K.MaKhachHang
        set T.SoTien = T.SoTien + ${infoTransfer.soTien}
        WHERE (K.TenDangNhap = '${infoTransfer.inforUser}' and T.LoaiTaiKhoan='1') or T.SoTaiKhoan ='${infoTransfer.inforUser}'`;
    var sqlNguoiChuyen = `UPDATE TAI_KHOAN T
        left join KHACH_HANG K ON T.MaKhachHang = K.MaKhachHang
        set T.SoTien = T.SoTien + ${infoTransfer.soTien}
        WHERE (K.TenDangNhap = '${infoTransfer.maGiaoDichVien}'`;
    db.update(sqlNguoiNhan);
    return db.update2(sqlNguoiChuyen);
}


// {
//     "soTaiKhoan":"0281000232299",
//     "loaiGd":"NHAN_TIEN",
// }
exports.getHistTransaction = data => {
     var sqlLichSuGD = `SELECT * FROM lich_su_giao_dich 
        WHERE (SO_TAI_KHOAN_NGUOI_GUI='${data.soTaiKhoan}' OR SO_TAI_KHOAN_NGUOI_NHAN='${data.soTaiKhoan}') 
        AND LOAIGIAODICH ='${data.loaiGd}' ORDER BY LOAIGIAODICH DESC` 
        return db.load(sqlNguoiChuyen);
}


