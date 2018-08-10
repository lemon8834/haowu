<template>
  <div class="container">
    <div class="header">
      <span class="back" @click="back"></span>
      <p class="header-title">天天拆红包</p>
      <span></span>
    </div>
    <div class="content">
      <p class="rules-btn" @click="rules"></p>
      <div class="carousel-wrap">
        <div class="carousel-inner" ref="carouselInner">
          <div class="carousel-item" v-for="(item, index) in avatars" :key="index">
            <img class="avatar" :src="item.avatar" alt="">
            <p class="text">15秒前拆得<span class="highlight">{{item.money}}</span>元</p>
          </div>
        </div>
      </div>
      <!-- 活动默认页 -->
      <div class="content-bg_image" v-if="states.shareNum == 0">
        <p class="activity-msg">最高88元红包</p>
        <p class="expired-msg">{{states.notice}}</p>
        <div class="open-wrap" @click="openRedPacket">
          <img class="open-wrap_icon tada" src="../../../static/images/reg_packet_activity_images/6@2x.png" alt="">
          <span class="open-wrap_text">立即领取</span>
        </div>
      </div>
      <!-- 活动详情页 -->
      <div class="inner" v-else>
        <p class="title-image"></p>
        <div class="red-packet_info">
          <p class="money-wrap" v-show="redPackData.status == 1 & states.shareNum > 0">已拆得<span class="money">{{diff(redPackData.totalMoney, redPackData.surplus)}}</span>元<span class="info_msg">可提现</span></p>
          <p class="money-wrap" v-show="states.shareNum == 0">您的红包还未被拆开</p>
          <p class="money-wrap" v-show="redPackData.status == 2">已成功拆得<span class="money">{{redPackData.totalMoney}}</span>元<span class="info_msg">可提现</span></p>
        </div>
        <div class="open-wrap" v-show="redPackData.status == 1" @click="sharePanel">
          <img class="open-wrap_icon tada" src="../../../static/images/reg_packet_activity_images/6@2x.png" alt="">
          <span class="open-wrap_text">发送给好友帮我拆</span>
        </div>
        <div class="open-wrap" v-show="redPackData.status == 2" @click="withdrawCash">
          <img class="open-wrap_icon tada" src="../../../static/images/reg_packet_activity_images/6@2x.png" alt="">
          <span class="open-wrap_text">立即领取</span>
        </div>
        <div class="tips-wrap" v-if="isEnd == 0">
          <div class="count-down_wrap">
            <span class="count-down_box">{{countDown.hours}}</span>
            <span class="symbol">:</span>
            <span class="count-down_box">{{countDown.minutes}}</span>
            <span class="symbol">:</span>
            <span class="count-down_box">{{countDown.seconds}}</span>
          </div>
          <span class="tips-text">后红包将消失，赶紧拆哦</span>
        </div>
        <div class="list-wrap" v-if="states.shareNum > 0">
          <div class="list-item" @click="viewPanel" v-for="item in redPackData.helpers" :key="item.uid">
            <div class="user-info">
              <img class="avatar" :src="item.headface" alt="">
              <span class="nick">{{item.nick}}</span>
            </div>
            <div class="money-msg">
              <span class="money-text">{{item.money}}</span>
              <img class="icon" src="../../../static/images/reg_packet_activity_images/8@2x.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <!-- 弹出层 -->
      <div class="mask-wrap" v-show="mask">
        <div class="mask" @click="closeMask"></div>
        <div class="mask-inner rules-panel" v-show="current==5">
          <p class="title">活动规则</p>
          <div class="rules-content">
            <p class="text">活动规则</p>
            <p class="text">1、获得红包后，需分享给好友请好友帮忙拆开。每位好友可帮忙拆开随机金额，全部拆开即可领取成功！分享越多，提现越快！</p>
            <p class="text">2、红包获得后，有效期为24小时，需在有效期内拆开才可提现，未拆开则红包逾期失效。</p>
            <p class="text">3、发起拆红包的用户需在当前红包全部拆完提现成功或逾期失败后，才可再发起拆下一个红包。</p>
            <p class="text">4、每个用户每天最多可以领取3个现金红包。每个用户每天有1次帮拆机会。</p>
            <p class="text">5、若发现用户存在刷单、虚假用户帮拆等违规行为，平台有权取消用户的活动资格。</p>
            <p class="text">*洋葱视频可在法律法规允许范围内对本次活动规则进行解释并做适当的修改</p>
          </div>
        </div>
        <!-- 未领取红包关闭确认 -->
        <div class="mask-inner message-box" v-show="current==-1">
          <p class="box-text">你的现金红包还未领取24：00过期</p>
          <div class="bottom-btn">
            <span class="close" @click="closePage">直接离开</span>
            <span class="open" @click="closeMask">去拆现金</span>
          </div>
        </div>
        <!-- 领取红包面板 -->
        <div class="mask-inner default-rp" v-show="current==0">
          <p class="mask-msg">{{userInfo.assistInfo}}</p>
          <img class="avatar" :src="userInfo.headface" alt="">
          <p class="message-text">恭喜你获得</p>
          <p class="money-wrap"><span class="money">{{userInfo.money}}</span>元<span class="msg-image"></span></p>
          <div class="btn-wrap" @click="sharePanel">
            <img class="icon tada" src="../../../static/images/reg_packet_activity_images/6@2x.png" alt="">
            <span class="text">分享后即可拆得</span>
          </div>
        </div>
        <!-- 关闭确认 -->
        <div class="mask-inner default-rp" v-show="current==1">
          <img class="avatar" :src="userInfo.headface" alt="">
          <p class="message-text">恭喜你获得</p>
          <p class="money-wrap"><span class="money">{{userInfo.money}}</span>元<span class="msg-image"></span></p>
          <p class="tips-text">你的现金红包还未领取24：00后过期</p>
          <div class="bottom-btn">
            <span class="close" @click="closePage">直接离开</span>
            <span class="open" @click="sharePanel">去拆现金</span>
          </div>
        </div>
        <!-- 分享面板 -->
        <transition name="slide">
          <div class="share-panel" v-show="current==2">
            <p class="message-text_bottom" v-show="states.shareNum==0">分享后返回洋葱视频，即可拆现金红包</p>
            <p class="message-text_top" v-show="states.shareNum==0 && states.isUnderway == 1">{{redPackData.assistInfo}}</p>
            <p class="message-text_top" v-show="states.shareNum==1"><span>{{redPackData.assistInfo}}</span><br>分享后返回洋葱视频，即可拆第二份红包</p>
            <p class="message-text_top" v-show="states.shareNum>1"><span>{{redPackData.assistInfo}}</span><br>还差<span class="highlight">{{redPackData.surplus}}</span>元提现，发给好友继续拆红包吧红包有效期仅剩<span class="highlight">{{countDown.hours}}：{{countDown.minutes}}：{{countDown.seconds}}</span></p>
            <div class="btn-wrap" @click="wechatShare">
              <span class="btn-icon wechat"></span>
              <span class="btn-name">微信</span>
            </div>
          </div>
        </transition>
        <!-- 帮拆信息面板 -->
        <div class="mask-inner list-panel" v-show="current==3">
          <div class="close" @click="closeMask"></div>
          <div class="title-wrap">
            <p class="first-line">已帮你拆得{{diff(redPackData.totalMoney, redPackData.surplus)}}元</p>
            <p class="second-line">还差<span class="highlight">{{redPackData.surplus}}元</span>提现</p>
          </div>
          <div class="scroll-list_wrap">
            <!-- <div class="cover"></div> -->
            <ul class="scroll-list_inner">
              <li class="list-item" v-for="item in redPackData.helpers" :key="item.uid">
                <div class="user-info">
                  <img class="avatar" :src="item.headface" alt="">
                  <span class="nick">{{item.nick}}</span>
                </div>
                <div class="money-msg">
                  <span class="text">{{item.money}}</span>
                  <img class="icon" src="../../../static/images/reg_packet_activity_images/8@2x.png" alt="">
                </div>
              </li>
            </ul>
          </div>
          <div class="btn-wrap" @click="sharePanel">
            <img class="icon tada" src="../../../static/images/reg_packet_activity_images/3@2x.png" alt="">
            <span class="text">发给好友，帮我拆</span>
          </div>
        </div>
        <!-- 提现信息面板 -->
        <div class="mask-inner withdraw-cash_panel" v-show="current==4">
          <p class="unpack-msg">您的红包已拆开，可继续拆红包</p>
          <img src="../../../static/images/reg_packet_activity_images/2@2x.png" alt="" class="bg-image">
          <img src="../../../static/images/reg_packet_activity_images/4@2x.png" alt="" class="close" @click="closeMask">
          <div class="panel__inner">
            <p class="message-text">恭喜成功拆得</p>
            <p class="message-text"><span class="money">{{redPackData.totalMoney}}</span>元</p>
            <p class="tip">已存入你的零钱<br>(可提现)</p>
            <div class="open-wrap" @click="continueUnPack">
              <img class="open-wrap_icon tada" src="../../../static/images/reg_packet_activity_images/6@2x.png" alt="">
              <span class="open-wrap_text">继续拆红包</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getQueryString } from 'common/js/util'
import { MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      secdata: this.$route.query._secdata,
      mask: false,
      current: -1,
      countDown: {
        hours: '00',
        minutes: '00',
        seconds: '00'
      },
      states: {},
      userInfo: {},
      redPackData: {},
      isEnd: 0,
      avatars: [
        { avatar: 'http://imgcdn.qianqiana.com/2018/0302/024833l82w6Sjz0.jpg-A100', money: '4.78' },
        { avatar: 'http://imgcdn.qianqiana.com/2018/0302/024809VdqG4Krtr.jpg-A100', money: '16.24' },
        { avatar: 'http://imgcdn.qianqiana.com/2018/0302/024802kuv224l3g.jpg-A100', money: '3.65' },
        { avatar: 'http://imgcdn.qianqiana.com/2018/0301/165605MgzfoaU3J.jpg-A100', money: '5.86' }
      ]
    }
  },
  methods: {
    rules() {
      this.mask = true
      this.current = 5
    },
    openRedPacket() {
      if(this.states.isStart == 1) {
        if(!this.userInfo.packId) {
          this._getPackData()
        }
        this.mask = true
        this.current = 0
      }else {
        MessageBox.alert('参与次数以上限，请明天继续参加', '提示')
      }
    },
    closeMask() {
      this.mask = false
      this.current = -1
    },
    back() {
      if(this.states.isUnderway == 0) {
        this.current = -1
        this.mask = true
      } else {
        if(this.current != 0) {
          window.location.href = 'closepage::closepage'
        } else {
          if(!this.userInfo.packId) {
            this._getPackData()
          }
          this.mask = true
          this.current = 1
        }
      }
    },
    closePage() {
      window.location.href = 'closepage::closepage'
    },
    sharePanel() {
      this.current = 2
      this.mask = true
    },
    wechatShare() {
      window.location.href = `wechatshare::${this.redPackData.share.title},${this.redPackData.share.subTitle},${this.redPackData.share.url}`
    },
    viewPanel() {
      this.current = 3
      this.mask = true
    },
    withdrawCash() {
      this.$axios.get(`${process.env.API_HOST}/index.php?m=member&c=webApi&a=gainUnpack&_secdata=${this.secdata}`)
      .then(res => {
        if(res.data.result === 1) {
          window.location.href = `receivemoney::${parseInt(res.data.data.money)}`
          this.current = 4
          this.mask = true
          this.states.shareNum = 0
          this.states.isUnderway = 0
        }
      })
    },
    continueUnPack() {
      this.mask = false
      this._getHomeData()
    },
    _activityCountDown(endTime) {
      let currentTime = Math.floor(new Date().getTime() / 1000)
      let timestamp = endTime - currentTime
      let hours = Math.floor(timestamp / 60 / 60 % 24)
      let minutes = Math.floor(timestamp / 60 % 60)
      let seconds = Math.floor(timestamp % 60)
      this.countDown.hours = this._pad(hours)
      this.countDown.minutes = this._pad(minutes)
      this.countDown.seconds = this._pad(seconds)
    },
    _pad(num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    _getHomeData() {
      this.$axios.get(`${process.env.API_HOST}index.php?m=member&c=webApi&a=unpackEveryDay&_secdata=${this.secdata}`)
      .then(res => {
        this.states = res.data.data
        console.log(res)
        if(res.data.data.isUnderway == 1) {
          this._getPackInfo()
        } else if(res.data.data.isUnderway == 0 & res.data.data.isPop == 1) {
          this.mask = true
          this.current = 0
          this._getPackData()
        }
        // if(this.states.shareNum >= 0 & this.states.isUnderway == 1) {          
        //   this.current = 2
        //   this.mask = true
        // }
      })
    },
    _getPackData() {
      this.$axios.get(`${process.env.API_HOST}/index.php?m=member&c=webApi&a=createUnpack&_secdata=${this.secdata}`)
      .then(res => {
        this.userInfo = res.data.data
        if(this.states.isUnderway == 0) {
          this.states.isUnderway = 1
        }
        this._getPackInfo()
        console.log(res)
      })
    },
    _getPackInfo() {
      this.$axios.get(`${process.env.API_HOST}/index.php?m=member&c=webApi&a=myUnpackInfo&_secdata=${this.secdata}`)
      .then(res => {
        this.redPackData = res.data.data
        this._activityCountDown(res.data.data.endtime)
        let timer = setInterval(() => {
          let getTime = res.data.data.endtime - (new Date().getTime() / 1000)
          if(getTime < 0) {
            clearInterval(timer)
          }
          this._activityCountDown(res.data.data.endtime)
        }, 1000)
        if(this.states.shareNum > 0 & this.states.isUnderway == 1 & res.data.data.status == 1 & this.current != 0) {
          this.current = 2
          this.mask = true
        }
        if(res.data.data.assistInfo != '') {
          this.current = 2
          this.mask = true
        }
        if(res.data.data.status == 2) {
          this.withdrawCash()
        }
      })
    },
    diff(total, surplus) {
      return (total - surplus).toFixed(2)
    }
  },
  created() {
    this._getHomeData()
  },
  mounted() {
    window.sharePanel = this.sharePanel
    window.closeMask = this.closeMask
  }
}
</script>

<style lang="scss" scoped>
  @import '~common/scss/mixin';
  .container {
    position: relative;
    .header {
      width: 100%;
      height: 44px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 15px;
      p {
        font-size: 18px;
        color: #333;
      }
      span {
        display: inline-block;
        width: 12px;
        height: 19px;
      }
      .back {
        @include bg-image('../../../static/images/reg_packet_activity_images/back', 'png');
        background-size: 100%;
        @include extend-click;
      }
    }
    .content {
      position: absolute;
      top: 44px;
      bottom: 0;
      width: 100%;
      background-image:linear-gradient(-206deg, #e71027 0%, #cb0610 95%);
      .rules-btn {
        width: 56px;
        height: 30px;
        @include bg-image('../../../static/images/reg_packet_activity_images/12', 'png');
        background-size: 100%;
        background-repeat: no-repeat;
        font-size: 14px;
        position: absolute;
        right: 0;
        top: 13px;
        z-index: 101;
      }
      .carousel-wrap {
        width: 100%;
        height: 30px;
        background-color: rgba(0, 0, 0, .2);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
        overflow: hidden;
        .carousel-inner {
          white-space: nowrap;
          animation: barrage 20s linear infinite;
        }
        .carousel-item {
          width: 100%;
          height: 30px;
          display: inline-flex;
          align-items: center;
        }
        .avatar {
          width: 22px;
          height: 22px;
          border-radius: 100%;
          margin-right: 5px;
        }
        .text {
          font-size: 14px;
          color: #fff3ce;
          line-height: 1;
          .highlight {
            color: #f9ad2e;
            font-weight: 600;
          }
        }
      }
    }
    .content-bg_image {
      width: 100%;
      height: 603px;
      @include bg-image('../../../static/images/reg_packet_activity_images/0', 'png');
      background-size: 100%;
      padding-top: 308px;
      box-sizing: border-box;
      .activity-msg {
        color: #fff;
        font-size: 30px;
        text-align: center;
        font-weight: 600;
      }
      .expired-msg {
        width: 234px;
        height: 42px;
        margin: 0 auto;
        margin-top: 10px;
        font-size: 15px;
        color: rgba(255, 255, 255, .8);
        line-height: 1.4;
        text-align: center;
      }
      .open-wrap {
        width: 234px;
        height: 44px;
        border-radius: 44px;
        background-color: #fff680;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        margin-top: 33px;
        .open-wrap_icon {
          width: 21px;
          height: 27px;
          margin-right: 10px;
        }
        .open-wrap_text {
          font-size: 20px;
          color: #e02e24;
          font-weight: 600;
        }
      }
    }
    .inner {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title-image {
        width: 328px;
        height: 58px;
        @include bg-image('../../../static/images/reg_packet_activity_images/1', 'png');
        background-size: 100%;
        background-repeat: no-repeat;
        margin-top: 48px;
      }
      .red-packet_info {
        margin-top: 10px;
        .money-wrap {
          font-size: 24px;
          color: #fff;
          text-align: center;
          position: relative;          
          .money {
            font-size: 50px;
          }
          .info_msg {
            font-size: 15px;
            color: #ffd898;
            margin-left: 20px;
          }
        }
      }
      .open-wrap {
        width: 315px;
        height: 44px;
        border-radius: 44px;
        background-color: #fff680;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        margin-top: 33px;
        .open-wrap_icon {
          width: 21px;
          height: 27px;
          margin-right: 10px;
        }
        .open-wrap_text {
          font-size: 20px;
          color: #e02e24;
          font-weight: 600;
        }
      }
      .tips-wrap {
        width: 315px;
        height: 31px;
        background-color: #ff322e;
        border-radius: 31px;
        margin-top: 15px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        &:before {
          content: '';
          display: block;
          width: 80%;
          height: 15px;
          border-left: 2px solid #ff322e; 
          border-right: 2px solid #ff322e; 
          position: absolute;
          top: -15px;
          left: 0;
          right: 0;
          margin: auto;
        }
        .count-down_wrap {
          display: inline-flex;
          align-items: center;
          .count-down_box {
            width: 20px;
            height: 20px;
            border-radius: 2px;
            background-color: #ba1713;
            display: inline-block;
            font-size: 14px;
            color: #fff;
            text-align: center;
            line-height: 20px;
          }
          .symbol {
            font-size: 20px;
            color: #9e1713;
            padding: 0 3px;
          }
        }
        .tips-text {
          color: #fff;
          font-size: 14px;
          padding-left: 5px;
        }
      }
      .list-wrap {
        width: 315px;
        padding: 15px 10px;
        background-color: #ff322e;
        border-radius: 10px;
        margin-top: 27px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .list-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          color: #fff;
          &+.list-item {
            margin-top: 10px;
          }
        }
        .user-info {
          display: inline-flex;
          align-items: center;
          .avatar {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            margin-right: 5px;
          }
          .nick {
            width: 100px;
            @include nowrap;
          }
        }
        .money-msg {
          display: inline-flex;
          align-items: center;
          .icon {
            width: 18px;
            height: 20px;
            margin-left: 5px;
          }
        }
      }
    }
  }
  .mask-wrap {
    position: fixed;
    width: 100%;
    top: 44px;
    bottom: 0;
    z-index: 199;
    .mask {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .8);
    }
    .mask-inner {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      flex-direction: column;
      &.default-rp {
        width: 264px;
        height: 343px;
        background-color: #fe262a;
        border-radius: 10px;
        padding: 40px 22px 50px;
        .mask-msg {
          width: 375px;
          position: absolute;
          left: -55px;
          top: -5px;
          // margin: auto;
          transform: translate3d(0, -100%, 0);
          color: #fff;
          text-align: center;
          line-height: 1.5;
          font-size: 18px;
        }
        .avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
        }
        .message-text {
          font-size: 20px;
          color: #fff;
          margin-top: 25px;
        }
        .money-wrap {
          font-size: 20px;
          color: #fff;
          margin-top: 10px;
          position: relative;
          .msg-image {
            width: 62px;
            height: 19px;
            display: inline-block;
            position: absolute;
            top: 0;
            right: -50px;
            @include bg-image('../../../static/images/reg_packet_activity_images/9', 'png');
            background-size: 100%;
            background-repeat: no-repeat;
          }
          .money {
            font-size: 46px;
            color: #f8e71c;
            font-weight: 600;
          }
        }
        .tips-text {
          padding: 0 40px;
          font-size: 14px;
          color: #fff;
          line-height: 1.5;
          text-align: center;
          margin-top: 10px;
        }
        .bottom-btn {
          position: absolute;
          height: 50px;
          width: 100%;
          left: 0;
          bottom: 0;
          display: flex;
          border-top: 1px solid #ffd693;
          span {
            flex-basis: 50%;
            font-size: 16px;
            box-sizing: border-box;
            line-height: 50px;
            text-align: center;
            color: #fff;
            &+span {
              border-left: 1px solid #ffd693;
            }
          }
          .close {
            color: rgba(255, 255, 255, .6);
          }
        }
        .btn-wrap {
          width: 100%;
          height: 44px;
          background-color: #fff680;
          border-radius: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 27px;
        }
        .icon {
          width: 21px;
          height: 27px;
          margin-right: 10px;
        }
        .text {
          font-size: 20px;
          color: #e02e24;
          font-weight: 600;
        }
      }
      &.message-box {
        width: 275px;
        height: 130px;
        background-color: #fff;
        border-radius: 8px;
        .box-text {
          font-size: 15px;
          color: #333;
          line-height: 1.5;
          width: 100%;
          box-sizing: border-box;
          padding: 20px 60px 0;
          text-align: center;
        }
        .bottom-btn {
          position: absolute;
          height: 50px;
          width: 100%;
          left: 0;
          bottom: 0;
          display: flex;
          border-top: 1px solid #e8e8e8;
          span {
            flex-basis: 50%;
            font-size: 16px;
            box-sizing: border-box;
            line-height: 50px;
            text-align: center;
            color: #e02e24;
            &+span {
              border-left: 1px solid #e8e8e8;
            }
          }
          .close {
            color: #999;
          }
        }
        .btn-wrap {
          width: 100%;
          height: 44px;
          background-color: #fff680;
          border-radius: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 27px;
        }
      }
      &.withdraw-cash_panel {
        width: 343px;
        height: 417px;
        // @include bg-image('../../../static/images/reg_packet_activity_images/2', 'png');
        // background-size: 343px 417px;
        // background-repeat: no-repeat;
        box-sizing: border-box;
        .panel__inner {
          position: absolute;
          top: 120px;
          width: 100%;
          bottom: 0;
        }
        .unpack-msg {
          position: absolute;
          left: 0;
          right: 0;
          top: -5px;
          margin: auto;
          transform: translate3d(0, -100%, 0);
          text-align: center;
          font-size: 18px;
          color: #fff;
        }
        .close {
          width: 32px;
          height: 32px;
          position: absolute;
          right: 40px;
          top: 30px;
        }
        .message-text {
          width: 100%;
          color: #e02e24;
          font-size: 20px;
          font-weight: 600;
          text-align: center;
          &+.message-text {
            margin-top: 10px;
          }
        }
        .money {
          font-size: 40px;
        }
        .tip {
          font-size: 17px;
          color: #fff;
          margin-top: 50px;
          text-align: center;
          line-height: 1.5;
        }
        .open-wrap {
          width: 220px;
          height: 44px;
          border-radius: 44px;
          background-color: #fff680;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          margin-top: 27px;
          .open-wrap_icon {
            width: 21px;
            height: 27px;
            margin-right: 10px;
          }
          .open-wrap_text {
            font-size: 20px;
            color: #e02e24;
            font-weight: 600;
          }
        }
      }
      &.rules-panel {
        width: 315px;
        height: 450px;
        background-color: #fff;
        border-radius: 18px;
        padding-top: 50px;
        .rules-content {
          padding: 0 30px;
          height: 360px;
          overflow-y: auto;
        }
        .title {
          width: 221px;
          height: 48px;
          @include bg-image('../../../static/images/reg_packet_activity_images/7', 'png');
          background-size: 100%;
          transform: translate3d(0, -50%, 0);
          text-align: center;
          line-height: 48px;
          color: #fff;
          font-size: 22px;
          background-repeat: no-repeat;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          margin: auto;
        }
        .text {
          width: 100%;
          box-sizing: border-box;
          font-size: 16px;
          color: #333;
          line-height: 1.4;
          &+.text {
            margin-top: 10px;
          }
        }
      }
    }
    .share-panel {
      width: 100%;
      height: 130px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0;
      bottom: 0;
      .close-icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        @include bg-image('../../../static/images/reg_packet_activity_images/close', 'png');
        background-size: 100%;
        background-repeat: no-repeat;
        position: absolute;
        top: 20px;
        right: 20px;
        &:before {
          content: '';
          position: absolute;
          top: -10px;
          bottom: -10px;
          left: -10px;
          right: -10px;
        }
      }
      .message-text_top {
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 1.5;
        position: absolute;
        top: -5px;
        left: 28px;
        right: 28px;
        transform: translate3d(0, -100%, 0);
        .highlight {
          color: #e02e24;
          font-weight: 600;
        }
      }
      .message-text_bottom {
        font-size: 16px;
        color: #e02e24;
        position: absolute;
        left: 28px;
        right: 28px;
        top: 8px;
        text-align: center;
      }
      .btn-wrap {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 5px;
      }
      span {
        display: inline-block;
      }
      .btn-icon {
        width: 50px;
        height: 50px;
        &.wechat {
          @include bg-image('../../../static/images/reg_packet_activity_images/10', 'png');
          background-size: 100%;
          background-repeat: no-repeat;
        }
      }
      .btn-name {
        font-size: 11px;
        color: #666;
        margin-top: 5px;
      }
    }
    .list-panel {
      width: 290px;
      height: 343px;
      background: url('../../../static/images/reg_packet_activity_images/13@2x.png') no-repeat;
      background-size: 100%;      
      .close {
        width: 31px;
        height: 31px;
        @include bg-image('../../../static/images/reg_packet_activity_images/4', 'png');
        background-size: 100%;
        background-repeat: no-repeat;
        position: absolute;
        top: -41px;
        right: 5px;
      }
      .title-wrap {
        margin-top: 18px;
      }
      p {
        color: #333;
        text-align: center;
      }
      .first-line {
        font-size: 18px;
        margin-bottom: 5px;
      }
      .second-line {
        font-size: 16px;
        .highlight {
          color: #e02e24;
        }
      }
      .scroll-list_wrap {
        width: 100%;
        height: 135px;
        padding: 15px 15px 0;
        box-sizing: border-box;
        overflow-y: auto;
        margin-top: 35px;
        position: relative;
        .cover {
          width: 100%;
          height: 10px;
          position: absolute;
          bottom: -3px;
          left: 0;
          background-image: linear-gradient(180deg, rgba(255, 255, 255, 0), #fff);
        }
        .list-item {
          width: 100%;
          display: flex;
          justify-content: space-between;
          &+.list-item {
            margin-top: 10px;
          }
          .user-info,
          .money-msg {
            display: inline-flex;
            align-items: center;
            span {
              font-size: 14px;
              color: #333;
            }
          }
          .avatar {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            margin-right: 5px;
          }
          .nick {
            width: 70px;
            @include nowrap;
          }
          .icon {
            width: 18px;
            height: 20px;
            margin-left: 5px;
          }
        }
      }
      .btn-wrap {
        width: 220px;
        height: 44px;
        border-radius: 44px;
        background-color: #fe262a;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 35px;
        .icon {
          width: 21px;
          height: 27px;
          margin-right: 10px;
        }
        .text {
          font-size: 20px;
          color: #fff;
          font-weight: 600;
        }
      }
    }    
  }
  .tada {
    animation: tada 1.1s infinite;
  }
  @keyframes tada {
    from {
      transform: scale3d(1, 1, 1);
    }
    10%,
    20% {
      transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -5deg);
    }
    30%,
    50%,
    70%,
    90% {
      transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 5deg);
    }
    40%,
    60%,
    80% {
      transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -5deg);
    }
    to {
      transform: scale3d(1, 1, 1);
    }
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: all .3s;
  }
  .slide-enter,
  .slide-leave-to {
    transform: translate3d(0, 100%, 0);
  }

  @keyframes barrage {
    0% {
      transform: translate3d(100%, 0, 0);
    }
    100% {
      transform: translate3d(-300%, 0, 0);
    }
  }
</style>
