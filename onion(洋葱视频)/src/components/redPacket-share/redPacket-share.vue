<template>
  <div class="container">
    <div class="red-packet__panel" v-show="redPacketPanel">
      <div class="red-packet__inner">
        <p class="inner__msg">恭喜获得</p>
        <p class="inner__money">￥<span class="money">{{togetherInfo.money}}</span></p>
        <p class="inner__msg1">已存入我的账户</p>
        <p class="inner__msg2">下载洋葱视频App领取，可微信提现</p>
        <a class="download" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo">立即领取</a>
      </div>
    </div>
    <div class="carousel-wrap" wx:if="!isEnd">
      <div class="carousel-inner" ref="carouselInner">
        <div class="carousel-item" v-for="(item, index) in avatars" :key="index">
          <img class="avatar" :src="item.avatar" alt="">
          <p class="text">拆开一个红包获得<span class="highlight">{{item.money}}</span>元</p>
        </div>
      </div>
    </div>
    <scroll class="wrapper" v-if="!isEnd">
      <div class="home-wrap" v-if="!isOpen">
        <div class="home-inner" v-if="users.length">
          <div class="team-member_avatars">
            <div class="avatar__wrap team__leader">
              <p class="avatar__inner">
                <img class="avatar" :src="users[0].headface" alt="">
              </p>
            </div>
            <div class="avatar__wrap">
              <p class="avatar__inner">
                <img v-if="users.length > 1" class="avatar" :src="users[1].headface" alt="">
              </p>
            </div>          
          </div>
          <div class="team-member_avatars">
            <div class="avatar__wrap">
              <p class="avatar__inner">
                <img v-if="users.length > 2" class="avatar" :src="users[2].headface" alt="">
              </p>
            </div>
            <div class="avatar__wrap">
              <p class="avatar__inner">
                <img v-if="users.length > 3" class="avatar" :src="users[3].headface" alt="">
              </p>
            </div>          
          </div>
          <p class="open-btn" @click="open">拆红包</p>
        </div>
      </div>
      <div class="content-wrap" v-else>
        <div class="content-inner">
          <div class="team-member__avatars">
            <div class="avatar__wrap">
              <img class="avatar" :src="users[0].headface" alt="">
            </div>
            <div class="avatar__wrap">
              <img v-if="users.length > 1" class="avatar" :src="users[1].headface" alt="">
            </div>
            <div class="avatar__wrap">
              <img v-if="users.length > 2" class="avatar" :src="users[2].headface" alt="">
            </div>
            <div class="avatar__wrap">
              <img v-if="users.length > 3" class="avatar" :src="users[3].headface" alt="">
            </div>
          </div>
          <p class="message"><span class="nick">{{users[0].nick}}</span>邀你拆红包，只差{{setNum()}}人即可拆分红包</p>
          <p class="time">{{togetherInfo.endtime}}后，红包失效</p>
          <div class="input-gruop">
            <div class="input-wrap">
              <input class="input" type="text" placeholder="手机号码" maxlength="11" v-model="mobile">
            </div>
            <div class="input-wrap">
              <input class="input-code" type="text" placeholder="验证码" maxlength="6" v-model="code">
              <span class="get-code" v-show="!startCountDown" @click="getCode">{{getCodeTxt}}</span>
              <span class="count-down" v-show="startCountDown">{{countDown}}</span>
            </div>
          </div>
          <p class="login-btn" @click="login">注册瓜分现金红包</p>
          <!-- <div class="barrage-item" ref="barrageItem" v-for="item in avatars">
            <img class="item-avatar" :src="item.avatar" alt="">
            <p class="item-text">获得现金<span class="highlight">{{item.money}}</span>元</p>
          </div> -->
        </div>
        <div class="activity-rules__inner">
          <p class="title">活动规则</p>
          <p class="activity-rules__item">1、活动期间，用户每邀请3位好友拆红包，你和好友将获得<span class="highlight">1～88元</span>现金红包。本活动注册用户奖励不计入首次收徒奖励红包。</p>
          <p class="activity-rules__item">2、有效好友：活动期间，邀请的每位好友，在活动页面注册即可视为有效。活动结束后仍未有要求的数量用户参与，则拆分失败。</p>
          <p class="activity-rules__item">3、对于存在违规的用户，平台将取消其参加活动的资格，并扣除所有奖励，请遵守平台规则，正常邀请好友。</p>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import { getQueryString } from 'common/js/util'
import Scroll from 'components/scroll/scroll'
export default {
  components: {
    Scroll
  },
  data() {
    return {
      // activityRulsShow: false,
      avatars: [
        { avatar: 'http://imgcdn.qianqiana.com/2018/0302/024833l82w6Sjz0.jpg-A100', money: '2.73' },
        { avatar: 'http://imgcdn.qianqiana.com/2018/0302/024809VdqG4Krtr.jpg-A100', money: '15.05' },
        { avatar: 'http://imgcdn.qianqiana.com/2018/0302/024802kuv224l3g.jpg-A100', money: '12.65' },
        { avatar: 'http://imgcdn.qianqiana.com/2018/0301/165605MgzfoaU3J.jpg-A100', money: '15.97' }
      ],
      isOpen: false,
      mobile: '',
      code: '',
      getCodeTxt: '获取验证码',
      countDown: 60,
      startCountDown: false,
      redPacketPanel: false,
      memberid: getQueryString('id'),
      togetherInfo: {},
      users: [],
      isEnd: false
    }
  },
  methods: {
    _getTogetherInfo() {
      this.$axios.get(`${process.env.API_HOST}index.php?m=member&c=webApi&a=togetherInfo&id=${this.memberid}`)
      .then(res => {
        if(res.data.result == 1) {
          this.$nextTick(() => {
            this.togetherInfo = res.data.data
            this.users = res.data.data.users
          })
        }else {
          this.isEnd = true
          alert(res.data.errorMsg)
        }
      })
    },
    open() {
      this.isOpen = !this.isOpen
    },
    getCode() {
      if(this.mobile) {
        this.$axios.get(`${process.env.API_HOST}index.php?m=member&c=webApi&a=sendSms&mobile=${this.mobile}`)
        .then(res => {
          if(res.data.result == 1) {
            this.startCountDown = true
            this.timer = setInterval(() => {
              this.countDown --
              if(this.countDown == 0) {
                this.getCodeTxt = '重新获取'
                this.countDown = 60
                this.startCountDown = false
                clearInterval(this.timer)
              }
            }, 1000)
          } else {
            alert(res.data.errorMsg)
          }
        })
      }
    },
    login() {
      if(this.mobile | this.code) {
        this.$axios.get(`${process.env.API_HOST}index.php?m=member&c=webApi&a=login&mobile=${this.mobile}&code=${this.code}&memberid=${this.memberid}&type=together`)
        .then(res => {
          if(res.data.result == 1) {
            this.redPacketPanel = true
          }else {
            alert(res.data.errorMsg)
          }
        })
      }
    },
    setNum() {
      return 4 - this.togetherInfo.involvements
    }
  },
  created() {
    this._getTogetherInfo()
  },
  mounted() {
    
  }
}
</script>
<style lang="scss" scoped>
  @import '~common/scss/mixin';
  .container {
    display: flex;
    min-height: 100vh;
    flex-direction: column; 
    .red-packet__panel {
      position: fixed;
      width: 100%;
      top: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, .4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99;
      .red-packet__inner {
        position: relative;
        width: 297px;
        height: 425px;
        border-radius: 16px;
        @include bg-image('../../../static/images/Group13Copy', 'jpg');
        background-size: 100%;
        padding-top: 130px;
        box-sizing: border-box;
        p {
          text-align: center;
          line-height: 1;
        }
        .inner__msg {
          font-size: 16px;
          color: #854711;
        }
        .inner__money {
          font-size: 30px;
          color: #f85626;
          margin-top: 17px;
          .money {
            font-size: 50px;
          }
        }
        .inner__msg1 {
          font-size: 12px;
          color: #854711;
          margin-top: 4px;
        }
        .inner__msg2 {
          font-size: 14px;
          color: #854711;
          margin-top: 55px;
        }
        .download {
          width: 230px;
          height: 44px;
          border-radius: 44px;
          background-image:linear-gradient(-180deg, #fc8f4e 0%, #f85626 100%);
          display: block;
          font-size: 18px;
          color: #fff;
          text-align: center;
          line-height: 44px;
          margin: 0 auto;
          margin-top: 25px;
        }
      }
    }
    .carousel-wrap {
      width: 100%;
      height: 30px;
      background-color: rgba(0, 0, 0, .2);
      position: fixed;
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
        }
      }
    }
  }
  .wrapper {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
  }
  .home-wrap {
    height: 100%;
    background-image:linear-gradient(135deg, #ff7d3b 0%, #c70425 53%, #ff3c34 100%);
    .home-inner {
      width: 100%;
      height: 603px;
      @include bg-image('../../../static/images/Rectangle', 'png');
      background-size: 100%;
      padding: 7.23rem 2.29rem 0 2.32rem;
      box-sizing: border-box;
      overflow: hidden;
      .team-member_avatars {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        &+.team-member_avatars {
          margin-top: 1.6rem;
        }
      }
      .avatar__wrap {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-image:linear-gradient(-180deg, #fff8a3 0%, #ffee6a 100%);
        box-shadow:0 1px 12px 0 #bf0b32;
        display: flex;
        position: relative;
        &.team__leader {
          &:after {
            content: '队长';
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            transform: translate3d(0, 50%, 0);
            width: 34px;
            height: 18px;
            border-radius: 18px;
            background-color: #f8b953;
            color: #fff;
            font-size: 11px;
            line-height: 18px;
            text-align: center;
            z-index: 5;
          }
        }
      }
      .avatar__inner {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background-color: #fff;
        display: block;
        line-height: 52px;
        text-align: center;
        color: #cfbb9f;
        font-size: 25px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        z-index: 5;
        border: none;
        &:after {
          content: '?';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          z-index: 4;
        }
        .avatar {
          width: 52px;
          height: 52px;
          position: absolute;
          z-index: 5;
          left: 0;
          top: 0;
          border-radius: 100%;
        }
      }
      .open-btn {
        width: 310px;
        height: 50px;
        background-image:linear-gradient(-180deg, #fff25c 0%, #f9ad2e 100%);
        box-shadow:0 2px 7px 0 rgba(195,24,17,0.63);
        text-align: center;
        line-height: 50px;
        color: #854711;
        font-size: 19px;
        border-radius: 50px;
        margin-top: 2.13rem;
        position: absolute;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
      }
    }
  }
  
  .content-wrap {
    background-image:linear-gradient(-180deg, #ffcc74 0%, #ffb08d 90%);
    padding-bottom: 50px;
    .content-inner {
      width: 100%;
      height: 13.81rem;
      @include bg-image('../../../static/images/copy2', 'png');
      background-size: 100%;
      background-repeat: no-repeat;
      padding: 5.84rem 1.52rem 0 1.55rem;
      box-sizing: border-box;
      .team-member__avatars {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .avatar__wrap {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: #fdf9ce;
          border: 2px solid #fff;
          box-shadow:inset 0 0 3px 0 #aa7b3a;
          text-align: center;
          line-height: 44px;
          position: relative;
          &:before {
            content: '?';
            font-size: 22px;
            color: #cfbb9f;
          }
          .avatar {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 4;
          }
        }
        :first-child {
          &:after {
            content: '队长';
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            transform: translate3d(0, 50%, 0);
            width: 34px;
            height: 18px;
            border-radius: 18px;
            background-color: #f8b953;
            color: #fff;
            font-size: 11px;
            line-height: 18px;
            text-align: center;
            z-index: 5;
          }
        }
      }
      .message {
        margin: 15px 0 12px;
        color: #fff;
        text-align: center;
        font-size: 13px;
        line-height: 1;
        .nick {
          display: inline-block;
          width: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          vertical-align: top;
        }
      }
      .time {
        color: #ffd95d;
        font-size: 12px;
        margin-bottom: 10px;
        text-align: center;
      }
      .input-gruop {
        width: 100%;
        height: 100px;
        padding: 0 15px;
        background-color: #fff;
        border-radius: 8px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .input-wrap {
          height: 47px;
          padding: 7px 0;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          input {
            flex-grow: 1;
            height: 100%;
            line-height: 100%;
            border: none;
            font-size: 16px;
            color: #333;
            &::-webkit-input-placeholder {
              color: #dbdbdb;
            }
          }
          .input-code {
            width: 144px;
          }
          span {
            width: 86px;
            height: 33px;
            border-radius: 33px;
            font-size: 14px;
            text-align: center;
            line-height: 33px;
          }
          .get-code {
            background-color: #ff8200;
            color: #fff;
          }
          .count-down {
            background-color: #d3d3d3;
            color: #666;
          }
        }
        :first-child {
          border-bottom: 1px solid #e8e8e8;
        }
      }
      .login-btn {
        width: 100%;
        height: 44px;
        border-radius: 44px;
        background-color: #ffd95d;
        text-align: center;
        line-height: 44px;
        font-size: 16px;
        color: #854711;
        margin-top: 10px;
      }
      .msg-title {
        font-size: 20px;
        color: #854711;
        text-align: center;
        margin-top: 217px;
      }
      .money-wrap {
        font-size: 20px;
        color: #f85626;
        text-align: center;
        margin-top: 34px;
        .money {
          font-size: 60px;
          // font-weight: 800;
        }
      }
      .withdraw-deposit {
        display: block;
        width: 98px;
        height: 30px;
        border-radius: 32px;
        border: 1px solid #854711;
        color: #854711;
        text-align: center;
        line-height: 30px;
        margin: 0 auto;
        margin-top: 16px;
      }
      .download-btn {
        display: block;
        width: 310px;
        height: 50px;
        background-image:linear-gradient(-180deg, #fff25c 0%, #f9ad2e 100%);
        box-shadow:0 2px 7px 0 rgba(195,24,17,0.63);
        border-radius: 50px;
        text-align: center;
        line-height: 50px;
        color: #d0021b;
        font-size: 19px;
        position: absolute;
        bottom: 93px;
        left: 0;
        right: 0;
        margin: auto;
      }
      .barrage-item {
        width: 144px;
        height: 30px;
        border-radius: 30px;
        background-color: rgba(0, 0, 0, .3);
        padding: 4px 8px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        position: absolute;
        animation: barrage 7.5s linear infinite;
        .item-avatar {
          width: 22px;
          height: 22px;
          border-radius: 50%;
        }
        .item-text {
          color: #fff;
          font-size: 12px;
          margin-left: 5px;
          .highlight {
            font-size: 14px;
            color: #fff3ce;
          }
        }
      }
    }
    .activity-rules__inner {
      width: 320px;
      border-radius: 12px;
      background-color: #fff;
      padding: 26px;
      box-sizing: border-box;
      margin: 0 auto;
      .activity-rules__item {
        font-size: 14px;
        color: #333;
        line-height: 1.5;
        .highlight {
          color: #854711;
        }
      }
    }
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
