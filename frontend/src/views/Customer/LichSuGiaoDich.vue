<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <div>
      <i style="color:red">*Chỉ có thể xem lịch sử giao dịch 30 ngày gần nhất</i>
    </div>
    <div class="content">
      <datatable title="Lịch sử giao dịch" :columns="columnNhanTien" :rows="rowDataNhanTien" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DataTable from "vue-materialize-datatable";
export default {
  name: "getAccountsList",
  data() {
    return {
      rowDataNhanTien: [{}],
      columnNhanTien: [
        {
          label: "Số tài khoản người gửi",
          field: "stkGui",
          numeric: false,
          html: true
        },
        {
          label: "Tên tài khoản người gửi",
          field: "tenGui",
          numeric: false,
          html: true
        },
        {
          label: "Số tài khoản người nhận",
          field: "stkNhan",
          numeric: false,
          html: true
        },
        {
          label: "Tên tài khoản người nhận",
          field: "tenNhan",
          numeric: false,
          html: true
        },
        {
          label: "Số tiền",
          field: "sotien",
          numeric: false,
          html: true
        },
        {
          label: "Ghi chú",
          field: "ghichu",
          numeric: false,
          html: true
        }
      ]
    };
  },
  components: {
    datatable: DataTable
  },
  mounted() {
    this.fetchData(this.$route.params.MaKhachHang);
  },

  watch: {},

  methods: {
    format(val) {
      return val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ` VND`;
    },
    fetchData() {
      var soTKKhachHang = "0281202040225727"; //this.maKhachHang;
      var MaKhachHang = `${localStorage.getItem("currentUser")}`
      axios
        .get(`http://localhost:3000/customer/getAccounts/` + MaKhachHang)
        .then(res => {
          var listTT = res.data.filter(i => i.LoaiTaiKhoan == 1);
          console.log(listTT[0].SoTaiKhoan);
          //soTKKhachHang = listTT[0].SoTaiKhoan;
          //console.log(soTKKhachHang);
        })
        .catch(err => {
          console.log(err);
        });
      //nhan tien
      axios
        .post("http://localhost:3000/transfer-history/getHistory", {
          loaiGiaoDich: "NHAN_TIEN",
          soTaiKhoan: soTKKhachHang
        })
        .then(res => {
          console.log(res.data);
          var arr = [];
          arr = res.data.map(function(val) {
            return {
              id: val.ID,
              stkGui: val.SO_TAI_KHOAN_NGUOI_GUI,
              tenGui: val.TEN_TAI_KHOAN_NGUOI_GUI,
              stkNhan: val.SO_TAI_KHOAN_NGUOI_NHAN,
              tenNhan: val.TEN_TAI_KHOAN_NGUOI_NHAN,
              sotien: val.SOTIEN,
              ghichu: val.GHICHU
            };
          });
          console.log(JSON.stringify(arr));
          this.rowDataNhanTien = arr;
        })
        .catch(err => {
          console.log(err);
        });
      //chuyen khoan
      axios
        .post("http://localhost:3000/transfer-history/getHistory", {
          loaiGiaoDich: "NHAN_TIEN",
          soTaiKhoan: soTKKhachHang
        })
        .then(res => {
          console.log(res.data);
          var arr = [];
          arr = res.data.map(function(val) {
            return {
              id: val.ID,
              stkGui:
                '<div style="color:red;">' +
                val.SO_TAI_KHOAN_NGUOI_GUI +
                "</div>",
              tenGui:
                '<div style="color:red;">' +
                val.TEN_TAI_KHOAN_NGUOI_GUI +
                "</div>",
              stkNhan:
                '<div style="color:red;">' +
                val.SO_TAI_KHOAN_NGUOI_NHAN +
                "</div>",
              tenNhan:
                '<div style="color:red;">' +
                val.TEN_TAI_KHOAN_NGUOI_NHAN +
                "</div>",
              sotien: '<div style="color:red;">' + val.SOTIEN + "</div>",
              ghichu: '<div style="color:red;">' + val.GHICHU + "</div>"
            };
          });
          console.log(JSON.stringify(arr));
          this.rowDataNhanTien = this.rowDataNhanTien.concat(arr);
        })
        .catch(err => {
          console.log(err);
        });
      //thanh toan nhac no
      axios
        .post("http://localhost:3000/transfer-history/getHistory", {
          loaiGiaoDich: "NHAN_TIEN",
          soTaiKhoan: soTKKhachHang
        })
        .then(res => {
          console.log(res.data);
          var arr = [];
          arr = res.data.map(function(val) {
            return {
              id: val.ID,
              stkGui:
                '<div style="color:blue;">' +
                val.SO_TAI_KHOAN_NGUOI_GUI +
                "</div>",
              tenGui:
                '<div style="color:blue;">' +
                val.TEN_TAI_KHOAN_NGUOI_GUI +
                "</div>",
              stkNhan:
                '<div style="color:blue;">' +
                val.SO_TAI_KHOAN_NGUOI_NHAN +
                "</div>",
              tenNhan:
                '<div style="color:blue;">' +
                val.TEN_TAI_KHOAN_NGUOI_NHAN +
                "</div>",
              sotien: '<div style="color:blue;">' + val.SOTIEN + "</div>",
              ghichu: '<div style="color:blue;">' + val.GHICHU + "</div>"
            };
          });
          console.log(JSON.stringify(arr));
          this.rowDataNhanTien = this.rowDataNhanTien.concat(arr);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
html,
body {
  padding: 0;
  margin: 0;
}
.content {
  padding: 20px;
}
</style>
