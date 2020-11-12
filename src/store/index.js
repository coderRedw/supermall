import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      //payload新添加的商品
      //数组常用的方法有哪些？ push/pop/unshift/shift/sort/reverse/map/filter/reduce
      let oldProduct = null
      for(let item of state.cartList) {
        if(item.iid === payload.iid) {
          oldProduct = item
        }
      }
      //2.判断oldProduct
      if (oldProduct) {
        oldProduct.count += 1
      }else {
        oldProduct.count = 1
        state.cartList.push(payload)
      }
    }
  }
})

export default store
