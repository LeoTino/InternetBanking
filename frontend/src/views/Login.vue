<script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit" async defer>
</script>
<template>
  <div class="login">
    <h1>Login</h1>
    <b-form @submit="onSubmit">
      <span v-if="msgLoginFailed" class="badge badge-danger">
        <h5>Username hoặc password không tồn tại</h5>
      </span>
      <b-form-group id="user" label="Username" label-for="user">
        <b-form-input id="user" v-model="user" required placeholder="Username"></b-form-input>
      </b-form-group>

      <b-form-group id="pwd" label="Password" label-for="pwd">
        <b-form-input id="pwd" v-model="pwd" required placeholder="Password" type="password"></b-form-input>
      </b-form-group>
      <br />
      <vue-recaptcha
        @verify="onVerify"
        @expired="onExpired"
        :sitekey="sitekey"
        :loadRecaptchaScript="true"
      ></vue-recaptcha>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
export default {
  data() {
    return {
      sitekey: "6LchEV0UAAAAAJddn-pwBabt3YfYRlS428y_M3yS",
      resCaptcha: ""
    };
  },
  components: { VueRecaptcha },
  computed: {
    user: {
      get() {
        return this.$store.getters.user;
      },
      set(user) {
        this.$store.dispatch("user", user);
      }
    },
    pwd: {
      get() {
        return this.$store.getters.pwd;
      },
      set(pwd) {
        this.$store.dispatch("pwd", pwd);
      }
    },
    msgLoginFailed: {
      get() {
        return this.$store.getters.msgLoginFailed;
      },
      set(msgLoginFailed) {
        this.$store.dispatch("msgLoginFailed", msgLoginFailed);
      }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      // let param = JSON.stringify({
      //   secret: "6LchEV0UAAAAAJnodGqHGn3TCkli4dY8lWRjyCWJ",
      //   response: this.resCaptcha
      // });
      let param = "";
      // let param = new FormData();
      // param.append("secret", "6LchEV0UAAAAAJnodGqHGn3TCkli4dY8lWRjyCWJ");
      // param.append("response", this.resCaptcha);
      let url =
        "https://cors-anywhere.herokuapp.com/https://www.google.com/recaptcha/api/siteverify" +
        "?secret=6LchEV0UAAAAAJnodGqHGn3TCkli4dY8lWRjyCWJ&response=" +
        this.resCaptcha;
      axios
        .post(url, null, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
          }
        })
        .then(res => {
          if (res.data.success) {
            if (
              JSON.stringify(this.$store.getters.user) &&
              JSON.stringify(this.$store.getters.pwd)
            ) {
              this.$store.dispatch("callApiLogin");
            }
          } else {
            alert("Captcha Err! Pls try again!");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onVerify: function(response) {
      this.resCaptcha = response;
      console.log("Verify: " + response);
    },
    onExpired: function() {
      console.log("Expired");
    }
  }
};
</script>