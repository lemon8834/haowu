<template>
  <div class="share">
    <div class="content">
      <img src="./qr-code.jpg" alt="" class="qrcode">
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import {openShare} from 'api/invite'
export default {
  data() {
    return {
      _secdata: null,
      uid: null
    }
  },
  methods: {
    _openShare() {
      openShare(this._secdata, this.uid).then((res) => {
      })
    }
  },
  created() {
    this._secdata = this.$route.query._secdata ? this.$route.query._secdata : null
    this.uid = this.$route.query.uid ? this.$route.query.uid : null
    document.title = '邀请赚钱'
    // this._openShare()
    wx.ready(() => {
      wx.onMenuShareAppMessage({
        title: '[@你]好友邀你一起来赚钱，1元提现！', // 分享标题
        desc: '<<<立即前往', // 分享描述
        link: `http://wechat.qianqiana.com/index.php?m=wechatService&c=weixin&a=location_share&uid=${this.uid}`,
        imgUrl: `https://www.yangcongv.com/wechatservice/images/share_thumb@4x.png`, // 分享图标
        success() {
        }
      })
      wx.onMenuShareTimeline({
        title: '[@你]好友邀你一起来赚钱，1元提现！',
        imgUrl: `https://www.yangcongv.com/wechatservice/images/share_thumb@4x.png`,
        link: `http://wechat.qianqiana.com/index.php?m=wechatService&c=weixin&a=location_share&uid=${this.uid}`,
        success() {
        }
      })
    })
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
  .share {
    height: 100%;
    background-image:linear-gradient(-181deg, #631fd8 10%, #a834a6 100%);
    .content {
      height: 603px;
      .bg-image('./share_bgimage');
      background-size: 100%;
      background-repeat: no-repeat;
      overflow: hidden;
      .qrcode {
        width: 190px;
        height: 190px;
        display: block;
        margin: 212px auto 0;
      }
    }
  }
</style>