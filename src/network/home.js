import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',    //这个接口失效了
    params: {
      type,
      page
    }
  })
}



//函数调用 -》 压入函数载（保存函数调用过程中所有变量）
//函数调用结束 -》 弹出函数载（释放函数所有的变量）
// function test() {
//   const names = ['why','aaa']
// }
// test()

// let totalNums = []
//
// const num1 = [10,20,231]
//
// for (let n of num1) {
//   totalNums.push(n)
// }
//
// totalNums.push(...num1)
