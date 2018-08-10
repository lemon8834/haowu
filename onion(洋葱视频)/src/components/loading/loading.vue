<template>
  <div class="loading">
    <img src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在加载...'
      }
    }
  }
</script>
<style scoped lang="scss">
  .loading {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 24px;
      height: 24px;
    }
    .desc {
      font-size: .37rem;
      color: #333;
      margin-left: .27rem;
    }
  }
</style>
