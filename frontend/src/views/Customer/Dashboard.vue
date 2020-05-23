<template>
  <div>
    <h1>Dashboard</h1>
    <b-button v-bind:href="urlDanhSachTaiKhoan" variant="primary">Danh sách tài khoản</b-button><br><br>
    <b-button v-bind:href="urlChuyenTienNoiBo" variant="primary">Chuyển tiền nội bộ</b-button><br><br>
    <b-button v-bind:href="urlChuyenTienLienNganHang" variant="primary">Chuyển tiền liên ngân hàng</b-button><br><br>
    <b-button v-bind:href="urlDanhSachNguoiNhan" variant="primary">Danh sách người nhận</b-button><br><br>
    <b-button v-bind:href="urlDanhSachNhacNo" variant="primary">Danh sách nhắc nợ</b-button><br><br>
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
      urlChuyenTienNoiBo: "http://localhost:8080/#/transfer/internal",
      urlChuyenTienLienNganHang: "http://localhost:8080/#/transfer/other-bank",
      urlDanhSachNguoiNhan: "http://localhost:8080/#/customer/receivemanagement",
      urlDanhSachNhacNo: "http://localhost:8080/#/customer/debtmanagement"
    };
  },
  methods: {
    format(val) {
      return `${val} đ`;
    }
  }
};
</script>