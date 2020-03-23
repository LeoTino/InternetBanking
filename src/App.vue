<template>
  <div>
    <NavBar />
    <b-container class="mt-4">
      <b-row>
        <b-col sm="3">
          <Categories />
        </b-col>
        <b-col sm="9">
          <router-view></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Categories from '@/components/Categories.vue';

export default {
  components: {
    NavBar,
    Categories
  }
};
</script>

<style scoped>
</style>