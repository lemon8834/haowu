<template>
  <transition name="slide">
    <scroll class="questions-wrap">
      <div class="questions-content">
        <p class="title-msg">洋葱视频如何收徒赚钱</p>
        <div class="step-wrap">
          <div class="top-tips">
            <p class="top-text">第一步：面对面邀请</p>
          </div>
          <div class="content">
            <p class="step-text">当与亲朋好友聚会、串门、见面聊天等，都可以直接向其推荐洋葱视频，使用面对面邀请功能收徒，让朋友扫描您的二维码下载安装。步骤如下：</p>
            <p class="step-num">1、打开“洋葱视频”点击右下角<span class="num">1</span>“我的”</p>
            <p class="step-num">2、点击<span class="num">2</span>选项进入邀请收徒页面</p>
            <img class="step-img" src="../../../static/images/questions_images/4@1x.jpg" alt="">
            <p class="step-num">3、点击<span class="num">3</span>立即收徒打开分享页面</p>
            <img class="step-img" src="../../../static/images/questions_images/18@2x.jpg" alt="">
            <p class="step-num">4、点击<span class="num">4</span>面对面收徒，让朋友扫描里面的二维码下载并安装</p>
            <img class="step-img" src="../../../static/images/questions_images/19@2x.jpg" alt="">
          </div>
        </div>
        <div class="step-wrap">
          <div class="top-tips">
            <p class="top-text">第二步：线上邀请</p>
          </div>
          <div class="content">
            <p class="step-text">您也可以通过朋友圈邀请、微信邀请、QQ邀请、短信邀请、群发邀请等方式，将收徒链接转发给您的朋友注册加入。</p>
            <img class="step-img" src="../../../static/images/questions_images/20@2x.jpg" alt="">
          </div>
        </div>
        <div class="router-wrap">
          <router-link class="router-btn" tag="p" to="/questions/3">如何注册？</router-link>
          <router-link class="router-btn" tag="p" to="/questions/4">如何下载？</router-link>
        </div>
        <div class="step-wrap">
          <div class="content">
            <img class="step-img" src="../../../static/images/questions_images/21@2x.jpg" alt="">
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
@import '~common/scss/mixin';
.questions-wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  z-index: 100;
  .title-msg {
    padding: 30px;
    font-size: 36px;
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
      font-size: 14px;
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
    .num {
      width: 20px;
      height: 20px;
      display: inline-block;
      font-size: 14px;
      color: #fff;
      text-align: center;
      line-height: 20px;
      border-radius: 50%;
      background-color: #f85626;
    }
    &+.step-num {
      padding-top: 20px;
    }
  }
  .step-img {
    width: 9.2rem;
    margin: 0 auto;
    margin-top: 30px;
    display: block;
  }
  .to-task-center {
    width: 280px;
    height: 53px;
    border-radius: 53px;
    background-color: #ffda30;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-top: 30px;
    .btn-icon {
      width: 50px;
      height: 51px;
      margin-right: 10px;
    }
    .btn-text {
      font-size: 20px;
      color: #873f00;
      line-height: 1;
    }
  }
  .router-wrap {
    padding: 0 .8rem;
    display: flex;
    justify-content: space-between;
    .router-btn {
      width: 3.73rem;
      height: 1.41rem;
      line-height: 1.41rem;
      text-align: center;
      background-color: #f85626;
      color: #fff;
      font-size: .53rem;
      border-radius: 1.41rem;
    }
  }
}


.slide-enter-active,
.slide-leave-active {
  transition: all .3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
