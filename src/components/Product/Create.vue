<template>
  <div>
    <h3>Create a product</h3>
    <label for="c">Category</label>
    <select id="c" v-model="form.category">
      <option v-for="category in categories" :value="category.id">{{  category.name }}</option>
    </select>
    <form v-if="categoryAttrs">
      <template v-for="element in categoryAttrs">
        <label for="something">{{element.name}} {{element}}</label>
<!--        <input v-model="form.attributes[element.id]" id="something" type="text">-->
      </template>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import productService from "../../http/services/productService";
export default {
  name: "CreateProduct",
  watch: {
    async "form.category"() {
      const { data } = await productService.categoryAttributes(this.form.category)
      this.categoryAttrs = data.attributes;
    }
  },
  data() {
    return {
      form: {},
      categoryAttrs: null
    }
  },
  computed: {
    ...mapGetters([
        'categories'
    ])
  }
}
</script>