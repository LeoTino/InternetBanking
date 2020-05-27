import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
// import VueToast from 'vue-toast-notification';
// import 'vue-toast-notification/dist/theme-default.css';
// import axios from 'axios'

// Vue.config.productionTip = false

// Vue.use(VueToast);

// var intervalID = window.setInterval(myCallback, 10000);
// function myCallback() {
//   // load notify
//   axios
//     .post("http://localhost:3000/notify/load-notify", {
//       taiKhoanHienTai: `${localStorage.getItem("username")}`
//     })
//     .then(res => {
//       var arr = res.data.map(function (val, ) {
//         return {
//           "id": val.Id,
//           "noidung": val.NOI_DUNG,
//           "trangthai": val.TRANG_THAI,
//         }
//       });
//       //hien thi notify
//       arr.forEach(function (item) {
//         Vue.$toast.open({
//           message: item.noidung,
//           type: 'info',
//           duration: 6000,
//           onClick: (e) => {
//             e.preventDefault();
//             //seen notify
//             axios
//               .post("http://localhost:3000/notify/accept-notify", {
//                 Id: item.id
//               })
//               .then(res => {
//                 console.log(res);
//               })
//               .catch(err => {
//                 console.log(err);
//               });
//           }
//         });
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }
// console.log(intervalID);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')