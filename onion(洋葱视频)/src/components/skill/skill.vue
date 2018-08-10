<template>
  <scroll class="wrapper">
    <div class="container">
      <div class="head-bg_image"></div>
      <div class="content">
        <p class="title">1.发送邀请链接</p>
        <p class="text">在收徒赚钱页面，点击“收徒赚钱”按钮，选择分享到朋友圈或者直接分享给好友。</p>
        <div class="pic"></div>
        <p class="title">2.朋友下载安装</p>
        <p class="text">方法1：让朋友点击您发送的链接，下载安装洋葱视频</p>
        <div class="pic"></div>
        <p class="text">方法2：如果朋友点击您发送的链接之后，不能下载洋葱视频客户端，也可以让朋友从应用商店搜索“洋葱视频”下载安装</p>
        <div class="pic"></div>
        <p class="title">3.朋友打开洋葱客户端</p>
        <p class="text">当朋友安装完成后，打开洋葱客户端，点击右下角的红包，</p>
        <div class="pic"></div>
        <p class="title">4.朋友填写邀请码</p>
        <p class="text">新安装的朋友登录成功后，可以看到奖励提醒。<br>1 点击：马上去零钱，进入到任务列表<br>2 点击：填写邀请码</p>
        <div class="pic"></div>
        <p class="title">5.管理徒弟</p>
        <p class="text">朋友填写您的邀请码之后，他就成了您的徒弟。每收一名徒弟最高奖励2000金币，奖励规则见任务页面说明。<br>您可以在收徒赚钱中看到徒弟的列表和每个徒弟的贡献。徒弟每天登录玩洋葱你都收到奖励：<br>1 徒弟看视频，师父 +2金币</p>
        <div class="pic"></div>
        <div class="wechat-group_wrap"></div>
        <p class="footer-msg">本活动解释权归<span class="highlight">洋葱视频</span>所有本活动与苹果公司无关</p>
      </div>
    </div>
  </scroll>
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
.wrapper {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}
.container {
  width: 100%;
  background-image: linear-gradient(
    -171deg,
    #813fd3 0%,
    #9240ba 6%,
    #fc461d 99%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  .head-bg_image {
    width: 100%;
    padding-top: 349px;
    transform-origin: top;
    @include bg-image('../../../static/images/skill/banner', 'jpg');
    background-size: 100%;
  }
  .content {
    flex: 1;
    width: 345px;
    background-color: #fff;
    border-radius: 15px 15px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      width: 170px;
      height: 50px;
      text-align: center;
      font-size: 18px;
      color: #fff;
      line-height: 50px;
      border-radius: 2px 25px 2px 25px;
      background-color: #ffc900;
      margin-top: 30px;
    }
    .text {
      font-size: 16px;
      color: #333;
      padding: 0 10px;
      line-height: 1.4;
      margin-top: 30px;
      text-align: justify;
    }
    .pic {
      min-width: 335px;
      min-height: 203px;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center top;
      margin-top: 30px;
      &:nth-of-type(1) {
        @include bg-image('../../../static/images/skill/fasongyaoqinglianjie', 'jpg');
      }
      &:nth-of-type(2) {
        @include bg-image('../../../static/images/skill/xiazaianzhuang', 'jpg');
      }
      &:nth-of-type(3) {
        @include bg-image('../../../static/images/skill/pengxaaz', 'jpg');
      }
      &:nth-of-type(4) {
        @include bg-image('../../../static/images/skill/dakaiyangcongshipinkehuduan', 'jpg');
      }
      &:nth-of-type(5) {
        @include bg-image('../../../static/images/skill/pengyoutianxieyaoqingma', 'jpg');
      }
      &:nth-of-type(6) {
        @include bg-image('../../../static/images/skill/guanlitudi', 'jpg');
      }
    }
    .wechat-group_wrap {
      width: 345px;
      height: 179px;
      @include bg-image('../../../static/images/skill/222', 'jpg');
      margin-top: 30px;
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .footer-msg {
      width: 224px;
      text-align: center;
      font-size: 16px;
      color: #f85626;
      line-height: 1.4;
      padding: 0 0 20px;
      .highlight {
        font-size: 20px;
      }
    }
  }
}
</style>
