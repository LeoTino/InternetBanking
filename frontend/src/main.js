import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(VueToast);

var intervalID = window.setInterval(myCallback, 10000);
var arr = [];
function myCallback() {
  // load notify
  axios
    .post("http://localhost:3000/notify/load-notify", {
      taiKhoanHienTai: `${localStorage.getItem("username")}`
    })
    .then(res => {
      arr = res.data.map(function (val, ) {
        return {
          "id": val.Id,
          "noidung": val.NOI_DUNG,
          "trangthai": val.TRANG_THAI,
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
  //hien thi notify
  arr.forEach(function(item){
    Vue.$toast.open({
      message: item.noidung,
      type: 'info',
      duration: 7000
      // all other options may go here
    });
  });
}
console.log(intervalID);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')