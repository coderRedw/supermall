<template>
  <div class="shop-info" v-if="Object.keys(shop).length - 1 !== 0">
    <div>
      <img :src="shop.shopLogo" alt="">
      <span>{{shop.name}}</span>
    </div>
    <div class="main-left">
      <div class="sells-left">
        <div class="sells-count">
          {{shop.cSells | sellCountFilter}}
        </div>
        <div class="sells-text">总销量</div>
      </div>
      <div class="goods-left">
        <div class="goods-count">
          {{shop.cGoods}}
        </div>
        <div class="goods-text">全部宝贝</div>
      </div>
    </div>
    <div class="main-right">
      <table>
        <tr v-for="(item, index) in shop.score" :key="index">
          <td>{{item.name}}</td>
          <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
          <td class="better" :class="{'better-more': item.isBetter}">{{item.isBetter ? '高': '低'}}</td>
        </tr>
      </table>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailShop",
    props: {
      shop: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      //如果销售低于一万，就不显示'万'
      sellCountFilter(value) {
        let result = value
          if (value > 10000) {
            result = (result / 10000).toFixed(1) + '万'
          }
          return result
      }
    }
  }
</script>

<style scoped>

</style>
