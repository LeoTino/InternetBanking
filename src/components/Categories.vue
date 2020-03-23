<template>
  <div>
    <b-card no-body header-tag="header" footer-tag="footer" class="shadow">
      <template v-slot:header>
        <h4 class="mb-0">Categories</h4>
      </template>
      <b-list-group>
        <b-list-group-item v-for="item in list" :key="item.CatID" :to="`/categories/${item.CatID}/products`">
          {{ item.CatName }}
          <span v-show="item.num_of_products" class="badge badge-danger float-right">{{item.num_of_products}}</span>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Categories',

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