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
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>


<script>
export default {
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
      if (JSON.stringify(this.$store.getters.user) && JSON.stringify(this.$store.getters.pwd)) {
        this.$store.dispatch("callApiLogin");
      }
    }
  }
};
</script>