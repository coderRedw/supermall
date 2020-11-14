import {ADD_COUNTER,ADD_TO_CART} from './mutation-type'

export default {
  //数组常用的方法有哪些？ push/pop/unshift/shift/sort/reverse/map/filter/reduce
  //mutations唯一的目的就是修改state中状态
  //mutations中的每个方法尽可能完成的事件比较单一一点
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
