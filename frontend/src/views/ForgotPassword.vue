<template>
  <form-wizard @on-complete="onComplete" shape="tab" color="#9b59b6">
    <div slot="title">Quên mật khẩu</div>
    <tab-content title="Step 1" :before-change="onSubmitTenTaiKhoan">
      <b-form-group id="username" label="Nhập tên tài khoản" label-for="username">
        <b-form-input
          id="username"
          required
          type="text"
          v-model="username"
          placeholder="Nhập tên tài khoản"
        ></b-form-input>
      </b-form-group>
    </tab-content>
    <tab-content title="Step 2" :before-change="onSubmitOTP">
      <b-form-group id="otp" label="Nhập mã OTP" label-for="otp">
        <b-form-input id="otp" required type="number" v-model="otpCode" placeholder="Nhập mã OTP"></b-form-input>
      </b-form-group>
    </tab-content>
    <tab-content title="Step 3" :before-change="onSubmitPassword">
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
    </tab-content>
  </form-wizard>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      otpCode: "",
      newPassword: "",
      retypeNewPassword: "",
      currentPassword: ""
    };
  },
  components: {
    FormWizard,
    TabContent
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    format(val) {
      return val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ` VND`;
    },
    onComplete: function() {
      //alert("Changed!");
    },
    onSubmitTenTaiKhoan: function() {
      axios
        .post("http://localhost:3000/otp/send", {
          tenDangNhap: this.username
        })
        .then(res => {
          console.log(res);
          return true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmitOTP: function() {
      axios
        .post("http://localhost:3000/otp/compare", {
          tenDangNhap: this.username,
          otpcode: this.otpCode
        })
        .then(res => {
          console.log(res.data.result);
          if (res.data.result == true) {
            return true;
          }
        })
        .catch(err => {
          console.log(err);
        });
      alert("OTP invalid!");
      return false;
    },
    onSubmitPassword: function() {
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
        return false;
      }
    }
  }
};
</script>