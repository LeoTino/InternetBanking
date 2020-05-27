<template>
  <div class="card shadow mb-4">
    <h4 class="card-header">
      Danh sách nhắc nợ
      <b-button v-bind:href="urlCreateNguoiNo" variant="primary">Tạo nhắc nợ</b-button>
    </h4>
    <h4 class="card-header">Danh sách nhắc nợ do bản thân tạo</h4>
    <div class="row">
      <div class="col-sm-3 mb-3" v-for="item in lstDoBanThanTao" :key="item.id">
        <div class="card h-100">
          <div class="card-body">
            <h4 class="card-title text-danger">Người nợ: {{item.tenbidoi}}</h4>
            <h6 class="card-title">{{ format(item.sotien) }}</h6>
            <h6 class="card-title">Nội dung:{{item.noidung}}</h6>
            <b-button type="submit" block variant="primary" v-on:click="remove($event, item.id)">Xoá</b-button>
            <!-- <b-button
              type="submit"
              block
              variant="primary"
              v-on:click="payment($event, item.id)"
            >Thanh toán</b-button> -->
          </div>
        </div>
      </div>
    </div>

    <h4 class="card-header">Danh sách nhắc nợ do người khác gửi</h4>
    <div class="row">
      <div class="col-sm-3 mb-3" v-for="item in lstDoNguoiKhacGui" :key="item.id">
        <div class="card h-100">
          <div class="card-body">
            <h4 class="card-title text-danger">Người đòi: {{item.tendoi}}</h4>
            <h6 class="card-title">{{ format(item.sotien) }}</h6>
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
    </div>
    <div class="card-footer text-muted">Footer</div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      urlCreateNguoiNo: "http://localhost:8080/#/customer/createNguoiNo",
      lstDoBanThanTao: [],
      lstDoNguoiKhacGui: []
    };
  },
  mounted() {
    // console.log("user:"+this.getUsernameBySTK("028120204023615"));
    // console.log("lst:"+this.getAllLstNguoiNo("028120204023615"));
    this.processLst();
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
    processLst() {
      //get list
      axios
        .post("http://localhost:3000/debt/load-debt", {
          taiKhoanHienTai: `${localStorage.getItem("username")}`
        })
        .then(res => {
          console.log(res.data);
          var arr = [];
          arr = res.data.map(function(val) {
            return {
              id: val.ID,
              noidung: val.NOIDUNG,
              tendoi: val.TEN_NGUOI_DOI,
              stkdoi: val.SO_TAI_KHOAN_DOI,
              tenbidoi: val.TEN_NGUOI_BI_DOI,
              stkbidoi: val.SO_TAI_KHOAN_BI_DOI,
              status: val.TRANG_THAI,
              phanhoi: val.PhanHoi,
              sotien: val.SOTIEN
            };
          });
          //xu li thanh 2 lst
          var user = `${localStorage.getItem("username")}`;
          var arr1 = [];
          var arr2 = [];
          arr.forEach(function(item) {
            if (item.tendoi == user) {
              arr1.push(item);
            }
            if (item.tenbidoi == user) {
              arr2.push(item);
            }
          });
          this.lstDoNguoiKhacGui = arr2;
          this.lstDoBanThanTao = arr1;
          console.log(this.lstDoBanThanTao);
          console.log(this.lstDoNguoiKhacGui);
        })
        .catch(err => {
          console.log(err);
        });
      // var arr = this.$store.getters.nnoLstNguoiNo;
    }
  }
};
</script>

<style scoped>
</style>