var db = require('../fn/mysql-db');

//json request:
//Method : Post 
// localhost:3000/debt/add-debt
// {
//     "taiKhoanDoi":"admin",
//     "taiKhoanNo":"hiep",
//     "soTien":9000000,
//     "noiDung":"Tien dien"
// }
// Tạo nhắc nợ

exports.addDebt = data=> {
    var sql = `INSERT INTO THONG_TIN_NO (TAI_KHOAN_DOI_NO,TAIKHOANNO,SOTIEN,NoiDung,TRANG_THAI)
     VALUES ("${data.taiKhoanDoi}","${data.taiKhoanNo}",${data.soTien},"${data.noiDung}",0)`;
    return db.update2(sql);
}

//json request:
//Method : Post 
// localhost:3000/debt/update-debt
// ddr
// Update nhắc nợ

exports.updateDebt = data=> {
    var sql = `UPDATE thong_tin_no
     SET NOIDUNG = '${data.noiDung}',
     TAIKHOANNO='${data.taiKhoanNo}',
    SOTIEN='${data.soTien}',
    TRANG_THAI=${data.trangThai},
    TAI_KHOAN_DOI_NO='${data.taiKhoanDoi}', 
    PhanHoi='${data.phanHoi}'`;
    return db.update2(sql);
}

//Xem danh sách nhắc nợ : 
//Method : Post
// //Api : localhost:3000/debt/load-debt
// {
//     "taiKhoanHienTai":"admin"
// }

exports.loadDebt = data=> {
    var sql = `SELECT * FROM thong_tin_no 
    WHERE (TaiKhoanNo = '${data.taiKhoanHienTai}' OR TAI_KHOAN_DOI_NO ='${data.taiKhoanHienTai}')
    AND TRANG_THAI = 0`;
    return db.load(sql);
}

//Xóa danh sách nhắc nợ : 
//Api : localhost:3000/debt/delete-debt
//Method : Post
// {
//     "idNhacNo":"1",
//     "noiDungXoa":"Đã thanh toán tháng trước"
// }

exports.deleteDebt = data=> {
    var sql = ` UPDATE thong_tin_no
    SET TRANG_THAI = 2,
    PhanHoi ="${data.noiDungXoa}" 
    WHERE Id = ${data.idNhacNo}`;
    return db.load(sql);
}

//Thanh toán nợ : 
//Api : localhost:3000/debt/payment-debt
//Method : Post
// {
//     "idNhacNo":"1",
// }

exports.paymentDebt = data=> {
    var sql = ` UPDATE thong_tin_no N,TAI_kHOAN tkD,TAI_KHOAN tkN 
    SET N.TRANG_THAI = 1, PhanHoi ="DA THANH TOAN",tkD.SoTien =tkD.SoTien+N.SOTIEN,
     tkN.SoTien = tkN.SoTien-N.SOTIEN 
     WHERE N.Id =${data.idNhacNo} and tkD.MaKhachHang = N.TAIKHOANNO 
     and tkN.MaKhachHang = N.TAI_KHOAN_DOI_NO`;
    return db.update(sql);
}