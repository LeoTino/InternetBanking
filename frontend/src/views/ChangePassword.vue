<template>
  <div>
    <h1>Change password</h1>
    <b-form @submit="onSubmit">
      <b-form-group id="newPassword" label="Mật khẩu mới" label-for="newPassword">
        <b-form-input id="newPassword" required type="password" v-model="newPassword" placeholder="Mật khẩu mới"></b-form-input>
      </b-form-group>
      <b-form-group id="retypeNewPassword" label="Nhập lại mật khẩu mới" label-for="retypeNewPassword">
        <b-form-input id="retypeNewPassword" required type="password" v-model="retypeNewPassword" placeholder="Nhập lại mật khẩu mới"></b-form-input>
      </b-form-group>
      <br />
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      newPassword: "",
      retypeNewPassword: ""
    };
  },
  mounted() {},
  computed: {},
  methods: {
    onSubmit() {
      event.preventDefault();
      var id = this.$route.params.id;
      axios
        .post("http://localhost:3000/debt/delete-debt", {
          idNhacNo: id,
          noiDungXoa: this.noidung
        })
        .then(res => {
          console.log(res.data);
          if (res.data != null) {
            alert("Xoá thành công");
            return true;
          }
          alert("Không xoá được");
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