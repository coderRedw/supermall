<template>
  <div class="cart-bottom-nav">
    <div>
      <check-button
        :is-checked="isSelectAll"
        @click="checkClick"/>
      <span>全选</span>
    </div>
    <div>
      <span>合计: {{totalPrice}}</span>
      <div>
        <span>总选数量：{{selectCount}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartBottomNav",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => item.checked).reduce((preValue, item) => {
          return preValue + item.price * item.count
        },0)
      },
      selectCount() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.$store.state.cartList.length === 0) return  false
        //1.使用filter
        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        //
        // //2.使用find
        // return !this.$store.state.cartList.find(item => !item.checked)

        //3.普通遍历
        for (let item of this.$store.state.cartList) {
          if(!item.checked) {
            return  false
          }
        }
        return  true
      }
    },
    methods: {
      checkClick()  {
        if (this.isSelectAll) {  //全部选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        }else {  //部分选中
          this.$store.state.cartList.forEach(item => item.checked = true)
        }

        // this.$store.state.cartList.forEach(item => item.checked = !this.isSelectAll)  //不可这样做
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-nav {
    position: relative;
    bottom: 42px;

    height: 42px;
    background: #eee;
  }
</style>
