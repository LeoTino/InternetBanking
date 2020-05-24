var db = require('../fn/mysql-db');
var jwt = require('jsonwebtoken');
var NodeRSA = require('node-rsa');
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
//     "id":1,
//     "soTk":"028100024343",
//     "tenGoiNho":"Nguyen Van A",
//     "nganHang":"VCB",
//      "method":1 //1: insert, 2: edit, 3: delete
//   }
  
exports.setupUserReceive = function(data) {
    return new Promise((resolve, reject) => {
        var sql = `SELECT T.SoTaiKhoan,K.Ten,K.DiaChi,K.TenDangNhap,K.Email,K.Phone 
    FROM TAI_KHOAN T 
    LEFT JOIN KHACH_HANG K ON T.MaKhachHang = K.MaKhachHang 
    WHERE T.SoTaiKhoan ='${data.soTk}'
    `;
    db.load(sql).then(info=>{
            console.log("info la"+JSON.stringify(info));
            console.log("tenDang nhap "+info[0].TenDangNhap);
            var tenDangNhap = info[0].TenDangNhap;
            if(data.tenGoiNho==="" ||data.tenGoiNho===undefined ||data.tenGoiNho===null){
                data.tenGoiNho =tenDangNhap;
            }
            if(data.method===1){
                var sql = `INSERT INTO danh_sach_nguoi_nhan(TEN_DANG_NHAP ,SO_TAI_KHOAN_NGUOI_NHAN,TEN_GOI_NHO,NGAN_HANG) 
                values('${tenDangNhap}','${data.soTk}','${data.tenGoiNho}','${data.nganHang}')
                       ON DUPLICATE KEY UPDATE
                       SO_TAI_KHOAN_NGUOI_NHAN = '${data.soTk}'`;
               db.insert(sql).then(insertResult=>{
                resolve(true);
              })
            }else if(data.method===2){
                
                var sql = `update danh_sach_nguoi_nhan SET TEN_DANG_NHAP='${tenDangNhap}',
                            SO_TAI_KHOAN_NGUOI_NHAN='${data.soTk}',
                            TEN_GOI_NHO ='${data.tenGoiNho}',
                            NGAN_HANG = '${data.nganHang}' 
                            WHERE ID = ${data.id}`;
                            console.log("method 2"+sql);
              db.update(sql).then(updateResult=>{
                resolve(true);
              })
            }else if(data.method===3){
                var sql = `DELETE FROM danh_sach_nguoi_nhan WHERE ID='${data.id}'`
        
               db.delete(sql).then(deleteResult=>{
                resolve(true);
               });
            }
        })
        
    }).catch(err => reject(err));;
    
    
}

// Method : post 
// Api :localhost:3000/transfer/load-info-receive
// {
//     "soTaiKhoan":"02810002324343"
// }

exports.loadInfoReceive = function(data) {
    
    var sql = `SELECT * FROM danh_sach_nguoi_nhan WHERE SO_TAI_KHOAN_NGUOI_NHAN like '%${data.soTaiKhoan}%'`;
    console.log("sql la "+sql);
    return db.load(sql);
}


// Method : post 
// Api :localhost:3000/transfer/load-info-receive-from-stk
// {
//     "soTaiKhoan":"02810002324343"
// }
exports.loadInfoReceiveFromStk = function(data) {
    console.log("qua load info");
    var sql = `SELECT T.SoTaiKhoan,K.Ten,K.DiaChi,K.TenDangNhap,K.Email,K.Phone ,N.TEN_GOI_NHO 
    FROM TAI_KHOAN T 
    LEFT JOIN KHACH_HANG K ON T.MaKhachHang = K.MaKhachHang 
    LEFT JOIN danh_sach_nguoi_nhan N ON N.SO_TAI_KHOAN_NGUOI_NHAN = T.SoTaiKhoan

    WHERE T.SoTaiKhoan ='${data.soTaiKhoan}'
    `;
    return db.load(sql);
}



// Method : post 
// Api :localhost:3000/transfer/load-list-info-receive
// {
//     "tenDangNhap":"admin"
// }
exports.loadListInfoReceive = function(data) {
    
    var sql = `SELECT ID,SO_TAI_KHOAN_NGUOI_NHAN,TEN_GOI_NHO,NGAN_HANG
    FROM danh_sach_nguoi_nhan
    WHERE TEN_DANG_NHAP = '${data.tenDangNhap}'`;
    console.log("sql la "+sql);
    return db.load(sql);
}

//json request :
//Get : localhost:3000/api/ib-hn/create-signature
//Tạo signature

exports.loadPrivateKey = function(data) {
    
    var sqlFindPrivateKey = `SELECT * FROM system_config WHERE KeyValue='private_key'`;
    return db.load(sqlFindPrivateKey);
}

//json request :
//Get : localhost:3000/api/ib-hn/create-signature
//Tạo signature
exports.createSignature = function(data) {
          privateKey =data[0].Value;
         var  key = new NodeRSA(null, {signingScheme: 'sha512'});
         key.importKey(privateKey);
         var signature=key.sign('nhom21', 'base64');
        return signature;
        
}
