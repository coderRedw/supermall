//因为一个项目一定有很多个弹窗效果，那就意味着，在每一个组件模块中使用这个弹窗的话，即要定义属性方法还要确定在放在哪个组件中，属实有点麻烦
//所以我们可以把它定义一个类似插件，在别的地方使用就行了
import Toast from "./Toast";

const obj = {}

obj.install = function (Vue) {
  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  //2.new的方式，根据组件的构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()

  //3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = Toast;
}
export default obj
