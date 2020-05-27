<template>
  <div>
    <h1>Tạo nhắc nợ</h1>
    <b-form @submit="onSubmitTaoNguoiNo">
      <b-card border-variant="info" header="Thông tin người nợ" align="center">
        <b-card-text>
          <p>Số tài khoản: {{nnoSoTK}}</p>
          <p>Tên tài khoản: {{nnoInfo}}</p>
        </b-card-text>
      </b-card>
      <b-form-group id="nnoSoTK" label="Số tài khoản người nợ" label-for="nnoSoTK">
        <b-form-input
          id="nnoSoTK"
          v-model="nnoSoTK"
          v-on:input="findNguoiNo()"
          placeholder="Số tài khoản"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="lstNguoiNo" label="Danh sách người nợ" label-for="lstNguoiNo">
        <b-form-select id="lstNguoiNo" v-model="nnoSoTK" :options="nnoLstNguoiNo" :select-size="4"></b-form-select>
      </b-form-group>
      <b-form-group id="nnoSoTien" label="Số tiền" label-for="nnoSoTien">
        <b-form-input id="nnoSoTien" type="number" v-model="nnoSoTien" placeholder="Số tiền"></b-form-input>
      </b-form-group>
      <b-form-group id="nnoNoiDung" label="Nội dung" label-for="nnoNoiDung">
        <b-form-input id="nnoNoiDung" v-model="nnoNoiDung" placeholder="Nội dung"></b-form-input>
      </b-form-group>
      <br />
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      temp: ""
    };
  },
  mounted() {
    //this.$store.dispatch("getLstNguoiNoDoBanThanTao");
  },
  computed: {
    nnoSoTK: {
      get() {
        return this.$store.getters.nnoSoTK;
      },
      set(nnoSoTK) {
        this.$store.dispatch("nnoSoTK", nnoSoTK);
      }
    },
    nnoLstNguoiNo: {
      get() {
        return this.$store.getters.nnoLstNguoiNo;
      },
      set(nnoLstNguoiNo) {
        this.$store.dispatch("nnoLstNguoiNo", nnoLstNguoiNo);
      }
    },
    nnoSoTien: {
      get() {
        return this.$store.getters.nnoSoTien;
      },
      set(nnoSoTien) {
        this.$store.dispatch("nnoSoTien", nnoSoTien);
      }
    },
    nnoNoiDung: {
      get() {
        return this.$store.getters.nnoNoiDung;
      },
      set(nnoNoiDung) {
        this.$store.dispatch("nnoNoiDung", nnoNoiDung);
      }
    },
    nnoInfo: {
      get() {
        return this.$store.getters.nnoInfo;
      },
      set(nnoInfo) {
        this.$store.dispatch("nnoInfo", nnoInfo);
      }
    }
  },
  methods: {
    onSubmitTaoNguoiNo() {
      event.preventDefault();
      if (
        this.$store.getters.nnoInfo == "" ||
        this.$store.getters.nnoInfo == "Tài khoản không tồn tại"
      ) {
        alert("Số tài khoản bị đòi nợ không tồn tại!");
      } else {
        this.$store.dispatch("taoNguoiNo");
      }
    },
    findNguoiNo() {
      this.$store.dispatch("getInfoNguoiNo");
    }
  }
};
</script>

<style scoped>
</style>