<template>
  <div class="download">
    <div class="bg-image"></div>
    <a href="http://v.yangcongv.com/Apk/Onion/onionvideo_1.3.5.apk" class="btn">
      <img src="./777@2x.png" alt="">
      <span>洋葱视频安全下载</span>
    </a>
    <div class="mask" v-show="maskShow">
      <img src="./mask.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maskShow: false
    }
  },
  created() {
    const ua = window.navigator.userAgent.toLowerCase()
    ua.match(/MicroMessenger/i) == 'micromessenger' ? this.maskShow = true : this.maskShow = false
  }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/mixin';
.download {
  height: 100%;
  background-color: #fff;
  .mask {
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .6);
    img {
      width: 100%;
      height: 214px;
      display: block;
    }
  }
  .bg-image {
    width: 100%;
    height: 0;
    padding-top: 403px;
    @include bg-image('./888', 'jpg');
    background-size: cover;
    background-repeat: no-repeat;
  }
  .btn {
    display: flex;
    width: 345px;
    height: 40px;
    background-color: #f40009;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-top: 10px;
    img {
      width: 18px;
      height: 22px;
      display: inline-block;
    }
    span {
      color: #fff;
      font-size: 16px;
      margin-left: 5px;
      font-weight: 700;
    }
  }
}

</style>
