var db = require('../fn/mysql-db');

exports.transferInternal = data=> {
    var sqlNguoiNhan = `UPDATE tai_khoan SET SoTien=SoTien+${data.soTienChuyen}
        WHERE SoTaiKhoan = ${data.soTaikhoanNhan}`;
    var sqlNguoiChuyen = `UPDATE tai_khoan SET SoTien=SoTien-${data.soTienChuyen}
    WHERE SoTaiKhoan = ${data.taiKhoanNguon}`;
    db.update(sqlNguoiNhan);
    return db.update2(sqlNguoiChuyen);
}

exports.insert = (userID, poco) => {
    return new Promise((resolve, reject) => {
        var sql = `UPDATE tai_khoan SET SoTien=${soTien}
        WHERE SoTaiKhoan = ${soTaiKhoan}`;
        db.update(sql)
            .then(id => {
                var promises = [];
                for (d of poco.Details) {
                    promises.push(insertDetail(id, d));
                }

                return Promise.all(promises);
            })
            .then(values => resolve(values))
            .catch(err => reject(err));
    });
}

// Method : post 
// Api : localhost:3000/transfer/set-up-user-receive

// {
//     "tenDangNhap":"123434",
//     "soTk":"028100024343",
//     "tenGoiNho":"Nguyen Van A",
//     "nganHang":"VCB"
//   }
  
exports.setupUserReceive = function(data) {
    
    var sql = `INSERT INTO danh_sach_nguoi_nhan(TEN_DANG_NHAP ,SO_TAI_KHOAN_NGUOI_NHAN,TEN_GOI_NHO,NGAN_HANG) 
         values('${data.tenDangNhap}','${data.soTk}','${data.tenGoiNho}','${data.nganHang}')
                ON DUPLICATE KEY UPDATE
                SO_TAI_KHOAN_NGUOI_NHAN = '${data.soTk}'`;
    return db.insert(sql);
}

// {
//     "tenGoiNho":"Nguyen Van A"
//  }

exports.loadUserReceive = function(data) {
    
    var sql = `SELECT * FROM danh_sach_nguoi_nhan WHERE TEN_GOI_NHO like '%${data.tenGoiNho}%'`;
    console.log("sql la "+sql);
    return db.load(sql);
}


// Method : post 
// Api :localhost:3000/transfer/load-info-receive
// {
//     "soTaiKhoan":"02810002324343"
// }
exports.loadInfoReceive = function(data) {
    
    var sql = `SELECT T.SoTaiKhoan,K.Ten,K.DiaChi,K.TenDangNhap,K.Email,K.Phone 
    FROM TAI_KHOAN T 
    LEFT JOIN KHACH_HANG K ON T.MaKhachHang = K.MaKhachHang 
    WHERE T.SoTaiKhoan ='${data.soTaiKhoan }'
    `;
    console.log("sql la "+sql);
    return db.load(sql);
}



// Method : post 
// Api :localhost:3000/transfer/load-list-info-receive
// {
//     "tenDangNhap":"admin"
// }
exports.loadListInfoReceive = function(data) {
    
    var sql = `SELECT SO_TAI_KHOAN_NGUOI_NHAN,TEN_GOI_NHO,NGAN_HANG
    FROM danh_sach_nguoi_nhan
    WHERE TEN_DANG_NHAP = '${data.tenDangNhap}'`;
    console.log("sql la "+sql);
    return db.load(sql);
}


