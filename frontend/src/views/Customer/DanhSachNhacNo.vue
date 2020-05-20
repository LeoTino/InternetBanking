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
            <b-button type="submit" block variant="primary" v-on:click="payment($event, item.id)">Thanh toán</b-button>
          </div>
        </div>
      </div>
    </div>

    <h4 class="card-header">Danh sách nhắc nợ do người khác gửi</h4>
    <div class="row">
      <div class="col-sm-3 mb-3" v-for="item in nnoLstNguoiNo" :key="item.value">
        <div class="card h-100">
          <div class="card-body">
            <h4 class="card-title text-danger">{{item.name}}</h4>
            <h6 class="card-title">{{item.noidung}}</h6>
            <b-button type="submit" block variant="primary" v-on:click="remove($event, item.id)">Xoá</b-button>
            <b-button type="submit" block variant="primary" v-on:click="payment($event, item.id)">Thanh toán</b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer text-muted">Footer</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urlCreateNguoiNo: "http://localhost:8080/#/customer/createNguoiNo"
    };
  },
  mounted() {
    this.$store.dispatch("getLstNguoiNo");
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
      location.href = `http://localhost:8080/#/customer/debtmanagement/delete/` + id;
    },
    payment(event, id){
      event.preventDefault();
      this.$store.dispatch("callApiGetOTP");
      location.href = `http://localhost:8080/#/customer/debtmanagement/thanhtoan/` + id;
    },
    format(val) {
      return val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ` VND`;
    },
  }
};
</script>

<style scoped>
</style>