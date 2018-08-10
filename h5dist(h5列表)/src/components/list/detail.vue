<template>
  <transition name="slide">
    <scroll class="detail" :data="detailList">
      <div>
        <div class="userinfo" v-if="userInfo.headface">
          <img :src="userInfo.headface" alt="" class="avatar">
          <span class="nick">{{userInfo.nick}}</span>
        </div>
        <p class="title">{{item.title}}</p>
        <div class="video-wrap" :style="{backgroundImage: 'url('+ item.thumb +')'}">
          <video ref="video"
                 :src="item.video"
                 class="video"
                 :poster="item.thumb"
                 x5-playsinline 
                 playsinline 
                 webkit-playsinline
                 autoplay
                 controls
                 @ended="playend">
          </video>
          <!-- <img src="./play_icon.png" alt="" class="play-icon" v-show="index!=currentIndex"> -->
        </div>
        <a href="http://v.yangcongv.com/Apk/Onion/onionvideo_1.3.5.apk" class="open-app">打开洋葱视频APP，提升3倍流畅度！</a>
        <ul class="list-ul">
          <li class="loading-text" v-show="!detailList.length">加载中...</li>
          <li class="item" v-for="(item, index) of detailList" :key="index" @click="selectItem(item)" v-if="detailList.length">
            <div class="video-wrap" 
                 :style="{backgroundImage: 'url('+item.thumb+')'}"></div>
            <p class="item-title">{{item.title}}</p>
            <div class="video-info">
              <span class="num">播放{{item.views}}</span>
              <span class="num">· 评论{{item.comments}}</span>
            </div>
          </li>
        </ul>
      </div>
    </scroll>
  </transition>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Scroll from 'base/scroll/scroll'
import {getRecommend, playEnd, getItem} from 'api/list'
export default {
  data() {
    return {
      detailList: [],
      vid: null
    }
  },
  components: {
    Scroll
  },
  computed: {
    userInfo() {
      return this.item.userInfo || {}
    },
    ...mapGetters([
      'item'
    ])
  },
  methods: {
    selectItem(item) {
      this.setItem(item)
    },
    playend() {
      playEnd(this.item.id)
    },
    _getRecommend() {
      getRecommend(this.item.id).then((res) => {
        if(res.result === 1) {
          this.detailList = res.data
        }
      })
    },
    _getItem() {
      getItem(this.vid).then((res) => {
        if(res.result === 1) {
          this.setItem(res.data)
          getRecommend(this.vid).then((res) => {
            if(res.result === 1) {
              this.detailList = res.data
            }
          })
        }
      })
    },
    ...mapActions([
      'setItem'
    ])
  },
  created() {
    this.vid = this.$route.query.vid || null
    if(this.vid) {
      this._getItem()
    }else {
      this._getRecommend()
    }
  }
}
</script>

<style lang="less" scoped>
  .detail {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    z-index: 199;
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
    .video-wrap {
      width: 100%;
      // height: 211px;
      overflow: hidden;
      position: relative;
      background-size: cover;
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
        // height: 100%;
        object-fit: contain;
        // object-position: center center; 
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
    .open-app {
      width: 345px;
      height: 40px;
      background-color: #f40009;
      color: #fff;
      font-size: 15px;
      line-height: 40px;
      text-align: center;
      display: block;
      margin: 10px auto 0;
      text-decoration: none;
      border-radius: 8px;
    }
    .list-ul {
      list-style: none;
      padding: 0;
      margin: 0;
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .loading-text {
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: #666;
        padding-top: 15px;
      }
      .item {
        width: 186px;
        margin-bottom: 20px;
        .userinfo {
          display: flex;
          padding: 10px 0;
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
          height: 105px;
          overflow: hidden;
          position: relative;
          background-size: cover;
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
        }
        .item-title {
          width: 100%;
          box-sizing: border-box;
          padding-left: 10px;
          height: 14px;
          line-height: 14px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin: 0;
          margin-top: 10px;
          font-size: 14px;
          color: #333;
        }
        .video-info {
          padding-left: 10px;
          display: block;
          margin-top: 4px;
          .num {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all .3s;
  }
  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
