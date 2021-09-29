<template>
  <div :style="cssVariables">
    <div class="am-user-info">
      <p>signed in as {{user.name}}</p>
    </div>
    <div class="am-company-logo-container">
      <img class="am-company-logo" :src="currentMarket.logo" alt="logo"/>
      <h3 class="am-company-name">{{currentMarket.name}}</h3>
    </div>
    <div>
      <h3>Products below </h3>
    </div>
    <div class="am-product" v-for="product in _products">
      <span>{{product.name}}</span>
<!--      <img alt="product image" style="width: 100px" :src="product.image"/>-->
<!--      <span>{{product.category}}</span>-->
    </div>
<!--    <product/>-->
    <create-product/>
    <button @click="logout">logout</button>
  </div>
</template>

<script>
import Product from '../../components/Product/index.vue';
import CreateProduct from '../../components/Product/Create.vue';
import cookie from '../../utils/cookie';
import productService from "../../http/services/productService";

import { mapGetters } from 'vuex';
export default {
  components: {
    Product,
    CreateProduct
  },
  computed: {
    ...mapGetters([
        'currentMarket',
        'markets',
        'user',
        'cssVariables',
        'products',
        '_products'
    ])
  },
  async mounted() {
    // const { data } = await productService.products(this.currentMarket.id);
    // this.$store.commit('setProducts', data);
  },
  methods: {
    async changeMarket(id) {
      this.$store.dispatch('selectMarket', id);
    },
    logout() {
      cookie.erase('am-token');
      this.$store.commit('setUser', null);
      this.$router.push({ name: 'login', query: { redirect: this.$route.name } });
    }
  }
}
</script>

<style>
.am-product {
  display: flex;
  flex-direction: column;
}
</style>