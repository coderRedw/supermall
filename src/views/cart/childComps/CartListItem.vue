<template>
  <div id="shop-product">
      <div class="product-selector">
        <check-button :is-checked="product.checked" @click.native="checkClick"/>
      </div>
      <div class="product-img">
        <img :src="product.image" alt="商品图片">
      </div>
      <div class="product-info">
        <div class="product-title">{{product.title}}</div>
        <div class="product-desc">{{product.desc}}</div>
        <div class="info-bottom">
          <div class="product-price left">￥{{product.price}}</div>
          <div class="item-count right">*{{product.count}}</div>
        </div>
      </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartListItem",
    components: {
      CheckButton
    },
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      checkClick() {
        this.product.checked = !this.product.checked
      }
    }
  }
</script>

<style scoped>

</style>
