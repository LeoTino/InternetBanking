<template>
  <div class="card shadow mb-4">
    <h4 class="card-header">
      Danh sách nhắc nợ
      <b-button v-bind:href="urlCreateNguoiNo" variant="primary">Tạo nhắc nợ</b-button>
    </h4>
    <h4 class="card-header">Danh sách nhắc nợ do bản thân tạo</h4>
    <div class="row">
      <div class="col-sm-3 mb-3" v-for="item in nnoLstNguoiNo" :key="item.value">
        <div class="card h-100">
          <div class="card-body">
            <h4 class="card-title text-danger">Tên: {{item.name}}</h4>
            <h6 class="card-title">{{ format(item.soTien) }}</h6>
            <h6 class="card-title">Nội dung:{{item.noidung}}</h6>
            <b-button type="submit" block variant="primary" v-on:click="remove($event, item.id)">Xoá</b-button>
            <b-button
              type="submit"
              block
              variant="primary"
              v-on:click="payment($event, item.id)"
            >Thanh toán</b-button>
          </div>
        </div>
      </div>
    </div>

    <h4 class="card-header">Danh sách nhắc nợ do người khác gửi</h4>
    <div class="row">
      <div class="col-sm-3 mb-3" v-for="item in lstTemp" :key="item.value">
        <div class="card h-100">
          <div class="card-body">
            <h4 class="card-title text-danger">{{item.name}}</h4>
            <h6 class="card-title">{{item.noidung}}</h6>
            <b-button type="submit" block variant="primary" v-on:click="remove($event, item.id)">Xoá</b-button>
            <b-button
              type="submit"
              block
              variant="primary"
              v-on:click="payment($event, item.id)"
            >Thanh toán</b-button>
          </div>
        </div>
      </div>
      {{temp}}
    </div>
    <div class="card-footer text-muted">Footer</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      urlCreateNguoiNo: "http://localhost:8080/#/customer/createNguoiNo",
      lstTemp: [],
      temp: ""
    };
  },
  mounted() {
    // console.log("user:"+this.getUsernameBySTK("028120204023615"));
    // console.log("lst:"+this.getAllLstNguoiNo("028120204023615"));
    this.$store.dispatch("getLstNguoiNoDoBanThanTao");
    this.getLstNguoiNoDoBanThanTao();
  },
  computed: {
    nnoLstNguoiNo: {
      get() {
        return this.$store.getters.nnoLstNguoiNo;
      },
      set(nnoLstNguoiNo) {
        this.$store.dispatch("nnoLstNguoiNo", nnoLstNguoiNo);
      }
    },
    nnoNoiDungXoa: {
      get() {
        return this.$store.getters.nnoNoiDungXoa;
      },
      set(nnoNoiDungXoa) {
        this.$store.dispatch("nnoNoiDungXoa", nnoNoiDungXoa);
      }
    }
  },
  methods: {
    remove(event, id) {
      event.preventDefault();
      location.href =
        `http://localhost:8080/#/customer/debtmanagement/delete/` + id;
    },
    payment(event, id) {
      event.preventDefault();
      this.$store.dispatch("callApiGetOTP");
      location.href =
        `http://localhost:8080/#/customer/debtmanagement/thanhtoan/` + id;
    },
    format(val) {
      return val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ` VND`;
    },
    getUsernameBySTK(stk) {
      axios
        .post("http://localhost:3000/transfer/load-info-receive-from-stk", {
          soTaiKhoan: stk
        })
        .then(res => {
          console.log("api:" + res.data[0].TenDangNhap);
          this.temp = res.data[0].TenDangNhap;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAllLstNguoiNo(username) {
      var arr = [];
      axios
        .post("http://localhost:3000/debt/load-debt", {
          taiKhoanHienTai: username
        })
        .then(res => {
          arr = res.data.map(function(val) {
            return {
              id: val.ID,
              text: val.SO_TAI_KHOAN_DOI,
              value: val.SO_TAI_KHOAN_DOI,
              noidung: val.NOIDUNG,
              name: val.SO_TAI_KHOAN_DOI,
              soTien: val.SOTIEN,
              phanhoi: val.PhanHoi,
              stkbidoi: val.SO_TAI_KHOAN_BI_DOI,
              stkdoi: val.SO_TAI_KHOAN_DOI,
              tenbidoi: val.TEN_NGUOI_BI_DOI,
              tendoi: val.TEN_NGUOI_DOI,
              status: val.TRANG_THAI
            };
          });
          console.log("arr func: " + arr);
          // this.lstTemp = arr;
          var iTemp = 0;
          arr.forEach(item => {
            axios
              .post(
                "http://localhost:3000/transfer/load-info-receive-from-stk",
                {
                  soTaiKhoan: item.stkdoi
                }
              )
              .then(function(res1) {
                console.log("api:" + res1.data[0].TenDangNhap);
                if (
                  localStorage.getItem("username") == res1.data[0].TenDangNhap
                ) {
                  alert("das");
                }
              })
              .catch(err => {
                console.log(err);
              });
          });
          console.log(iTemp);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getLstNguoiNoDoBanThanTao() {
      this.getAllLstNguoiNo();
    }
  }
};
</script>

<style scoped>
</style>