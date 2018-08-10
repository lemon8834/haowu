<template>
  <transition name="slide">
    <scroll class="questions-wrap">
      <div class="questions-content">
        <div class="content">
          <p class="step-num">如何绑定微信号？</p>
          <p class="step-num">首次登陆洋葱视频时会提示绑定微信，如果当时没有绑定，后续您可点击头像完成绑定</p>
          <img class="step-img" src="../../../static/images/questions_images/24@2x.jpg" alt="">
          <img class="step-img" src="../../../static/images/questions_images/25@2x.jpg" alt="">
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
  .tips {
    font-size: 14px;
    color: #f85626;
    line-height: 1.4;
    padding: 30px;
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
