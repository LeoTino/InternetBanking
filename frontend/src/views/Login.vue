<template>
  <div class="login">
    <h1>Login</h1>
    <b-form @submit="onSubmit">
      <span v-if="auth" class="badge badge-danger"><h5>Username hoặc password không tồn tại</h5></span>
      <b-form-group id="user" label="Username" label-for="user">
        <b-form-input
          id="user"
          v-model="form.user"
          required
          placeholder="Username"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="pwd" label="Password" label-for="pwd">
        <b-form-input
          id="pwd"
          v-model="form.pwd"
          required
          placeholder="Password"
          type="password"
        ></b-form-input>
      </b-form-group>
      <br/>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        user: '',
        pwd: ''
      },
      auth: false
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      if(JSON.stringify(this.form)){
        axios
          .post('http://localhost:3000/users/login',{
            user: this.form.user,
            pwd: this.form.pwd
          })
          .then(res => {
            this.auth = !res.data.auth;
            if(res.data.auth == true){
              this.$router.push(`/customer/getAccounts/${res.data.user.MaKhachHang}`);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
}
</script>