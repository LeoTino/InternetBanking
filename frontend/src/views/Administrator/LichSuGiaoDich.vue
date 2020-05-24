<template>
  <div id="app">
    <b-form @submit="onSubmit">
      <label for="bank">Chọn ngân hàng</label>
      <b-form-select id="bank" v-model="selected" :options="options"></b-form-select>

      <label for="fromDate">Ngày bắt đầu</label>
      <b-form-datepicker id="fromDate" v-model="fromDate" class="mb-2"></b-form-datepicker>

      <label for="toDate">Ngày kết thúc</label>
      <b-form-datepicker id="toDate" v-model="toDate" class="mb-2"></b-form-datepicker>

      <b-button type="submit" variant="primary">Lọc kết quả</b-button>
    </b-form>

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <div class="content">
      <datatable title="Lịch sử giao dịch" :columns="tableColumns1" :rows="tableRows1" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DataTable from "vue-materialize-datatable";
export default {
  name: "getAccountsList",
  data() {
    return {
      selected: "vcb",
      options: [
        {
          value: "vcb",
          text: "VIetcombank"
        },
        {
          value: "hb",
          text: "HD Bank"
        }
      ],
      list: [],
      tableColumns1: [
        {
          label: "Người gửi",
          field: "charName",
          numeric: false,
          html: true
        },
        {
          label: "Người nhận",
          field: "firstAppearance",
          numeric: false,
          html: false
        },
        {
          label: "Số tiền",
          field: "createdBy",
          numeric: false,
          html: false
        },
        {
          label: "Ngày thực hiện",
          field: "voicedBy",
          numeric: false,
          html: false
        },
        {
          label: "Loại giao dịch",
          field: "voicedBy",
          numeric: false,
          html: false
        }
      ],
      tableRows1: [
        {
          charName: '<div style="color:red;">Abu</div>',
          firstAppearance: "Alladin (1992)",
          createdBy: "Joe Grant",
          voicedBy: "Frank Welker"
        },
        {
          charName: "Magic Carpet",
          firstAppearance: "Peter (1994)",
          createdBy: "Randy Cartwright",
          voicedBy: "N/A"
        },
        {
          charName: "The Sultan",
          firstAppearance: "John (1995)",
          createdBy: "Navid Negahban",
          voicedBy: "Douglas Seale"
        }
      ]
    };
  },
  components: {
    datatable: DataTable
  },
  mounted() {
    this.fetchData(this.$route.params.MaKhachHang);
  },

  watch: {
    $route(to) {
      this.fetchData(to.params.MaKhachHang);
    }
  },

  methods: {
    format(val) {
      return val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ` VND`;
    },
    fetchData(MaKhachHang) {
      axios
        .get(`http://localhost:3000/customer/getAccounts/${MaKhachHang}`)
        .then(res => {
          this.listTT = res.data.filter(i => i.LoaiTaiKhoan == 1);
          this.listTK = res.data.filter(i => i.LoaiTaiKhoan == 2);
          this.empty = res.data.length === 0;
          console.log(axios.defaults.headers.common);
        })
        .catch(err => {
          this.listTT = [];
          this.listTK = [];
          this.empty = true;
          console.log(err);
        });
    },
    onSubmit() {
      return true;
    }
  }
};
</script>

<style scoped>
html,
body {
  padding: 0;
  margin: 0;
}
.content {
  padding: 20px;
}
.tab {
  margin-left: 5em;
  margin-right: 5em;
}
</style>
