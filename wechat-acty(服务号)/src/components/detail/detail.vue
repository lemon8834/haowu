<template>
  <div class="container">
    <p class="load-text" v-show="!video.video">加载中...</p>
    <div v-show="video.video">
      <div class="top-tip">微信关注“洋葱视频APP”公众号，领取现金红包</div>
      <div class="video-wrap" :style="{backgroundImage: 'url('+ video.thumb + ')'}">
        <video ref="video" 
              :src="video.video" 
              class="video" 
              :poster="video.thumb" 
              :controls="controls"
              x5-playsinline 
              playsinline 
              webkit-playsinline></video>
        <div class="play" @click="play" v-show="!controls"></div>
      </div>
      <div class="content">
        <div class="video-info">
          <p class="title">{{video.title}}</p>
          <div class="userinfo">
            <img :src="video.headface" alt="" class="avatar">
            <span class="nick">{{video.nick}}</span>
            <span class="plays">{{video.views}}次播放</span>
          </div>
        </div>
        <ul class="recommend-list">
          <li class="item" v-for="item of detail.lists" :key="item.id" @click="selectItem(item)">
            <div class="thumb" :style="{backgroundImage: 'url(' + item.thumb + ')'}">
              <span class="duration">{{item.duration}}</span>
            </div>
            <div class="item-info">
              <p class="title">{{item.title}}</p>
              <span class="plays">{{item.views}}次播放</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {getVideo} from 'api/red-packet'
export default {
  data() {
    return {
      query: {},
      detail: {},
      controls: false
    }
  },
  computed: {
    video() {
      return this.detail.data ? this.detail.data : {}
    }
  },
  created() {
    this.query = this.$route.query
    this._getVideo()
  },
  methods: {
    play() {
      this.$refs.video.play()
      this.controls = true
    },
    selectItem(item) {
      this.detail = {}
      this.controls = false
      getVideo(this.query._secdata, item.id, this.query.pid).then((result) => {
        const res = JSON.parse(result)
        if(res.result === 1) {
          this.detail = res.data
        }
      })  
    },
    _getVideo() {
      getVideo(this.query._secdata, this.query.id, this.query.pid).then((result) => {
        const res = JSON.parse(result)
        if(res.result === 1) {
          this.detail = res.data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    height: 100%;
    position: relative;
    background-color: #fff;
    .load-text {
      text-align: center;
      font-size: 14px;
      color: #666;
      padding-top: 20px;
    }
    .top-tip {
      width: 100%;
      height: 36px;
      background-color: #f40009;
      line-height: 36px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      z-index: 99;
    }
    .video-wrap {
      width: 100%;
      height: 210px;
      overflow: hidden;
      background-size: cover;
      background-position: 50%;
      position: relative;
      .play {
        width: 60px;
        height: 60px;
        background: url('./play_icon.png') no-repeat;
        background-size: 100%;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
      }
      .video {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: scale-down;
        object-position: center center;
      }
    }
    .content {
      width: 100%;
      position: absolute;
      top: 246px;
      bottom: 0;
      overflow-y: auto;
      .video-info {
        border-bottom: 1px solid #e8e8e8;
        padding: 10px 15px;
        .title {
          font-size: 20px;
          text-align: justify;
          margin: 0;
          line-height: 28px;
          color: #333;
        }
        .userinfo {
          display: flex;
          align-items: center;
          margin-top: 10px;
          margin-bottom: 5px;
          .avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: inline-block;
          }
          .nick {
            flex: 1;
            font-size: 14px;
            color: #333;
            margin-left: 10px;
          }
          .plays {
            font-size: 12px;
            color: #999;
          }
        }
      }
      .recommend-list {
        padding: 0 15px 15px;
        list-style: none;
        margin: 0;
        overflow: hidden;
        .item {
          margin-top: 15px;
          display: flex;
          align-items: center;
          .thumb {
            position: relative;
            width: 130px;
            height: 80px;
            // background-image: url('')
            background-size: cover;
            background-position: 50%;
            .duration {
              padding: 4px 7px;
              background-color: rgba(51, 51, 51, .6);
              font-size: 12px;
              color: #fff;
              border-radius: 50px;
              position: absolute;
              bottom: 5px;
              right: 5px;
            }
          }
          .item-info {
            flex: 1;
            margin-left: 15px;
            .title {
              min-height: 48px;
              text-align: justify;
              font-size: 18px;
              color: #333;
              margin-bottom: 10px;
              line-height: 24px;
              overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .plays {
              font-size: 12px;
              color: #999;
            }
          }
        }
      }
    }
  }
</style>
