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
    // poco = {
    //     OrderID: 1,
    //     OrderDate: '2018-08-23 16:00:00',
    //     Total: 30000;
    //     Details: [{
    //         ProID: 1,
    //         Quantity: 1,
    //         Price: 100000,
    //         Amount: 100000
    //     }, {
    //         ProID: 2,
    //         Quantity: 2,
    //         Price: 40000,
    //         Amount: 80000
    //     }]
    // }

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