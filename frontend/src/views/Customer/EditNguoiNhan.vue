<template>
  <div>
    <h1>Chỉnh sửa thông tin người nhận</h1>
    <b-form @submit="onSubmitEditNguoiNhan">
      <b-form-group id="soTK" label="Số tài khoản" label-for="soTK">
        <b-form-input
          id="soTK"
          v-model="nnSoTK"
          readonly="readonly"
          required
          placeholder="Số tài khoản"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="tenGoiNho" label="Tên gợi nhớ" label-for="tenGoiNho">
        <b-form-input id="tenGoiNho" v-model="nnTenGoiNho" placeholder="Tên gợi nhớ"></b-form-input>
      </b-form-group>
      <b-form-group id="nganHang" label="Chọn ngân hàng" label-for="nganHang">
        <b-form-select
          id="nganHang"
          required
          v-model="nnSelectedNganHang"
          :options="lstNganHang"
          :select-size="4"
        ></b-form-select>
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
      temp: ""
    };
  },
  mounted() {
    this.$store.dispatch("getLstNganHang");
  },
  beforeCreate: function() {
    this.$store.dispatch("nnSoTK", this.$route.params.soTK);
    this.$store.dispatch("nnID", this.$route.params.id);
    this.$store.dispatch("loadNguoiNhan");
  },
  computed: {
    lstNganHang: {
      get() {
        return this.$store.getters.lstNganHang;
      },
      set(lstNganHang) {
        this.$store.dispatch("lstNganHang", lstNganHang);
      }
    },
    nnSoTK: {
      get() {
        return this.$store.getters.nnSoTK;
      },
      set(nnSoTK) {
        this.$store.dispatch("nnSoTK", nnSoTK);
      }
    },
    nnTenGoiNho: {
      get() {
        return this.$store.getters.nnTenGoiNho;
      },
      set(nnTenGoiNho) {
        this.$store.dispatch("nnTenGoiNho", nnTenGoiNho);
      }
    },
    nnSelectedNganHang: {
      get() {
        return this.$store.getters.nnSelectedNganHang;
      },
      set(nnSelectedNganHang) {
        this.$store.dispatch("nnSelectedNganHang", nnSelectedNganHang);
      }
    }
  },
  methods: {
    onSubmitEditNguoiNhan() {
      event.preventDefault();
      //this.$store.dispatch("editNguoiNhan");
      alert("dá");
      axios
        .post("http://localhost:3000/transfer/set-up-user-receive", {
          id: this.$store.getters.nnID,
          tenDangNhap: localStorage.getItem("username"),
          soTK: this.$store.getters.nnSoTK,
          tenGoiNho: this.nnTenGoiNho,
          nganHang: this.nnSelectedNganHang,
          method: 2
        })
        .then(res => {
          console.log(res);
          alert(this.nnTenGoiNho);
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