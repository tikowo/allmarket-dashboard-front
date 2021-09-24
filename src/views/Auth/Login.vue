<template>
  <div class="am-login-page">
    <div class="am-login-form-container">
      <h1>login</h1>
      <form @submit.prevent="login">
        <input v-model="form.email" autocomplete="email">
        <input v-model="form.password" type="password" autocomplete="current-password">
        <button type="submit">Login</button>
      </form>

      <router-link :to="{name: 'home'}">Home</router-link>
    </div>
  </div>
</template>

<script>
import authService from '../../http/services/authService';
import cookie from '../../utils/cookie';

export default {
  data() {
    return {
      form: {}
    }
  },
  methods: {
    async login() {

      const { data } = await authService.login(this.form);
      this.$store.commit('setUser', data);
      cookie.set('am-token', data.token, '2d');
      if(this.$route.query.redirect) {
        this.$router.push({ name: this.$route.query.redirect });
      } else {
        this.$router.push({ name: 'home' });
      }
    }
  }
}
</script>

<style scoped>
.am-login-page {
  & .am-login-form-container {
    margin: auto;
    max-width: 400px;
    display: flex;
    flex-direction: column;

    & form {
      display: flex;
      flex-direction: column;

      & input {
        margin-bottom: 1rem;
        padding: .5rem;
      }
    }
  }
}
</style>