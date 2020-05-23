<template>
  <div class="card shadow mb-4">
    <h4 class="card-header">
      Danh sách người nhận
      <b-button v-bind:href="urlCreateNguoiNhan" variant="primary">Tạo người nhận</b-button>
    </h4>
    <div class="row">
      <div class="col-sm-3 mb-3" v-for="item in lstReceive" :key="item.value">
        <div class="card h-100">
          <div class="card-body">
            <h4 class="card-title text-danger">{{item.name}}</h4>
            <h6 class="card-title">{{item.value}}</h6>
            <b-button
              type="submit"
              block
              variant="primary"
              v-on:click="remove($event, item.id)"
            >Remove</b-button>
            <b-button
              type="submit"
              block
              variant="primary"
              v-on:click="edit($event, item.value, item.id)"
            >Change</b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer text-muted">Footer</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      urlCreateNguoiNhan: "http://localhost:8080/#/customer/createNguoiNhan"
    };
  },
  mounted() {
    this.$store.dispatch("genLstReceive");
  },
  watch: {
    isMatchOTP: function() {
      event.preventDefault();
      if (this.$store.getters.isMatchOTP == true) {
        this.$store.dispatch("callApiChuyenTien");
        alert("Chuyển tiền thành công!");
        window.location.reload(true);
      }
    }
  },
  computed: {
    lstReceive: {
      get() {
        return this.$store.getters.lstReceive;
      },
      set(lstReceive) {
        this.$store.dispatch("lstReceive", lstReceive);
      }
    }
  },
  methods: {
    remove(event, id) {
      event.preventDefault();
      axios
            .post('http://localhost:3000/transfer/set-up-user-receive', {
                id: id,
                method: 3
            })
            .then(res => {
                console.log(res.data);
                if(res.data == "success"){
                  alert("Success!");
                  window.location.reload(true);
                } else{
                  alert("Err! Pls try again!");
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
    edit(event, stk, id) {
      event.preventDefault();
      location.href = `http://localhost:8080/#/customer/receivemanagement/edit/` + stk + "/" + id;
    }
  }
};
</script>

<style scoped>
</style>