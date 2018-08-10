<template>
  <div class="wrapper">
    <div class="slider-wrap">
      <div class="slider-inner" ref="slider">
        <div class="slider-container" ref="sliderGroup">
          <div class="slider-item">
            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo">
              <img class="slider-logo" src="../../../static/images/logo1.png" alt="">
              <p class="slider-desc">洋葱视频<br><span>一款能看视频还能赚钱的APP</span></p>
              <p class="open-btn">打开</p>
            </a>
          </div>
          <div class="slider-item">
            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo">
              <img :src="sliderData.thumb" alt="">
              <p class="title">{{sliderData.title}}</p>
              <p class="open-btn">打开</p>
            </a>
          </div>
        </div>
        <div class="dots">
          <span class="dot" v-for="(item, index) in dots" :class="{active: currentPage === index}" :key="index"></span>
        </div>
      </div>
    </div>
    <div class="red-packet_bg" v-if="redPacketShow" @click="openRedPacket"></div>
    <div class="content-wrap">
      <div class="userinfo">
        <div class="avatar-wrap">
          <img :src="userInfo.headface" alt="" class="avatar">
        </div>
        <span class="nick">{{userInfo.nick}}</span>
      </div>
      <p class="title">{{shareData.title}}</p>
      <div class="video-wrap" @click="videoPlay" :style="{backgroundImage: 'url('+shareData.thumb+')'}">
        <img class="play-icon" src="../../../static/images/play_icon.png" alt="" v-show="playIcon">
        <video class="video" 
          :width="screenWidth" 
          :poster="shareData.thumb" 
          :src="shareData.videoMp4"
          ref="video" 
          :controls="controls" 
          x5-playsinline 
          playsinline 
          webkit-playsinline 
          @timeupdate="timeupdate"
          @ended="playEnd"></video>
      </div>
      <a class="video-info" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo">
        <div class="bottom">
          <div class="count">
            <img src="./play-num.png" alt="" class="icon">
            <span class="text">{{shareData.plays}}</span>
          </div>
          <div class="count">
            <img src="./thumb-up-icon@3x.png" alt="" class="icon">
            <span class="text">{{shareData.praises}}</span>
          </div>
          <div class="count">
            <img src="./comment-icon@3x.png" alt="" class="icon">
            <span class="text">{{shareData.coments}}</span>
          </div>
          <span class="download">下载APP</span>
        </div>
      </a>
      <div class="padding-top"></div>
      <div class="content-bottom">
        <p class="list-title">热门视频</p>
        <ul class="hot-list">
          <li class="hot-item" v-for="item in shareData.hotVideo" :key="item.id">
            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo">
              <div class="item-video">
                <img class="item-poster" :src="item.thumb" alt="">
                <span class="duration">{{item.formatDuration}}</span>
              </div>
              <p class="item-video_title">{{item.title}}</p>
              <p class="info-wrap"><span class="play-num">{{item.views}}</span><span class="open-app">打开APP</span></p>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom-wrap">
      <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo" class="bottom-inner"></a>
    </div>
  </div>
</template>

<script>
import { getQueryString } from 'common/js/util'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      dots: [],
      shareData: {},
      userInfo: {},
      sliderData: {},
      currentPage: 0,
      controls: false,
      playIcon: true,
      vid: this.$route.query.vid,
      redPacketShow: false
    }
  },
  computed: {
    screenWidth() {
      return window.screen.width
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      this._play()
    }, 20)
  },
  methods: {
    /** 视频播放 */
    videoPlay() {
      let video = this.$refs.video
      this.controls = true
      this.playIcon = false
      video.play()
    },
    timeupdate() {
      let video = this.$refs.video
      if(video.currentTime > this.shareData.duration / 2) {
        this.redPacketShow = true
      }
    },
    openRedPacket() {
      this.$router.push({
        path: `/download`
      })
      // window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo'
    },
    playEnd() {
      // this.$axios.get(`${proecss.env.API_HOST}/index.php?`)
      // .then(res => {

      // })
    },
    /** 轮播图 */
    _setSliderWidth() {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      width += 2 * sliderWidth
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: true,
          threshold: 0.3
        },
        snapSpeed: 400
      })

      this.slider.on('scrollEnd', () => {
        this.currentPage = this.slider.getCurrentPage().pageX
        clearTimeout(this.timer)
        this._play()
      })
    },
    _play() {
      this.timer = setTimeout(() => {
        this.slider.next()
      }, 2500)
    },
    _getShareData() {
      this.$axios.get(`${process.env.API_HOST}index.php?m=video&c=index&a=show&vid=${this.vid}`)
      .then(res => {
        this.shareData = res.data.data
        this.userInfo = res.data.data.userInfo
        this.sliderData = res.data.data.hotVideo[Math.floor(Math.random()*6+1)]
      })
    }
  },
  created() {
    this._getShareData()
  }
}
</script>

<style lang="scss" scoped>
@import '~common/scss/mixin';
.wrapper {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #fff;
  overflow-y: auto;
  .red-packet_bg {
    width: 165px;
    height: 220px;
    @include bg-image('../../../static/images/c', 'jpg');
    background-size: 100%;
    background-repeat: no-repeat;
    position: fixed;
    bottom: 55px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 998;
    border-radius: 8px;
    animation: shake 1.5s infinite;
  }
  .slider-wrap {
    width: 100%;
    height: 50px;
    position: relative;
    z-index: 99;
    .slider-inner {
      width: 100%;
      height: 50px;
      position: fixed;
      top: 0;
      left: 0;
      white-space: nowrap;
      overflow: hidden;
      .slider-item {
        width: 100%;
        height: 50px;
        background-color: #333;
        float: left;
        color: #fff;
        a {
          display: flex;
          height: 100%;
          align-items: center;
          padding: 0 10px;
          img {
            width: 62px;
            height: 36px;
          }
          .slider-logo {
            width: 36px;
            border-radius: 4px;
          }
          .title {
            flex-grow: 1;
            font-size: 12px;
            color: #fff;
            margin-left: 10px;
            min-height: 36px;
            line-height: 1.4;
            white-space: normal;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .slider-desc {
            flex-grow: 1;
            color: rgba(255, 255, 255, 1);
            font-size: 14px;
            margin-left: 10px;
            span {
              font-size: 12px;
              margin-top: 5px;
              display: inline-block;
            }
          }
          .open-btn {
            flex: 0 0 60px;
            height: 26px;
            border-radius: 26px;
            color: #fff;
            text-align: center;
            line-height: 26px;
            margin-left: 0.33rem;
            background-color: #f85626;
          }
        }
      }
      .dots {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 5px;
        font-size: 0;
        text-align: center;
        .dot {
          width: 4px;
          height: 2px;
          background-color: rgba(255, 255, 255, 0.4);
          border-radius: 2px;
          display: inline-block;
          margin: 0 3px;
          &.active {
            width: 8px;
            background-color: #fff;
          }
        }
      }
    }
  }
  .content-wrap {
    padding-bottom: 10px;
    // border-bottom: 1px solid #e8e8e8;
    .userinfo {
      display: flex;
      padding: 10px 15px;
      align-items: center;
      .avatar-wrap {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
        background-color: #f5f5f5;
        .avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: block;
        }
      }
      .nick {
        font-size: 14px;
        color: #333;
      }
    }
    .title {
      margin: 0;
      font-size: 18px;
      color: #333;
      text-align: justify;
      line-height: 22px;  
      padding: 0 15px 10px;
    }
    .video-wrap {
      width: 100%;
      position: relative;
      font-size: 0;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: 50%;
      .video {
        width: 100%;
        object-fit: contain;
      }
      .play-icon {
        width: 25px;
        height: 31px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
    .video-info {
      padding: 15px;
      display: block;
      .bottom {
        display: flex;
        line-height: 1;
        font-size: 11px;
        color: #999;
        .count {
          display: inline-flex;
          align-items: center;
          &+.count {
            margin-left: 20px;
          }
          .icon {
            width: 18px;
            height: 18px;
            display: inline-block;
            margin-right: 5px;
          }
          .text {
            font-size: 13px;
            color: #999;
          }
        }
        .flex1 {
          flex: 1;
          margin-left: 5px;
        }
        .download {
          color: #f40009;
          text-decoration: none;
          line-height: 22px;
          flex: 1;
          text-align: right;
        }
      }
    }
    .padding-top {
      padding-top: 5px;
      background-color: #f5f5f5;
      width: 100%;
    }
    .content-bottom {
      width: 100%;
      padding: 15px 15px 0;
      box-sizing: border-box;
      .title {
        font-size: 18px;
        color: #333;
        line-height: 1.4;
        font-weight: 800;
      }
      .info {
        color: #999;
        font-size: 0;
        margin-top: 5px;
        span {
          font-size: 11px;
        }
        span + span {
          margin-left: 10px;
        }
      }
      .list-title {
        font-size: 14px;
        color: #333;
        font-weight: 800;
        padding: 0 0 10px;
      }
      .hot-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: -15px;
        .hot-item {
          width: 4.53rem;
          margin-bottom: 15px;
          a {
            display: block;
          }
          .item-video {
            width: 100%;
            height: 100px;
            overflow: hidden;
            position: relative;
            .item-poster {
              width: 100%;
              height: 100%;
            }
            .duration {
              width: 44px;
              height: 20px;
              border-radius: 20px;
              background-color: rgba(0, 0, 0, 0.6);
              position: absolute;
              bottom: 5px;
              right: 5px;
              color: #fff;
              text-align: center;
              line-height: 20px;
              font-size: 12px;
            }
          }
          .item-video_title {
            font-size: 12px;
            color: #333;
            line-height: 1.4;
            margin-top: 6px;
            min-height: 32px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .info-wrap {
            font-size: 0;
            margin-top: 5px;
            .play-num {
              color: #999;
              font-size: 12px;
            }
            .open-app {
              font-size: 12px;
              color: #f85626;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
  .bottom-wrap {
    width: 100%;
    height: 73px;    
    .bottom-inner {
      background: url('./download-bgimage.png') no-repeat;
      background-size: 100%;
      background-position: 50%;
      display: block;
      width: 100%;
      height: 73px;
      position: fixed;
      bottom: 0;
      left: 0;
    }
    a {
      height: 50px;
      display: flex;
      align-items: center;
    }
    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }
    .center {
      flex-grow: 1;
      margin-left: 10px;
      display: inline-flex;
      flex-direction: column;
      font-size: 13px;
      color: #333;
      .msg {
        font-size: 11px;
        color: #f85626;
        margin-top: 5px;
        display: inline-block;
      }
    }
    .red-pack {
      display: inline-flex;
      align-items: center;
    }
    .red-pack_bg {
      width: 51px;
      height: 46px;
      transform: rotate(-15deg) translate3d(20px, 5px, 0);
    }
    .red-pack_btn {
      background-image: linear-gradient(-180deg, #fc8f4e 0%, #f85626 100%);
      border-radius: 30px;
      width: 86px;
      height: 30px;
      color: #f8e71c;
      font-size: 13px;
      text-align: center;
      line-height: 30px;
      display: block;
    }
  }
}
@keyframes shake {
  0%, 55%, 100% {
    transform: translate3d(0, 0, 0);
  }
  5%, 
  15%, 
  25%, 
  35%, 
  45% {
    transform: translate3d(-5px, 0, 0);
  }
  10%, 
  20%, 
  30%, 
  40%, 
  50% {
    transform: translate3d(5px, 0, 0);
  }
}
</style>
