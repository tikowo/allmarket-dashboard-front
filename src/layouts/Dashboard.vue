<template>
  <div class="am-dashboard-layout">
    <div class="am-sidebar">
      <div class="am-sidebar-section">
        <div class="am-sidebar-markets">
          <a :class="{selected: market.id === currentMarket.id}" @click="switchMarket(market.id)" v-for="market in markets" class="am-sidebar-item">
            {{ market.name.substring(0, 1) }}
          </a>
          <router-link class="am-sidebar-item" to="/market/create">+</router-link>
        </div>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

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
    switchMarket(id) {
      console.log(id)
      this.$store.dispatch('selectMarket', id);
    }
  }
}
</script>

<style scoped>
.am-dashboard-layout {
  height: 100vh;
  display: flex;

  & .am-sidebar {
    width: 48px;
    height: 100%;
    background: var(--mainColor);
    & .am-sidebar-section {
      margin: 1rem 0;
    }

    & .am-sidebar-markets {
      & .selected {
        background: rgba(255, 255, 255, 0.5);
      }
    }
    & .am-sidebar-item {
      height: 32px;
      width: 32px;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(255, 255, 255, 0.71);
      margin: auto auto 1rem;
    }
  }
}
</style>