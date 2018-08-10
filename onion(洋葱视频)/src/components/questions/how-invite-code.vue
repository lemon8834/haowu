<template>
  <transition name="slide">
    <scroll class="questions-wrap">
      <div class="questions-content">
        <div class="content">
          <p class="step-num">邀请码是什么，怎么使用？</p>
          <p class="step-num">邀请码是洋葱视频平台为每位用户设计的两种情况：<br>a：分享邀请链接给朋友在线注册，链接中已带有您的邀请码，因此不需要再手动填写<br>b：如果朋友是从手机应用商店搜索“洋葱视频”先安装后注册的，您需要让朋友登陆后填写您的邀请码进行绑定，这样才能成为您的徒弟哦</p>
          <img class="step-img" src="../../../static/images/questions_images/22@2x.jpg" alt="">
          <img class="step-img" src="../../../static/images/questions_images/23@2x.jpg" alt="">
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
    line-height: 1.5;
    padding: 30px 15px 0;
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
