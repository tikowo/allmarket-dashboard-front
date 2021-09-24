<template>
  <div>
    <form @submit.prevent="addProduct">
      <select v-model="form.category">
        <option value="electronics">Electronics</option>
        <option value="clothes">Clothes</option>
      </select>
      <input type="text" v-model="form.name">
      <button type="submit">Create Product</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    }
  },
  methods: {
    addProduct() {
      //  Adding a product
    }
  }
}
</script>