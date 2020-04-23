<template>
  <div>
    <h1>Dashboard</h1>
    <b-button v-bind:href="urlDanhSachTaiKhoan" variant="primary">Danh sách tài khoản</b-button>
    <b-button v-bind:href="urlChuyenTienNoiBo" variant="primary">Chuyển tiền nội bộ</b-button>
  </div>
</template>
<script>
export default {
  name: "customerDashboard",
  data() {
    return {
      urlDanhSachTaiKhoan:
        "http://localhost:8080/#/customer/getAccounts/" +
        `${localStorage.getItem("currentUser")}`,
      urlChuyenTienNoiBo: "http://localhost:8080/#/transfer/internal"
    };
  },
  methods: {
    format(val) {
      return `${val} đ`;
    }
  }
};
</script>