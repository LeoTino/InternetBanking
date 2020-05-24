<template>
  <div>
    <NavBar />
    <b-container class="mt-4">
      <b-row>
        <!-- <b-col sm="3">
          <Categories />
        </b-col>-->
        <b-col sm="12">
          <router-view></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";
// axios.interceptors.response.use(undefined, function(err) {
//   console.log(err);
//   alert("err");
//   //return new Promise(function(resolve, reject) {
//   if (err.status == 401 || err.status == 403) {
//     // nếu là lỗi chưa đăng nhập unauthorized, gọi lên logout
//     alert("loi ko co token");
//     // this.$store.dispatch("callApiRefreshToken");
//     axios
//       .post("http://localhost:3000/users/renew-token", {
//         refreshToken: localStorage.getItem("refresh-token")
//       })
//       .then(res => {
//         console.log(res);
//         localStorage.setItem("token", res.data.access_token);
//         localStorage.setItem("access-token", res.data.access_token);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     // có thể đưa user về trang đăng nhập ở đây!
//     //console.log(resolve, reject);
//   }
// });

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    console.log(error);
    if (401 === error.response.status) {
      axios
        .post("http://localhost:3000/users/renew-token", {
          refreshToken: localStorage.getItem("refresh-token")
        })
        .then(res => {
          console.log("renew token :" + res);
          localStorage.setItem("token", res.data.access_token);
          localStorage.setItem("access-token", res.data.access_token);
        })
        .catch(err => {
          console.log(err);
        });
      alert("Lỗi token! Vui lòng thử lại!");
      window.location.reload(true);
    } else {
      return Promise.reject(error);
    }
  }
);

export default {
  components: {
    NavBar
  }
};
</script>

<style scoped>
</style>