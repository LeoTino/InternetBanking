<template>
  <div>
    <h1>Change password</h1>
    <b-form @submit="onSubmit">
      <b-form-group id="currentPassword" label="Mật khẩu hiện tại" label-for="currentPassword">
        <b-form-input
          id="currentPassword"
          required
          type="password"
          v-model="currentPassword"
          placeholder="Mật khẩu hiện tại"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="newPassword" label="Mật khẩu mới" label-for="newPassword">
        <b-form-input
          id="newPassword"
          required
          type="password"
          v-model="newPassword"
          placeholder="Mật khẩu mới"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="retypeNewPassword"
        label="Nhập lại mật khẩu mới"
        label-for="retypeNewPassword"
      >
        <b-form-input
          id="retypeNewPassword"
          required
          type="password"
          v-model="retypeNewPassword"
          placeholder="Nhập lại mật khẩu mới"
        ></b-form-input>
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
      currentPassword: "",
      newPassword: "",
      retypeNewPassword: ""
    };
  },
  mounted() {},
  computed: {},
  methods: {
    onSubmit() {
      event.preventDefault();
      if (this.newPassword == this.retypeNewPassword) {
        axios
          .post("http://localhost:3000/users/change-pwd", {
            user: `${localStorage.getItem("username")}`,
            currentPwd: this.currentPassword,
            newPwd: this.newPassword
          })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert("Password mới không trùng khớp");
      }
    }
  }
};
</script>

<style scoped>
</style>