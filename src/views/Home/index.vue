<template>
  <div :style="cssVariables">
    <div class="am-user-info">
      <p>signed in as {{user.name}}</p>
    </div>
    <div class="am-company-selector" v-for="market in markets">
      <a :class="{selected: market.id === currentMarket.id}" @click="changeMarket(market.id)" :title="market.name">
        <img :src="market.logo" alt="logo">
      </a>
    </div>
    <div class="am-company-logo-container">
      <img class="am-company-logo" :src="currentMarket.logo" alt="logo"/>
      <h3 class="am-company-name">{{currentMarket.name}}</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters([
        'currentMarket',
        'markets',
        'user',
        'cssVariables'
    ])
  },
  methods: {
    changeMarket(id) {
      this.$store.dispatch('selectMarket', id);
    }
  }
}
</script>

<style>
</style>