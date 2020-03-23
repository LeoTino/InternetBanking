<template>
  <div class="card shadow mb-4">
    <h4 class="card-header">Products</h4>

    <div v-if="empty" class="card-body">
      <p class="card-text">Không có dữ liệu.</p>
    </div>

    <div v-else class="card-body">
      <div class="row">
        <div class="col-sm-4 mb-3" v-for="item in list" :key="item.ProID">
          <div class="card h-100">
            <img :src="`http://localhost:3000/imgs/sp/${item.ProID}/main_thumbs.jpg`" :alt="item.ProName" :title="item.ProName" class="card-img-top" />
            <div class="card-body">
              <h6 class="card-title">{{item.ProName}}</h6>
              <h5 class="card-title text-danger">{{format(item.Price)}}</h5>
              <p class="card-text">{{item.TinyDes}}</p>
            </div>
            <div class="card-footer text-center">
              <b-link class="btn btn-sm btn-outline-primary mr-2" :to="`/products/${item.ProID}`" event="">
                Details
              </b-link>
              <b-link event="" class="btn btn-sm btn-outline-success">
                Add to cart
              </b-link>
            </div>
          </div>
        </div>
      </div>
      <b-button v-if="hasMore" block variant="primary">
        Load more...
      </b-button>
    </div>

    <div class="card-footer text-muted">Footer</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductsByCat',
  data() {
    return {
      list: [],
      empty: true,
      hasMore: false
    };
  },

  mounted() {
    this.fetchProducts(this.$route.params.catId);
  },

  watch: {
    $route(to) {
      this.fetchProducts(to.params.catId);
    }
  },

  methods: {
    format(val) {
      return `${val} đ`;
    },

    fetchProducts(catId) {
      axios
        .get(`http://localhost:3000/categories/${catId}/products`)
        .then(res => {
          this.list = res.data.products;
          this.hasMore = res.data.hasMore;
          this.empty = this.list.length === 0;
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