var db = require('../fn/mysql-db');


//json request:
//Method : Post 
// localhost:3000/transfer-history/getHistory
// {
//     "loaiGiaoDich":"NHAN_TIEN",  //NHAN_TIEN,CHUYEN_TIEN,THANH_TOAN_NHAC_NO
//     "soTaiKhoan":"02810002228"
// }
// Load danh sách giao dịch
exports.loadDanhSachGd = (data)=> {
    return new Promise((resolve,reject)=>{
        var sqlNhanTien = `SELECT * FROM lich_su_giao_dich
        WHERE (SO_TAI_KHOAN_NGUOI_NHAN='${data.soTaiKhoan}' AND LOAIGIAODICH='${data.loaiGiaoDich}')`;
        var sqlChuyenTien = `SELECT * FROM lich_su_giao_dich
        WHERE (SO_TAI_KHOAN_NGUOI_GUI='${data.soTaiKhoan}' AND LOAIGIAODICH='${data.loaiGiaoDich}')`;
        var sqlTienNo = `SELECT * FROM lich_su_giao_dich
        WHERE LOAIGIAODICH='${data.loaiGiaoDich}' 
        AND (SO_TAI_KHOAN_NGUOI_GUI='${data.soTaiKhoan}' OR SO_TAI_KHOAN_NGUOI_NHAN='${data.soTaiKhoan}')`;
        var sqlAll = `SELECT * FROM lich_su_giao_dich WHERE SO_TAI_KHOAN_NGUOI_NHAN ='${data.soTaiKhoan}' OR SO_TAI_KHOAN_NGUOI_GUI='${data.soTaiKhoan}'`
        if(data.loaiGiaoDich==='NHAN_TIEN'){
           db.load(sqlNhanTien).then(resultSql=>{
               console.log("nhanh tien"+resultSql);
               resolve(resultSql)
           }).catch(error=>reject(error));
        }else if(data.loaiGiaoDich==='CHUYEN_TIEN'){
           db.load(sqlChuyenTien).then(resultSql=>{
               resolve(resultSql)
           }).catch(error=>reject(error));
        }else if(data.loaiGiaoDich==='THANH_TOAN_NHAC_NO'){
           db.load(sqlTienNo).then(resultSql=>{
               resolve(resultSql)
           }).catch(error=>reject(error));
        }else{
           db.load(sqlAll).then(resultSql=>{
               resolve(resultSql)
           }).catch(error=>reject(error));
        }
    });
}

