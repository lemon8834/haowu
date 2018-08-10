<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif" alt="">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '加载中...'
    }
  }
}
</script>

<style lang="less" scoped>
  .loading {
    width: 100%;
    text-align: center;
    .desc {
      color: #fff;
      margin: 0;
      font-size: 14px;
    }
  }
</style>


