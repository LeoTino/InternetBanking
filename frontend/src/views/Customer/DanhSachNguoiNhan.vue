<template>
  <div class="card shadow mb-4">
    <h4 class="card-header">Danh sách người nhận</h4>
    <div class="row">
      <div class="col-sm-3 mb-3" v-for="item in lstReceive" :key="item.value">
        <div class="card h-100">
          <div class="card-body">
            <h4 class="card-title text-danger">{{item.name}}</h4>
            <h6 class="card-title">{{item.value}}</h6>
            <b-button type="submit" block variant="primary" v-on:click="remove($event, item.value)">Remove</b-button>
            <b-button type="submit" block variant="primary">Change</b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer text-muted">Footer</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radioOptions: [
        { value: 0, text: "Người chuyển trả" },
        { value: 1, text: "Người nhận trả" }
      ]
    };
  },
  mounted() {
    this.$store.dispatch("genLstReceive");
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
          alert(id);
      }
  }
};
</script>

<style scoped>
</style>