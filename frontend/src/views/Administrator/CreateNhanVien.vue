<template>
  <div>
    <h1>Thêm nhân viên</h1>
    <b-form @submit="onSubmit">
      <b-form-group id="Tên" label="Tên nhân viên" label-for="Tên">
        <b-form-input id="Tên" v-model="ten" required placeholder="Tên nhân viên"></b-form-input>
      </b-form-group>
      <b-form-group id="diachi" label="Địa chỉ" label-for="diachi">
        <b-form-input id="diachi" v-model="diachi" placeholder="Địa chỉ"></b-form-input>
      </b-form-group>
      <b-form-group id="tendangnhap" label="Tên đăng nhập" label-for="tendangnhap">
        <b-form-input id="tendangnhap" v-model="username" required placeholder="Tên đăng nhập"></b-form-input>
      </b-form-group>
      <b-form-group id="Password" label="Password" label-for="Password">
        <b-form-input
          id="Password"
          v-model="password"
          type="password"
          required
          placeholder="Password"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="phone" label="Số điện thoại" label-for="phone">
        <b-form-input id="phone" v-model="phone" placeholder="Số điện thoại"></b-form-input>
      </b-form-group>
      <b-form-group id="email" label="Email" label-for="email">
        <b-form-input id="email" v-model="email" type="email" placeholder="Email"></b-form-input>
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
      ten: "",
      diachi: "",
      username: "",
      password: "",
      phone: "",
      email: ""
    };
  },
  methods: {
    onSubmit() {
      event.preventDefault();
      axios
        .post("http://localhost:3000/admin/manage-empl", {
          ten: this.ten,
          diaChi: this.diachi,
          role: "nhanvien",
          tenDangNhap: this.username,
          matKhau: this.password,
          phone: this.phone,
          email: this.email,
          method: 1
        })
        .then(res => {
          console.log(res);
          if (res.data.status == "success") {
            alert("Thêm thành công");
          } else {
            alert("Không thêm được");
          }
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