<template>
  <div v-if="Object.keys(paramInfo).length - 1 !== 0" class="param-info">
    <table v-for="(table, index) in paramInfo.rule.tables" class="info-size" :key="index">
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>

    <table class="info-param">
      <tr v-for="(info, index) in paramInfo.info.set">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>

    <div class="info-img" v-if="paramInfo.info.images">
      <img :src="paramInfo.info.images[0]" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailParamsInfo",
    props: {
      paramInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>

</style>
