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

exports.loadOrdersByUser = userID => {
    var sql = `select * from orders where UserID = ${userID}`;
    return db.load(sql);
}

exports.loadOrderDetails = orderID => {
    var sql =
        `select orderdetails.*, 
            products.ProName, products.TinyDes, products.FullDes, products.Quantity as InStock, 
            categories.CatID, categories.CatName
        from orderdetails inner join products on orderdetails.ProID = products.ProID
            inner join categories on products.CatID = categories.CatID
        where OrderID = ${orderID}`;

    return db.load(sql);
}

// {
//     "maKH":"123434",
//     "soTk":"028100024343",
//     "tenGoiNho":"Nguyen Van A",
//     "nganHang":"VCB"
//   }
  
exports.setupUserReceive = function(data) {
    
    var sql = `INSERT INTO danh_sach_nguoi_nhan(MA_KHACH_HANG,SO_TAI_KHOAN_NGUOI_NHAN,TEN_GOI_NHO,NGAN_HANG) 
         values('${data.maKH}','${data.soTk}','${data.tenGoiNho}','${data.nganHang}')
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
