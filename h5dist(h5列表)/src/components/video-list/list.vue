<template>
  <div class="list">
    <div class="swiper" v-show="false">
      <div class="slider-inner" ref="slider">
        <div class="slider-container" ref="sliderGroup">
          <!-- <div class="slider-item">
            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo">
              <img class="slider-logo" src="./logo1.png" alt="">
              <p class="slider-desc">洋葱视频<br><span>一款能看视频还能赚钱的APP</span></p>
              <p class="open-btn">打开</p>
            </a>
          </div> -->
          <div class="slider-item" v-for="item of sliders" :key="item.id">
            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo">
              <img :src="item.thumb" alt="">
              <p class="title">{{item.title}}</p>
              <p class="open-btn">打开</p>
            </a>
          </div>
        </div>
        <div class="dots">
          <span class="dot" v-for="(item, index) in dots" :class="{active: currentPage === index}" :key="index"></span>
        </div>
      </div>
    </div>
    <div class="list-wrap">
      <ul class="list-ul">
        <li class="item" v-for="(item, index) of data" :key="item.id">
          <div class="item-inner">
            <p class="tooltps" v-show="index == 1">来自洋葱视频的精彩推荐</p>
            <!-- <div class="userinfo">
              <img :src="item.headface" alt="" class="avatar">
              <span class="nick">{{item.username}}</span>
            </div> -->
            <p class="title">{{item.title}}</p>
            <div class="video-wrap" :style="{backgroundImage: 'url('+ item.thumb +')'}" @click="playVideo(index)">
              <video ref="video"
                     :src="item.video"
                     class="video"
                     @timeupdate="timeupdate(index)"
                     :controls="index==currentIndex"
                     :poster="item.thumb"
                     x5-playsinline 
                     playsinline 
                     webkit-playsinline></video>
              <img src="./play_icon.png" alt="" class="play-icon" v-show="index!=currentIndex">
            </div>
            <a class="video-info" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo">
              <div class="bottom">
                <div class="count">
                  <img src="./play-num.png" alt="" class="icon">
                  <span class="text">{{item.views}}</span>
                </div>
                <div class="count">
                  <img src="./thumb-up-icon@3x.png" alt="" class="icon">
                  <span class="text">{{item.praises}}</span>
                </div>
                <div class="count">
                  <img src="./comment-icon@3x.png" alt="" class="icon">
                  <span class="text">{{item.comments}}</span>
                </div>
                <span class="download">下载APP</span>
              </div>
            </a>
          </div>
        </li>
        <li class="item" id="ad_1"></li>
      </ul>
    </div>
    <div class="footer">
      <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo" class="download"></a>
    </div>
    <div class="toast" v-show="toast">下载洋葱视频观看完整视频</div>
    <div class="mask" v-show="dialog">
      <div class="dialog">
        <div class="close" @click="dialog=false"></div>
        <div class="img" :style="{backgroundImage: 'url('+ bgimg +')'}"></div>
        <p class="text">上洋葱视频APP观看完整视频</p>
        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo" class="download">APP内打开</a>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      playState: true,
      dialog: false,
      toast: false,
      dots: [],
      currentPage: 0,
      data: [],
      bgimg: '',
      currentIndex: -1,
      duration: 0
    }
  },
  computed: {
    sliders() {
      return this._sliders()
    },
    list() {
      return this._list()
    }
  },
  methods: {
    playVideo(index) {
      // console.log()
      if(index == 0) {
        this.duration = Math.floor(this.$refs.video[index].duration)
        this.currentIndex = index
        this.controls = true
        this.$refs.video[index].play()
      }else {
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo'
      }
    },
    showToast() {
      clearTimeout(this.timer)
      this.toast = true
      this.timer = setTimeout(() => {
        this.toast = false
      }, 2000)
    },
    timeupdate(index) {
      const currentTime = Math.floor(this.$refs.video[index].currentTime)
      if(currentTime >= this.duration / 2) {
        this.bgimg = this.data[index].thumb
        this.dialog = true
        this.$refs.video[index].pause()
      }
    },
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
    _getData() {
      this.$fly.get(`${process.env.API_HOST}index.php?m=video&c=index&a=videoShare`, {
        channelid: this.channelid
      })
      .then(res => {
        // console.log(res)
        this.data = res.data
        document.title = res.data[0].title
        setTimeout(() => {
          this._setSliderWidth()
          this._initDots()
          this._initSlider()
          this._play()
        }, 20)
      })
    },
    _sliders() {
      let ret = []
      for(let i = 4; i < this.data.length; i++) {
        ret.push(this.data[i])
      }
      return ret
    },
    _list() {
      let ret = []
      for(let i = 0; i < this.data.length - 4; i++) {
        ret.push(this.data[i])
      }
      return ret
    }
  },
  created() {
    this.channelid = this.$route.query.channelid ? this.$route.query.channelid : 'h51'
    this._getData()
  }
}
</script>

<style lang="less" scoped>
  .extend-click() {
    position: relative;
    &:after {
      content: '';
      position: absolute;
      top: -10px;
      bottom: -10px;
      left: -10px;
      right: -10px;
    }
  }
  .list {
    height: 100%;
    position: relative;
    .swiper {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5;
      width: 100%;
      height: 50px;
      // background-color: #333;
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
    .list-wrap {
      position: absolute;
      top: 0;
      bottom: 0;
      padding-bottom: 73px;
      width: 100%;
      z-index: 3;
      // background-color: #fff;
      overflow-y: auto;
      box-sizing: border-box;
      .list-ul {
        list-style: none;
        padding: 0;
        margin: 0;
        .item {
          background-color: #f5f5f5;
          .item-inner {
            background-color: #fff;
          }
          .userinfo {
            display: flex;
            padding: 10px 15px;
            align-items: center;
            .avatar {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              margin-right: 10px;
              display: inline-block;
            }
            .nick {
              font-size: 14px;
              color: #333;
            }
          }
          .tooltps {
            padding: 10px 0 0;
            text-align: center;
            font-size: 12px;
            color: #333;
          }
          .video-wrap {
            width: 100%;
            height: 211px;
            overflow: hidden;
            position: relative;
            background-size: 100%;
            background-position: 50%;
            background-repeat: no-repeat;
            .play-icon {
              width: 60px;
              height: 60px;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate3d(-50%, -50%, 0);
            }
            .video {
              display: block;
              width: 100%;
              height: 100%;
              object-fit: contain;
              object-position: center center;
            }
          }
          .title {
            margin: 0;
            font-size: 18px;
            color: #333;
            text-align: justify;
            line-height: 22px;  
            padding: 10px 15px;
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
          &+.item {
            padding-top: 5px;
          }
        }
      }
    }
    .footer {
      width: 100%;
      height: 73px;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 5;
      .download {
        background: url('./download-bgimage.png') no-repeat;
        background-size: 100%;
        background-position: 50%;
        display: block;
        width: 100%;
        height: 73px;
      }
    }
    .mask {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(51, 51, 51, .6);
      z-index: 99;
      display: flex;
      align-items: center;
      justify-content: center;
      .dialog {
        width: 271px;
        height: 268px;
        background-color: #fff;
        border-radius: 8px;
        position: relative;
        overflow: hidden;
        .close {
          .extend-click();
          width: 15px;
          height: 15px;
          background: url('./1.png') no-repeat;
          background-size: cover;
          right: 15px;
          top: 15px;
          position: absolute;
        }
        .img {
          width: 225px;
          height: 127px;
          margin: 0 auto;
          margin-top: 45px;
          background-size: 100%;
          background-position: 50%;
          background-color: #f5f5f5;
        }
        .text {
          text-align: center;
          color: #333;
          font-size: 16px;
          margin: 0;
          font-weight: bold;
          margin-top: 15px;
        }
        .download {
          width: 100%;
          display: block;
          height: 44px;
          background-color: #f40009;
          color: #fff;
          line-height: 44px;
          text-align: center;
          font-size: 16px;
          position: absolute;
          bottom: 0;
          left: 0;
          text-decoration: none;
        }
      }
    }
    .toast {
      width: 130px;
      // height: 40px;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, .6);
      padding: 8px 10px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      line-height: 1.2;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      z-index: 150;
      box-sizing: border-box;
    }
  }
  a {
    text-decoration: none;
    &:active {
      color: #333;
    }
  }
</style>
