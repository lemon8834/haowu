<template lang="html">
  <transition name="slide">
    <scroll class="questions-wrap">
      <div class="questions-detail">
        <img class="logo" src="../../../static/images/questions_images/66@2x.jpg" alt="">
        <p class="message">为什么洋葱视频会给大家奖励？或许您还不知道，大家平常浏览视频这本是有很大价值的，只不过在别的视频平台上没有把您的浏览价值体现出来，而洋葱视频不但可以将千万网友的浏览进行整和变现，也愿意与您分享收益！现在就带您一起来熟悉洋葱视频吧。</p>
        <div class="step-wrap">
          <div class="top-tips">
            <p class="top-text">第一步：签到、开宝箱</p>
          </div>
          <div class="content">
            <p class="step-text">洋葱视频每天都有福利送，进入“我的”—“每日任务”—即可看到签到（连续签到即可获得最高金币奖励）和开宝箱（每四个小时更新一次，金币都是随机发放，收徒越多，宝箱金币越多哦！）</p>
            <img class="step-img" src="../../../static/images/questions_images/1@1x.jpg" alt="">
            <img class="step-img" src="../../../static/images/questions_images/2@1x.jpg" alt="">
          </div>
        </div>
        <div class="step-wrap">
          <div class="top-tips">
            <p class="top-text">第二步：看视频</p>
          </div>
          <div class="content">
            <p class="step-text">登录后可以看到我们为您推荐的视频列表，看到有兴趣的视频，可点击进行观看，认真观看完后，您会收到一个<span class="highlight">10金币奖励提示</span>，奖励不是每次看视频都有，需要以平常心来浏览。</p>
            <img class="step-img" src="../../../static/images/questions_images/3@1x.jpg" alt="">
          </div>
        </div>
        <div class="step-wrap">
          <div class="top-tips">
            <p class="top-text">第三步：收徒还能让你赚的更多</p>
          </div>
          <div class="content">
            <p class="step-text">收徒的好处有很多，徒弟会向您进贡一定的金币，让您的金币每天都涨得更快，每收一个徒弟都可以获得丰厚的收徒奖励哦！</p>
            <img class="step-img" src="../../../static/images/questions_images/4@1x.jpg" alt="">
          </div>
        </div>
        <div class="step-wrap">
          <div class="top-tips">
            <p class="top-text">第四步：兑换收益</p>
          </div>
          <div class="content">
            <p class="step-text">1.消息通知会通知您前一天的收益情况，包括最新的活动消息。<br>2.在【我的】里边有金币数目、零钱余额及收支明细可以查看最近的收益详情。</p>
            <img class="step-img" src="../../../static/images/questions_images/5@1x.jpg" alt="">
          </div>
        </div>
        <div class="to-task-center" @click="toTaskCenter">
          <img class="btn-icon" src="../../../static/images/questions_images/12@2x.png" alt="">
          <span class="btn-text">我知道了 开始赚钱</span>
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
  },
  methods: {
    toTaskCenter() {
      window.location.href = 'totaskcenter::totaskcenter'
    }
  }
}
</script>

<style scoped lang="scss">
@import '~common/scss/mixin';
.questions-wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  z-index: 100;
  .questions-detail {
    background-color: #fff;
    overflow: hidden;
    padding-bottom: 30px;
  }
  .logo {
    width: 100%;
    height: 219px;
  }
  .message {
    font-size: 14px;
    color: #333;
    padding: 30px;
    line-height: 1.5;
    text-align: justify;
  }
  .step-wrap {
    height: auto;
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
    .arrow {
      @include arrows(bottom, 5px, red);
      transform: translate3d(0, 25%, 0);
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
