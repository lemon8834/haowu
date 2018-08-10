<template>
  <transition name="slide">
    <scroll class="questions-wrap">
      <div class="questions-content">
        <img class="logo" src="../../../static/images/questions_images/40@2x.jpg" alt="">
        <p class="title-msg">在应用商店点击“立即下载”按钮下面分别有安卓下载教程和ios下载教程</p>
        <div class="step-wrap">
          <div class="top-tips">
            <p class="top-msg">安卓手机安装教程</p>
            <p class="top-text">(小米手机为例)</p>
          </div>
          <div class="content">
            <p class="step-num">1、打开手机“应用商店”搜索“洋葱视频”</p>
            <img class="step-img" src="../../../static/images/questions_images/Slice-2@2x.jpg" alt="">
            <p class="step-num">2、点击“安装”</p>
            <img class="step-img" src="../../../static/images/questions_images/7@1x.jpg" alt="">
            <p class="step-num">3、安装成功后可选择打开应用</p>
            <img class="step-img" src="../../../static/images/questions_images/8@1x.jpg" alt="">
            <p class="step-num">4、在手机桌面上可以找到洋葱视频app</p>
            <img class="step-img" src="../../../static/images/questions_images/9@1x.jpg" alt="">
          </div>
        </div>
        <div class="step-wrap">
          <div class="top-tips">
            <p class="top-msg">IOS手机安装教程</p>
            <p class="top-text">(iPhone手机为例)</p>
          </div>
          <div class="content">
            <p class="step-num">1、打开手机“应用商店”搜索“洋葱视频”</p>
            <img class="step-img" src="../../../static/images/questions_images/10@2x.jpg" alt="">
            <p class="step-num">2、点击“下载”</p>
            <img class="step-img" src="../../../static/images/questions_images/111@2x.jpg" alt="">
            <p class="step-num">3、安装成功后可选择打开应用</p>
            <img class="step-img" src="../../../static/images/questions_images/12@2x.jpg" alt="">
            <p class="step-num">4、在手机桌面上可以找到洋葱视频app</p>
            <img class="step-img" src="../../../static/images/questions_images/13@2x.jpg" alt="">
          </div>
        </div>
      </div>
    </scroll>
  </transition>
</template>

<script>
import Scroll from 'components/scroll/scroll'
export default {
  components: {
    Scroll
  }
}
</script>

<style lang="scss" scoped>
.questions-wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  z-index: 100;
  .logo {
    width: 4.88rem;
    height: 1.01rem;
    margin: 0 auto;
    display: block;
    padding-top: 30px;
  }
  .title-msg {
    padding: .8rem;
    font-size: 22px;
    color: #333;
    text-align: justify;
    line-height: 1.4;
  }
  .step-wrap {
    overflow: hidden;
    .content {
      padding-bottom: 30px;
    }
  }
  .top-tips {
    padding: 0 15px;
    height: 68px;
    border-top: 1px solid #f85626;
    border-bottom: 1px solid #f85626;
    box-sizing: border-box;
    background-color: rgba(248, 86, 38, .15);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    p {
      color: #f85626;
      font-size: 16px;
    }
    .top-msg {
      font-size: 20px;
    }
    .top-text {
      margin-top: 10px;
    }
  }
  .step-text {
    font-size: 14px;
    color: #333;
    line-height: 1.5;
    padding: 30px 30px 0;
    .highlight {
      color: #f85626;
    }
  }
  .step-num {
    font-size: 14px;
    color: #333;
    line-height: 1.4;
    padding: 30px 30px 0;
    &+.step-num {
      padding-top: 20px;
    }
  }
  .step-img {
    width: 345px;
    margin: 0 auto;
    margin-top: 30px;
    display: block;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
