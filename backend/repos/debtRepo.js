var db = require('../fn/mysql-db');

//json request:
//Method : Post 
// localhost:3000/debt/add-debt
// {
//      "tenNguoiDoi":"Tran Van A",
//     "soTaiKhoanDoi":"0281202033235754",
//      "tenNguoiBiDoi":"Tran Van B",
//     "soTaiKhoanBiDoi":"028112040165755",
//     "soTien":9000000,
//     "noiDung":"Tien muon thang 1"
// }
// Tạo nhắc nợ

exports.addDebt = data=> {
    var sql = `INSERT INTO thong_tin_no
    (TEN_NGUOI_DOI, SO_TAI_KHOAN_DOI, 
    TEN_NGUOI_BI_DOI, SO_TAI_KHOAN_BI_DOI,SOTIEN,NOIDUNG,TRANG_THAI) 
    VALUES ('${data.tenNguoiDoi}','${data.soTaiKhoanDoi}','${data.tenNguoiBiDoi}','${data.soTaiKhoanBiDoi}',
    '${data.soTien}','${data.noiDung}',0)`;
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
    return new Promise((resolve,reject)=>{
        var truyVanAccount =`SELECT T.SoTaiKhoan
                             FROM khach_hang K 
                            LEFT JOIN tai_khoan T ON K.MaKhachHang = T.MaKhachHang
                             WHERE T.LoaiTaiKhoan ='0' AND K.TenDangNhap='${data.taiKhoanHienTai}'`
        db.load(truyVanAccount).then(account=>{
            console.log("data la :"+account[0].SoTaiKhoan);
            var sql = `SELECT * FROM thong_tin_no 
             WHERE (SO_TAI_KHOAN_DOI = '${account[0].SoTaiKhoan}' OR SO_TAI_KHOAN_BI_DOI ='${account[0].SoTaiKhoan}')
             AND TRANG_THAI = '0'`;
             db.load(sql).then(thongTinNo=>{
                 resolve(thongTinNo);
             });
        })
    })
    
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
//     "idNhacNo":"1"
// }

exports.paymentDebt = data=> {
    return new Promise((resolve,reject)=>{
        var sqlLoad = `SELECT * FROM thong_tin_no WHERE ID=${data.idNhacNo}`;
        var idNhacNo = data.idNhacNo;
        db.load(sqlLoad).then(dataResp=>{
            var data = dataResp[0];
            if(data!==undefined){
                console.log("data la"+data);
                var sqlSaveHist = `INSERT INTO lich_su_giao_dich
                (SO_TAI_KHOAN_NGUOI_GUI, TEN_TAI_KHOAN_NGUOI_GUI, SO_TAI_KHOAN_NGUOI_NHAN,
                    TEN_TAI_KHOAN_NGUOI_NHAN, THOIGIAN, SOTIEN, GHICHU,LOAIGIAODICH)
                    VALUES ('${dataResp[0].SO_TAI_KHOAN_BI_DOI}','${data.TEN_NGUOI_BI_DOI}','${data.SO_TAI_KHOAN_DOI}','${data.TEN_NGUOI_DOI}',
                    NOW(),'${data.SOTIEN}','${data.noiDungChuyen}','THANH_TOAN_NHAC_NO')`
                db.insert(sqlSaveHist);
                var sqlNguoiNhan = `UPDATE tai_khoan SET SoTien=SoTien+${data.SOTIEN}
                WHERE SoTaiKhoan = ${data.SO_TAI_KHOAN_DOI}`;
                var sqlNguoiChuyen = `UPDATE tai_khoan SET SoTien=SoTien-${data.SOTIEN}
                WHERE SoTaiKhoan = ${data.SO_TAI_KHOAN_BI_DOI}`;
                var sqlUpdateNhacNo  = `UPDATE thong_tin_no SET TRANG_THAI=1 WHERE ID=${idNhacNo}`
                db.update(sqlUpdateNhacNo);
                db.update(sqlNguoiNhan);
                db.update2(sqlNguoiChuyen).then(updateResult=>{
                    resolve(true);
                })
            }else{
                resolve(false);
            }
            
        });
    })
   
}