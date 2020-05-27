<template>
  <div>
    <h1>Xoá nhắc nợ</h1>
    <b-form @submit="onSubmitXoaNhacNo">
      <b-form-group id="nnoNoiDungXoa" label="Nội dung xoá" label-for="nnoNoiDungXoa">
        <b-form-input id="nnoNoiDungXoa" v-model="noidung" placeholder="Nội dung xoá"></b-form-input>
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
      noidung: ""
    };
  },
  mounted() {},
  computed: {},
  methods: {
    onSubmitXoaNhacNo() {
      event.preventDefault();
      var id = this.$route.params.id;
      axios
        .post("http://localhost:3000/debt/delete-debt", {
          idNhacNo: id,
          noiDungXoa: this.noidung
        })
        .then(res => {
          console.log(res.data);
          if (res.data == "success") {
            alert("Xoá thành công");
            var userDoi = `${localStorage.getItem("nnoUserDoi")}`;
            var userBiDoi = `${localStorage.getItem("nnoUserBiDoi")}`;
            var user = `${localStorage.getItem("username")}`;
            //sendNotify
            debugger;
            if (userDoi == user) {
              var messageNotify =
                userDoi + " đã xóa nhắc nợ với nội dung: " + this.noidung;
              //send start
              axios
                .post("http://localhost:3000/notify/add-notify", {
                  userNhan: userBiDoi,
                  noiDung: messageNotify
                })
                .then(res => {
                  console.log("noti: " + res);
                })
                .catch(err => {
                  console.log(err);
                });
              //send end
              localStorage.removeItem("nnoUserDoi");
              localStorage.removeItem("nnoUserBiDoi");
            }
            if (userBiDoi == user) {
              var messageNotify2 =
                userBiDoi + " đã xóa nhắc nợ với nội dung: " + this.noidung;
              //send start
              axios
                .post("http://localhost:3000/notify/add-notify", {
                  userNhan: userDoi,
                  noiDung: messageNotify2
                })
                .then(res => {
                  console.log("noti: " + res);
                })
                .catch(err => {
                  console.log(err);
                });
              //send end
              localStorage.removeItem("nnoUserDoi");
              localStorage.removeItem("nnoUserBiDoi");
            }
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