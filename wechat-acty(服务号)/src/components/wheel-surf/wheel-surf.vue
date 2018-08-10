<template>
  <div class="container">
    <div class="content-bd">
      <div class="num">剩余抽奖次数：{{num}}次</div>
      <div class="turnplate">
        <!-- <canvas class="item" id="wheelcanvas" width="422px" height="422px"></canvas> -->
        <div class="wheel"></div>
        <img class="pointer" src="./13.png"  @click="pointer"/>
      </div>
      <div class="get-num" @click="shareGame">获取抽奖次数</div>
      <p class="tooltip">满<span class="highlight">1</span>元即可提现</p>
      <p class="tooltip">关注“洋葱视频APP”公众号即可查询余额详情和提现</p>
      <div class="rules">
        <p class="title">游戏规则</p>
        <p class="text">每个用户第一天有三次免费机会，第二天有两次免费，第三天有一次免费机会</p>
        <p class="text highlight">分享游戏给好友，好友打开链接后您即可获得1次抽奖机会，每个好友每天只可增加一次。</p>
        <p class="text">当日抽奖次数未使用，次日清零</p>
        <p class="text">非正规操作所获得抽奖机会，视为无效。</p>
        <p class="text">游戏中奖的概率随机，不承诺最终具体所获取的奖项，请理性参与。</p>
        <p class="text">此次活动的最终解释权归“洋葱视频”所有。</p>
      </div>
    </div>
    <div class="dialog" v-show="dialogShow">
      <div class="mask" @click="closeDialog"></div>
      <div class="dialog-content_num" v-show="current == 1">
        <p class="tooltip" v-show="isEnd">非常抱歉<br>抽奖次数已用完</p>
        <p class="tooltip" v-show="!isEnd">谢谢参与<br>本次未中奖继续加油</p>
        <p class="get-num" @click="shareGame">确定</p>
      </div>
      <div class="dialog-content_redpacket" v-show="current == 2">
        <div class="red-packet">
          <p class="tooltip">恭喜您<br>获得{{money}}现金奖励</p>
          <p class="btn" @click="getMoney">领取</p>
        </div>
        <p class="text">获得的红包可在“洋葱视频APP”公众号的“提现”查看</p>
      </div>
      <div class="dialog-content_tipimg" v-show="current == 3">
        <img src="./4.png" alt="">
      </div>
    </div>
    <div class="mask" v-show="subscribe == 0">
      <div class="content">
        <h1 class="title">身份验证</h1>
        <img src="./qr-code.jpg" alt="" class="img">
        <p class="tooltip">本活动仅限公众号粉丝参与</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {myfun} from 'common/js/awardRotate'
import wx from 'weixin-js-sdk'
export default {
  name: 'awardRotate',
  data () {
    return {
      msg: '',
      turnplate: {
        restaraunts: ['10.0元', '6.0元', '谢谢参与', '0.02元', 'iPhone X', '0.5元', '0.1元 ', '0.05元'],
        bRotate: false
      },
      current: -1,
      dialogShow: false,
      money: 0,
      // 抽奖次数
      num: 0,
      isEnd: true,
      // 奖品序号
      item: -1,
      // 分享者id
      mid: '',
      // 用户标识
      _secdata: '',
      memberid: '',
      shareid: '',
      subscribe: 0
    }
  },
  mounted () {
    document.title = '幸运大转盘' 
  },
  components: {
    myfun
  },
  methods: {
    shareGame(e) {
      if(e.target.innerText == '获取抽奖次数') {
        this.current = 3
        this.dialogShow = true
      }else {
        this.current = -1
        this.dialogShow = false
      }
    },
    getMoney() {
      this.current = -1
      this.dialogShow = false
    },
    closeDialog() {
      this.current = -1
      this.dialogShow = false
    },
    // 转盘结束结果
    rotateFn(item, txt) {
      const _this = this
      var angles = item * (360 / this.turnplate.restaraunts.length) - (360 / (this.turnplate.restaraunts.length * 2))
      if (angles < 270) {
        angles = 270 - angles
      } else {
        angles = 360 - angles + 270
      }
      $('.wheel').stopRotate()
      $('.wheel').rotate({
        angle: 0,
        animateTo: angles + 1800,
        duration: 8000,
        callback: function () {
          _this.dialogShow = true
          _this._getDial()
          if(txt.indexOf('谢谢参与') >= 0) {
            _this.isEnd = false
            _this.current = 1
          }else {
            _this.money = txt
            _this.current = 2
          }
          _this.turnplate.bRotate = false
        }
      })
    },
    // 点击转盘摇奖
    pointer () {
      if(this.num == 0) {
        this.isEnd = true
        this.current = 1
        this.dialogShow = true
        return
      }
      if (this.turnplate.bRotate) return
      this.turnplate.bRotate = !this.turnplate.bRotate
      this.num --
      this._openDial()
      this.rotateFn(this.item, this.turnplate.restaraunts[this.item - 1])
    },
    // 获取转盘结果
    _getDial() {
      this.$fly.post(`${process.env.API_HOST}index.php?m=wechatService&c=index&a=dial`, {
        _secdata: this._secdata
      }).then(res => {
        this.mid = JSON.parse(res).mid || ''
        this.memberid = JSON.parse(res).memberid || ''
        this.subscribe = JSON.parse(res).subscribe || 0
        this._shareFunc()
        if(JSON.parse(res).status == 0) {
          // console.log(JSON.parse(res).status)
          this.num = 0
        }else {
          this.num = JSON.parse(res).num
          this.item = JSON.parse(res).money
          // this.isEnd ? this.dialogShow = false : this.dialogShow = true
        }
      })
    },
    // 消耗次数、启动游戏给分享人获得游戏次数
    _openDial() {
      this.$fly.post(`${process.env.API_HOST}index.php?m=wechatService&c=index&a=openDial`, {
        _secdata: this._secdata,
        money: this.item,
        mid: this.mid
      }).then(res => {})
    },
    _shareFunc() {
      const _this = this
      wx.ready(() => {
        wx.onMenuShareAppMessage({
          title: '幸运大转盘，赢iphone X大奖和现金红包！', // 分享标题
          desc: '免费抽奖，1元提现！', // 分享描述
          link: `http://wechat.qianqiana.com/index.php?m=wechatService&c=weixin&a=location_zhuanpan&memberid=${this.memberid}`,
          imgUrl: `https://www.yangcongv.com/wechatservice/images/16.png`, // 分享图标
          success() {
          // 用户点击了分享后执行的回调函数
            _this.dialogShow = false
          }
        })
        wx.onMenuShareTimeline({
          title: '幸运大转盘，赢iphone X大奖和现金红包！',
          imgUrl: `https://www.yangcongv.com/wechatservice/images/16.png`,
          link: `http://wechat.qianqiana.com/index.php?m=wechatService&c=weixin&a=location_zhuanpan&memberid=${this.memberid}`,
          success() {
            _this.dialogShow = false
          }
        })
      })
    },
    _getShareId() {
      this.$fly.get(`${process.env.API_HOST}index.php?m=wechatService&c=share&a=share`, {
        _secdata: this._secdata
      }).then(result => {
        const res = JSON.parse(result)
        if(res.result === 1) {
          this.shareid = res.shareid
        }
      })
    }
  },
  created() {
    this._secdata = this.$route.query._secdata ? this.$route.query._secdata : null
    this._getDial()
    this._getShareId()
  }
}
</script>

<style lang="less" scoped>
  .bg-image(@url) {
    background-image: url('@{url}@2x.png');
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
      background-image: url('@{url}@3x.png');
    }
  }
  .container {
    height: 100%;
    overflow-y: auto;
    .content-bd {
      width: 100%;
      min-height: 985px;
      background: url('./3.jpg') no-repeat;
      background-size: 100%;
      padding-top: 135px;
      box-sizing: border-box;
      .num {
        width: 196px;
        height: 36px;
        border: 1px solid #ffffc2;
        box-shadow: 0 2px 4px 0 #b41905;
        line-height: 34px;
        text-align: center;
        color: #ffffc2;
        font-size: 18px;
        margin: 0 auto;
        border-radius: 36px;
      }
      .turnplate {
        width: 350px;
        height: 350px;
        position: relative;
        margin: 0 auto;
        margin-top: 12px;
        background: url('./10.png') no-repeat;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
        .wheel {
          width: 263px;
          height: 263px;
          .bg-image('./0');
          background-size: cover;
          background-repeat: no-repeat;
        }
        .pointer {
          position: absolute;
          width: 116px;
          height: 143px;
          left: 50%;
          top: 50%;
          transform: translate3d(-50%, -60%, 0);
        }
      }
      .get-num {
        background-image:linear-gradient(-180deg, #fffb79 0%, #fff21e 48%, #f6ad08 100%);
        box-shadow: 0 4px 10px 0 #b41905;
        border-radius: 40px;
        width: 265px;
        height: 44px;
        font-size: 22px;
        color: #f40009;
        text-shadow: 0 -1px 0 rgba(255,255,255,0.50);
        line-height: 44px;
        text-align: center;
        margin: 0 auto;
        margin-top: 18px;
        font-weight: 700;
      }
      .tooltip {
        font-size: 15px;
        color: #fff;
        text-align: center;
        margin: 0;
        margin-top: 5px;
        font-weight: 700;
        .highlight {
          font-size: 30px;
          color: #ffec00;
        }
      }
      .rules {
        margin-top: 40px;
        .title {
          width: 240px;
          height: 58px;
          background: url('./1.png') no-repeat;
          background-size: 100%;
          margin: 0 auto;
          font-size: 18px;
          color: #fff3ce;
          text-align: center;
          line-height: 38px;
          margin-bottom: 15px;
        }
        .text {
          font-size: 14px;
          color: #8b2a2a;
          position: relative;
          padding: 0 15px 0 25px;
          margin: 0;
          text-align: justify;
          line-height: 20px;
          font-weight: 700;
          &.highlight {
            color: #f40009;
          }
          &+.text {
            margin-top: 5px;
          }
          &:after {
            content: '';
            display: block;
            position: absolute;
            left: 13px;
            top: 7px;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #f40009;
          } 
        }
      }
    }
    .dialog {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      background-color: rgba(0, 0, 0, 0);
      .mask {
        background-color: rgba(0, 0, 0, .6);
        height: 100%;
        width: 100%;
      }
      .dialog-content_num {
        width: 297px;
        height: 199px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: url('./15.png') no-repeat;
        background-size: cover;
        .tooltip {
          font-size: 16px;
          color: #8b2a2a;
          text-align: center;
          line-height: 22px;
          font-weight: 700;
        }
        .get-num {
          background-image: linear-gradient(-180deg, #ff8200 0%, #ff3500 100%);
          box-shadow: 0 2px 0 0 #cf0707;
          border-radius: 40px;
          width: 221px;
          height: 40px;
          font-size: 18px;
          color: #fff;
          text-align: center;
          line-height: 40px;
          margin-top: 25px;
        }
      }
      .dialog-content_redpacket  {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .red-packet {
          width: 241px;
          height: 295px;
          background: url('./2.png') no-repeat;
          background-size: 100%; 
          padding-top: 131px;
          box-sizing: border-box;
          .tooltip {
            font-size: 16px;
            color: #ffdda5;
            text-align: center;
            line-height: 20px;
          }
          .btn {
            background-image:linear-gradient(-180deg, #fffeb1 6%, #ecc869 100%);
            box-shadow: 0 2px 8px 0 #e40303;
            border-radius: 40px;
            width: 180px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 18px;
            color: #fe0a36;
            margin: 0 auto;
            margin-top: 32px;
          }
        }
        .text {
          font-size: 14px;
          color: #fff;
          margin-top: 18px;
          text-align: center;
          &+.text {
            margin-top: 8px;
          }
        }
      }
      .dialog-content_tipimg {
        position: absolute;
        top: 0;
        left: 0;
        img {
          width: 100%;
        }
      }
    }
    .mask {
      width: 100%;
      position: fixed;
      top: 0;
      bottom: 0;
      align-items: center;
      background-color: rgba(0, 0, 0, .6);
      display: flex;
      align-items: center;
      justify-content: center;
      .content {
        width: 280px;
        border-radius: 8px;
        background-color: #fff;
        box-sizing: border-box;
        padding: 30px;
        .title {
          font-size: 28px;
          color: #333;
          text-align: center;
          margin: 0;
        }
        .img {
          width: 100%;
          display: block;
          border: 1px solid #e8e8e8;
          margin-top: 15px;
        }
        .tooltip {
          font-size: 18px;
          color: #999;
          text-align: center;
          margin: 0;
          margin-top: 10px;
          font-weight: 700;
        }
      }
    }
  }
</style>
