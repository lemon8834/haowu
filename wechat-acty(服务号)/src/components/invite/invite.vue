<template>
  <div class="invite">
    
    <div class="bg-image">
      <div class="rule" @click="toggleRule"></div>
    </div>
    <p class="share-btn" @click="maskShow">立即邀请，拿奖励</p>
    <p class="tooltip">每邀请一个好友关注可获得0.1元现金奖励</p>
    <div class="invite-tips">
      <p class="title"></p>
      <div class="tips">
        <img src="./icon_2@3x.jpg" alt="" class="icon">
        <span class="text">1.点击按钮，分享链接</span>
      </div>
      <div class="tips">
        <img src="./icon_1@3x.jpg" alt="" class="icon">
        <span class="text">2.好友通过您分享的链接识别二维码关注“洋葱视频APP”公众号</span>
      </div>
      <div class="tips">
        <img src="./icon_3@3x.jpg" alt="" class="icon">
        <span class="text">3.好友进入公众号,点开“推荐视频”观看10秒，即可获得奖励</span>
      </div>
    </div>
    <div class="invite-list">
      <p class="title"></p>
      <ul class="list-ul">
        <li class="tooltip" v-show="!inviteList.length">暂无邀请记录！</li>
        <li class="item" v-if="inviteList.length">
          <span>好友</span>
          <span>邀请时间</span>
          <span>是否获得奖励</span>
        </li>
        <li class="item" v-for="(item, index) of inviteList" :key="index">
          <span>{{item.nick}}</span>
          <span>{{item.createtime}}</span>
          <span>是</span>
        </li>
      </ul>
    </div>
    <div class="share-mask" v-show="mask" @click="maskShow"></div>
    <div class="rules" v-show="ruleShow">
      <div class="content">
        <div class="content-inner">
          <p class="title"></p>
          <div class="text">
            <em class="num">1</em>
            <span>通过公众号发送链接邀请好友识别二维码关注公众号，并观看10秒以上推荐视频，即可获得0.1元奖励。邀请越多，奖励越多无上限！</span>
          </div>
          <div class="text">
            <em class="num">2</em>
            <span>一个好友只可以给一次奖励。</span>
          </div>
          <div class="text">
            <em class="num">3</em>
            <span>请遵守活动规则，作弊行为奖励将被扣除。最终解释权归洋葱视频所有！</span>
          </div>
          <div class="close" @click="toggleRule">返回</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import {inviteList} from 'api/invite'
export default {
  data() {
    return {
      mask: false,
      _secdata: null,
      invite: {},
      ruleShow: false
    }
  },
  computed: {
    inviteList() {
      return this.invite.list || []
    }
  },
  methods: {
    maskShow() {
      this.mask = !this.mask
    },
    toggleRule() {
      this.ruleShow = !this.ruleShow
    },
    _inviteList() {
      inviteList(this._secdata).then((res) => {
        const result = JSON.parse(res)
        if(result.result === 1) {
          this.invite = result
          wx.ready(() => {
            wx.onMenuShareAppMessage({
              title: `[@你]好友邀你一起来赚钱，1元提现！`, // 分享标题
              desc: '<<<立即前往', // 分享描述
              link: `http://wechat.qianqiana.com/index.php?m=wechatService&c=weixin&a=location_share&uid=${this.invite.uid}`,
              imgUrl: `https://www.yangcongv.com/wechatservice/images/share_thumb@4x.png`, // 分享图标
              success() {
              }
            })
            wx.onMenuShareTimeline({
              title: `[@你]好友邀你一起来赚钱，1元提现！`,
              imgUrl: `https://www.yangcongv.com/wechatservice/images/share_thumb@4x.png`,
              link: `http://wechat.qianqiana.com/index.php?m=wechatService&c=weixin&a=location_share&uid=${this.invite.uid}`,
              success() {
              }
            })
          })
        }
        // console.log(result)
      })
    }
  },
  created() {
    this._secdata = this.$route.query._secdata ? this.$route.query._secdata : null
    this._inviteList()
    document.title = '邀请赚钱'
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
  .invite {
    height: 100%;
    overflow: auto;
    background-color: #fff0b1;
    padding-bottom: 50px;
    box-sizing: border-box;
    
    .bg-image {
      width: 100%;
      height: 0;
      padding-top: 256px;
      .bg-image('./head_bgimage');
      background-repeat: no-repeat;
      background-size: 100%;
      position: relative;
      .rule {
        width: 55px;
        height: 58px;
        background: url('./rule_btn_img@3x.png') no-repeat;
        background-size: cover;
        position: absolute;
        top: 0;
        right: 10px;
      }
    }
    .share-btn {
      width: 335px;
      height: 48px;
      text-align: center;
      line-height: 48px;
      font-size: 18px;
      color: #fff;
      // font-weight: 700;
      margin: 0 auto;
      margin-top: 6px;
      background-image: url('./share_btn_img@3x.png');
      background-repeat: no-repeat;
      background-size: cover;
    }
    .tooltip {
      font-size: 16px;
      color: #ff4531;
      text-align: center;
      margin-top: 10px;
    }
    .invite-tips {
      width: 335px;
      height: 285px;
      border-radius: 16px;
      background: #fff;
      box-shadow: 0 2px 10px 0 rgba(235,175,13,0.54);
      margin: 0 auto;
      margin-top: 41px;
      position: relative;
      padding: 43px 25px 0;
      box-sizing: border-box;
      .title {
        width: 180px;
        height: 39px;
        .bg-image('./title_bgimage1');
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
      }
      .tips {
        display: flex;
        align-items: center;
        &+.tips {
          margin-top: 30px;
        }
        .icon {
          width: 52px;
          height: 49px;
          display: inline-block;
        }
        .text {
          display: inline-block;
          font-size: 16px;
          color: #333;
          margin-left: 15px;
          line-height: 1.4;
        }
      }
    }
    .invite-list {
      width: 335px;
      min-height: 313px;
      height: auto;
      border-radius: 16px;
      background: #fff;
      box-shadow: 0 2px 10px 0 rgba(235,175,13,0.54);
      margin: 0 auto;
      margin-top: 39px;
      position: relative;
      padding: 35px 15px 20px;
      box-sizing: border-box;
      display: flex;
      .title {
        width: 180px;
        height: 39px;
        .bg-image('./title_bgimage');
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
      }
      .list-ul {
        flex: 1;
        background-color: #fff7e8;
        border-radius: 4px;
        margin: 0;
        padding: 17px 10px;
        box-sizing: border-box;
        list-style: none;
        overflow: hidden;
        .tooltip {
          width: 100%;
          text-align: center;
          font-size: 14px;
          color: #333;
          margin-top: 30%;
        }
        .item {
          width: 100%;
          display: flex;
          &+.item {
            margin-top: 20px;
          }
          span {
            display: inline-block;
            width: 33%;
            padding: 0 5px;
            box-sizing: border-box;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
            color: #8b572a;
            text-align: center;
          }
        }
      }
    }
    .share-mask {
      width: 100%;
      height: 100%;
      .bg-image('./share-img');
      background-color: rgba(0, 0, 0, .6);
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: top;
      position: fixed;
      top: 0;
      left: 0;
    }
    .rules {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .6);
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: top;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .content {
        width: 305px;
        height: 409px;
        background-color: #fff;
        border-radius: 18px;
        padding: 10px;
        box-sizing: border-box;
        .content-inner {
          width: 100%;
          height: 100%;
          border: 2px solid #ff4531;
          border-radius: 18px;
          box-sizing: border-box;
          padding: 25px 20px 0;
          .title {
            width: 103px;
            height: 19px;
            .bg-image('./rule-bg');
            background-size: 100%;
            background-repeat: no-repeat;
            margin: 0 auto;
            position: relative;
            margin-bottom: 33px;
            &:after {
              content: '';
              width: 128px;
              height: 1px;
              background-color: #FF4531;
              position: absolute;
              left: 50%;
              transform: translate3d(-50%, 0, 0);
              bottom: -15px;
              margin: auto;
            }
          }
          .text {
            display: flex;
            &+.text {
              margin-top: 20px;
            }
            .num {
              width: 20px;
              height: 20px;
              display: inline-block;
              border-radius: 50%;
              font-size: 16px;
              color: #fff;
              line-height: 20px;
              text-align: center;
              background-color: #ff4531;
              font-style: normal;
            }
            span {
              font-size: 14px;
              color: #333;
              line-height: 1.4;
              display: inline-block;
              flex: 1;
              margin-left: 10px;
              text-align: justify;
              // font-weight: 700;
            }
          }
          .close {
            background-image:linear-gradient(-180deg, #ffa704 2%, #fe4900 98%);
            border-radius: 44px;
            width: 200px;
            height: 44px;
            text-align: center;
            line-height: 44px;
            font-size: 18px;
            color: #fff;
            font-weight: 700;
            margin: 32px auto 0;
          }
        }
      }
    }
  }
</style>
