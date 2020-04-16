<template>
  <div class="createAccount">
    <h1>Create account</h1>
    <br>
    <b-form @submit="onSubmit">
      <div class="form-group">
        <b-row class="my-1">
          <b-col sm="3">
            <label for="ten">Họ và tên:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="ten" required id="ten" type="text"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="diaChi">Địa chỉ:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="diaChi" required id="diaChi" type="text"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="tenDangNhap">Tên đăng nhập:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="tenDangNhap" required id="tenDangNhap" type="text"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="matKhau">Mật khẩu:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="matKhau" required id="matKhau" type="password"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="email">Email:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="email" required id="email" type="email"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="phone">Phone:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="phone" required id="phone" type="tel"></b-form-input>
          </b-col>
        </b-row>
        <b-button type="submit" block variant="primary">Submit</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  computed: {
    ten: {
      get() {
        return this.$store.getters.ten;
      },
      set(ten) {
        this.$store.dispatch("ten", ten);
      }
    },
    diaChi: {
      get() {
        return this.$store.getters.diaChi;
      },
      set(diaChi) {
        this.$store.dispatch("diaChi", diaChi);
      }
    },
    tenDangNhap: {
      get() {
        return this.$store.getters.tenDangNhap;
      },
      set(tenDangNhap) {
        this.$store.dispatch("tenDangNhap", tenDangNhap);
      }
    },
    matKhau: {
      get() {
        return this.$store.getters.matKhau;
      },
      set(matKhau) {
        this.$store.dispatch("matKhau", matKhau);
      }
    },
    email: {
      get() {
        return this.$store.getters.email;
      },
      set(email) {
        this.$store.dispatch("email", email);
      }
    },
    phone: {
      get() {
        return this.$store.getters.phone;
      },
      set(phone) {
        this.$store.dispatch("phone", phone);
      }
    }
  },
  methods: {
    onSubmit: function(evt) {
      evt.preventDefault();
      this.$store.dispatch("createAccount");
    }
  }
};
</script>