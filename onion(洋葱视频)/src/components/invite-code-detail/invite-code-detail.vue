<template>
  <transition name="slide">
    <scroll class="scroll">
      <div class="content-wrap">
        <div class="inner">
          <div class="content-box">
            <p class="title-bgimg"></p>
            <p class="title-msg">邀请码是洋葱视频用户的身份标识可在邀请收徒时使用</p>
            <div class="copy-code" @click="copy">
              <span class="btn-msg">点击复制邀请码</span>
              <span class="code">{{code}}</span>
            </div>
          </div>
          <div class="content-box">
            <p class="title-bgimg2"></p>
            <p class="content-text">1.通过分享邀请链接给朋友在线注册，或面对面扫码注册时自动绑定您的邀请码，不需徒弟要再手动输入</p>
            <img src="../../../static/images/activity_images/cash_out/19@2x.jpg" alt="" class="content-img">
            <p class="content-text">2.若您的好友是通过手机应用商店搜索“洋葱视频”安装注册的，需登录后输入您的邀请码后才能成为您的徒弟</p>
            <img src="../../../static/images/activity_images/cash_out/20@2x.jpg" alt="" class="content-img">
          </div>
        </div>
      </div>
      <div class="share-wrap">
        <p class="share-btn" @click="showActionSheet">分享</p>
      </div>
      <div class="actionSheet-wrap" v-show="isShowActionSheet">
        <div class="actionSheet-mask" @click.prevent="showActionSheet"></div>
        <div class="actionSheet-inner" :class="isShowActionSheet ? 'slide-up' : ''">
          <div class="btn-group">
            <div class="item" @click="momentsInvited">
              <i class="icon"></i>  
              <span class="btn-name">朋友圈邀请</span>
            </div>
            <div class="item" @click="wechatInvited">
              <i class="icon"></i>
              <span class="btn-name">微信邀请</span>
            </div>
            <div class="item" @click="qqInvited">
              <i class="icon"></i>
              <span class="btn-name">QQ邀请</span>
            </div>
            <div class="item" @click="SMSInvited">
              <i class="icon"></i>
              <span class="btn-name">短信邀请</span>
            </div>
            <div class="item" @click="massInvited">
              <i class="icon"></i>
              <span class="btn-name">群发邀请</span>
            </div>
            <div class="item" @click="scanAQRCode">
              <i class="icon"></i>
              <span class="btn-name">面对面邀请</span>
            </div>
          </div>
          <div class="cancel-share" @click="showActionSheet">取消分享</div>
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
    copy() {
      window.location.href = `copyinvitecode::${this.code}`
    },
    // 显示/隐藏分享modal
    showActionSheet() {
      this.isShowActionSheet = !this.isShowActionSheet
    },
    wechatInvited() {
      window.location.href = 'wechat::wechat'
      this.isShowActionSheet = !this.isShowActionSheet
    },
    momentsInvited() {
      window.location.href = `moments::moments`
      this.isShowActionSheet = !this.isShowActionSheet
    },
    qqInvited() {
      window.location.href = 'qq::qq'
      this.isShowActionSheet = !this.isShowActionSheet
    },
    SMSInvited() {
      window.location.href = 'smsinvited::smsinvited'
      this.isShowActionSheet = !this.isShowActionSheet
    },
    massInvited() {
      window.location.href = 'massinvited::massinvited'
      this.isShowActionSheet = !this.isShowActionSheet
      // this.$router.push({
      //   path: '/massInvited'
      // })
    },
    scanAQRCode() {
      window.location.href = 'scanaqrcode::scanaqrcode'
      this.isShowActionSheet = !this.isShowActionSheet
    }
  },
  data() {
    return {
      code: '',
      isShowActionSheet: false
    }
  },
  created() {
    this.code = this.$route.query.code || 'A00100000'
  }
}
</script>

<style lang="scss" scoped>
  @import '~common/scss/mixin';
  .content-wrap {
    background-color: #f2f2f2;
    .inner {
      padding: 10px 15px 100px;
    }
    .content-box {
      background-color: #fff;
      padding: 20px 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      &.content-box {
        margin-top: 10px;
      }
      .title-bgimg {
        width: 169px;
        height: 24px;
        @include bg-image('../../../static/images/activity_images/cash_out/22', 'jpg');
        background-size: 100%;
        background-repeat: no-repeat;
      }
      .title-bgimg2 {
        width: 169px;
        height: 24px;
        @include bg-image('../../../static/images/activity_images/cash_out/23', 'jpg');
        background-size: 100%;
        background-repeat: no-repeat;
      }
      .title-msg {
        width: 210px;
        font-size: 14px;
        color: #333;
        text-align: center;
        line-height: 2;
      }
      .copy-code {
        width: 191px;
        height: 57px;
        border: 1px solid #f40009;
        border-radius: 57px;
        margin-top: 10px;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #f40009;
        .btn-msg {
          font-size: 14px;
        }
        .code {
          font-size: 24px;
          margin-top: 5px;
        }
      }
      .content-text {
        font-size: 15px;
        color: #333;
        line-height: 1.4;
        margin-top: 15px;
      }
      .content-img {
        width: 225px;
        display: block;
        margin: 10px 0 0;
      }
    }
  }
  .share-wrap {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    .share-btn {
      width: 345px;
      height: 50px;
      border-radius: 50px;
      background-color: #f40009;
      color: #fff;
      font-size: 20px;
      text-align: center;
      line-height: 50px;
    }
  }
  .scroll {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    background-color: #f2f2f2;
    z-index: 99;
  }

  .actionSheet-wrap {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 199;
    &.old {
      .actionSheet-inner {
        height: 165px;
        .btn-group {
          padding: 25px 20px 0;
        }
        .item {
          flex: 0 0 50px;
          &:nth-child(4) .icon {
            @include bg-image('../../../static/images/share_qzone', 'png');
          }
          &:nth-child(5) .icon {
            @include bg-image('../../../static/images/share_sina', 'png');
          }
        }
      }
    }
    .actionSheet-mask {
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, .6);
    }
    .actionSheet-inner {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 268px;
      background-color: #f3f2f2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: block .3s;      
      .btn-group {
        width: 100%;
        padding: 25px 10px 0;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .item {        
        flex: 0 0 33.33%;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        font-size: 10px;
        color: #333;
        padding-bottom: 25px;
        .icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-size: 100%;
          display: inline-block;
          background-size: 100%;
        }
        &:nth-child(1) .icon {
          @include bg-image('../../../static/images/share_pyq', 'png');
        }
        &:nth-child(2) .icon {
          @include bg-image('../../../static/images/share_wechat', 'png');
        }
        &:nth-child(3) .icon {
          @include bg-image('../../../static/images/share_qq', 'png');
        }        
        &:nth-child(4) .icon {
          @include bg-image('../../../static/images/share_b', 'png');
        }
        &:nth-child(5) .icon {
          @include bg-image('../../../static/images/share_a', 'png');
        }
        &:nth-child(6) .icon {
          @include bg-image('../../../static/images/share_qrcode', 'png');
        }
        .btn-name {
          display: inline-block;
          margin-top: 10px;
        }
      }
      .cancel-share {
        width: 100%;
        height: 44px;
        background-color: #fff;
        font-size: 16px;
        color: #333;
        text-align: center;
        line-height: 44px;
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

  .slide-up {
    animation: slide-up .3s 1;
  }

  @keyframes slide-up {
    0% {
      transform: translate3d(0, 100%, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
</style>
