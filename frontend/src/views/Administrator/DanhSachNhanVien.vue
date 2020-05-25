<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <b-button v-bind:href="urlCreateNhanVien" variant="primary">Thêm nhân viên</b-button>
    <div class="content">
      <datatable title="Danh sách nhân viên" :columns="columnNhanVien" :rows="rowDataNhanVien">
        <th slot="thead-tr">Actions</th>
        <template slot="tbody-tr" slot-scope="props">
          <td>
            <button
              class="btn red darken-2 waves-effect waves-light compact-btn"
              @click="(e) => deleteItem(props.row, e)"
            >
              <i class="material-icons white-text">delete</i>
            </button>
          </td>
        </template>
      </datatable>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DataTable from "vue-materialize-datatable";
export default {
  data() {
    return {
      urlCreateNhanVien: "http://localhost:8080/#/admin/themnhanvien",
      rowDataNhanVien: [],
      columnNhanVien: [
        {
          label: "Tên nhân viên",
          field: "ten",
          numeric: false,
          html: true
        },
        {
          label: "Địa chỉ",
          field: "diachi",
          numeric: false,
          html: false
        },
        {
          label: "Tên đăng nhập",
          field: "username",
          numeric: false,
          html: false
        },
        {
          label: "Email",
          field: "email",
          numeric: false,
          html: false
        },
        {
          label: "Số điện thoại",
          field: "phone",
          numeric: false,
          html: false
        },
      ]
    };
  },
  components: {
    datatable: DataTable
  },
  beforeCreate: function() {
    //this.fetchData();
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    format(val) {
      return val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ` VND`;
    },
    fetchData() {
      axios
        .get(`http://localhost:3000/admin/load-empl`)
        .then(res => {
          console.log(res);
          var arr = [];
          arr = res.data.map(function(val) {
            return {
              id: val.Id,
              ten: val.Ten,
              diachi: val.DiaChi,
              username: val.TenDangNhap,
              phone: val.Phone,
              email: val.Email
            };
          });
          console.log(JSON.stringify(arr));
          this.rowDataNhanVien = arr;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      return true;
    },
    deleteItem(row, e){
      e.preventDefault();
      console.log(row);
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
