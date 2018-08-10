<template>
  <div class="container">
    <div class="head-wrap">
      <div class="head-inner">
        <span class="balance-text">当前余额：</span>
        <span class="balance">￥{{moneys || '0.00'}}</span>
        <div class="tolltip">
          <span class="text">每天可提现2次</span>
        </div>
      </div>
    </div>
    <div class="btn-pannel">
      <p class="btn" @click="withdraw(item)" :class="{disabled: data.money*1 < item*1}" v-for="(item, index) in btns" :key="index">提现{{item}}元</p>
    </div>
    <div class="list-wrap">
      <div class="title-wrap">
        <span class="tab-item" :class="{active: active == 0}" @click="tabChange(0)">零钱明细</span>
        <span class="tab-item" :class="{active: active == 1}" @click="tabChange(1)">提现记录</span>
      </div>
      <ul class="list-ul" v-show="active == 0">
        <p class="tooltip" v-show="!list.length">暂时没有记录!</p>
        <li class="item" v-for="(item, index) of data.data" :key="index" >
          <div class="item-info">
            <p class="text">{{item.note}}</p>
            <p class="time">{{item.createtime}}</p>
          </div>
          <span class="sum">{{_mold(item.mold)}}{{item.point}}元</span>
        </li>
        <li class="last-item" v-show="list.length">(系统只保留最近3天的收支明细)</li>
      </ul>
      <ul class="list-ul" v-show="active == 1">
        <p class="tooltip" v-if="!history.length">暂时没有记录!</p>
        <li class="item" v-for="(item, index) of data.history" :key="index" >
          <div class="item-info">
            <p class="text">{{item.status}}</p>
            <p class="time">{{item.createtime}}</p>
          </div>
          <span class="sum">+{{item.money}}元</span>
        </li>
        <li class="last-item" v-show="history.length">(系统只保留最近3天的收支明细)</li>
      </ul>
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {
  data() {
    return {
      btns: [ '1', '2', '3' ],
      data: {},
      _secdata: '',
      money: 0,
      active: 0
    }
  },
  computed: {
    list() {
      return this._formatList(this.data.data) || []
    },
    history() {
      return this.data.history || []
    },
    moneys() {
      return ((this.data.money || 0)*1).toFixed(2)
    }
  },
  methods: {
    withdraw(item) {
      if(this.data.money || this.data.num) {
        if((this.data.money)*1 < item*1) {
          alert('余额不足')
          return
        }else if(this.data.num == 0) {
          alert('提现次数已上限')
          return
        }
        this.money = item
        this._withdraw()
      }else {
        alert('加载缓慢，请刷新或重新打开页面')
        return
      }
    },
    tabChange(idx) {
      if(this.active == idx) return
      this.active = idx
      this._getData()
    },
    _getData() {
      this.$fly.post(`${process.env.API_HOST}index.php?m=wechatService&c=index&a=getUserWithdraw`, {
        _secdata: this._secdata
      })
      .then(res => {
        // console.log(JSON.parse(res))
        if(JSON.parse(res).result === 1) {          
          this.data = JSON.parse(res)
        }
      })
    },
    _mold(mold) {
      if(mold == 2) {
        return '+'
      }else if(mold == 1) {
        return '-'
      }
    },
    _withdraw() {
      alert('提现申请提交成功，请耐心等待1-3个工作日')
      this.data.num --
      this.$fly.post(`${process.env.API_HOST}index.php?m=wechatService&c=index&a=withdrawCash`, {
        _secdata: this._secdata,
        money: this.money
      }).then(res => {
        if(JSON.parse(res).result == 1) {
          this.data.money -= this.money
        }
      })
    },
    _formatList(data) {
      const ret = []
      for(let i in data) {
        ret.push(data[i])
      }
      return ret
    }
  },
  created() {
    document.title = '提现'
    this._secdata = this.$route.query._secdata
    this._getData()
    wx.ready(() => {
      wx.onMenuShareAppMessage({
        title: '幸运大转盘，人人有奖，iPhoneX大奖等你拿！', // 分享标题
        desc: '每天现金奖励等你拿！', // 分享描述
        link: `http://wechat.qianqiana.com/index.php?m=wechatService&c=weixin&a=location_mv`,
        imgUrl: 'https://www.yangcongv.com/wechatservice/images/16.png', // 分享图标
        success() {
        }
      })
      wx.onMenuShareTimeline({
        title: '幸运大转盘，人人有奖，iPhoneX大奖等你拿！',
        imgUrl: 'https://www.yangcongv.com/wechatservice/images/16.png',
        link: `http://wechat.qianqiana.com/index.php?m=wechatService&c=weixin&a=location_mv`,
        success() {
        }
      })
    })
    // console.log(this.list)
  }
}
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #fff;
    .head-wrap {
      padding-bottom: 10px;
      background-color: #f5f5f5;
      .head-inner {
        width: 100%;
        display: flex;
        padding: 18px 15px;
        background-color: #fff;
        align-items: center;
        .balance-text {
          font-size: 16px;
          color: #333;
          padding-left: 10px;
          display: inline-block;
          border-left: 2px solid #f40009;
        }
        .balance {
          font-size: 22px;
          color: #333;
        }
        .tolltip {
          padding: 0 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
          background-color: #fee117;
          height: 20px;
          border-radius: 20px;
          .text {
            color: #333;
            font-size: 10px;
          }
        }
      }
    }
    .btn-pannel {
      padding: 5px 0 15px 5px;
      background-color: #fff;
      display: flex;
      flex-wrap: wrap;
      .btn {
        font-size: 15px;
        color: #333;
        border: 1px solid #666;
        margin: 10px 0 0 15px;
        width: 102px;
        height: 44px;
        background-color: #fff;
        text-align: center;
        line-height: 42px;
        border-radius: 44px;
        &.disabled {
          color: #999;
          background-color: #e8e8e8;
          border: 1px solid #e8e8e8;
        }
      }
    }
    .list-wrap {
      border-top: 1px solid #e8e8e8;
      flex: 1;
      position: relative;
      .title-wrap {
        border-bottom: 1px solid #e8e8e8;
        padding: 0 15px;
        display: flex;
        height: 61px;
        align-items: center;
        .tab-item {
          width: 50%;
          text-align: center;
          display: inline-block;
          font-size: 13px;
          color: #333;
          height: 34px;
          line-height: 34px;
          position: relative;
          &.active {
            &:after {
              content: '';
              display: block;
              height: 4px;
              width: 15px;
              border-radius: 4px;
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              background-color: #f40009;
            }            
          }
        }
      }      
      .list-ul {
        position: absolute;
        top: 61px;
        bottom: 0;
        width: 100%;
        background-color: #fff;
        margin: 0;
        padding: 0;
        overflow-y: auto;
        padding: 0 15px;
        list-style: none;
        box-sizing: border-box;
        .tooltip {
          font-size: 16px;
          color: #333;
          text-align: center;
          margin-top: 120px;
        }
        .last-item {
          font-size: 13px;
          color: #666;
          padding: 10px 0;
          background-color: #fff;
        }
        .item {
          padding: 15px 0;
          display: flex;
          align-items: center;
          &+.item {
            border-top: 1px solid #e8e8e8;
          }
          .item-info {
            flex: 1;
            p {
              margin: 0;
            }
            .text {
              font-size: 15px;
              color: #333;
              margin-bottom: 10px;
            }
            .time {
              color: #c1c1c1;
              font-size: 10px;
            }
          }
          .sum {
            font-size: 15px;
            color: #f40009;
          }
        }
      }
    }
  }
</style>
