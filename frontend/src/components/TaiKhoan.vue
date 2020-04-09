<template>
  <div>
    <b-card no-body header-tag="header" footer-tag="footer" class="shadow">
      
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TaiKhoan',

  data() {
    return {
      list: []
    };
  },

  mounted() {
    axios
      .get('http://localhost:3000/categories')
      .then(res => {
        this.list = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
</style>