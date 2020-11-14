<template>
  <div class="cart">
<!--    导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车{{length}}</div>
    </nav-bar>

<!--    商品的列表-->
    <cart-list/>

<!--    底部汇总-->
    <cart-bottom-nav/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import CartBottomNav from "./childComps/CartBottomNav";
  import CartList from "./childComps/CartList";

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomNav
    },
    computed: {
      //两种写法

      //...mapGetters(['cartLength','cartList']}
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped>

</style>
