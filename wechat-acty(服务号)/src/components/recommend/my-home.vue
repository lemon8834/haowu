<template>
  <transition name="slide">
    <div class="myhome">
      <div class="header">
        <div class="back" @click="$router.back()"></div>
        <p class="title">我的视频</p>
      </div>
      <p class="tooltip" v-show="!myhome.length">您还没有上传视频哦~</p>      
      <scroll class="wrapper" :data="myhome" v-if="myhome.length">
        <listview :list="myhome" @thumbUp="thumbUp" @share="share"></listview>
      </scroll>
      <div class="share-img2" @click="share" v-show="shareImg"></div>
    </div>
  </transition>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Listview from 'base/listview/listview'
import {getMyHome} from 'api/recommend'
export default {
  components: {
    Scroll,
    Listview
  },
  data() {
    return {
      myhome: [],
      secdata: '',
      shareImg: false
    }
  },
  methods: {
    // 点赞
    thumbUp(item) {
      this._thumbUp(item)
    },
    share() {
      this.shareImg = !this.shareImg
    },
    _getMyHome() {
      getMyHome(this.secdata).then((result) => {
        const res = JSON.parse(result)
        // console.log(res)
        if(res.result === 1) {
          this.myhome = res.lists
        }
      })
    },
    // 点赞接口
    _thumbUp(item) {
      this.$fly.get(`${process.env.API_HOST}index.php?m=wechatService&c=share&a=praise`, {
        id: item.id,
        _secdata: this.secdata
      }).then(res => {
        const result = JSON.parse(res)
        if(result.result === 1) {
          if(item.ispraise == 0) {
            item.ispraise = 1
            item.praises ++
          }else {
            item.ispraise = 0
            item.praises --
          }
        }
      })
    }
  },
  created() {
    this.secdata = this.$route.query._secdata ? this.$route.query._secdata : ''
    this._getMyHome()
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
  .myhome {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    z-index: 199;
    .header {
      width: 100%;
      height: 44px;
      background-color: #fff;
      padding: 0 15px;
      border-bottom: 1px solid #e8e8e8;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      position: relative;
      z-index: 10;
      .back {
        width: 12px;
        height: 19px;
        background: url('./back-icon.png') no-repeat;
        background-size: 100%;
        .extend-click;
      }
      .title {
        font-size: 18px;
        color: #333;
        font-weight: 700;
        width: 80%;
        line-height: 43px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .tooltip {
      color: #333;
      font-size: 16px;
      margin-top: 50%;
      text-align: center;
    }
    .wrapper {
      position: absolute;
      top: 44px;
      bottom: 0;
      width: 100%;
      background-color: #fff;
    }
    .share-img2 {
      width: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      .bg-image('./share-img');
      background-color: rgba(0, 0, 0, .8);
      background-size: 100%;
      background-repeat: no-repeat;
      z-index: 299;
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

