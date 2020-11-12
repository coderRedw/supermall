<template>
  <div class="detail-bottom">
    <div class="bar-item bar-left">
      <div>
        <i></i>
        <span>客服</span>
      </div>
      <div>
        <i></i>
        <span>店辅</span>
      </div>
      <div>
        <i></i>
        <span>收藏</span>
      </div>
    </div>
    <div>
      <div class="cart" @click="addCart">收入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      addCart() {
        this.$emit('addToCart')
      }
    }
  }
</script>

<style scoped>
  .detail-bottom {
    height: 49px;

    position: relative;
    bottom: 49px;

    display: flex;
    text-align: center;
  }
</style>
