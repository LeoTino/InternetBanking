<template>
  <div class="login">
    <h1>Chuyển khoản nội bộ</h1>
    <b-form @submit="onSubmit">
      <!-- <span v-if="auth" class="badge badge-danger"><h5>Username hoặc password không tồn tại</h5></span> -->
      <h4>Chọn tài khoản nguồn: {{srcAccount}}</h4>
      <b-form-group>
        <Select2 v-model="srcAccount" :options="lstSrc" />
      </b-form-group>

      <h4>Thông tin người nhận: {{receiveAccount}}</h4>
      <b-form-group>
          <h6>Chọn người nhận</h6>
          <Select2 v-model="receiveAccount" :options="lstReceive" />
          <h6>hoặc điền STK người nhận</h6>
          <b-form-input 
          v-model="receiveAccount" 
          placeholder="Điền số tài khoản người nhận"></b-form-input>
      </b-form-group>

      <h4>Số tiền chuyển: {{format(soTienChuyen)}}</h4>
      <b-form-input 
        v-model="soTienChuyen" 
        placeholder="Điền số tiền chuyển"
        type="number"></b-form-input>
    
      <h4>Nội dung chuyển tiền: {{messageTransfer}}</h4>
      <b-form-input 
        v-model="messageTransfer" 
        placeholder="Điền nội dung chuyển tiền"></b-form-input>
      <br>
      <input type="radio" id="Người gửi trả phí" value="0" v-model="nguoitraphi">
      <label for="Người gửi trả phí">Người gửi trả phí</label><br>
      <input type="radio" id="Người nhận trả phí" value="1" v-model="nguoitraphi">
      <label for="Người nhận trả phí">Người nhận trả phí</label><br>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>


<script>
import axios from 'axios';
import Select2 from 'v-select2-component';
export default {
  components: {Select2},
  data() {
    return {
        srcAccount: '',
        lstSrc: [
        { id: '02810002324343', text: 'Tran Van A - 02810002324343', value: '02810002324343' },
        { id: '02810002324343', text: 'Tran Van A1 - 02810002324343', value: '02810002324343' },
        { id: '02810002324343', text: 'Tran Van A2 - 02810002324343', value: '02810002324343' }
        ],
        receiveAccount: '',
        lstReceive: [
        { id: '-1', text: 'None', value: '-1' },
        { id: '0281434', text: 'Tran Van B - 0281434', value: '0281434' },
        { id: '0281434', text: 'Tran Van B1 - 0281434', value: '0281434' },
        { id: '0281434', text: 'Tran Van B2 - 0281434', value: '0281434' }
        ],
        soTienChuyen: '',
        messageTransfer: '',
        nguoitraphi: '',
        form: {
            user: '',
            pwd: ''
        },
        auth: false,
        customerUrl: "/customer/getAccounts/"
    }
  },
  methods: {
    format(val) {
      return val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ` VND`;
    },
    onSubmit(evt) {
      evt.preventDefault()
      alert('ahihi');
      if(JSON.stringify(this.form)){
        axios
          .post('http://localhost:3000/users/login',{
            user: this.form.user,
            pwd: this.form.pwd
          })
          .then(res => {
            this.auth = !res.data.auth;
            if(res.data.auth == true){
              console.log(res);
              localStorage.setItem('currentUser', res.data.user.MaKhachHang);
              localStorage.setItem('username', res.data.user.Ten);
              localStorage.setItem('token', res.data.access_token);
              console.log(localStorage);
              this.$router.push(this.customerUrl + `${localStorage.getItem("currentUser")}`);
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