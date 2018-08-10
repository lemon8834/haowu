<template>
  <div class="list">
    <div class="list-wrap">
      <ul class="list-ul">
        <li class="item-img">
          <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo" class="download-img"></a>
        </li>
        <li class="item" v-for="item of list" :key="item.id">
          <div class="item-inner">
            <div class="userinfo">
              <img :src="item.headface" alt="" class="avatar">
              <span class="nick">{{item.username}}</span>
            </div>
            <p class="title">{{item.title}}</p>
            <div class="video-wrap" @click="playVideo">
              <div class="video" :style="{backgroundImage: 'url('+ item.thumb +')'}"></div>
              <img src="./play_icon.png" alt="" class="play-icon">
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
                <span class="download">下载APP观看</span>
              </div>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      playState: true,
      data: []
    }
  },
  computed: {
    list() {
      return this._list()
    }
  },
  methods: {
    playVideo() {
      window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo'
    },
    _getData() {
      this.$fly.get(`${process.env.API_HOST}index.php?m=video&c=index&a=videoShare`, {
        channelid: this.channelid
      })
      .then(res => {
        this.data = res.data
        document.title = res.data[0].title
      })
    },
    _list() {
      let ret = []
      for(let i = 0; i < this.data.length - 4; i++) {
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
      width: 100%;
      z-index: 3;
      // background-color: #fff;
      overflow-y: auto;
      box-sizing: border-box;
      .list-ul {
        list-style: none;
        padding: 0;
        margin: 0;
        .item-img {
          height: 251px;
          background-color: #f5f5f5;
          .download-img {
            display: block;
            width: 100%;
            height: 251px;
            background: url('./download-img.png') no-repeat;
            background-size: cover;
            background-position: 50%;
          }
        }
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
            .play-icon {
              width: 60px;
              height: 60px;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate3d(-50%, -50%, 0);
            }
            .video {
              width: 100%;
              height: 100%;
              margin: 0 auto;
              background-repeat: no-repeat;
              background-size: cover;
              background-position: 50%;
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
              position: relative;
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
                color: #fff;
                text-decoration: none;
                line-height: 26px;
                text-align: right;
                width: 94px;
                height: 26px;
                background-color: #f40009;
                text-align: center;
                border-radius: 26px;
                font-size: 11px;
                position: absolute;
                right: 0;
                top: -2px;
              }
            }
          }
          &+.item {
            padding-top: 5px;
          }
        }
      }
    }
  }
  a {
    text-decoration: none;
    &:active {
      color: #333;
    }
  }
</style>
