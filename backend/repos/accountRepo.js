var randtoken = require('rand-token'),
    jwt = require('jsonwebtoken'),
    moment = require('moment');

var db = require('../fn/mysql-db'),
    opts = require('../fn/opts');
    var bcrypt = require('bcrypt');



exports.createAccount = infoAcc => {
    var date = new Date();
    return new Promise((resole,reject)=>{
        bcrypt.genSalt(12, function(err, salt) {
            bcrypt.hash(infoAcc.matKhau+opts.KEY_BANK.VALUE, salt, function(err, hash) {
                infoAcc.matKhau = hash;
                var maKhachHang = date.getFullYear().toString() + date.getMonth().toString() + date.getDay().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString();
                var maTaiKhoan = date.getYear().toString() + date.getMonth().toString() + date.getDay().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString();
                var soTaiKhoan = "0281"+maKhachHang;
                var sqlCreateAcc = `insert into tai_khoan(MaTaiKhoan, MaKhachHang,SoTaiKhoan, LoaiTaiKhoan,SoTien) 
                values('${maTaiKhoan}', '${maKhachHang}','${soTaiKhoan}', '0', '0')`;
                var sql = `insert into khach_hang(Ten, DiaChi,MaKhachHang, TenDangNhap,MatKhau,Email,Phone,Role) 
                            values('${infoAcc.ten}', '${infoAcc.diaChi}','${maKhachHang}', '${infoAcc.tenDangNhap}', '${infoAcc.matKhau}',  '${infoAcc.email}','${infoAcc.phone}','user')`;
                db.insert(sqlCreateAcc);
                db.insert(sql).then(insertResult=>{
                    resole(insertResult);
                }).catch(err=>reject(err));
            });
        });
    })
    
   
}

//url : localhost:3000/employment/refill
//method : post
// {
//     "inforUser":"admin",
//     "soTien":100000
//     "maGiaoDichVien": "admin"//Mã giao dịch viên thực hiện nạp tiền.
//   }
exports.refill = infoTransfer => {
    return new Promise((resolve,reject)=>{
        var truyVanAccount =`SELECT T.SoTaiKhoan,K.Ten 
        FROM khach_hang K 
        LEFT JOIN tai_khoan T ON K.MaKhachHang = T.MaKhachHang 
        WHERE T.LoaiTaiKhoan ='0'
        AND K.TenDangNhap='${infoTransfer.inforUser}'`;
        db.load(truyVanAccount).then(account=>{
            console.log("truy van "+truyVanAccount);
            console.log("account"+account);
            console.log("account la :"+account[0].SoTaiKhoan);
            var soTaiKhoan = "";
            var tenTaiKhoan ="";
            try {
                 soTaiKhoan = account[0].SoTaiKhoan;
                 tenTaiKhoan = account[0].Ten;
            } catch (error) {
                soTaiKhoan = infoTransfer.taiKhoanHienTai;
            }
            var sqlNguoiNhan = `UPDATE TAI_KHOAN T
            left join KHACH_HANG K ON T.MaKhachHang = K.MaKhachHang
            set T.SoTien = T.SoTien + ${infoTransfer.soTien}
            WHERE (K.TenDangNhap = '${infoTransfer.inforUser}' and T.LoaiTaiKhoan='0') or T.SoTaiKhoan ='${infoTransfer.inforUser}'`;
             var sqlNguoiChuyen = `UPDATE TAI_KHOAN T
            left join KHACH_HANG K ON T.MaKhachHang = K.MaKhachHang
            set T.SoTien = T.SoTien + ${infoTransfer.soTien}
            WHERE K.TenDangNhap = '${infoTransfer.maGiaoDichVien}'`;
            db.update(sqlNguoiNhan);
            var sqlSaveHist = `INSERT INTO lich_su_giao_dich
            (SO_TAI_KHOAN_NGUOI_GUI, TEN_TAI_KHOAN_NGUOI_GUI, SO_TAI_KHOAN_NGUOI_NHAN,
                TEN_TAI_KHOAN_NGUOI_NHAN, THOIGIAN, SOTIEN, GHICHU,LOAIGIAODICH)
                VALUES ('${infoTransfer.maGiaoDichVien}','Ngân hàng IB-HN','${soTaiKhoan}','${tenTaiKhoan}',
                NOW(),'${infoTransfer.soTien}','Nạp tiền từ ngân hàng','NHAN_TIEN')`
            db.insert(sqlSaveHist);
            db.update2(sqlNguoiChuyen).then(dataUpdate=>{
                resolve(true);
            });
        })
    })
    
}

//localhost:3000/employment/history-account
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


// localhost:3000/employment/add-debit-account
// {
//     "infoCustomer":"admin",//Ma khach hang hoac user dang nhap
//     "soTien":100000,
//     "loaiTaiKhoan":0
//   }
exports.addDebitAccount = data => {
    var date = new Date();
    var radomStr = date.getYear().toString() + date.getMonth().toString() + date.getDay().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString();
    var soTaiKhoan = "0281"+radomStr;
    var maTaiKhoan = date.getYear().toString() + date.getMonth().toString() + date.getDay().toString()+date.getHours().toString()+date.getMinutes().toString()+date.getSeconds().toString();
    return new Promise((resolve,reject)=>{
        var truyvanInfo = `SELECT * FROM khach_hang WHERE MaKhachHang ='${data.infoCustomer}' OR TenDangNhap='${data.infoCustomer}'`
        db.load(truyvanInfo).then(khachHang=>{
            var sqlCreateAcc = `insert into tai_khoan(MaTaiKhoan, MaKhachHang,SoTaiKhoan, LoaiTaiKhoan,SoTien) 
            values('${maTaiKhoan}', '${khachHang[0].MaKhachHang}','${soTaiKhoan}', '${data.loaiTaiKhoan}', ${data.soTien})`;
            db.update2(sqlCreateAcc).then(taiKhoan=>{
                resolve(taiKhoan);
            });
        }).catch(error=>{
            reject(error)
        });
    });
}

// localhost:3000/employment/close-account
// {
//     "soTaiKhoan":0
//   }
exports.closeAccount = data => {
    return new Promise((resolve,reject)=>{
        var sqlCloseAc = `UPDATE tai_khoan SET Active=1 WHERE SoTaiKhoan ='${data.soTaiKhoan}'`
        db.update2(sqlCloseAc).then(resultUpdate=>{
            resolve(true);
        }).catch(error=>{
            reject(error)
        });
    });
}