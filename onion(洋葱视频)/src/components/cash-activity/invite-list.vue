<template lang="html">
  <transition name="slide">
    <div class="prentice">
      <div class="mask-layer" v-show="ruleShow">
        <div class="rules-inner">
          <span class="close" @click.stop="rules"><img src="static/images/welfare/close@2x.png" alt=""></span>
          <h2 class="title">活动规则</h2>
          <div class="rules-scroll">
            <p class="text">活动时间：<br />2018年4月12日-2018年4月22日<br />有效徒弟结算时间：2018年4月25日<br />奖金发放时间：2018年4月27日</p>
            <p class="text">活动期间，用户每完成一个收徒任务，除获得邀请收徒奖励外，有效徒弟达到指定人数，可额获得现金奖励，最高可获得8888元奖励。现金奖励仅可领取一次，以最高达标人数任务奖励计算。</p>
            <p class="text">有效徒弟：活动期间内新收徒的每位徒弟，累积进贡超过50金币，即为有效徒弟。</p>
            <p class="text">对于存在违规的用户，平台将取消其参加活动的资格，并扣除所有奖励，请遵守平台规则，正常邀请好友。</p>
            <p class="text">*洋葱视频可在法律法规允许范围内对本次活动规则进行解释并作适当修改。会按照国家相关规定带扣代缴个人所得税。</p>
          </div>
        </div>
      </div>
      <scroll class="scroll">
        <div class="content">
          <div class="rules" @click="rules">活动规则</div>
          <p class="text">活动时间：4月12日-4月22日</p>
          <div class="list-wrap">
            <div class="list-inner">
              <div class="head">
                <p class="title">徒弟列表</p>
                <div class="wrap">
                  <span>昵称</span>
                  <span>手机号码</span>
                  <span>进贡金币</span>
                  <span>邀请时间</span>
                </div>
              </div>
              <ul class="list">
                <p class="list-msg" v-if="!list.length">本次活动您还有没有新徒弟哦<br>抓紧时间行动起来把</p>
                <li class="item" v-else v-for="item in list" :key="item.memberid">
                  <span class="nick">{{item.nick}}</span>
                  <span class="tel">{{telPhone(item.mobile)}}</span>
                  <span class="contribute">{{item.contribution}}</span>
                  <span class="date">{{item.time}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="share" @click="showActionSheet"><span>立即分享赚现金</span></div>
        </div>
      </scroll>
      <div class="actionSheet-wrap old" v-show="isShowActionSheet">
        <div class="actionSheet-mask" @click.prevent="showActionSheet"></div>
        <div class="actionSheet-inner" :class="isShowActionSheet ? 'slide-up' : ''">
          <div class="btn-group">
            <div class="item" @click="activityShare">
              <i class="icon"></i>  
              <span class="btn-name">朋友圈邀请</span>
            </div>
            <div class="item" @click="activityShare">
              <i class="icon"></i>
              <span class="btn-name">微信邀请</span>
            </div>
            <div class="item" @click="qqInvited">
              <i class="icon"></i>
              <span class="btn-name">QQ邀请</span>
            </div>
          </div>
          <div class="cancel-share" @click="showActionSheet">取消分享</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Scroll from 'components/scroll/scroll'
export default {
  components: {
    Scroll
  },
  data() {
    return {
      ruleShow: false,
      shareShow: false,
      tel: '13948330347',
      list: [],
      isShowActionSheet: false
    }
  },
  created() {
    this.list = this.$route.params.list
    console.log(this.$route.params.list)
  },
  methods: {
    // 显示/隐藏分享modal
    showActionSheet() {
      this.taskShow = false
      this.isShowActionSheet = !this.isShowActionSheet
    },
    rules() {
      this.ruleShow = !this.ruleShow
    },
    share() {
      this.shareShow = !this.shareShow
    },
    telPhone(str) {
      if(str) {
        return str.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")
      }else {
        return '-'
      }
    },
    activityShare() {
      this.isShowActionSheet = false
      window.location.href = 'wechatshareactivityimg::wechatshareactivityimg'
    },
    qqInvited() {
      this.isShowActionSheet = false
      window.location.href = 'qqshareactivityimg::qqshareactivityimg'
    },
  }
}
</script>

<style scoped lang="scss">
  @import '~common/scss/mixin';
  // 拓展点击区域
  @mixin extend-click {
    &:before {
      content: "";
      position: absolute;
      top: -10px;
      bottom: -10px;
      right: -10px;
      left: -10px;
    }
  }

  .prentice {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: #fff;
    .scroll {
      height: 100%;
      overflow: hidden;
    }
    .content {
      width: 100%;
      min-height: 100vh;
      padding-top: 189px;
      padding-bottom: .67rem;
      box-sizing: border-box;
      transform-origin: top;
      background: #f40009 url(../../../static/images/activity_images/cash_out/6@2x.jpg) no-repeat;
      background-size: 100%;
      position: relative;
      .rules {
        width: 2.4rem;
        height: .8rem;
        color: #743f11;
        background-color: #fad516;
        font-size: .37rem;
        border-radius: .8rem 0 0 .8rem;
        line-height: .8rem;
        text-align: center;
        position: absolute;
        right: 0;
        top: .27rem;
      }
      .text {
        font-size: .4rem;
        color: #fff;
        text-align: center;
      }
      .list-wrap {
        width: 100%;
        min-height: 9.33rem;
        display: flex;
        flex-direction: column;
        border-radius: .32rem .32rem 0 0;
        background-color: #fff6e1;
        padding: .4rem;
        box-sizing: border-box;
        margin-top: 10px;
        .list-inner {
          flex: 1;
          background-color: #fff;
          border-radius: .32rem;
          overflow: hidden;
        }
        .head {
          height: 2.4rem;
          width: 100%;
          background-color: #ffaf43;
          padding: .53rem 0 .4rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .title {
            font-size: .48rem;
            color: #743f11;
            text-align: center;
          }
          .wrap {
            display: flex;
            span {
              flex: 0 0 25%;
              color: #743411;
              font-size: .35rem;
              text-align: center;
            }
          }
        }
        .list {
          padding: .4rem 0;
          .list-msg {
            font-size: .43rem;
            color: #743f11;
            margin-top: 20%;
            text-align: center;
            line-height: 1.5;
          }
          .item {
            display: flex;
            span {
              font-size: .29rem;
              color: #743f11;
              flex: 0 0 25%;
              text-align: center;
              display: inline-block;
              white-space: nowrap;
              overflow-x: hidden;
              text-overflow: ellipsis;
            }
            .nick {
              padding: 0 5px;
              text-align: left;              
            }
          }
          .item + .item {
            margin-top: .4rem;
          }
        }
      }
      .share {
        width: 9.2rem;
        height: 1.47rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image:linear-gradient(-180deg, #fff75c 0%, #fba630 100%);
        border-radius: 1.47rem;
        font-size: .53rem;
        color: #743f11;
        margin: 0 auto;
        margin-top: 10px;
        span {
          text-shadow: 1px 1px 0 #ffed86;
        }
      }
    }
  }
  .mask-layer {
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .45);
    z-index: 100;
    .rules-inner {
      width: 310px;
      height: 380px;
      border-radius: 12px;
      background-color: #fff;
      padding: 36px .53rem 15px;
      box-sizing: border-box;
      position: absolute;
      color: #333;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      .rules-scroll {
        height: 288px;
        overflow-y: auto;
        margin-top: 20px;
      }
      .title {
        font-size: 20px;
        text-align: center;
        color: #f40009;
        font-weight: 600;
      }
      .text {
        font-size: .43rem;
        line-height: 1.5;
        text-align: justify;
        &+.text {
          margin-top: .8rem;
        }
      }
    }
    .close {
      width: .48rem;
      height: .48rem;
      position: absolute;
      top: .53rem;
      right: .53rem;
      @include extend-click;
    }
    .share-inner {
      width: 100%;
      height: 4.13rem;
      background-color: #fff;
      position: absolute;
      bottom: 0;
      padding: .67rem 0;
      .title {
        font-size: .51rem;
        color: #333;
        text-align: center;
      }
    }
    .share-group {
      display: flex;
      margin-top: .8rem;
      .item {
        flex: 0 0 33.33%;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        .icon {
          width: 1.49rem;
          height: 1.49rem;
          margin-bottom: .27rem;
        }
        .name {
          font-size: .32rem;
          color: #333;
        }
      }
    }
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
          background-repeat: no-repeat;
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
  .slide-enter-active, .slide-leave-active {
    transition: all .3s;
  }
  .slide-enter, .slide-leave-to {
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
