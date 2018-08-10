<template>
  <div class="container">
    <p class="load-text" v-show="!packet.id">加载中...</p>
    <div class="content" v-show="packet.id">
      <div class="head">
        <div class="rule" @click="rule">规则</div>
        <p class="title">分享领红包 满<span class="highlight">{{packet.all}}元</span>提现</p>
        <div class="head-bd">
          <img src="./2.png" alt="" class="bd-icon">
          <p class="count-down">距离过期还剩<span class="time">{{_pad(hours)}}</span>:<span class="time">{{_pad(minutes)}}</span>:<span class="time">{{_pad(seconds)}}</span></p>
          <div class="account">已领取
            <span class="hightlight">￥<em class="sum">{{packet.now}}元</em></span>
          </div>
          <p class="tooltip" v-show="redPacket.status == 0">{{toolTip}}</p>
          <div class="poptip-wrap" v-show="redPacket.status == 1">
            <p class="poptip">可提现</p>
          </div>
          <div class="withdrawals">
            <p class="btn" :class="{disabled: redPacket.status == 0}" @click="withdrawals">提现</p>
          </div>
          <p class="share-btn" @click="share(redPacket.data)">分享领取红包</p>
        </div>
      </div>
      <div class="records" v-if="history.length">
        <div class="record-head" @click="toggleList">
          <p class="text">红包记录：</p>
          <div class="record-list" v-show="!unfold">
            <transition-group name="roll" tag="ul">
              <li class="item"
                  v-for="(item, index) in redPacket.history"
                  :key="index"
                  v-show="msgCurrent == index"
              >{{item}}</li>
            </transition-group>
          </div>
          <img src="./7.png" alt="" class="arrow" :class="{rotate: unfold}">
        </div>
        <div class="list-wrap" v-show="unfold">
          <ul class="unfold-list">
            <li class="item"
                v-for="(item, index) in redPacket.history"
                :key="index"
            >{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="recommend">
        <img src="./6.png" alt="" class="title-img">
        <ul class="list">
          <li class="item"
              v-for="item of redPacket.recommend"
              :key="item.id"
              @click="share(item)">
            <p class="title">{{item.title}}</p>
            <div class="thumb" :style="{backgroundImage: 'url('+ item.thumb +')'}">
              <img src="./8.png" alt="" class="icon">
              <p class="count">{{item.views}}次播放</p>
            </div>
            <div class="bottom">
              <span class="text">分享到群领现金红包</span>
              <img src="./3.png" alt="" class="icon">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="dialog-container" v-show="dialogShow">
      <div class="mask" @click="closeDialogShow"></div>
      <!-- 红包面板 -->
      <div class="dialog-content_1" v-show="current == 1">
        <div class="close" @click="closeDialogShow"></div>
        <p class="title">您收到一个现金红包</p>
        <p class="sum">{{packet.now}}元</p>
        <div class="btn" @click="share(redPacket.data)">
          <img src="./9.png" alt="" class="icon">
        </div>
        <p class="count-down">距离过期还剩 {{_pad(hours)}}:{{_pad(minutes)}}:{{_pad(seconds)}}</p>
      </div>
      <div class="dialog-content_2" v-show="current == 2">
        <img src="./12.png" alt="" class="tip-img">
        <!-- <transition name="slide">
          <div class="btn-wrap">
            <div class="share-btn">
              <img src="./10.png" alt="" class="icon">
              <span class="text">朋友圈</span>
            </div>
            <div class="share-btn">
              <img src="./11.png" alt="" class="icon">
              <span class="text">微信</span>
            </div>
          </div>
          <p class="cencel" @click="share">取消分享</p>
        </transition> -->
      </div>
      <div class="dialog-content_3" v-show="current == 3">
        <div class="close-btn" @click="closeDialogShow"></div>
        <p class="title">活动规则</p>
        <div class="scroll-content">
          <p class="text">参加本活动即表示您已自愿同意并接受以下活动规则</p>
          <p class="text">1.每次参加活动可领取到1个红包任务：分享视频给好友或群并请被打开，将活动相应的红包现金奖励，红包累计金额达到任务指定金额即可提现到微信，一至三个工作日到账</p>
          <p class="text">2.现金红包有效期为24小时，现金红包需在24小时内提现，逾期无效，过期现金红包记录清空。</p>
          <p class="text">3.只有从洋葱视频APP公众号页面分享出去的视频，为有效视频，并且每个微信用户每天首次打开即为有效</p>
          <p class="text">4.如发现用户存在违规行为（包括虚假账号，恶意刷机，虚假交易，作弊等）“洋葱视频”将有权取消用户资格并清除用户所有收入，回收奖励。</p>
          <p class="text">5.如果出现不可抗力或者情势变更情况（包括但不限于重大灾害事件，受政府机关指令停止举办或调整的，活动受严重网络攻击或者因系统故障需要暂停举办的）则主办方可依相关法律法律的规定主张免责。</p>
          <p class="text">6.本次活动解释权归主办方【洋葱视频】所有</p>
        </div>
        <p class="close" @click="close">分享到群领取现金红包</p>
      </div>
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {
  data() {
    return {
      current: -1,
      dialogShow: false,
      // 消息滚动索引
      msgCurrent: 0,
      // 小心滚动间隔
      playTime: 3000,
      // 消息列表是否展开
      unfold: false,
      redPacket: {},
      shareData: {},
      id: 0,
      _secdata: '',
      flag: true
    }
  },
  computed: {
    // 文字提示
    toolTip() {
      return `(还差${(this.packet.all - this.packet.now).toFixed(2)}元可提现)`
    },
    // 红包信息
    packet() {
      return this.redPacket.packet ? this.redPacket.packet : {}
    },
    // 红包记录
    history() {
      return this.redPacket.history || []
    },
    hours() {
      return parseInt(this.packet.time / 60 / 60)
    },
    minutes() {
      return parseInt(this.packet.time / 60 % 60)
    },
    seconds() {
      return parseInt(this.packet.time % 60)
    }
  },
  methods: {
    share(item) {
      this.shareData = item
      this.dialogShow = true
      this.dialogShow ? this.current = 2 : this.current -1
      this._shareFun(item)
    },    
    toggleList() {
      this.unfold = !this.unfold
    },
    // 关闭
    closeDialogShow() {
      this.current = -1
      this.dialogShow = false
    },
    withdrawals() {
      if(!this.flag) {
        alert('提现中，请勿频繁点击')
        return
      }
      if(this.redPacket.status != 1 || this.packet.now < this.packet.all) {
        alert('余额不足，无法提现')
        return
      }
      this.flag = false
      this._withdrawals()
    },
    rule() {
      this.current = 3
      this.dialogShow = true
    },
    close() {
      this.current = 2
    },
    _pad(n) {
      const str = n.toString()
      return str[1] ? str : `0${str}`
    },
    _shareFun(item) {
      const _this = this
      wx.ready(() => {
        wx.onMenuShareAppMessage({
          title: item.title ? item.title : '看视频，分享视频领红包！满1元即可提现！', // 分享标题
          desc: '分享视频领红包，1元提现！', // 分享描述
          link: `http://wechat.qianqiana.com/index.php?m=wechatService&c=weixin&a=location_detail&id=${item.id}&pid=${this.packet.id}`,
          imgUrl: item.thumb, // 分享图标
          success() {
          // 用户点击了分享后执行的回调函数
            _this.closeDialogShow()
          }
        })
        wx.onMenuShareTimeline({
          title: item.title ? item.title : '看视频，分享视频领红包！满1元即可提现！',
          imgUrl: item.thumb,
          link: `http://wechat.qianqiana.com/index.php?m=wechatService&c=weixin&a=location_detail&id=${item.id}&pid=${this.packet.id}`,
          success() {
            _this.closeDialogShow()
          }
        })
      })
    },
    // 文字滚动
    _rollText() {
      let len = this.redPacket.history.length
      this.timer1 = setInterval(() => {
        if(this.msgCurrent == len - 1) {
          this.msgCurrent = 0
        }else {
          this.msgCurrent ++
        }
      }, this.playTime)
    },
    _getRedPacket() {
      // console.log(this._secdata)
      clearInterval(this.timer)
      this.$fly.post(`${process.env.API_HOST}index.php?m=wechatService&c=index&a=red_packet`, {
        _secdata: this._secdata
      }).then(result => {
        const res = JSON.parse(result)
        if(res.result === 1) {
          this.redPacket = res.data
          this._shareFun(this.redPacket.data)
          // 弹出红包被打开的金额
          if(res.data.status == 0) {
            this._popRedPacket()
          }
          // 红包记录超过一条进行滚动播放
          if(this.redPacket.history.length > 1) {
            this._rollText()
          }

          if(this.redPacket.packet.time <= 0) {
            this.redPacket.packet.time = 0
            return
          }
          // 红包倒计时
          this.timer = setInterval(() => {
            this.redPacket.packet.time --
            if(this.redPacket.packet.time <= 0) {
              this.redPacket.packet.time = 0
              clearInterval(this.timer)
              return
            }
          }, 1000)
        }
      })
    },
    _popRedPacket() {
      this.current = 1
      this.dialogShow = true
    },
    _withdrawals() {
      this.$fly.post(`${process.env.API_HOST}index.php?m=wechatService&c=index&a=withdrawCash`, {
        pid: this.packet.id,
        _secdata: this._secdata,
        money: (this.packet.now)*1
      }).then(result => {
        const res = JSON.parse(result)
        if(res.result === 1) {
          this.redPacket.status = 0
          alert('已存入余额，请在公众号下方“提现”查看并提现')
          this._getRedPacket()
          this.flag = true
        }
      })
    }
  },
  created() {
    document.title = '分享视频，领红包'
    this._secdata = this.$route.query._secdata ? this.$route.query._secdata : ''
    this._getRedPacket()
  },
  destroyed() {
    clearInterval(this.timer)
    clearInterval(this.timer1)
  }
}
</script>

<style lang="less" scoped>
  .extend-click() {
    &:after {
      content: '';
      position: absolute;
      top: -10px;
      bottom: -10px;
      left: -10px;
      right: -10px;
    }
  }
  .container {
    height: 100%;
    overflow-y: auto;
    .head-tip {
      width: 100%;
      height: 32px;
      background-color: #fff685;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      .icon {
        width: 61px;
        height: 32px;
        display: inline-block;
        margin-right: 5px;
      }
      .text {
        color: #d0021b;
        font-size: 15px;
      }
    }
    .load-text {
      text-align: center;
      font-size: 14px;
      color: #666;
      padding-top: 20px;
    }
    .content {
      min-height: 100%;
      background-image: linear-gradient(-180deg, #f85f10 0%, #f41212 100%);
      padding-bottom: 20px;
      .head {
        width: 100%;
        min-height: 278px;
        padding-top: 78px;
        background-image: url('./5.png');
        background-repeat: no-repeat;
        background-size: 100%;
        position: relative;
        .rule {
          width: 50px;
          height: 30px;
          position: absolute;
          top: 35px;
          right: 0;
          border-radius: 30px 0 0 30px;
          background-color: #fff;
          color: #f40009;
          font-size: 14px;
          text-align: center;
          line-height: 30px;
          box-shadow:0 2px 4px rgba(166,147,142,05);
        }
        .title {
          font-size: 30px;
          color: #fff46f;
          font-weight: bolder;
          text-shadow: 0 2px 4px 0 rgba(188, 19, 4, .6);
          text-align: center;
          margin-bottom: 46px;
          .highlight {
            font-size: 40px;
            display: inline-block;
            padding: 0 3px;
          }
        }
        .head-bd {
          width: 345px;
          height: 252px;
          border-radius: 16px;
          background-color: #fff;
          margin: 0 auto;
          position: relative;
          display: flex;
          align-items: center;
          flex-direction: column;
          .bd-icon {
            width: 76px;
            height: 70px;
            position: absolute;
            top: 0;
            left: 5px;
            transform: translate3d(0, -45%, 0);
          }
          .count-down {
            text-align: right;
            padding: 10px 15px 0;
            color: #999;
            font-size: 16px;
            margin: 0;
            width: 100%;
            .time {
              display: inline-block;
              font-size: 14px;
              color: #fff;
              width: 22px;
              height: 22px;
              text-align: center;
              line-height: 22px;
              border-radius: 4px;
              background-color: #ff8200;
              margin: 0 4px;
              &:nth-of-type(1) {
                margin-left: 10px;
              }
            }
          }
          .account {
            font-size: 20px;
            color: #333;
            margin-top: 20px;
            .hightlight {
              color: #f40009;
              .sum {
                font-size: 36px;
                font-style: normal;
              }
            }
          }
          .tooltip {
            font-size: 14px;
            color: #999;
            margin: 0;
            margin-top: 15px;
            margin-bottom: 15px;
          }
          .poptip-wrap {
            width: 90px;
            height: 29px;
            position: relative;
            margin: 10px 0;
            .poptip {
              width: 90px;
              height: 37px;
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              margin: auto;
              background: url('./13.png') no-repeat;
              background-size: cover;
              text-align: center;
              font-size: 14px;
              color: #f40009;
              padding-top: 8px;
              box-sizing: border-box;
              animation: anim 1.1s infinite linear;
            }
          }
          .withdrawals {
            position: relative;
            .btn {
              width: 62px;
              height: 32px;
              border: 1px solid #fff;
              background-color: #f40009;
              font-size: 15px;
              color: #fff;
              box-shadow:0 2px 4px 0 rgba(244,0,9,0.50);
              border-radius: 32px;
              line-height: 30px;
              text-align: center;
              margin: 0;
              &.disabled {
                box-shadow:0 2px 4px 0 rgba(51,51,51,0.50);
                background-color: #999;
              }
            }
          }
          .share-btn {
            margin: 0;
            margin-top: 20px;
            width: 240px;
            height: 40px;
            border-radius: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 16px;
            color: #fee117;
            background-color: #f40009;
          }
        }
      }
      .records {
        width: 100%;
        min-height: 40px;
        background-color: #fff;
        margin-top: 20px;
        .record-head {
          padding: 0 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .text {
          font-size: 16px;
          color: #999;
          display: inline-block;
          margin: 0;
          line-height: 40px;
        }
        .record-list {
          flex: 1;
          overflow: hidden;
          ul {
            margin: 0;
            padding: 0;
            list-style: none;
            position: relative;
            height: 40px;
          }
          .item {
            max-width: 240px;
            line-height: 40px;
            font-size: 16px;
            color: #999;
            position: absolute;
            background-color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .arrow {
          width: 9px;
          height: 16px;
          display: inline-block;
          transition: transform .5s;
          &.rotate {
            transform: rotate(90deg);
          }
        }
        .list-wrap {
          padding: 0 15px 20px;
          background-color: #fff;
          .unfold-list {
            border-radius: 16px;
            background-color: #f5f5f5;
            overflow: hidden;
            margin: 0;
            padding: 0;
            list-style: none;
            .item {
              max-width: 330px;
              height: 38px;
              // text-align: center;
              line-height: 38px;
              font-size: 16px;
              color: #333;
              padding-left: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              &+.item {
                border-top: 1px solid #e8e8e8;
              }
            }
          }
        }
      }
      .recommend {
        overflow: hidden;
        .title-img {
          width: 277px;
          display: block;
          margin: 0 auto;
          margin-top: 30px;
        }
        .list {
          margin: 0;
          padding: 15px 10px 0;
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          .item {
            width: 170px;
            height: 204px;
            background-color: #fff;
            border-radius: 8px;
            margin-left: 5px;
            margin-top: 15px;
            padding: 10px 0;
            box-sizing: border-box;
            .title {
              padding: 0 9px;
              font-size: 16px;
              color: #ff8200;
              max-height: 44px;
              line-height: 22px;
              text-align: justify;
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .thumb {
              width: 160px;
              height: 90px;
              border-radius: 6px;
              // background-image: url('./4.png');
              background-color: #f5f5f5;
              background-position: 50%;
              background-repeat: no-repeat;
              background-size: cover;
              margin: 0 auto;
              margin-top: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              overflow: hidden;
              .count {
                background-image: linear-gradient(-1deg, rgba(0, 0, 0, .9) 0%, rgba(0, 0, 0, 0) 100%);
                width: 100%;
                padding: 5px;
                font-size: 12px;
                color: #fff;
                position: absolute;
                bottom: 0;
                left: 0;
              }
              .icon {
                display: inline-block;
                width: 30px;
              }
            }
            .bottom {
              margin-top: 10px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 5px;
              .text {
                font-size: 12px;
                color: #fff;
                line-height: 30px;
                height: 30px;
                width: 130px;
                border-radius: 30px;
                background-color: #f40009;
                text-align: center;
              }
              .icon {
                width: 25px;
                height: 30px;
                display: inline-block;
              }
            }
          }
        }
      }
    }
    .dialog-container {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0);
      z-index: 9999;
      .mask {
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .5);
      }
      .dialog-content_1 {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: url('./4.png') no-repeat;
        background-size: cover;
        width: 300px;
        height: 400px;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding-top: 66px;
        box-sizing: border-box;
        .close {
          width: 15px;
          height: 15px;
          background: url('./1.png') no-repeat;
          background-size: 100%;
          position: absolute;
          top: 20px;
          left: 20px;
          .extend-click;
        }
        .title {
          font-size: 23px;
          text-shadow:0 2px 2px #c5523c;
          color: #ffe6b4;
        }
        .sum {
          font-size: 34px;
          color: #ffe6b4;
          text-shadow:0 4px 4px #c5523c;
          margin-top: 25px;
          line-height: 38px;
        }
        .btn {
          width: 96px;
          height: 96px;
          overflow: hidden;
          margin-top: 74px;
          box-shadow:0 2px 4px 0 #ab331c;
          background-color: #ebcd9a;
          border-radius: 50%;
          .icon {
            width: 100%;
            display: block;
          }
        }
        .count-down {
          font-size: 15px;
          color: rgba(255, 230, 180, .4);
          margin-top: 18px;
        }
      }
      .dialog-content_2 {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        .tip-img {
          width: 100%;
        }
        .btn-wrap {
          display: flex;
          justify-content: space-around;
          padding: 0 15px 20px;
          .share-btn {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            .icon {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
            .text {
              color: #333;
              font-size: 14px;
              margin-top: 10px;
            }
          }
        }
        .cencel {
          width: 100%;
          height: 44px;
          background-color: #fff;
          line-height: 44px;
          text-align: center;
          font-size: 16px;
        }
      }
      .dialog-content_3 {        
        width: 300px;
        padding: 22px 15px 30px;
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        .close-btn {
          width: 15px;
          height: 15px;
          background: url('./1.png') no-repeat;
          background-size: 100%;
          position: absolute;
          top: 20px;
          left: 20px;
          .extend-click;
        }
        .title {
          text-align: center;
          font-size: 20px;
          color: #333;
          margin-bottom: 25px;
        }
        .scroll-content {
          width: 100%;
          height: 260px;
          overflow: auto;
        }
        .text {
          font-size: 16px;
          color: #333;
          line-height: 26px;
          text-align: justify;
        }
        .close {
          font-size: 16px;
          color: #fff;
          line-height: 40px;
          text-align: center;
          width: 190px;
          height: 40px;
          border-radius: 40px;
          background-color: #f40009;
          margin: 0 auto;
          margin-top: 20px;
        }
      }
    }
  }

  @keyframes anim {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0);
    }
  }

  /* 消息滚动动画 */
  .roll-enter-active,
  .roll-leave-active {
    transition: all .8s linear;
  }
  .roll-enter {
    transform: translate3d(0, 100%, 0);
  }
  .roll-leave-to {
    transform: translate3d(0, -100%, 0);
  }
</style>
