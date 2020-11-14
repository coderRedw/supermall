export default {
  cartLength(state) {
    return this.$store.state.cartList.length
  },
  cartList(state) {
    return state.cartList
  }
}
