<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll" :probe-type="3">
      <ul>
        <li v-for="item in $store.state.cartList">
          {{item}}
        </li>
      </ul>
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop :shop="shopInfo"/>
      <detail-image-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-params-info ref="params" :param-info="paramInfo"/>
      <detail-commend-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recomments"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart"/>
    <toast :message="哈哈哈" :isShow="isShow"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShop from "./childComps/DetailShop";
  import DetailImageInfo from "./childComps/DetailImageInfo";
  import DetailParamsInfo from "./childComps/DetailParamsInfo";
  import DetailCommendInfo from "./childComps/DetailCommendInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import BackTop from "components/content/backTop/BackTop";
  import Toast from "components/common/toast/Toast";

  import Scroll from "components/common/scroll/Scroll"
  import GoodsList from "components/content/goods/GoodsList";
  import {debounce} from "common/utils"
  import {itemListenerMixin, backTopMixin} from "common/mixin"
  import {mapActions} from 'vuex'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShop,
      DetailImageInfo,
      DetailBottomBar,
      DetailParamsInfo,
      DetailCommendInfo,
      BackTop,
      Scroll,
      GoodsList,
      Toast
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: [],
        shop: [],
        shopInfo: {},
        detailInfo: [],
        paramInfo: [],
        commentInfo: {},
        recomments: [],
        themeTopYs: [],
        getThemeTopYs: [],
        currentIndex: 0,
        message: '',
        isShow: false
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then((res) => {
        //1。获取顶部的图片轮播数据
        // console.log(res)
        const data = res.result
        this.topImages = data.itemInfo.topImages

        //3.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //4.获取店辅信息
        this.shopInfo = new Shop(data.shopInfo)

        //5.保存商品详细图片数据
        this.detailInfo = data.detailInfo

        //6.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itmParams.rule)


        //3.请求推荐数据
        getRecommend().then(res => {
          this.recomments = res.data.list
        })

        //4.给getThemTopYm赋值（给this.themeTopYs赋值的操作进行防抖）
        this.getThemeTopYs = debounce(() => {
          this.newRefresh()
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_SAFE_INTEGER)
        },100)
        /*

        //1。第一次获取，值不对
        //值不对的原因：this.$refs.params.$el压根没有渲染
        this.themeTopYs = []

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

        this.$nextTick(() => {     //$nextTick等上面信息与调用全部加载完成后
          //第二次获取：值不对
          //值不对的原因：图片没有计算在内
          //根据最新的数据，对应的DOM是已经被渲染出来
          //但是图片依然是没有加载完（目前获取到的offsetTop不包含其中的图片）
          //offsetTop值不对的时候，都是因为图片的问题
            this.themeTopYs = []

            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          })

          */
        })
    },
    mounted() {
    },
    destroyed() {
      //取消全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods: {
      ...mapActions(['addCart']),
      detailImageLoad() {
        // let refresh = debounce(this.$refs.scroll,refresh,200)
        // refresh()    //https://www.bilibili.com/video/BV17j411f74d?p=204  不能够这样写
        this.newRefresh()
        this.getThemeTopYs()
      },
      titleClick() {
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      backClick() {
      },
      contentScroll(position) {
        //1.获取y值
        const positoinY = -position.y
        //[0,7938,9120,9452]

        //positionY 在0和7938之间，index = 0
        //positionY 在7938和9120之间，index = 1
        //positionY 在9120和9452之间，index = 2

        //positonY 大于等于9120值，index = 3
        let length = this.themeTopYs.length
        for(let i =0; i < length -1; i++) {
          if (this.currentIndex !== i && (positoinY >= this.themeTopYs[i] && positoinY < this.themeTopYs[i + 1])) {

            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        // for(let i =0; i < length; i++) {
        //   if(this.currentIndex !== i && ((i < length -1 && positoinY >= this.themeTopYs[i] && positoinY <
        //   this.themeTopYs[i + 1]) || (i === length -1 && positoinY >= this.themeTopYs[i]))) {
        //     this.currentIndex = i
        //     this.$refs.nav.currentIndex = this.currentIndex
        //   }
        // }
        //1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
      },
      addToCart() {
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goodsInfo.title;
        product.price = this.goodsInfo.realPrice
        product.iid = this.iid

        // this.$store.state.cartList.push(product)
        // this.$store.commit('addCart',product)
        this.addCart(product).then(res => {
        //   this.message = res
        //   this.isShow = true
        //
        //   setTimeout(() => {
        //     this.message = ''
        //     this.isShow = false
        //   },1500)
          this.$toast.show(res, 2000)
        })   //相比下面的你只是把他封装到了mapActions,效果是一样的

        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res)
        // })
      }
    }
  }
</script>

<style scoped>
  .detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .detail-nav {
    position: relative;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>
