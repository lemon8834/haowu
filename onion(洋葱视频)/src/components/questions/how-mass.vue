<template>
  <transition name="slide">
    <scroll class="questions-wrap">
      <div class="questions-content">
        <div class="content">
          <p class="step-num">1、打开洋葱视频APP->进入【我的】->点击【收徒赚钱】->选择群发邀请</p>
          <img class="step-img" src="../../../static/images/questions_images/26@2x.jpg" alt="">
          <p class="step-num">2、将带有二维码的图片点击【保存图片】->【下一步】复制你喜欢的文字->【下一步】</p>
          <img class="step-img" src="../../../static/images/questions_images/27@2x.jpg" alt="">
          <p class="step-num">3、在微信搜索框搜索“群发助手”->点击新建群发->全选联系人发送</p>
          <img class="step-img" src="../../../static/images/questions_images/28@2x.jpg" alt="">
          <p class="step-num">4、将复制好的文字长按粘贴发送->点击“+”将下载好的二维码图片发送出去</p>
          <img class="step-img" src="../../../static/images/questions_images/29@2x.jpg" alt="">
          <p class="tips">友情提示：如果有朋友回复您的消息，记得带Ta一起玩转洋葱视频哦～</p>
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
