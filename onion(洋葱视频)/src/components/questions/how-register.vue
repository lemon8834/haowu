<template>
  <transition name="slide">
    <scroll class="questions-wrap">
      <div class="questions-content">
        <img class="logo" src="../../../static/images/questions_images/40@2x.jpg" alt="">
        <p class="title-msg">如何注册？<br>成为洋葱视频用户</p>
        <div class="step-wrap">
          <div class="top-tips">
            <p class="top-text">第一步：扫描朋友转发的二维码</p>
          </div>
          <div class="content">
            <img class="step-img" src="../../../static/images/questions_images/14@2x.jpg" alt="">
          </div>
        </div>
        <div class="step-wrap">
          <div class="top-tips">
            <p class="top-text">第二步：通过二维码打开注册页</p>
          </div>
          <div class="content">
            <p class="step-num">1、输入“手机号”点击“获取验证码”</p>
            <img class="step-img" src="../../../static/images/questions_images/15@2x.jpg" alt="">
            <p class="step-num">2、约几秒后手机会收到一条“短信验证码”</p>
            <img class="step-img" src="../../../static/images/questions_images/Group@1x.jpg" alt="">
            <p class="step-num">3、输入短信验证码</p>
            <p class="step-num">4、点击立即领取，即完成注册</p>
            <img src="../../../static/images/questions_images/16@2x.jpg" alt="" class="step-img">
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
    font-size: .96rem;
    color: #333;
    text-align: center;
    line-height: 1.3;
  }
  .step-wrap {
    overflow: hidden;
    .content {
      padding-bottom: 30px;
    }
  }
  .top-tips {
    padding: 0 15px;
    height: 52px;
    border-top: 1px solid #f85626;
    border-bottom: 1px solid #f85626;
    box-sizing: border-box;
    background-color: rgba(248, 86, 38, .15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .top-text {
      color: #f85626;
      font-size: 16px;
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
