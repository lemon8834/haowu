<template>
  <div class="container">
    <!-- <div class="carousel-wrap">
      <div class="carousel-inner" ref="carouselInner">
        <div class="carousel-item" v-for="(item, index) in avatars" :key="index">
          <img class="avatar" :src="item.avatar" alt="">
          <p class="text">微信提现了<span class="highlight">{{item.money}}</span>元</p>
        </div>
      </div>
    </div> -->
    <div class="inner1" v-show="active == 0">
      <div class="inner-content">
        <!-- <div class="input-wrap">
          <input class="mobile" type="text" maxlength="11" v-model="mobile" placeholder="手机号码">
        </div> -->
        <!-- <div class="input-wrap">
          <input class="code" type="text" maxlength="6" v-model="code" placeholder="输入验证码">
          <span class="get-code_btn" v-if="!startCountDown" @click="getCode">{{getCodeTxt}}</span>
          <span class="count-down" v-else>{{countDown}}</span>
        </div> -->
        <div class="login-btn" @click="login">立即领取</div>
      </div>
    </div>
    <div class="inner2" v-show="active == 1">
      <div class="inner-content">
       <!-- <div class="register-pannel">
           <div class="input-wrap">
            <img class="input-icon" src="../../../static/images/share_images/4@2x.png" alt="">
            <input class="mobile" type="text" maxlength="11" v-model="mobile" placeholder="手机号码">
          </div> -->
          <!-- <div class="input-group">
            <div class="input-wrap">
              <img class="input-icon" src="../../../static/images/share_images/5@2x.png" alt="">
              <input class="code" type="text" maxlength="6" v-model="code" placeholder="输入验证码">
            </div>
            <span class="get-code_btn" v-if="!startCountDown" @click="getCode">{{getCodeTxt}}</span>
            <span class="count-down" v-else>{{countDown}}</span>
          </div>          
        </div> -->
          <div class="login-btn" @click="login">立即领取</div>
      </div>
    </div>
    <div class="inner3" v-show="active == 2">
      <div class="inner-content">
        <!-- <div class="register-pannel">
          <div class="input-group">
            <div class="input-wrap">
              <img class="input-icon" src="../../../static/images/share_images/4@2x.png" alt="">
              <input class="mobile" type="text" maxlength="11" v-model="mobile" placeholder="手机号码">
            </div>
            <div class="input-wrap">
              <img class="input-icon" src="../../../static/images/share_images/5@2x.png" alt="">
              <input class="code" type="text" maxlength="6" v-model="code" placeholder="输入验证码">
              <span class="get-code_btn" v-if="!startCountDown" @click="getCode">{{getCodeTxt}}</span>
              <span class="count-down" v-else>{{countDown}}</span>
            </div>
          </div> 
        </div>-->
          <div class="login-btn" @click="login">立即领取</div>
      </div>
    </div>
    <!-- <div class="inner4" v-show="active == 3">
      <div class="inner-content">
        <div class="register-pannel">
          <div class="input-wrap">
            <img class="input-icon" src="../../../static/images/share_images/4@2x.png" alt="">
            <input class="mobile" type="text" maxlength="11" v-model="mobile" placeholder="手机号码">
          </div>
          <<div class="input-group">
            <div class="input-wrap">
              <img class="input-icon" src="../../../static/images/share_images/5@2x.png" alt="">
              <input class="code" type="text" maxlength="6" v-model="code" placeholder="输入验证码">
            </div>
            <span class="get-code_btn" v-if="!startCountDown" @click="getCode">{{getCodeTxt}}</span>
            <span class="count-down" v-else>{{countDown}}</span>
          </div>
          <div class="login-btn" @click="login">立即领取</div>
        </div>
      </div>
    </div>
    <div class="inner5" v-show="active == 4">
      <div class="inner-content inner5-content">
        <div class="register-pannel">
          <div class="input-wrap">
            <img class="input-icon" src="../../../static/images/share_images/4@2x.png" alt="">
            <input class="mobile" type="text" maxlength="11" v-model="mobile" placeholder="手机号码">
          </div>
          <div class="input-group">
            <div class="input-wrap">
              <img class="input-icon" src="../../../static/images/share_images/5@2x.png" alt="">
              <input class="code" type="text" maxlength="6" v-model="code" placeholder="输入验证码">
            </div>
            <span class="get-code_btn" v-if="!startCountDown" @click="getCode">{{getCodeTxt}}</span>
            <span class="count-down" v-else>{{countDown}}</span>
          </div>
          <div class="login-btn" @click="login">立即领取</div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { getQueryString } from 'common/js/util'
import { MessageBox } from 'mint-ui'
export default {
  data() {
    return {
      avatars: [
        { avatar: 'http://imgcdn.qianqiana.com/2018/0302/024833l82w6Sjz0.jpg-A100', money: '20' },
        { avatar: 'http://imgcdn.qianqiana.com/2018/0302/024809VdqG4Krtr.jpg-A100', money: '20' },
        { avatar: 'http://imgcdn.qianqiana.com/2018/0302/024802kuv224l3g.jpg-A100', money: '50' },
        { avatar: 'http://imgcdn.qianqiana.com/2018/0301/165605MgzfoaU3J.jpg-A100', money: '30' }
      ],
      getCodeTxt: '获取验证码',
      mobile: '',
      code: '',
      countDown: 60,
      startCountDown: false,
      memberid: this.$route.query.memberid || 0,
      active: parseInt(this.$route.query.type) || 0
    }
  },
  created() {
    this._reg()
  },
  methods: {
    // getCode() {
    //   if(this.mobile) {
    //     this.$axios.get(`${process.env.API_HOST}index.php?m=member&c=webApi&a=sendSms&mobile=${this.mobile}`)
    //     .then(res => {
    //       if(res.data.result == 1) {
    //         this.startCountDown = true
    //         this.timer = setInterval(() => {
    //           this.countDown --
    //           if(this.countDown == 0) {
    //             this.getCodeTxt = '重新获取'
    //             this.countDown = 60
    //             this.startCountDown = false
    //             clearInterval(this.timer)
    //           }
    //         }, 1000)
    //       } else {
    //         alert(res.data.errorMsg)
    //       }
    //     })
    //   }else {
    //     MessageBox.alert('手机号码为空或不合法', '提示')
    //   }
    // },
    // login() {
    //   if(this.mobile & this.code) {
    //     this.$axios.get(`${process.env.API_HOST}index.php?m=member&c=webApi&a=login&mobile=${this.mobile}&code=${this.code}&memberid=${this.memberid}`)
    //     .then(res => {
    //       if(res.data.result == 1) {
    //         window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo"
    //         // this.$router.push({
    //         //   path: '/download'
    //         // })
    //       }else {
    //         alert(res.data.errorMsg)
    //       }
    //     })
    //   }else {
    //     MessageBox.alert('手机号码或验证码为空', '提示')
    //   }
    // }
    login() {
      // window.location.href = 'http://v.yangcongv.com/Apk/Onion/onionvideo_1.3.3.apk'
      this.$router.push({
        path: '/download'
      })
    },
    _reg() {
      
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin.scss';
  .container {
    display: flex;
    min-height: 100vh;
    flex-direction: column; 
    input::-webkit-input-placeholder {
      color: #dbdbdb;
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
  .inner1 {
    flex: 1;
    // background-image:linear-gradient(135deg, #ff7d3b 0%, #c70425 53%, #ff3c34 100%);
    background-color: #fcf8df;
    .inner-content {
      width: 100%;
      // height: 16.08rem;
      height: 603px;
      // @include bg-image('../../../static/images/share_images/new/3', 'png');
      @include bg-image('../../../static/images/share_images/new/invite_bg_inner11', 'jpg');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      overflow: hidden;
      padding-top: 313px;
      box-sizing: border-box;
    }
    .login-btn {
      position: absolute;
      left: 0;
      right: 0;
      top: 466px;
      margin: 0 auto;
      width: 270px;
      height: 54px;
      line-height: 54px;
      border-radius:4px;
      text-align: center;
      line-height: 54px;
      background:#fecf4b;
      box-shadow: 0 2px 4px 0 rgba(193,50,25,0.57);
      color:#bc1c00;
      font-size: 28px;
      font-weight: 600;
    }
  }
  .inner2 {
    flex: 1;
    background-color: #1E041A;
    .inner-content {
      width: 100%;
      height: 16.08rem;
      // @include bg-image('../../../static/images/share_images/new/4', 'jpg');
      @include bg-image('../../../static/images/share_images/new/invite_bg_inner22', 'jpg');
      background-size: 100% 101%;
      background-repeat: no-repeat;
      padding-top: 290px;
      box-sizing: border-box;
      .register-pannel {
        width: 9.2rem;
        border-radius: 4px;
        background-color: #fff;
        padding: 1.2rem .27rem;
        box-sizing: border-box;
        margin: 0 auto;
        .input-icon {
          width: 22px;
          height: 22px;
        }
        input {
          font-size: 16px;
          color: #333;
          padding-left: 10px;
        }
        .input-wrap {
          display: flex;
          height: 44px;
          align-items: center;
          padding: 11px 0 11px 15px;
          border: 1px solid #df2126;
          border-radius: 4px;
          box-sizing: border-box;
        }
        .input-group {
          margin-top: .53rem;
          display: flex;
          justify-content: space-between;
          .input-wrap {
            width: 211px;
            overflow: hidden;
          }
        }
        .get-code_btn {          
          background-color: #df2126;
          color: #fff;
        }
        .count-down {
          background-color: #d3d3d3;
          color: #666;
        }
        span {
          display: inline-block;
          width: 103px;
          height: 44px;
          border-radius: 4px;
          
          line-height: 44px;
          text-align: center;
        }
      }
      .login-btn {
        // width: 100%;
        // height: 44px;
        // background-color: #df2126;
        // border-radius: 4px;
        // line-height: 44px;
        // text-align: center;
        // font-size: 20px;
        // color: #fff;
        // margin-top: 1.01rem;
        width: 200px;
        height: 47px;
        background:#ffeed4;
        box-shadow:0 5px 0 0 #d63707;
        border-radius: 47px;
        line-height: 47px;
        text-align: center;
        font-size: 20px;
        color: #e93c36;
        font-weight: 600;
        position: absolute;
        left: 0;
        right: 0;
        top: 468px;
        margin: auto;
      }
    }
  }
  .inner3 {
    flex: 1;
    // background-color: #ffd423;
    background-image:linear-gradient(-180deg, #fd3558 0%, #d22940 100%);
    .inner-content {
      width: 100%;
      height: 16.08rem;
      background-size: 100% 100%;
      // @include bg-image('../../../static/images/share_images/new/5', 'jpg');
      @include bg-image('../../../static/images/share_images/new/invite_bg_inner33', 'png');
      background-repeat: no-repeat;
      padding-top: 331px;
      box-sizing: border-box;
      .register-pannel {
        width: 9.2rem;
        border-radius: 4px;
        background-color: #fff;
        padding: 1.2rem .67rem;
        box-sizing: border-box;
        margin: 0 auto;
        .input-icon {
          width: 22px;
          height: 22px;
        }
        input {
          font-size: 16px;
          color: #333;
          padding-left: 10px;
        }
        .input-wrap {
          display: flex;
          align-items: center;
          padding: 0 0 10px 0;
          border-bottom: 1px solid #d3d3d3;
          box-sizing: border-box;
          overflow: hidden;
          &+.input-wrap {
            border-bottom: none;
            padding: 5px 0 0 0;
            input {
              width: 3.81rem;
            }
          }
          span {
            display: inline-block;
            line-height: 34px;
            text-align: center;
            font-size: 12px;
            white-space: nowrap;
            width: 2.4rem;
            height: 34px;
            border-radius: 4px;
          }
          .count-down {
            background-color: #d3d3d3;
            color: #666;
          }
          .get-code_btn {            
            background-color: #f85626;
            color: #fff;            
          }
        }
        .input-group {
          width: 100%;
          height: 100px;
          border: 1px solid #f85626;
          border-radius: 8px;
          padding: 0 20px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
      .login-btn {
        // width: 100%;
        // height: 44px;
        // background-color: #df2126;
        // border-radius: 4px;
        // line-height: 44px;
        // text-align: center;
        // font-size: 20px;
        // color: #fff;
        // margin-top: 1.01rem;
        background-image:linear-gradient(-180deg, #fde280 0%, #eca00a 100%);
        box-shadow: 0 2px 6px 0 rgba(139,4,22,0.50);
        border-radius: 50px;
        width: 345px;
        height: 50px;
        position: absolute;
        top: 492px;
        left: 0;
        right: 0;
        margin: auto;
        font-size: 24px;
        line-height: 50px;
        text-align: center;
        font-weight: 600;
        color: #a41d0c;
      }
    }
  }
  .inner4,
  .inner5 {
    flex: 1;
    background-color: #fefbe8;
    .inner-content {
      width: 100%;
      height: 16.08rem;
      @include bg-image('../../../static/images/share_images/new/1', 'jpg');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      padding-top: 412px;
      box-sizing: border-box;
      &.inner5-content {
        @include bg-image('../../../static/images/share_images/new/2', 'jpg');
        background-size: 100% 100%;
        padding-top: 361px;
        background-repeat: no-repeat;
        box-sizing: border-box;
      }
      .register-pannel {
        width: 9.2rem;
        box-sizing: border-box;
        margin: 0 auto;
        .input-icon {
          width: 22px;
          height: 22px;
        }
        input {
          font-size: 16px;
          color: #333;
          padding-left: 10px;
        }
        .input-wrap {
          display: flex;
          height: 44px;
          align-items: center;
          padding: 11px 0 11px 15px;
          border: 1px solid #f85626;
          border-radius: 4px;
          box-sizing: border-box;
          background-color: #fff;
        }
        .input-group {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          .input-wrap {
            width: 211px;
            overflow: hidden;
          }
        }
        .get-code_btn {          
          background-color: #f5be23;
          color: #854711;
        }
        .count-down {
          background-color: #d3d3d3;
          color: #666;
        }
        span {
          display: inline-block;
          width: 103px;
          height: 44px;
          border-radius: 4px;          
          line-height: 44px;
          text-align: center;
        }
        .login-btn {
          width: 100%;
          height: 44px;
          background-color: #f85626;
          border-radius: 4px;
          line-height: 44px;
          text-align: center;
          font-size: 20px;
          color: #fff;
          margin-top: 20px;
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

