<template>
  <div v-if="Object.keys(commentInfo).length -1 !== 0">
    <div>
      <div>用户评价</div>
      <div>
        更多
          <i></i>
      </div>
    </div>
    <div>
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div>
      <p>{{commentInfo.content}}</p>
      <div>
        <span>{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div>
        <img :src="item" v-for="(item, index) in  commentInfo.images" :key="index" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "common/utils"

  export default {
    name: "DetailCommendInfo",
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      showDate(value) {
        //1。将时间戳转成Date对象
        const date = new Date(value * 1000)

        //2。将date进行格式化
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    }
  }
</script>

<style scoped>

</style>
