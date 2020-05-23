<template>
  <div>
    <h1>Dashboard</h1>
    <b-button v-bind:href="urlCreateAccount" variant="primary">Tạo tài khoản</b-button><br><br>
    <b-button v-bind:href="urlNapTien" variant="primary">Nạp tiền vào tài khoản</b-button><br><br>
    <!-- <b-button v-bind:href="urlChuyenTienLienNganHang" variant="primary">Chuyển tiền liên ngân hàng</b-button><br><br>
    <b-button v-bind:href="urlDanhSachNguoiNhan" variant="primary">Danh sách người nhận</b-button><br><br>
    <b-button v-bind:href="urlDanhSachNhacNo" variant="primary">Danh sách nhắc nợ</b-button><br><br>
    <b-button v-bind:href="urlHistory" variant="primary">Lịch sử giao dịch</b-button><br><br> -->
  </div>
</template>
<script>
export default {
  name: "customerDashboard",
  data() {
    return {
      urlCreateAccount: "http://localhost:8080/#/employee/createAccount",
      urlNapTien: "http://localhost:8080/#/employee/naptien"
      // urlDanhSachTaiKhoan:
      //   "http://localhost:8080/#/customer/getAccounts/" +
      //   `${localStorage.getItem("currentUser")}`,
      // urlChuyenTienNoiBo: "http://localhost:8080/#/transfer/internal",
      // urlChuyenTienLienNganHang: "http://localhost:8080/#/transfer/other-bank",
      // urlDanhSachNguoiNhan: "http://localhost:8080/#/customer/receivemanagement",
      // urlDanhSachNhacNo: "http://localhost:8080/#/customer/debtmanagement",
      // urlHistory: "http://localhost:8080/#/customer/history"
    };
  },
  methods: {
    format(val) {
      return `${val} đ`;
    }
  }
};
</script>