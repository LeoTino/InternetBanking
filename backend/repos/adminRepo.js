var randtoken = require('rand-token'),
    jwt = require('jsonwebtoken'),
    moment = require('moment');

var db = require('../fn/mysql-db'),
    opts = require('../fn/opts');


//url : localhost:3000/admin/load-empl
//method : get
exports.loadEmpl = infoAcc => {
    var sql = `SELECT * FROM khach_hang WHERE Role=2`;
    return db.load(sql);
}

//url : localhost:3000/admin/manage-empl
//method : post
// {
//     "id":1
//     "ten":"Trần Anh Khoa",
//     "diaChi":"Bình Thạnh",
//     "role":2,
//     "tenDangNhap": "admin",
//     "matKhau":"admin",
//     "phone":"09434343",
//      "email":"quocquoc42@gmail.com",
//      "method":1 //1 insert,2 update ,3 delete
//   }
exports.manageEmpl = data => {
    var sqlInsert = `INSERT INTO khach_hang
                    (Ten, DiaChi, Role, TenDangNhap, MatKhau, Email, Phone)
                     VALUES ('${data.ten}','${data.diaChi}','${data.role}','${data.tenDangNhap}','${data.matKhau}','${data.email}','${data.phone}')`;
    var sqlUpdate = `UPDATE khach_hang 
                    SET Ten='${data.ten}',
                    DiaChi='${data.diaChi}',
                    Role='${data.role}',
                    TenDangNhap='${data.emaitenDangNhapl}',
                    MatKhau='${data.matKhau}',
                    Email='${data.email}',
                    Phone='${data.phone}' WHERE Id=${data.id}`;
    var sqlDelete =`DELETE FROM khach_hang WHERE Id=${data.id}`;
    return new Promise((resole,reject)=>{
        if(data.method===1){
            db.insert(sqlInsert).then(insertResult=>{
                resole(insertResult);
            }).catch(error=>{
                reject(error);
            })
        }
        if(data.method===2){
            console.log("sql la "+sqlUpdate);
            db.update(sqlUpdate);
            resole(true);
        }
        if(data.method===3){
            db.delete(sqlDelete).then(deleteResult=>{
                resole(deleteResult);
            }).catch(error=>{
                reject(error);
            })
        }
    });
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
//     "soTien":100000
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
            values('${maTaiKhoan}', '${khachHang[0].MaKhachHang}','${soTaiKhoan}', '0', ${data.soTien})`;
            db.update2(sqlCreateAcc).then(taiKhoan=>{
                resolve(taiKhoan);
            });
        }).catch(error=>{
            reject(error)
        });
    });
    
    
}