<template>
  <div class="list">
    <div class="list-wrap">
      <ul class="list-ul" v-if="data.length">
        <li class="item">
          <div class="item-inner">
            <div class="userinfo">
              <img :src="data[0].headface" alt="" class="avatar">
              <span class="nick">{{data[0].username}}</span>
            </div>
            <p class="title">{{data[0].title}}</p>
            <div class="video-wrap" :style="{backgroundImage: 'url('+ data[0].thumb +')'}" @click="playVideo">
              <video ref="video"
                     :src="data[0].video"
                     class="video"
                     @timeupdate="timeupdate"
                     :controls="controls"
                     x5-playsinline 
                     playsinline 
                     webkit-playsinline
                     :poser="data[0].thumb"></video>
              <img src="./play_icon.png" alt="" class="play-icon"  v-show="!playState">
            </div>
            <a class="video-info" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo">
              <div class="bottom">
                <div class="count">
                  <img src="./play-num.png" alt="" class="icon">
                  <span class="text">{{data[0].views}}</span>
                </div>
                <div class="count">
                  <img src="./thumb-up-icon@3x.png" alt="" class="icon">
                  <span class="text">{{data[0].praises}}</span>
                </div>
                <div class="count">
                  <img src="./comment-icon@3x.png" alt="" class="icon">
                  <span class="text">{{data[0].comments}}</span>
                </div>
                <span class="download">下载APP</span>
              </div>
            </a>
          </div>
        </li>
        <li class="hot-list">
          <p class="title">热门视频</p>
          <div class="item-wrap">
            <div class="hot-item" v-for="item of list" :key="item.id">
              <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo">
                <div class="bg-image" :style="{backgroundImage: 'url('+ item.thumb +')'}">
                  <img src="./play_icon.png" alt="" class="play-icon">
                  <span class="play-num">{{item.views}}次播放</span>
                </div>
                <div class="user-info">
                  <img :src="item.headface" alt="" class="avatar">
                  <span class="nick">{{item.username}}</span>
                </div>
                <p class="item-title">{{item.title}}</p>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo" class="download"></a>
    </div>
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
      playState: false,
      dialog: false,
      toast: false,
      dots: [],
      currentPage: 0,
      data: [],
      bgimg: '',
      currentIndex: -1,
      duration: 0,
      controls: false
    }
  },
  computed: {
    list() {
      return this._list()
    }
  },
  methods: {
    playVideo() {
      this.duration = Math.floor(this.$refs.video.duration)
      this.playState = true
      this.controls = true
      this.$refs.video.play()
    },
    showToast() {
      clearTimeout(this.timer)
      this.toast = true
      this.timer = setTimeout(() => {
        this.toast = false
      }, 2000)
    },
    timeupdate() {
      const currentTime = Math.floor(this.$refs.video.currentTime)
      if(currentTime >= this.duration / 2) {
        this.bgimg = this.data[0].thumb
        this.dialog = true
        this.$refs.video.pause()
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
        this.data = res.data
        document.title = res.data[0].title
        // setTimeout(() => {
        //   this._setSliderWidth()
        //   this._initDots()
        //   this._initSlider()
        //   this._play()
        // }, 20)
      })
    },
    _list() {
      let ret = []
      for(let i = 1; i < this.data.length-1; i++) {
        ret.push(this.data[i])
      }
      return ret
    }
  },
  mounted() {
    
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
          padding-bottom: 5px;
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
            padding: 0 15px 10px;
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
        }
        .hot-list {
          padding: 15px 15px 0;
          .title {
            font-size: 15px;
            color: #333;
            font-weight: bold;
            margin: 0;
          }
          .item-wrap {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding-top: 10px;
            a {
              display: block;
            }
            .hot-item {
              width: 170px;
              padding-bottom: 15px;
            }
            .bg-image {
              width: 170px;
              height: 99px;
              background-size: cover;
              background-position: 50%;
              background-repeat: no-repeat;
              position: relative;
              overflow: hidden;
              .play-icon {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0);
              }
              .play-num {
                font-size: 11px;
                color: #fff;
                position: absolute;
                right: 5px;
                bottom: 5px;
              }
            }
            .user-info {
              display: flex;
              align-items: center;
              margin-top: 5px;
              .avatar {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                margin-right: 5px;
              }
              .nick {
                font-size: 10px;
                color: #333;
                font-weight: 700;
              }
            }
            .item-title {
              height: 34px;
              margin: 5px 5px 0;
              font-size: 12px;
              color: #333;
              text-align: justify;
              overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              line-height: 16px;
              font-weight: 700;
              
            }
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
