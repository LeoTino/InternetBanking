var randtoken = require('rand-token'),
    jwt = require('jsonwebtoken'),
    moment = require('moment');
    var bcrypt = require('bcrypt');
var db = require('../fn/mysql-db'),
    opts = require('../fn/opts');


//url : localhost:3000/admin/load-empl
//method : get
exports.loadEmpl = infoAcc => {
    var sql = `SELECT * FROM khach_hang WHERE Role='nhanvien'`;
    return db.load(sql);
}

//url : localhost:3000/admin/manage-empl
//method : post
// {
//     "id":1
//     "ten":"Trần Anh Khoa",
//     "diaChi":"Bình Thạnh",
//     "role":"nhanvien",
//     "tenDangNhap": "admin",
//     "matKhau":"admin",
//     "phone":"09434343",
//      "email":"quocquoc42@gmail.com",
//      "method":1 //1 insert,2 update ,3 delete
//   }
exports.manageEmpl = data => {
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(12, function(err, salt) {
            bcrypt.hash(data.matKhau+opts.KEY_BANK.VALUE, salt, function(err, hash) {
                data.matKhau = hash;
                var sqlInsert = `INSERT INTO khach_hang
                (Ten, DiaChi, Role, TenDangNhap, MatKhau, Email, Phone)
                 VALUES ('${data.ten}','${data.diaChi}','${data.role}','${data.tenDangNhap}','${data.matKhau}','${data.email}','${data.phone}')`;
                    var sqlUpdate = `UPDATE khach_hang 
                                    SET Ten='${data.ten}',
                                    DiaChi='${data.diaChi}',
                                    Role='${data.role}',
                                    TenDangNhap='${data.tenDangNhap}',
                                    MatKhau='${data.matKhau}',
                                    Email='${data.email}',
                                    Phone='${data.phone}' WHERE Id=${data.id}`;
                    var sqlDelete =`DELETE FROM khach_hang WHERE Id=${data.id}`;
                                    if(data.method===1){
                    db.insert(sqlInsert).then(insertResult=>{
                        resolve(insertResult);
                    }).catch(error=>{
                        reject(error);
                    })
                }
                if(data.method===2){
                    console.log("sql la "+sqlUpdate);
                    db.update(sqlUpdate);
                    resolve(true);
                }
                if(data.method===3){
                    db.delete(sqlDelete).then(deleteResult=>{
                        resolve(deleteResult);
                    }).catch(error=>{
                        reject(error);
                    })
                }
            });
        });
    })
    

}

//localhost:3000/admin/history-account
// {
//     "maNganHang":"nhom9",
//     "tuNgay":"2020-05-27",
//     "denNgay":"2020-05-29"
// }
exports.getHistTransaction = data => {
     var sqlLichSuGD = `SELECT * FROM lich_su_giao_dich 
        WHERE MaNganHang ='${data.maNganHang}'
        AND THOIGIAN BETWEEN CAST('${data.tuNgay}' AS DATE) AND CAST('${data.denNgay}' AS DATE) ` ;
        var sqlNoDate = `SELECT * FROM lich_su_giao_dich 
       WHERE MaNganHang='${data.maNganHang}'`;
       console.log("sql la:"+sqlLichSuGD);
       console.log("sql la: sqlNoDate "+sqlNoDate);

       if(data.tuNgay!=""){
         return db.load(sqlLichSuGD);
       }else{
        return db.load(sqlNoDate);
       }
        
    
}


// localhost:3000/admin/add-debit-account
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