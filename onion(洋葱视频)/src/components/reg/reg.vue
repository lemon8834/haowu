<template>
  <div class="container">
    <!-- <div class="inner">
      <div class="pannel" v-show="pannelShow" @click="toggle">
        <div class="pannel-wrap">
          <img class="pannel-icon" src="../../../static/images/b@2x.png" alt="">
          <p class="msg-title">温馨提示</p>
          <p class="message">如果您无法下载APP，请到您的手机应用市场<span class="highlight">搜索“洋葱视频”安装</span></p>
          <p class="app-store_name">应用市场例如：应用宝、PP手机助手、vivo应用商店、oppo应用商店、华为应用市场、小米商店、360手机助手等等</p>
          <p class="close-btn">知道了</p>
        </div>
      </div>
      <a class="download" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo">立即下载</a>
      <p class="msg" @click="toggle">下载不了点这里 >></p>
    </div> -->
  </div>
</template>
<script>
import { getQueryString } from 'common/js/util'
export default {
  data() {
    return {
      pannelShow: false
    }
  },
  created() {
  },
  methods: {
    toggle() {
      this.pannelShow = !this.pannelShow
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~common/scss/mixin.scss';
  .container {
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-y;
    background-color: #fff;
    .inner {
      width: 100%;
      height: 16.08rem;
      @include bg-image('../../../static/images/a', 'jpg');
      background-size: 100%;
      padding-top: 14rem;
      box-sizing: border-box;
      .download {
        display: block;
        width: 8.43rem;
        height: 48px;
        border-radius: 48px;
        background-image:linear-gradient(-180deg, #ffb800 0%, #ff8200 100%);
        box-shadow:0 2px 8px 0 rgba(255,141,0,0.56);
        text-align: center;
        line-height: 48px;
        color: #49260b;
        font-size: 20px;
        margin: 0 auto;
      }
      .msg {
        font-size: 13px;
        color: #333;
        margin-top: 15px;
        text-align: center;
        @include extend-click;
      }
      .pannel {
        width: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .4);
        display: flex;
        align-items: center;
        justify-content: center;
        .pannel-wrap {
          width: 310px;
          height: 385px;
          background-color: #fff;
          border-radius: 18px;
          padding: 32px 20px 0;
          box-sizing: border-box;
          .pannel-icon {
            width: 60px;
            height: 60px;
            display: block;
            margin: 0 auto;
          }
          .msg-title {
            font-size: 20px;
            color: #333;
            text-align: center;
            margin-top: 16px;
          }
          .message {
            font-size: 16px;
            color: #333;
            line-height: 1.5;
            margin-top: 20px;
            .highlight {
              color: #f85626;
            }
          }
          .app-store_name {
            font-size: 16px;
            color: #333;
            line-height: 1.5;
            margin-top: 15px;
          }
          .close-btn {
            font-size: 16px;
            color: #333;
            margin-top: 40px;
            text-align: center;
            @include extend-click;
          }
        }
      }
    }
  }
</style>
