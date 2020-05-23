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
    <tab-content title="Step 2">
      <b-form-group id="otp" label="Nhập mã OTP" label-for="otp">
        <b-form-input id="otp" required type="number" v-model="otpCode" placeholder="Nhập mã OTP"></b-form-input>
      </b-form-group>
    </tab-content>
    <tab-content title="Step 3">
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
export default {
  data() {
    return {
      username: "",
      otpCode: "",
      newPassword: "",
      retypeNewPassword: ""
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
      //alert("Chuyển tiền thành công!");
    },
    beforeTabSwitch: function() {
      //alert("This is called before switching tabs");
      return true;
    },
    getOTP: function() {
      if (
        this.$store.getters.srcAccount == "" ||
        this.$store.getters.receiveAccount == "" ||
        this.$store.getters.soTienChuyen == ""
      ) {
        alert("Vui lòng nhập đầy đủ thông tin chuyển tiền!");
        return false;
      }
      if (
        this.$store.getters.lstSrc.find(
          i => i.id == this.$store.getters.srcAccount
        ).money < this.$store.getters.soTienChuyen
      ) {
        alert("Số dư không đủ để chuyển!");
        return false;
      }
      this.$store.dispatch("callApiGetOTP");
      if (this.$store.getters.isSendOTP == false) {
        alert("Cannot send OTP! Please contact administrator");
        return false;
      }
      alert("OTP has sent! Please check your email!");
      return true;
    },
    compareOTP: function() {
      event.preventDefault();
      this.$store.dispatch("compareOTP");
      return true;
    }
  }
};
</script>