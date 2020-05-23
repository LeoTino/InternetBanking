<template>
  <div class="card shadow mb-4">
    <h4 class="card-header">Danh sách tài khoản</h4>

    <div v-if="empty" class="card-body">
      <p class="card-text">Không có dữ liệu.</p>
    </div>

    <div v-else class="card-body">
      <h6>Tài khoản thanh toán</h6>
      <div class="row">
        <div class="col-sm-4 mb-3" v-for="item in listTT" :key="item.MaTaiKhoan">
          <div class="card h-100">
            <div class="card-body">
              <h6 class="card-title">{{item.SoTaiKhoan}}</h6>
              <h5 class="card-title text-danger">{{format(item.SoTien)}}</h5>
              <b-button
                type="submit"
                block
                variant="danger"
                v-on:click="remove($event, item.SoTaiKhoan)"
              >Đóng tài khoản</b-button>
            </div>
          </div>
        </div>
      </div>
      <h6>Tài khoản tiết kiệm</h6>
      <div class="row">
        <div class="col-sm-4 mb-3" v-for="item in listTK" :key="item.MaTaiKhoan">
          <div class="card h-100">
            <div class="card-body">
              <h6 class="card-title">{{item.SoTaiKhoan}}</h6>
              <h5 class="card-title text-danger">{{format(item.SoTien)}}</h5>
              <b-button
                type="submit"
                block
                variant="danger"
                v-on:click="remove($event, item.SoTaiKhoan)"
              >Đóng tài khoản</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card-footer text-muted">Footer</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "getAccountsList",
  data() {
    return {
      listTT: [],
      listTK: [],
      empty: true
    };
  },

  mounted() {
    this.fetchData(this.$route.params.MaKhachHang);
  },

  watch: {
    $route(to) {
      this.fetchData(to.params.MaKhachHang);
    }
  },

  methods: {
    format(val) {
      return val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ` VND`;
    },
    fetchData(MaKhachHang) {
      axios
        .get(`http://localhost:3000/customer/getAccounts/${MaKhachHang}`)
        .then(res => {
          this.listTT = res.data.filter(i => i.LoaiTaiKhoan == 1);
          this.listTK = res.data.filter(i => i.LoaiTaiKhoan == 2);
          this.empty = res.data.length === 0;
          console.log(axios.defaults.headers.common);
        })
        .catch(err => {
          this.listTT = [];
          this.listTK = [];
          this.empty = true;
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>