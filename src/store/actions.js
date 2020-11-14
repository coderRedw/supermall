export {ADD_COUNTER,ADD_TO_CART} from './mutation-type'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //payload新添加的商品
      // let oldProduct = null
      // for(let item of content.state.cartList) {
      //   if(item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }
      // //2.判断oldProduct
      // if (oldProduct) {
      //   // oldProduct.count += 1
      //   content.commit(ADD_COUNTER,oldProduct)
      // }else {
      //   oldProduct.count = 1
      //   // content.state.cartList.push(payload)
      //   content.commit(ADD_COUNTER,payload)
      // }
      //1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      //2.判断oldProduct
      if(oldProduct) {  //商品数量加一
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      }else {   //添加商品
        payload.count++
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }

    })
  }
}
