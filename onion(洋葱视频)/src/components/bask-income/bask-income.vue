<template>
  <div class="container">
    <div class="carousel-wrap">
      <div class="carousel-inner" ref="carouselInner">
        <div class="carousel-item" v-for="(item, index) in avatars" :key="index">
          <img class="avatar" :src="item.avatar" alt="">
          <p class="text">拆开一个红包获得<span class="highlight">{{item.money}}</span>元</p>
        </div>
      </div>
    </div>
    <div class="inner1" v-show="active == 0">
      <div class="inner-content">
        <div class="share-info__pannel">
          <!-- <div class="avatar__wrap">
            <img class="avatar" :src="inviteShare.headface" alt="">
          </div> -->
          <p class="share__text">我在洋葱视频赚了{{inviteShare.formatTotalAccount}}元</p>
        </div>
        <div class="register-pannel">
          <div class="input-group">
            <div class="input-wrap">
              <img class="input-icon" src="../../../static/images/share_images/4@2x.png" alt="">
              <input class="input" maxlength="11" type="number" placeholder="输入手机号码" v-model.number="mobile">
            </div>
            <div class="input-wrap">
              <img class="input-icon" src="../../../static/images/share_images/5@2x.png" alt="">
              <input class="input" maxlength="6" type="number" placeholder="输入验证码" v-model.number="code">
              <span class="get-code__btn" v-show="!startCountDown" @click="getCode">{{getCodeTxt}}</span>
              <span class="count-down" v-show="startCountDown">{{countDown}}</span>
            </div>
          </div>
          <p class="login-btn" @click="login">立即领取</p>
        </div>
      </div>      
    </div>
    <div class="inner2" v-show="active == 1">
      <div class="inner-content">
        <div class="share-info__pannel">
          <!-- <div class="avatar__wrap">
            <img class="avatar" :src="inviteShare.headface" alt="">
          </div> -->
          <p class="share__text">我在洋葱视频赚了{{inviteShare.formatTotalAccount}}元</p>
        </div>
        <div class="register-pannel">
          <div class="input-group">
            <div class="input-wrap">
              <img class="input-icon" src="../../../static/images/share_images/4@2x.png" alt="">
              <input class="input" maxlength="11" type="number" placeholder="输入手机号码" v-model.number="mobile">
            </div>
          </div>
          <div class="input-group">
            <div class="input-wrap">
              <img class="input-icon" src="../../../static/images/share_images/5@2x.png" alt="">
              <input class="input" maxlength="6" type="number" placeholder="输入验证码" v-model.number="code">
            </div>
            <span class="get-code__btn" v-show="!startCountDown" @click="getCode">{{getCodeTxt}}</span>
            <span class="count-down" v-show="startCountDown">{{countDown}}</span>
          </div>
          <p class="login-btn" @click="login">立即领取</p>
        </div> 
      </div>      
    </div>
    <div class="inner3" v-show="active == 2">
      <div class="inner-content">
        <div class="share-info__pannel">
          <!-- <div class="avatar__wrap">
            <img class="avatar" :src="inviteShare.headface" alt="">
          </div> -->
          <p class="share__text">我在洋葱视频赚了<span class="money__highlight">{{inviteShare.formatTotalAccount}}</span>元</p>
        </div>
        <div class="register-pannel">
          <div class="input-group">
            <div class="input-wrap">
              <img class="input-icon" src="../../../static/images/share_images/4@2x.png" alt="">
              <input class="input" maxlength="11" type="number" placeholder="输入手机号码" v-model.number="mobile">
            </div>
          </div>
          <div class="input-group">
            <div class="input-wrap">
              <img class="input-icon" src="../../../static/images/share_images/5@2x.png" alt="">
              <input class="input" maxlength="6" type="number" placeholder="输入验证码" v-model.number="code">
            </div>
            <span class="get-code_btn" v-show="!startCountDown" @click="getCode">{{getCodeTxt}}</span>
            <span class="count-down" v-show="startCountDown">{{countDown}}</span>
          </div>
          <div class="login-btn_wrap" @click="login">
            <p class="login-btn">立即领取</p>
          </div>
        </div> 
      </div>      
    </div>
    <div class="inner2" v-show="active == 3">
      <div class="inner-content">
        <div class="share-info__pannel">
          <!-- <div class="avatar__wrap">
            <img class="avatar" :src="inviteShare.headface" alt="">
          </div> -->
          <p class="share__text">我刚刚赚了<span class="money__highlight">{{inviteShare.formatTotalAccount}}</span>元</p>
        </div>
        <div class="register-pannel">
          <div class="input-group">
            <div class="input-wrap">
              <img class="input-icon" src="../../../static/images/share_images/4@2x.png" alt="">
              <input class="input" maxlength="11" type="number" placeholder="输入手机号码" v-model.number="mobile">
            </div>
          </div>
          <div class="input-group">
            <div class="input-wrap">
              <img class="input-icon" src="../../../static/images/share_images/5@2x.png" alt="">
              <input class="input" maxlength="6" type="number" placeholder="输入验证码" v-model.number="code">
            </div>
            <span class="get-code__btn" v-show="!startCountDown" @click="getCode">{{getCodeTxt}}</span>
            <span class="count-down" v-show="startCountDown">{{countDown}}</span>
          </div>
          <p class="login-btn" @click="login">立即领取</p>
        </div> 
      </div>      
    </div>
    <div class="inner3" v-show="active == 2">
      <div class="inner-content">
        <div class="share-info__pannel">
          <!-- <div class="avatar__wrap">
            <img class="avatar" :src="inviteShare.headface" alt="">
          </div> -->
          <p class="share__text">我在洋葱视频赚了<span class="money__highlight">{{inviteShare.formatTotalAccount}}</span>元</p>
        </div>
        <div class="register-pannel">
          <div class="input-group">
            <div class="input-wrap">
              <img class="input-icon" src="../../../static/images/share_images/4@2x.png" alt="">
              <input class="input" maxlength="11" type="number" placeholder="输入手机号码" v-model.number="mobile">
            </div>
          </div>
          <div class="input-group">
            <div class="input-wrap">
              <img class="input-icon" src="../../../static/images/share_images/5@2x.png" alt="">
              <input class="input" maxlength="6" type="number" placeholder="输入验证码" v-model.number="code">
            </div>
            <span class="get-code_btn" v-show="!startCountDown" @click="getCode">{{getCodeTxt}}</span>
            <span class="count-down" v-show="startCountDown">{{countDown}}</span>
          </div>
          <div class="login-btn_wrap" @click="login">
            <p class="login-btn">立即领取</p>
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
      inviteShare: {},
      avatars: [
        { avatar: 'http://imgcdn.qianqiana.com/2018/0302/024833l82w6Sjz0.jpg-A100', money: '20' },
        { avatar: 'http://imgcdn.qianqiana.com/2018/0302/024809VdqG4Krtr.jpg-A100', money: '20' },
        { avatar: 'http://imgcdn.qianqiana.com/2018/0302/024802kuv224l3g.jpg-A100', money: '50' },
        { avatar: 'http://imgcdn.qianqiana.com/2018/0301/165605MgzfoaU3J.jpg-A100', money: '30' }
      ],
      memberid: getQueryString('memberid'),
      randomMoney: (Math.random()*5 + 5).toFixed(2),
      randomShow: Math.floor(Math.random()*9+1),
      active: parseInt(getQueryString('type')) || 0,
      countDown: 60,
      startCountDown: false,
      getCodeTxt: '获取验证码',
      mobile: '',
      code: ''
    }
  },
  created() {
    this._getInviteShare()
    console.log(this.memberid)
  },
  methods: {
    _getInviteShare() {
      this.$axios.get(`${process.env.API_HOST}/index.php?m=member&c=webApi&a=shareIncome&memberid=${this.memberid}`)
      .then(res => {
        this.inviteShare = res.data.data
      })
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
            MessageBox.alert(res.data.errorMsg, '提示')
          }
        })
      }else {
        MessageBox.alert('手机号码不合法或为空', '提示')
      }
      
    },
    login() {
      if(this.mobile & this.code) {
        this.$axios.get(`${process.env.API_HOST}index.php?m=member&c=webApi&a=login&mobile=${this.mobile}&code=${this.code}&memberid=${this.memberid}`)
        .then(res => {
          if(res.data.result == 1) {
            window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo"
            // this.$router.push({
            //   path: '/download'
            // })
          }else {
            MessageBox.alert(res.data.errorMsg, '提示')
          }
        })
      }else {
        MessageBox.alert('手机号码或验证码为空', '提示')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
  .container {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
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
    .inner1 {
      flex: 1;
      background-color: #d3261d;
      .inner-content {
        width: 100%;
        height: 16.08rem;
        padding-top: 327px;
        @include bg-image('../../../static/images/share_images/3', 'jpg');
        background-size: 100% 100%;
        box-sizing: border-box;
      }
      .share-info__pannel {
        width: 7.6rem;
        border-radius: .21rem;
        margin: 0 auto;
        position: relative;
        .avatar__wrap {
          width: 1.39rem;
          height: 1.39rem;
          border-radius: 50%;
          border: 2px solid #fff;
          box-sizing: border-box;
          position: absolute;
          left: 50%;
          top: 0;
          transform: translate3d(-50%, -50%, 0);
          .avatar {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .share__text {
          width: 100%;
          font-size: 18px;
          color: #fff;
          text-align: center;
          // font-weight: 800;
        }
        .money__highlight {
          font-size: 30px;
          color: #f8e71c;
        }
      }
      .register-pannel {
        width: 265px;
        // background-color: rgba(255, 255, 255, .3);
        border-radius: .21rem .21rem 0 0;
        height: 8rem;
        margin: 0 auto;
        margin-top: 35px;
        box-sizing: border-box;
        .input-group {
          padding: 0 10px;
          box-sizing: border-box;
          width: 100%;
          height: 100px;
          border-radius: 8px;
          background-color: #fff;
          box-shadow:0 2px 4px 0 #b66f4c;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .input-wrap {
            width: 100%;
            display: flex;
            align-items: center;
            padding-bottom: 10px;
            &+.input-wrap {
              padding: 5px 0 0;
            } 
          }
          .input-icon {
            width: 22px;
            height: 22px;
          }
          .input {
            min-width: 100px;
            flex-grow: 1;
            font-size: 16px;
            color: #333;
            padding-left: 12px;
          }
          span {
            font-size: 14px;
            line-height: 34px;
            text-align: center;
            border-radius: 8px;
            flex: 0 0 90px;
            height: 34px;
          }
          .get-code__btn {            
            background-color: #f8e71c;            
            color: #e93c36;            
          }
          .count-down {
            background-color: #d3d3d3;
            color: #666;
          }
        }
        .login-btn {
          background:#f8e71c;
          box-shadow:0 3px 0 0 #cdc821;
          border-radius:8px;
          width:100%;
          height:44px;
          line-height: 44px;
          color: #c93c36;
          font-size: 18px;
          text-align: center;
          margin-top: 23px;
          font-weight: 600;
        }
      }
    }
    .inner2 {
      flex: 1;
      // background-image:linear-gradient(42deg, #ffa32e 0%, #ffa22e 25%, #f76b1c 100%);
      background-color: #e62846;
      .inner-content {
        width: 100%;
        height: 16.08rem;
        padding: 0 45px;
        padding-top: 376px;
        @include bg-image('../../../static/images/share_images/1', 'jpg');
        background-size: 100% 100%;
        box-sizing: border-box;
        .share-info__pannel {
          // width: 9.2rem;
          // height: 1.44rem;
          // border-radius: 1.44rem;
          // background-color: rgba(254, 213, 159, .4);
          margin: 0 auto;
          position: relative;
          .avatar__wrap {
            width: 1.39rem;
            height: 1.39rem;
            border-radius: 50%;
            border: 2px solid #fed59f;
            box-sizing: border-box;
            position: absolute;
            bottom: 0;
            top: 0;
            left: 0;
            margin: auto;
            .avatar {
              display: block;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .share__text {
            width: 100%;
            font-size: 18px;
            color: #fff;
            text-align: center;
          }
          .money__highlight {
            font-size: 30px;
          }
        }
        .register-pannel {
          width: 100%;
          border-radius: 4px;
          margin-top: 18px;
          // padding: .67rem .27rem;
          box-sizing: border-box;
          .input-group {
            display: flex;
            align-items: center;
            border-radius: 4px;
            justify-content: space-between;
            &+.input-group {
              margin-top: 9px;
              .input-wrap {
                width: 186px;
                overflow: hidden;
              }
            }
            .input-wrap {
              background-color: #fff;
              width: 100%;
              display: inline-flex;
              align-items: center;
              height: 39px;
              border: 1px solid #f85626;
              border-radius: 4px;
              padding: 0 0 0 15px;
              box-sizing: border-box;
            }
            .input-icon {
              width: 22px;
              height: 22px;
            }
            .input {
              padding-left: 10px;
              font-size: 16px;
              color: #333;
            }
            span {
              line-height: 39px;
              border-radius: 4px;
              text-align: center;
              font-size: 14px;
              width: 91px;
              height: 39px;
              display: block;
            }
            .get-code__btn {              
              background-color: #f8e71c;              
              color: #ff4c4c;              
            }
            .count-down {
              background-color: #d3d3d3;
              color: #666;
            }
          }
          .login-btn {
            width: 100%;
            height: 39px;
            background:#f8e71c;
            box-shadow:0 4px 0 0 rgba(255,185,0,0.50);
            border-radius: 4px;
            line-height: 39px;
            text-align: center;
            color: #ff4c4c;
            font-size: 18px;
            margin-top: 17px;
            font-weight: 600;
          }
        }
      }
    }
    .inner3 {
      flex: 1;
      background-image:linear-gradient(-179deg, #ee0000 0%, #d42804 56%, #ff0031 100%);
      .inner-content {
        width: 100%;
        height: 16.08rem;
        padding: 0 .67rem;
        padding-top: 175px;
        @include bg-image('../../../static/images/share_images/9', 'png');
        background-size: 100% 100%;
        box-sizing: border-box;
        .share-info__pannel {
          width: 100%;
          // height: 1.44rem;
          // border-radius: 1.44rem;
          // background-color: #f85626;
          margin: 0 auto;
          position: relative;
          .avatar__wrap {
            width: 1.39rem;
            height: 1.39rem;
            border-radius: 50%;
            border: 2px solid #f85626;
            box-sizing: border-box;
            position: absolute;
            bottom: 0;
            top: 0;
            left: 0;
            margin: auto;
            .avatar {
              display: block;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .share__text {
            width: 100%;
            font-size: 22px;
            color: #fff;
            // text-shadow:0 2px 4px #d67e0a;
            text-align: center;
            // position: absolute;
            // bottom: 13px;
          }
          // .money__highlight {
          //   font-size: 30px;
          // }
        }
        .register-pannel {
          width: 100%;
          margin-top: 152px;
          box-sizing: border-box;
          .input-group {
            display: flex;
            align-items: center;
            border-radius: 4px;
            justify-content: space-between;
            height: 55px;
            border-radius: 55px;
            background-color: #fff;
            overflow: hidden;
            &+.input-group {
              margin-top: 20px;
              .input-wrap {
                width: 210px;
                overflow: hidden;
              }
            }
            .input-wrap {
              display: flex;
              font-size: 18px;
              color: #333;
              line-height: 55px;
              padding-left: 20px;
              box-sizing: border-box;
              align-items: center;
            }
            .input-icon {
              width: 22px;
              height: 22px;
            }
            .input {
              padding-left: 10px;
              font-size: 16px;
              color: #333;
            }
            span {
              width: 100px;
              height: 55px;
              font-size: 14px;
              text-align: center;
              line-height: 55px;
              display: inline-block;
            }
            .get-code_btn {      
              background-color: #fad516;
              color: #854711;      
            }
            .count-down {
              background-color: #d3d3d3;
              color: #666;
            }
          }          
          .login-btn {
            width: 310px;
            height: 55px;
            border-radius: 55px;
            text-align: center;
            line-height: 55px;
            background-color: #fbcf00;
            color: #873f00;
            font-size: 20px;
            font-weight: 800;
            margin: 0 auto;
            margin-top: 30px;
          }
        }
      }
    }
    input::-webkit-input-placeholder {
      color: #d8d8d8;
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
