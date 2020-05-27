var db = require('../fn/mysql-db');
var jwt = require('jsonwebtoken');
var NodeRSA = require('node-rsa');
const openpgp = require('openpgp');

var exp = "24h";

// json request :
// Post : localhost:3000/api/ib-hn/info-account
// {
//    "soTk":"028100023232",
//     "timer":"NH_ABC"  
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
//     "timer":"string",
//    "hashStr:"string" // 
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
//     "tenNganHangGui": "Ngân hàng Sài Gòn",
//     "maNganHangGui":"nhom7",
//     "soTaiKhoanGui":"028100023333",
//     "soTaiKhoanNhan":"028143434343",
//     "tenNguoiNhan":"Tran Van B",
//     "tenNguoiGui":"Tran Van A",
//     "soTienChuyen":"100000",
//     "ngayTao":"2020-05-20",
//     "noiDung":"chuyen tien",
//      "signature":"B1ts+MR2h0C0w3ltjaZoZslIpsurS7RpwSGt00ciHsKU57j6EySrEzcNUDqQeRYiPVMTFoxOEB9OEdXCA2mK0Df/tXNKD5lwNXjfDaKF600khurczprFwM7otoc3lA+fQvopKpY2qPX1AO3/w4efcGElDQJxUjN0QPIWeNDp4+I="
// }

//chuyen tien tiền 


exports.payInto = data=> {
    var payload = "nhom21"
    var privateKey;
    var sqlFindPrivateKey = `SELECT * FROM system_config WHERE KeyValue='private_key'`;
    return new Promise((resolve,reject)=>{
        db.load(sqlFindPrivateKey).then(obj=>{
            var sqlFindPublicKey = "";
                sqlFindPublicKey = `SELECT * FROM system_config WHERE KeyValue='nhom7'`;
                const wordArray2 = CryptoJS.enc.Base64.parse(data.signature); //signatureBase64 là signature nhóm tui gửi qua nhóm ông
                const cleartext = CryptoJS.enc.Utf8.stringify(wordArray2);

                const verified =  openpgp.verify({
                    message:  openpgp.cleartext.readArmored(cleartext), //cleartext là     // parse armored message
                    publicKeys: ( openpgp.key.readArmored(sqlFindPublicKey)).keys // for verification
                });
                const { valid } = verified.signatures[0];
                if (valid) {
                    var sqlNguoiChuyen = `UPDATE tai_khoan SET SoTien=SoTien + ${data.soTienChuyen}
                    WHERE SoTaiKhoan = ${data.soTaiKhoanNhan}`;
                    return db.update2(sqlNguoiChuyen);
                } else {
                    resolve(false);
                }
           
            // })
        });
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

// api :localhost:3000/api/ib-hn/login
// Method:post
// Body :
// {
// 	"user":"admin",
// 	"pwd":"admin"
// }
exports.login = function(userName, password) {
   
    return new Promise((resolve, reject) => {
                //var md5_password = md5(password);
            var sql = `select * from khach_hang where TenDangNhap = '${userName}'`;
            console.log("sql la "+sql);
            db.load(sql)
                .then(rows => {
                    if (rows.length === 0) {
                        resolve(null);
                    } else {
                        var user = rows[0];
                        bcrypt.compare(password+opts.KEY_BANK.VALUE,user.MatKhau, function(err, result) {
                            console.log("makhau la"+user.MatKhau);
                            console.log("kết qua "+result);
                            if(result){
                               resolve(user);
                            }else{
                                resolve(false);
                            }
                             
                        });
                    }
                })
                .catch(err => reject(err));
        
    });
}