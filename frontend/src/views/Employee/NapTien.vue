<template>
  <div>
    <h1>Nạp tiền vào tài khoản</h1>
    <b-form @submit="onSubmit">
      <b-form-group
        id="tenDangNhap"
        label="Tên đăng nhập hoặc số tài khoản"
        label-for="tenDangNhap"
      >
        <b-form-input
          id="tenDangNhap"
          required
          type="text"
          v-model="userOrSTK"
          placeholder="Tên đăng nhập hoặc số tài khoản"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="soTien" label="Số tiền" label-for="soTien">
        <b-form-input id="soTien" required type="number" v-model="soTien" placeholder="Số tiền"></b-form-input>
      </b-form-group>
      <br />
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userOrSTK: "",
      soTien: ""
    };
  },
  mounted() {},
  computed: {},
  methods: {
    onSubmit() {
      event.preventDefault();
      axios
        .post("http://localhost:3000/employment/refill", {
          inforUser: this.userOrSTK,
          soTien: this.soTien,
          maGiaoDichVien: `${localStorage.getItem("username")}`
        })
        .then(res => {
          console.log(res.data);
          if (res.data != null) {
            alert("Thêm thành công");
            return true;
          }
          alert("Không thêm được");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>