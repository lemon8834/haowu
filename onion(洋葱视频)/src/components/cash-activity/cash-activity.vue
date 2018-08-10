<template>
  <div class="scroll-wrap">
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
    <div class="rules" @click.stop="rules"></div>
    <scroll class="scroll">
      <div class="content">
        <!-- <p class="welfare-date">活动时间：12月20日-1月10日</p> -->
        <div class="header">
          <div class="msg">
            <span class="num">{{info.total}}</span>
            <span class="text">邀请徒弟</span>
          </div>
          <div class="msg">
            <span class="num">{{info.valid}}</span>
            <span class="text">有效徒弟</span>
          </div>
          <div class="msg">
            <span class="num">{{reward(info.total)}}</span>
            <span class="text">预计奖励</span>
          </div>
          <div class="prentice-btn" @click="prentice">徒弟<br />列表</div>
        </div>
        <div class="acquire">
          <img class="icon" src="static/images/welfare/acquire-icon@2x.png" alt="">
          <span>您已获得奖金：{{reward(info.valid)}}元</span>
        </div>
        <div class="task-wrap">
          <div class="head">
            <span class="text">第{{someTask()}}个任务红包</span>
            <span class="text">邀请{{info.total}}/{{inviteNum()}}人</span>
          </div>
          <div class="task-inner">
            <div class="row" v-for="item in task">
              <div :class="getCls(child.order)" v-for="(child, index) in item" @click="select(child)" :key="index">
                <p class="avatar-wrap" v-show="child.order == someTask()"><img class="avatar" :src="userinfo.smallHeadface" alt=""></p>
                <span class="order">{{child.order}}</span>
                <span class="num">{{child.num}}元</span>
                <span class="msg">收徒{{child.msg}}人</span>
              </div>
            </div>
          </div>
        </div>
        <div class="msg-wrap">
          <p class="msg-text">1.每收到一位有效徒弟最多可奖励2100金币,分7次奖励。</p>
          <p class="msg-text">2.第1次奖励发放条件:徒弟下载并登录App奖励200金币,徒弟完成签到再奖励100金币。</p>
          <p class="msg-text">3.其他6次奖励发放条件:徒徒弟每日进贡达到50金币时,即可获得300金币奖励,每个徒弟每天仅奖励1次。</p>
          <p class="msg-text">有效徒弟：活动期间内新收的每位徒弟，累积进贡超过50金币，即为有效徒弟。</p>
        </div>
        <p class="view-invite" @click="viewQuestions">查看如何收徒</p>
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
    <div class="mask-layer" v-show="taskShow">
      <div class="task-inner">
        <img class="msg-icon" v-show="msgShow" src="static/images/welfare/ing@2x.png" alt="">
        <img class="msg-icon" v-show="isFulfil" src="static/images/welfare/wc@2x.png" alt="">
        <span class="close" @click="select"><img src="static/images/welfare/close@2x.png" alt=""></span>
        <p class="title">第{{order}}个任务</p>
        <img class="icon" src="static/images/welfare/task-icon.png" alt="">
        <p class="num">{{num}}元</p>
        <div class="msg">
          <p v-if="unfinished">请先完成上一个任务~</p>
          <p v-if="isFulfil">已收取{{msg}}名徒弟</p>
          <p v-if="msgShow">已收取{{info.total}}名徒弟</p>
          <p v-if="msgShow">还差{{overNum}}名徒弟</p>
        </div>
        <div class="share-btn" @click="showActionSheet">立即分享赚现金</div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import Scroll from 'components/scroll/scroll'
export default {
  components: {
    Scroll
  },
  data() {
    return {
      info: {},
      task: [
        [
          { 'order': 1, 'num': 5, 'msg': 2 },
          { 'order': 2, 'num': 12, 'msg': 4 },
          { 'order': 3, 'num':21, 'msg': 6 }
        ],
        [
          { 'order': 4, 'num': 48, 'msg': 12 },
          { 'order': 5, 'num': 135, 'msg': 30 },
          { 'order': 6, 'num': 300, 'msg': 60}
        ],
        [
          { 'order': 7, 'num': 550, 'msg': 100 },
          { 'order': 8, 'num': 1200, 'msg': 200 },
          { 'order': 9, 'num': 2800, 'msg': 400 }
        ],
        [
          { 'order': 10, 'num': 8888, 'msg': 1000 }
        ]
      ],
      inviteArr: [2, 4, 6, 12, 30, 60, 100, 200, 400, 1000],
      bonusArr: [5, 12, 21, 48, 135, 300, 550, 1200, 2800, 8888],
      ruleShow: false,
      shareShow: false,
      taskShow: false,
      order: 0,
      num: '',
      overNum: 0,
      msg: 0,
      msgShow: false,
      isFulfil: false,
      unfinished: false,
      secdata: this.$route.query._secdata,
      userinfo: {},
      isShowActionSheet: false
    }
  },
  created() {
    this._getInfo()
  },
  methods: {
    _getInfo() {
      this.$axios.get(`${process.env.API_HOST}index.php?m=member&c=webApi&a=activityInfo&_secdata=${this.secdata}`).then((res) => {
        this.info = res.data.data
        this.userinfo = res.data.data.userinfo
      })
    },
    _getQueryString(name) {
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.hash.split("?")[1].match(reg);
      if(r!=null)return  unescape(r[2]); return null;
    },
    prentice() {
      // window.location.href = 'routerlink::routerlink'
      this.$router.push({
        name: 'inviteList',
        path: '/cashActicity/1',
        params: {
          list: this.info.inviteList
        }
      })
    },
    select(item) {
      this.order = item.order
      this.num = item.num
      this.msg = item.msg
      this.overNum =  item.msg - this.info.total
      this.taskShow = !this.taskShow
      if(this.info.total >= item.msg) {
        this.isFulfil = true
      }else {
        this.isFulfil = false
      }
      if(this.info.total < item.msg) {
        this.msgShow = true
      }else {
        this.msgShow = false
      }
      if(this.someTask() < item.order) {
        this.unfinished = true
        this.msgShow = false
      }else {
        this.unfinished = false
      }
    },
    rules() {
      this.ruleShow = !this.ruleShow
    },
    share() {
      this.shareShow = !this.shareShow
    },
    taskShare() {
      this.taskShow = false
      this.shareShow = true
    },
    activityShare() {
      this.isShowActionSheet = false
      window.location.href = 'wechatshareactivityimg::wechatshareactivityimg'
    },
    qqInvited() {
      this.isShowActionSheet = false
      window.location.href = 'qqshareactivityimg::qqshareactivityimg'
    },
    // 显示/隐藏分享modal
    showActionSheet() {
      this.taskShow = false
      this.isShowActionSheet = !this.isShowActionSheet
    },
    reward(num) {
      if(num >= 2 && num < 4) {
        return 5
      }else if(num >= 4 && num < 6) {
        return 12
      }else if(num >= 6 && num < 12 ) {
        return 21
      }else if(num >= 12 && num < 30) {
        return 48
      }else if(num >= 30 && num < 60) {
        return 135
      }else if(num >=60 && num < 100) {
        return 300
      }else if(num >= 100 && num < 200) {
        return 550
      }else if(num >= 200 && num < 400) {
        return 1200
      }else if(num >= 400 && num < 1000) {
        return 2800
      }else if(num >= 1000) {
        return 8888
      }else {
        return 0
      }
      // for(var i = 0; i < this.inviteArr.length; i++) {
      //   if(num >= this.inviteArr[i] && num < this.inviteArr[i+1]) {
      //     return this.bonusArr[i]
      //   }else if(num >= this.inviteArr[15]) {
      //     return this.bonusArr[15]
      //   }else {
      //     return 0
      //   }
      // }
    },
    someTask() {
      let total = this.info.total
      for(var i = 0; i < this.inviteArr.length; i++) {
        if(total < this.inviteArr[0]) {
          return 1
        }else if(total >= this.inviteArr[i] && total < this.inviteArr[i+1] && this.inviteArr[i+1] != undefined) {
          return i + 2
        }else if(total >= this.inviteArr[15]) {
          return 16
        }
      }
    },
    inviteNum() {
      switch(this.someTask()) {
        case 1:
          return 2
          break;
        case 2:
          return 4
          break;
        case 3:
          return 6
          break;
        case 4:
          return 12
          break;
        case 5:
          return 30
          break;
        case 6:
          return 60
          break;
        case 7:
          return 100
          break;
        case 8:
          return 200
          break;
        case 9:
          return 400
          break;
        case 10:
          return 1000
          break;
      }
    },
    getCls(idx) {
      if(idx <= this.someTask()) {
        return 'task-item-active'
      } else {
        return 'task-item-default'
      }
    },
    viewQuestions() {
      window.location.href = 'routerlink::routerlink'
      this.$router.push({
        path: '/questions/2'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~common/scss/mixin';
  @mixin extend-click() {
    &:before {
      content: '';
      position: absolute;
      top: -10px;
      bottom: -10px;
      left: -10px;
      right: -10px;
    }
  }
  @keyframes bounce {
    from, 20%, 53%, 80%, to {
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      transform: translate3d(0,0,0);
    }
    40%, 43% {
      animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
      transform: translate3d(0, -.4rem, 0);
    }
    70% {
      animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
      transform: translate3d(0, -.2rem, 0);
    }
    90% {
      transform: translate3d(0,-.05rem,0);
    }
  }

  .scroll-wrap {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    .scroll {
      height: 100%;
      overflow: hidden;
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
      .task-inner {
        width: 7.73rem;
        height: 9.6rem;
        border-radius: .32rem;
        background-color: #FFF6E1;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 1.07rem 0 .8rem;
        text-align: center;
        .msg-icon {
          position: absolute;
          left: 0;
          top: 0;
          width: 1.92rem;
          height: 1.92rem;
        }
        .title {
          font-size: .48rem;
          color: #333;
          font-weight: 800;
        }
        .icon {
          width: 2.67rem;
          height: 2.37rem;
        }
        .num {
          font-size: .8rem;
          color: #f40009;
          font-weight: 800;
        }
        .msg {
          font-size: .4rem;
          color: #333;
        }
        .msg p + p {
          margin-top: .16rem;
        }
        .share-btn {
          background-image:linear-gradient(0deg, #e84106 0%, #ff9a46 100%);
          border-radius:1.47rem;
          width:6.4rem;
          height:1.47rem;
          text-align: center;
          line-height: 1.47rem;
          color: #fff;
          font-size: .48rem;
          font-weight: 600;
        }
      }
    }
  }
  .rules {
    width: 2.4rem;
    height: .8rem;
    font-size: .37rem;
    border-radius: .8rem 0 0 .8rem;
    @include bg-image('../../../static/images/activity_images/cash_out/7', 'jpg');
    background-size: 100%;
    background-repeat: no-repeat;
    position: fixed;
    right: 0;
    top: .27rem;
    z-index: 50;
  }
  .content {
    width: 100%;
    min-height: 100vh;
    padding: 233px .4rem .72rem;
    box-sizing: border-box;
    transform-origin: top;
    background: #e02e24 url(../../../static/images/activity_images/cash_out/6@2x.jpg) no-repeat;
    background-size: 100%;
    position: relative;
    .welfare-date {
      font-size: .4rem;
      color: #fff;
      text-align: center;
    }
    .header {
      width: 100%;
      height: 2.24rem;
      background-color: #fff6e1;
      box-shadow: 0 .05rem .16rem 0 rgba(172, 42, 2, .59);
      border-radius: .32rem;
      // margin-top: .67rem;
      position: relative;
      padding: .59rem 0;
      box-sizing: border-box;
      display: flex;
      .msg {
        flex: 0 0 33.33%;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        .num {
          font-size: .59rem;
          color: #d04802;
        }
        .text {
          font-size: .37rem;
          color: #743f11
        }
      }
      .msg + .msg {
        border-left: 1px solid #ff7b27;
      }
      .prentice-btn {
        width: 1.33rem;
        height: 1.33rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        background-color: #ff7b27;
        border: .05rem solid #ffd0a1;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
        transform: translate3d(0, -50%, 0);
        color: #fff;
        font-size: .37rem;
      }
    }
    .acquire {
      width: 5.39rem;
      height: .91rem;
      background-color: rgba(108, 34, 7, .3);
      color: #fff;
      font-size: .43rem;
      position: relative;
      line-height: .91rem;
      padding-left: 1.07rem;
      box-sizing: border-box;
      border-radius: .91rem;
      margin: .53rem auto;
      .icon {
        width: 1.01rem;
        height: 1.01rem;
        position: absolute;
        top: 50%;
        left: -.11rem;
        transform: translate3d(0, -50%, 0);
      }
    }
    .task-wrap {
      width: 100%;
      border-radius: .32rem;
      overflow: hidden;
      .head {
        width: 100%;
        height: 1.33rem;
        background-color: #ffaf43;
        padding: 0 .53rem;
        box-sizing: border-box;
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        .text {
          color: #743f11;
          font-size: .43rem;
        }
      }
      .task-inner {
        width: 100%;
        height: 556px;
        padding: .8rem .53rem;
        box-sizing: border-box;
        background: url(../../../static/images/activity_images/cash_out/8@2x.jpg) no-repeat;
        background-size: cover;
        box-shadow:0 2px 6px 0 rgba(175,42,2,0.59);
        border-radius: 0 0 12px 12px;
        .row {
          display: flex;
          justify-content: space-between;
          &:nth-child(even) {
            flex-direction: row-reverse;
          }
          div {
            width: 2.4rem;
            height: 2.67rem;
            padding: .37rem 0 .35rem;
            display: inline-flex;
            align-items: center;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
            border-radius: .32rem;
            margin-bottom: .85rem;
            position: relative;
            .avatar-wrap {
              width: 1.07rem;
              height: 1.07rem;
              border-radius: 50%;
              box-sizing: border-box;
              padding: 2px;
              background-color: #fff;
              position: absolute;
              top: -35%;
              left: -.21rem;
              box-shadow: 0 .05rem .11rem 0 #755132;
              animation: bounce 1.6s infinite;
              &:after {
                content: '';
                display: block;
                border-top: .21rem solid #fff;
                border-left: .16rem solid transparent;
                border-right: .16rem solid transparent;
                border-bottom: .21rem solid transparent;
                position: absolute;
                bottom: -.37rem;
                left: 50%;
                transform: translate3d(-50%, 0, 0);
              }
              .avatar {
                width: 100%;
                border-radius: 50%;
              }
            }
            &.task-item-default {
              box-shadow: 0 .05rem .11rem 0 rgba(135, 135, 135, .4);
              background: url(../../../static/images/welfare/default-bgimage@2x.png) no-repeat;
              background-size: 100% 100%;
              color: #b0a9a3;
              .order {
                width: .64rem;
                height: .64rem;
                background-color: #f4f4f4;
                border-radius: 50%;
                font-size: .4rem;
                text-align: center;
                line-height: .64rem;
              }
              .num {
                font-size: .53rem;
              }
              .msg {
                font-size: .35rem;
              }
            }
            &.task-item-active {
              box-shadow: 0 .05rem .11rem 0 rgba(201, 84, 42, .4);
              background: url(../../../static/images/welfare/active-bgimage@2x.png) no-repeat;
              background-size: 100% 100%;
              .order {
                width: .64rem;
                height: .64rem;
                background-color: #ffcd20;
                border-radius: 50%;
                font-size: .4rem;
                text-align: center;
                line-height: .64rem;
                color: #743f11;
              }
              .num {
                font-size: .53rem;
                color: #f8e71c;
              }
              .msg {
                font-size: .35rem;
                color: #fff;
              }
            }
          }
          &:last-child > div{
            width: 100%;
            margin-bottom: 0;
            background: url(../../../static/images/welfare/last-default-bgimage@2x.png) no-repeat;
            background-size: 100% 100%;
            &.task-item-active {
              background: url(../../../static/images/welfare/last-activebgimage@2x.png) no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
    .msg-wrap {
      width: 345px;
      height: 287px;
      @include bg-image('../../../static/images/activity_images/cash_out/24', 'png');
      background-size: 100%;
      background-repeat: no-repeat;
      margin: 0 auto;
      margin-top: 30px;
      padding: 48px 15px 0;
      box-sizing: border-box;
      .msg-text {
        font-size: 15px;
        color: #fff;
        text-align: justify;
        line-height: 1.4;
        &+.msg-text {
          margin-top: 6px;
        }
      }
    }
    .view-invite {
      font-size: 16px;
      color: #fff;
      text-align: center;
      text-decoration: underline;
      margin: 23px 0 25px;
    }
    .message {
      font-size: .35rem;
      color: rgba(255, 255, 255, .7);
      text-align: center;
    }
    .message + .message {
      margin-top: .21rem;
    }
  }
  .share {
    width: 100%;
    height: 1.47rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image:linear-gradient(-180deg, #fff75c 0%, #fba630 100%);
    border-radius: 1.47rem;
    font-size: .53rem;
    color: #743f11;
    font-weight: 600;
    span {
      text-shadow: 1px 1px 0 #ffed86;
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
