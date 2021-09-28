<template>
  <div :style="cssVariables">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import authService from "./http/services/authService";
import { mapGetters } from "vuex";
// auto register all layouts
const layouts = import.meta.globEager('./layouts/*.vue');
const components = {};
Object.entries(layouts).forEach(([path, definition]) => {
  const componentName = path.split('/').pop().replace(/\.\w+$/, '');
  components[componentName] = definition.default;
});

export default {
  components: {
    ...components
  },
  data() {
    return {
     showApp: false
    }
  },
  computed: {
    ...mapGetters(['cssVariables']),
    layout() {
      return this.$route.meta.layout || 'default';
    }
  },
  async mounted() {
     try {
       const { data } = await authService.me();
       this.$store.dispatch('init', data);
      //  this.$store.commit('setUser', data);
     } finally {
        this.showApp = true;
        this.$store.commit('setInitialLoad', 1);
     }
   }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
