<template>
  <div class="container">
    <div class="first-wrap" v-show="!result">
      <div class="content">
        <div class="box-image" :class="{swing: swing}"></div>
        <div class="result-before" v-show="!swing">
          <div class="image" :class="swing ? '':'rollin'"></div>
        </div>
      </div>
    </div>
    <div class="second-wrap" v-show="result">
      <div class="bg-image"></div>
      <div class="bg-mask"></div>
      <div class="content" v-show="!shareImgShow">
          <div class="result">
            <p class="title">你的运势</p>
            <div class="text">
              <p class="keywords">{{data.keywords}}</p>
              <p>{{data.content}}</p>
            </div>
          </div>
        <p class="btn" @click="createShareImage">生成图片</p>
        <p class="btn" @click="tryAgain">再摇一次</p>
      </div>
      <div class="content" v-show="shareImgShow">
        <div class="share-img" @click="previewImage">
          <img :src="data.data" alt="">
        </div>
        <p class="btn" @click="saveImage">保存至相册</p>
        <p class="btn" @click="isShare=!isShare">分享好运</p>
      </div>
    </div>
    <div class="mask" v-show="loading">
      <div class="loading-wrap">
        <loading></loading>
      </div>
    </div>
    <div class="mask" v-show="!isPlay">
      <div class="box">
        <p class="desc">您今日次数已用完，分享到给好友或朋友圈可继续抽签</p>
        <span class="btn" @click="isPlay=!isPlay">确定</span>
      </div>
    </div>
    <div class="mask" v-show="isShare" @click="isShare = !isShare">
      <img src="./images/share-img@2x.png" alt="" class="share-img">
    </div>
    <audio src="http://wechat.qianqiana.com/wechatservice/5018.mp3" ref="audio"></audio>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
import 'common/js/shake'
import wx from 'weixin-js-sdk'
export default {
  data() {
    return {
      swing: true,
      result: false,
      loading: false,
      isPlay: true,
      isShare: false,
      shareImgShow: false,
      data: {}
    }
  },
  mounted() {
    document.title = '求签'
    const _this = this
    // setTimeout(() => {
    //   this._getData()
    // }, 2000)
    var myShakeEvent = new Shake({
      threshold: 10, // 摇动阈值
      timeout: 500 // 事件发生频率，是可选值
    })    
    // 监听设备动作
    myShakeEvent.start()
    window.addEventListener('shake', this.shakeEventDidOccur, false)
    wx.ready(() => {
      wx.onMenuShareAppMessage({
        title: '这个求签太准了！你也快来试试吧。', // 分享标题
        desc: '原来我的运势是这样！', // 分享描述
        link: `http://wechat.qianqiana.com/index.php?m=weChatVideo&c=weixin&a=location_draw`,
        imgUrl: `https://www.yangcongv.com/wechatservice/image/Slice.png`, // 分享图标
        success() {
          _this._addNum()
        }
      })
      wx.onMenuShareTimeline({
        title: '这个求签太准了！你也快来试试吧。',
        imgUrl: `https://www.yangcongv.com/wechatservice/image/Slice.png`,
        link: `http://wechat.qianqiana.com/index.php?m=weChatVideo&c=weixin&a=location_draw`,
        success() {
          _this._addNum()
        }
      })
    })
  },
  components: {
    Loading
  },
  methods: {
    createShareImage() {
      this.shareImgShow = true
    },
    previewImage() {
      wx.previewImage({
        current: data.data, // 当前显示图片的http链接
        urls: [] // 需要预览的图片http链接列表
      })
    },
    saveImage() {
      alert('长按图片进行保存')
    },
    tryAgain() {
      this.result = false
      this.swing = true
      this.shareImgShow = false
    },
    shakeEventDidOccur() {
      if(!this.loading && this.swing) {   
        this.$refs.audio.play()
        this._getData()
      }else {
        return
      }      
    },
    _getData() {
      // this.$refs.audio.play()
      this.loading = true
      this.$fly.get(`${process.env.API_HOST}index.php?m=wechatService&c=createImg&a=createImage&_secdata=${this._secdata}`)
      .then((res) => {
        const result = JSON.parse(res)
        this.loading = false
        if(result.result === 1) {
          this.data = result
          this.swing = false
          setTimeout(() => {
            this.result = true
          }, 1500)
        }else {
          this.isPlay = false
        }
      })
    },
    _addNum() {
      this.$fly.get(`${process.env.API_HOST}index.php?m=wechatService&c=createImg&a=addNum&_secdata=${this._secdata}`)
      .then((res) => {})
    }
  },
  created() {
    this._secdata = this.$route.query._secdata ? this.$route.query._secdata : null
  }
}
</script>

<style lang="less" scoped>
  .bg-image(@url) {
    background-image: url('@{url}@2x.png');
    @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3){
      background-image: url('@{url}@3x.png');
    }
  }
  .container {
    height: 100%;
    .first-wrap {
      height: 100%;
      background-image:radial-gradient(50% 127%, #fff0d7 8%, #cf9e73 100%);
      .content {
        width: 100%;
        height: 603px;
        .bg-image('./images/first-bgimg');
        background-size: 100%;
        background-repeat: no-repeat;
        overflow: hidden;
        .box-image {
          width: 134px;
          height: 369px;
          .bg-image('./images/box-img');
          background-size: 100%;
          background-repeat: no-repeat;
          margin: 0 auto;
          margin-top: 125px;
        }
        .result-before {
          width: 100%;
          position: fixed;
          top: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, .66);
          z-index: 999;
          .image {
            width: 60px;
            height: 370px;
            .bg-image('./images/result-img');
            background-size: 100%;
            background-repeat: no-repeat;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            transform-style: preserve-3d; 
          }
        }
      }
    }
    .second-wrap {
      height: 100%;
      background-color: #f0e7d8;
      position: relative;
      .bg-image {
        width: 100%;
        height: 603px;
        .bg-image('./images/result-bgimg');
        background-size: 100%;
        background-repeat: no-repeat;
      }
      .bg-mask {
        width: 434px;
        height: 100%;
        background: url('./images/bg-mask@3x.png') no-repeat;
        background-size: cover;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        z-index: 5;
      }
      .content {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        z-index: 6;
        overflow: hidden;
        .result {
          width: 310px;
          height: 407px;
          .bg-image('./images/result');
          background-size: 100%;
          background-repeat: no-repeat;
          margin: 0 auto;
          margin-top: 27px;
          overflow: hidden;
          .title {
            font-size: 16px;
            color: #333;
            margin: 0 auto;
            text-align: center;
            margin: 0;
            margin-top: 65px;
          }
          .text {
            // width: 219px;
            height: 240px;
            margin: 0 auto;
            margin-top: 25px;
            line-height: 2.5;
            font-size: 20px;
            color: #333;
            writing-mode: vertical-rl;
            // font-weight: 600;
            letter-spacing: 3px;
            text-align: justify;
            .keywords {
              font-size: 40px;
              color: #333;
              font-weight: 650;
              // text-align: center;
              line-height: 1.5;
            }
          }
        }
        .share-img {
          width: 250px;
          height: 403px;
          margin: 0 auto;
          margin-top: 31px;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .btn {
          width: 226px;
          height: 44px;            
          .bg-image('./images/btn-bgimg');
          background-repeat: no-repeat;
          background-size: 100%;
          text-align: center;
          font-size: 18px;
          color: #7e4410;
          line-height: 44px;
          margin: 0 auto;
          margin-top: 33px;
          font-weight: 600;
          display: block;
          text-decoration: none;
          &+.btn {
            margin-top: 26px;
          }
        }
      }
    }
    .mask {
      width: 100%;
      top: 0;
      bottom: 0;
      position: fixed;
      background-color: rgba(0, 0, 0, .6);
      z-index: 999;
      .loading-wrap {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
      }
      .box {
        width: 280px;
        height: 188px;
        background-color: #fff;
        border-radius: 4px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        padding: 45px 28px 0;
        box-sizing: border-box;
        .desc {
          font-size: 18px;
          color: #333;
          margin: 0;
          line-height: 1.3;
        }
        .btn {
          width: 143px;
          height: 44px;
          display: block;
          margin: 0 auto;
          margin-top: 30px;
          color: #49260b;
          background-color: #f5a623;
          border-radius: 3px;
          line-height: 44px;
          text-align: center;
          font-size: 18px;
        }
      }
      .share-img {
        width: 100%;
      }
    }
  }
  .swing {
    animation: swing 1.1s linear infinite;
  }
  .rollin {
    animation: rollIn 1.5s 1;
  }
  .scale-enter-active,
  .scale-leave-active {
    transition: all 1s;
  }
  .scale-enter,
  .scale-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
  @keyframes swing{
    20%{
      transform:rotate(15deg)
    }
    40%{
      transform:rotate(-10deg);
    }
    60%{
      transform:rotate(5deg)
    }
    80%{
      transform:rotate(-5deg)
    }
    100%{
      transform:rotate(0deg)
    }
  }

  @keyframes rollIn {
    from {
      opacity: 0;
      -webkit-transform: scale(0.1) translate3d(0, -100%, 0);
      transform: scale3d(0.1) translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: scale(1) translate3d(0, 0, 0);
      transform: scale(1) translate3d(0, 0, 0);
    }
  }
  
</style>