var db = require('../fn/mysql-db');

//json request:
//Method : Post 
// localhost:3000/debt/add-debt
// {
//     "soTaiKhoanDoi":"0034434343",
//     "soTaiKhoanNo":"082434343243",
//     "soTien":9000000,
//     "noiDung":"Tien dien"
// }
// Tạo nhắc nợ

exports.addDebt = data=> {
    var sql = `INSERT INTO THONG_TIN_NO (TAI_KHOAN_DOI_NO,TAIKHOANNO,SOTIEN,NoiDung,TRANG_THAI)
     VALUES ("${data.soTaiKhoanDoi}","${data.soTaiKhoanNo}",${data.soTien},"${data.noiDung}",0)`;
    return db.update2(sql);
}