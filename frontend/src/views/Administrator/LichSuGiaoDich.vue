<template>
  <div id="app">
    <b-form @submit="onSubmit">
      <label for="bank">Chọn ngân hàng</label>
      <b-form-select id="bank" v-model="selected" :options="options"></b-form-select>

      <label for="fromDate">Ngày bắt đầu</label>
      <b-form-datepicker id="fromDate" v-model="fromDate" class="mb-2"></b-form-datepicker>

      <label for="toDate">Ngày kết thúc</label>
      <b-form-datepicker id="toDate" v-model="toDate" class="mb-2"></b-form-datepicker>

      <b-button type="submit" variant="primary">Lọc kết quả</b-button>
    </b-form>

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <div class="content">
      <datatable title="Lịch sử giao dịch" :columns="columnLichSu" :rows="rowDataLichSu" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DataTable from "vue-materialize-datatable";
export default {
  data() {
    return {
      stkKhachHang: "",
      rowDataLichSu: [{}],
      options: [],
      selected: "",
      fromDate: "",
      toDate: "",
      columnLichSu: [
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
    // this.fetchData("","","");
    this.genLstNganHang();
  },

  watch: {},

  methods: {
    format(val) {
      return val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ` VND`;
    },
    fetchData(manganhang, from, to) {
      axios
        .post("http://localhost:3000/admin/get-history", {
          maNganHang: manganhang,
          tuNgay: from,
          denNgay: to
        })
        .then(res => {
          console.log(res.data);
          var arr = [{}];
          debugger;
          if (res.data.length > 0) {
            debugger;
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
          }
          console.log(JSON.stringify(arr));
          this.rowDataLichSu = arr;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      event.preventDefault();
      this.rowDataLichSu = [{}];
      this.fetchData(this.selected, this.fromDate, this.toDate);
    },
    genLstNganHang() {
      axios
        .get("http://localhost:3000/api/ib-hn/get-list-info-bank")
        .then(res => {
          var arr = [];
          arr = res.data.map(function(val) {
            return {
              id: val.MA_NGAN_HANG,
              text: val.MA_NGAN_HANG + " - " + val.TEN_NGAN_HANG,
              value: val.MA_NGAN_HANG
            };
          });
          this.options = arr;
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
.tab {
  margin-left: 5em;
  margin-right: 5em;
}
</style>
