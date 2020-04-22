var db = require('../fn/mysql-db');

//json request:
//Method : Post 
// localhost:3000/notify/add-notify
// {
//     "userNhan":"admin",
//     "noiDung":"đóng tiền điện tháng 2"
// }
// Tạo thông báo

exports.addNotify = data=> {
    var sql = `INSERT INTO thong_bao (USER_NHAN,NOI_DUNG,TRANG_THAI)
     VALUES ("${data.userNhan}","${data.noiDung}",0)`;
    return db.update2(sql);
}

//Xem thông báo : 
//Method : Post
//Api : localhost:3000/notify/load-notify
// {
//     "taiKhoanHienTai":"admin"
// }

exports.loadNotify = data=> {
    var sql = `SELECT * FROM thong_bao 
    WHERE USER_NHAN = '${data.taiKhoanHienTai}' AND TRANG_THAI = 0`;
    return db.load(sql);
}

//Chấp nhận thông báo: 
//Api : localhost:3000/notify/accept-notify
//Method : Post
// {
//     "id":1
// }

exports.acceptNotify = data=> {
    var sql = ` UPDATE thong_bao
    SET TRANG_THAI = 1 where id=${data.Id}`;
    return db.load(sql);
}

//Từ chối thông báo : 
//Api : localhost:3000/debt/reject-notify
//Method : Post
// {
//     "id":1
// }

exports.rejectNotify = data=> {
    var sql = ` UPDATE thong_bao
    SET TRANG_THAI = 2 where id=${data.Id}`;
    return db.update(sql);
}