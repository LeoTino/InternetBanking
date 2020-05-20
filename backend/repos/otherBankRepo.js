var db = require('../fn/mysql-db');
var jwt = require('jsonwebtoken');

var exp = "24h";

//json request :
//Post : localhost:3000/api/ib-hn/info-account
// {
//    "soTk":"028100023232",
//     "maNH":"NH_ABC"  
// }
//Tạo 

exports.queryInfoAccount = function(data) {
    
    var sql = `SELECT tk.SoTaiKhoan, kh.Ten,tk.SoTien
    FROM TAI_KHOAN tk
    LEFT JOIN KHACH_HANG kh ON tk.MaKhachHang = kh.MaKhachHang
    WHERE tk.SoTaiKhoan = '${data.soTk}'`

    return db.load(sql);
}

//json request :
//Post : localhost:3000/api/ib-hn/info-account
// {
//    "soTk":"028100023232",
//     "maNH":"NH_ABC"  
// }
//Truy van thong tin tai khoan

exports.queryInfoAccount = function(data) {
    
    var sql = `SELECT tk.SoTaiKhoan, kh.Ten,tk.SoTien
    FROM TAI_KHOAN tk
    LEFT JOIN KHACH_HANG kh ON tk.MaKhachHang = kh.MaKhachHang
    WHERE tk.SoTaiKhoan = '${data.soTk}'`

    return db.load(sql);
}

//json request :
//Post : localhost:3000/api/ib-hn/withdraw
// {
    // maNganHangThuHuong: "nh_SG",
    // soTaiKhoanNganNganHangThuHuong:"028100023333",
    // tenNguoiNhan:"Tran Van B",
    // soTienChuyen:"100000"
// }

//trừ tiền 
exports.withdraw = data=> {
    var payload = {
        soTaiKhoanNguoiNhan:data.soTaiKhoanNganNganHangThuHuong,
        tenNguoiNhan:data.tenNguoiNhan,
        soTienChuyen:data.soTienChuyen
    }
    var privateKey;
    var sqlFindPrivateKey = `SELECT * FROM system_config WHERE KeyValue='private_key'`;
    return db.load(sqlFindPrivateKey).then(obj=>{
        var signOptions = {
            //expiresin:exp,
            algorithm:["RS256"]
          };
        console.log("Go to return .");
        privateKey =obj[0].Value;
        var sqlFindPublicKey = `SELECT * FROM system_config WHERE KeyValue='public_key'`;
        var publickey ;
        db.load(sqlFindPublicKey).then(pubKeyRows=>{
            var signOptions = {
                //expiresin:exp,
                algorithm:"RS256"
              };
            var token = jwt.sign(payload, privateKey,signOptions);
            // console.log(token);
            // console.log("public key : "+pubKeyRows[0].Value);
            // publickey = pubKeyRows[0].Value;
            // var verifyOptions = {
            //     algorithm:["RS256"]
            // };
            // var verified = jwt.verify(token,publickey,verifyOptions);
            //  console.log("Verified: " + JSON.stringify(verified));
            // console.log(privateKey);
            // var sqlNguoiChuyen = `UPDATE tai_khoan SET SoTien=SoTien-${data.soTienChuyen}
            // WHERE SoTaiKhoan = ${data.taiKhoanNguon}`;
            // return db.update2(sqlNguoiChuyen);

            //Start send token : 
        })
    });
}


//json request :
//Post : localhost:3000/api/ib-hn//payInto
// {
//         "tenNganHangThuHuong": "Ngân hàng Sài Gòn",
//         "soTaiKhoanNganNganHangThuHuong":"028100023333",
//         "tenNguoiNhan":"Tran Van B",
//         "soTienChuyen":"100000",
//          "signature":"UQUQ2vjWaO/7F2hTGyHehCjhXCXnSl/sxp9XvlME76zDxioTLiyoR3BytraBJdhbg10GB1kASOfVpex6Ue7IH7eiqJUFBE+e9vegMY8iXaGcDI/ueoo4cvI6AIPWcUqQ7urtDXKeU4jLkVN7SLOt0Tu7spWc2hoZ63KT6uuzhlE="
// }
//chuyen tien tiền 

exports.payInto = data=> {
    var payload = {
        tenNganHangChuyen: data.tenNganHangThuHuong,
        soTaiKhoanNganChuyen:data.soTaiKhoanNganChuyen,
        soTaiKhoanNganNhan:data.soTaiKhoanNganChuyen,
        tenNguoiNhan:"Tran Van B",
        soTienChuyen:"100000"
    }
    var privateKey;
    var sqlFindPrivateKey = `SELECT * FROM system_config WHERE KeyValue='private_key'`;
    return db.load(sqlFindPrivateKey).then(obj=>{
        var signOptions = {
            //expiresin:exp,
            algorithm:["RS256"]
          };
        console.log("Go to return .");
        privateKey =obj[0].Value;
        var sqlFindPublicKey = `SELECT * FROM system_config WHERE KeyValue='key_NM'`;
        var publickey ;
        db.load(sqlFindPublicKey).then(pubKeyRows=>{
            var signOptions = {
                //expiresin:exp,
                algorithm:"RS256"
              };
            var token = jwt.sign(payload, privateKey,signOptions);
            console.log(token);
            console.log("public key : "+pubKeyRows[0].Value);
            publickey = pubKeyRows[0].Value;
            var verifyOptions = {
                algorithm:["RS256"]
            };
            var verified = jwt.verify(data.signature,publickey,verifyOptions);
             console.log("Verified: " + JSON.stringify(verified));
            console.log(privateKey);
            var sqlNguoiChuyen = `UPDATE tai_khoan SET SoTien=SoTien-${data.soTienChuyen}
            WHERE SoTaiKhoan = ${data.taiKhoanNguon}`;
            return db.update2(sqlNguoiChuyen);
        })
    });
}

//json request :
//Post : localhost:3000/api/ib-hn/get-list-info-bank
// {
//         "tenNganHangThuHuong": "Ngân hàng Sài Gòn",
//         "soTaiKhoanNganNganHangThuHuong":"028100023333",
//         "tenNguoiNhan":"Tran Van B",
//         "soTienChuyen":"100000"
// }
//Get danh sách ngân hàng
exports.getListInfoBank= function(data) {
    
    var sql = `SELECT * FROM ngan_hang_thu_huong`

    return db.load(sql);
}

// Method : post 
// Api :localhost:3000/api/ib-hn/add-other-bank
// {
    // 'maNganHang':'NH_ABC',
    // 'tenNganHang':'Ngan hang Acb'
// }
//Thêm 1 ngân hàng
exports.addOtherBank = function(data) {
    
    var sql = `INSERT INTO ngan_hang_thu_huong(MA_NGAN_HANG,TEN_NGAN_HANG) values ('${data.maNganHang}','${data.tenNganHang}')`;
    return db.insert(sql);
}