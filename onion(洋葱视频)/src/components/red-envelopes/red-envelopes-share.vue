<template>
  <div class="container">
    <p class="rules-btn" @click="rules"></p>
    <div class="carousel-wrap">
      <div class="carousel-inner" ref="carouselInner">
        <div class="carousel-item" v-for="(item, index) in avatars" :key="index">
          <img class="avatar" :src="item.avatar" alt="">
          <p class="text">15秒前拆得<span class="highlight">{{item.money}}</span>元</p>
        </div>
      </div>
    </div>
    <div class="content-bg_image">
      <div class="avatar-wrap">
        <img :src="packData.headface" alt="" class="avatar">
      </div>
      <p class="help-msg">帮<span class="nick">{{packData.nick}}</span>拆红包吧</p>
      <p class="message">你也能获得最高88元现金</p>
      <div class="login-wrap" @click="alertBox">
        <img class="icon tada" src="../../../static/images/reg_packet_activity_images/6@2x.png" alt="">
        <span class="btn-text">立即领取</span>
      </div>
    </div>
    <div class="mask-wrap" v-show="mask">
      <div class="mask" @click="closeMask"></div>
      <div class="mask-inner pack-info" v-show="current==0">        
        <div class="avatar-wrap">
          <img :src="packData.headface" alt="" class="avatar">
        </div>
        <p class="title-msg">前往APP即可帮我拆</p>
        <div class="pack-content">
          <p class="msg-text">帮拆后回赠您现金</p>
          <p class="money">{{packData.value}}元</p>
          <div class="reg-panel">
            <div class="input-wrap">
              <input type="text" v-model="telNumber" placeholder="输入手机号码" class="mobile">
            </div>
            <div class="input-wrap">
              <input type="text" v-model="code" placeholder="输入验证码" class="code">
              <span class="btn" v-show="!startCountDown" @click="getCode">{{getCodeTxt}}</span>
              <span class="btn count-down" v-show="startCountDown">{{countDown}}</span>
            </div>
          </div>
          <p class="tips">·微信打款到账·</p>
          <div class="login-wrap" @click="login">
            <img class="icon tada" src="../../../static/images/reg_packet_activity_images/6@2x.png" alt="">
            <span class="btn-text">帮他拆，领现金</span>
          </div>
        </div>
      </div>
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
    </div>
  </div>
</template>

<script>
import { MessageBox, Toast } from 'mint-ui'
import { getQueryString } from 'common/js/util'
export default {
  data() {
    return {
      isOpen: false,
      telNumber: '',
      code: '',
      getCodeTxt: '获取验证码',
      startCountDown: false,
      countDown: 60,
      packData: {},
      memberid: this.$route.query.uid,
      id: this.$route.query.id,
      avatars: [
        { avatar: 'http://imgcdn.qianqiana.com/2018/0302/024833l82w6Sjz0.jpg-A100', money: '4.78' },
        { avatar: 'http://imgcdn.qianqiana.com/2018/0302/024809VdqG4Krtr.jpg-A100', money: '16.24' },
        { avatar: 'http://imgcdn.qianqiana.com/2018/0302/024802kuv224l3g.jpg-A100', money: '3.65' },
        { avatar: 'http://imgcdn.qianqiana.com/2018/0301/165605MgzfoaU3J.jpg-A100', money: '5.86' }
      ],
      mask: false,
      current: -1
    }
  },
  mounted() {
    
  },
  methods: {
    closeMask() {
      this.mask = false
      this.current = -1
    },
    rules() {
      this.mask = true
      this.current = 5
    },
    alertBox() {
      this.mask = true
      this.current = 0
    },
    login() {
      if(this.telNumber & this.code) {
        this.$axios.get(`${process.env.API_HOST}/index.php?m=member&c=webApi&a=login&mobile=${this.telNumber}&code=${this.code}&memberid=${this.memberid}&money=${this.packData.value}&type=unpack&checkCode=${this.packData.code}`)
        .then(res => {
          if(res.data.result == 1) {
            // this.$router.push({
            //   path: '/download'
            // })
            // MessageBox.alert('')
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo'
          }else {
            MessageBox.alert(res.data.errorMsg, '提示')
          }
        })
      }else {
        MessageBox.alert('手机号码或验证码为空', '提示')
      }      
    },
    getCode() {
      if(this.telNumber && this.telNumber.length == 11) {
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
        if(this.countDown < 60) {
          return
        }
        this.$axios.get(`${process.env.API_HOST}/index.php?m=member&c=webApi&a=sendSms&mobile=${this.telNumber}`)
        .then(res => {
          if(res.data.result != 1) {
            MessageBox.alert(res.data.errorMsg, '提示')
          }
        })
      }else {
        MessageBox.alert('手机号码为空或不合法', '提示')
      }
           
    },
    _getPaktNum() {
      this.$axios.get(`${process.env.API_HOST}/index.php?m=member&c=webApi&a=getMFUnpack&id=${this.id}`)
      .then(res => {
        this.packData = res.data.data
      })
    }
  },
  created() {
    this._getPaktNum()
  }
}
</script>

<style lang="scss" scoped>
  @import '~common/scss/mixin';
  .container {
    background-image:linear-gradient(-206deg, #e71027 0%, #cb0610 95%);
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button{
      -webkit-appearance: none !important;
      margin: 0;
    }
    .rules-btn {
      width: 56px;
      height: 30px;
      position: absolute;
      right: 0;
      top: 13px;
      z-index: 101;
      @include bg-image('../../../static/images/reg_packet_activity_images/12', 'png');
      background-size: 100%;
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
    .content-bg_image {
      width: 100%;
      height: 603px;
      @include bg-image('../../../static/images/reg_packet_activity_images/14', 'png');
      background-size: 100%;
      padding-top: 222px;
      box-sizing: border-box;
      .activity-msg {
        color: #fff;
        font-size: 30px;
        text-align: center;
      }
      .open-btn {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background-color: #fff680;
        box-shadow:0 1px 4px 0 #ab331c;
        text-align: center;
        line-height: 90px;
        font-size: 44px;
        color: #e02e24;
        font-weight: 600;
        display: block;
        margin: 0 auto;
        margin-top: 20px;
        animation: open .55s infinite alternate;
      }
      .avatar-wrap {
        width: 66px;
        height: 66px;
        border: 2px solid #ffe5a5;
        background-color: #f5e5a5;
        border-radius: 50%;
        margin: 0 auto;
        .avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .help-msg {
        width: 100%;
        font-size: 18px;
        color: #f0e59e;
        font-weight: 600;
        margin-top: 26px;
        display: flex;
        justify-content: center;
        .nick {
          display: inline-block;
          max-width: 120px;
          @include nowrap;
        }
      }
      .message {
        font-size: 22px;
        color: #fff;
        margin-top: 15px;
        text-align: center;
        font-weight: 600;
      }
      .red-packet_info {
        font-size: 24px;
        text-align: center;
        color: #fff;
        margin-top: 20px;
      }
      .money {
        font-size: 50px;
      }
      .info_msg {
        font-size: 15px;
        color: #ffd898;
        margin-left: 5px;
      }
      
      .login-wrap {
        width: 234px;
        height: 44px;
        border-radius: 44px;
        background-color: #fff680;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        margin-top: 55px;
        .icon {
          width: 21px;
          height: 27px;
          margin-right: 10px;
        }
        .btn-text {
          color: #e02e24;
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
    // .get-red_packet {
    //   overflow: hidden;
    //   .title-image {
    //     width: 328px;
    //     height: 58px;
    //     @include bg-image('../../../static/images/reg_packet_activity_images/1', 'png');
    //     background-size: 100%;
    //     margin: 0 auto;
    //     margin-top: 48px;
    //   }
    //   .title-msg {
    //     font-size: 30px;
    //     color: #fff;
    //     margin-top: 38px;
    //     text-align: center;
    //   }
    //   .red-packet_info {
    //     font-size: 24px;
    //     text-align: center;
    //     color: #fff;
    //     margin-top: 20px;
    //   }
    //   .money {
    //     font-size: 50px;
    //   }
    //   .info_msg {
    //     font-size: 15px;
    //     color: #ffd898;
    //     margin-left: 5px;
    //   }
    //   .reg-panel {
    //     padding: 0 65px;
    //   }
    //   .input-wrap {
    //     width: 100%;
    //     height: 44px;
    //     border-radius: 44px;
    //     background-color: #fff;
    //     display: flex;
    //     overflow: hidden;
    //     &+.input-wrap {
    //       margin-top: 12px;
    //     }
    //     input {
    //       flex-grow: 1;
    //       padding-left: 20px;
    //       color: #333;
    //       font-size: 16px;
    //       box-sizing: border-box;
    //       &::-webkit-input-placeholder {
    //         color: #999;
    //       }
    //     }
    //     .btn {
    //       flex-basis: 101px;
    //       height: 44px;
    //       line-height: 44px;
    //       text-align: center;
    //       background-color: #ff7200;
    //       color: #fff;
    //       font-size: 16px;
    //       &.count-down {
    //         background-color: #d3d3d3;
    //         color: #666;
    //       }
    //     }
    //   }
    //   .login-wrap {
    //     width: 100%;
    //     height: 44px;
    //     border-radius: 44px;
    //     background-color: #fff680;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     margin-top: 30px;
    //     .icon {
    //       width: 21px;
    //       height: 27px;
    //       margin-right: 10px;
    //     }
    //     .text {
    //       color: #e02e24;
    //       font-size: 20px;
    //       font-weight: 600;
    //     }
    //   }
    // }
    .mask-wrap {
      position: fixed;
      width: 100%;
      top: 0;
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
        &.pack-info {
          width: 315px;
          height: 568px;
          .avatar-wrap {
            width: 50px;
            height: 50px;
            border: 2px solid #ffe5a5;
            background-color: #f5e5a5;
            border-radius: 50%;
            .avatar {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .title-msg {
            font-size: 20px;
            color: #fff;
            font-weight: 600;
            margin-top: 10px;
          }
          .pack-content {
            width: 100%;
            height: 470px;
            @include bg-image('../../../static/images/reg_packet_activity_images/11', 'png');
            background-size: 100%;
            box-sizing: border-box;
            padding-top: 160px;
            position: relative;
            margin-top: 15px;
            p {
              text-align: center;
            }
            .user-info {
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              position: absolute;
              top: -10px;
              left: 0;
              transform: translate3d(0, -100%, 0);
            }
            .msg-text {
              font-size: 20px;
              color: #fff;
            }
            .money {
              color: #f4f81c;
              font-size: 36px;
              margin-top: 10px;
            }
            .tips {
              font-size: 16px;
              color: #ffd89d;
              margin-top: 25px;
            }
            .login-wrap {
              width: 234px;
              height: 44px;
              border-radius: 44px;
              background-color: #fff680;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0 auto;
              margin-top: 15px;
              .icon {
                width: 21px;
                height: 27px;
                margin-right: 10px;
              }
              .btn-text {
                color: #e02e24;
                font-size: 20px;
                font-weight: 600;
              }
            }
            .reg-panel {
              padding: 13px 25px 0;
            }
            .input-wrap {
              width: 100%;
              height: 40px;
              border-radius: 40px;
              background-color: #fff;
              display: flex;
              overflow: hidden;
              &+.input-wrap {
                margin-top: 12px;
              }
              input {
                padding-left: 20px;
                color: #333;
                font-size: 16px;
                box-sizing: border-box;
                &::-webkit-input-placeholder {
                  color: #999;
                }
              }
              .mobile {
                flex-grow: 1;          
              }
              .code {
                width: 164px;
              }
              .btn {
                flex-basis: 101px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background-color: #ff7200;
                color: #fff;
                font-size: 16px;
                &.count-down {
                  background-color: #d3d3d3;
                  color: #666;
                }
              }
            }
          }
        }
      }
    }
  }
  @keyframes open {
    from {
      transform: rotateY(180deg);
    }
    to {
      transform: rotateY(360deg);
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

  @keyframes barrage {
    0% {
      transform: translate3d(100%, 0, 0);
    }
    100% {
      transform: translate3d(-300%, 0, 0);
    }
  }
</style>
