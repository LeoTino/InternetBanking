<template>
  <div>
    <h1>Thanh toán nhắc nợ</h1>
    <b-form @submit="onSubmitXoaNhacNo">
      <b-form-group id="otp" label="Nhập mã OTP để thanh toán" label-for="otp">
        <b-form-input id="otp" v-model="otp" placeholder="OTP Code"></b-form-input>
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
      otp: ""
    };
  },
  mounted() {},
  computed: {},
  methods: {
    onSubmitXoaNhacNo() {
      event.preventDefault();
      var id = this.$route.params.id;
      axios
        .post("http://localhost:3000/otp/compare", {
          tenDangNhap: `${localStorage.getItem("username")}`,
          otpcode: this.otp
        })
        .then(res => {
          console.log(res);
          let boo = res.data.result;
          // thanh toan
          if (boo) {
            axios
              .post("http://localhost:3000/debt/payment-debt", {
                idNhacNo: id
              })
              .then(res => {
                alert("Thanh toán thành công");
                console.log(res.data);
                //send thong bao
                var userDoi = `${localStorage.getItem("ttnnoUserDoi")}`;
                var messageNotify = userDoi + " đã thanh toán nhắc nợ!";
                //send start
                axios
                  .post("http://localhost:3000/notify/add-notify", {
                    userNhan: userDoi,
                    noiDung: messageNotify
                  })
                  .then(res => {
                    console.log("noti: " + res);
                  })
                  .catch(err => {
                    console.log(err);
                  });
                //send end
                localStorage.removeItem("ttnnoUserDoi");
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            alert("OTP invalid");
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