<template>
  <transition name="slide">
    <div class="user">
      <div class="header">
        <div class="back" @click="$router.back()"></div>
        <p class="title">{{user.nick}}</p>
      </div>
      <p class="load-text" v-show="!user.memberid">加载中...</p>
      <div class="head-wrap" v-show="user.memberid">
        <div class="head-inner">
          <div class="user-info">
            <div class="avatar-wrap">
              <img :src="user.headface" alt="" class="avatar">
            </div>
            <div class="right-info">
              <div class="count">
                <div class="item">
                  <p class="num">{{user.follows}}</p>
                  <p class="text">关注</p>
                </div>
                <div class="item">
                  <p class="num">{{user.fans}}</p>
                  <p class="text">粉丝</p>
                </div>
                <div class="item">
                  <p class="num">{{user.praises}}</p>
                  <p class="text">获赞</p>
                </div>
              </div>
              <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo" class="open-app">打开洋葱视频关注我</a>
            </div>
          </div>
          <p class="userid">我的ID: {{user.memberid}}</p>
        </div>
      </div>
      <scroll class="wrapper" :data="user.video">
        <listview :list="user.video" @thumbUp="thumbUp" @share="share"></listview>
      </scroll>
      <div class="share-img2" @click="share" v-show="shareImg"></div>
    </div>
  </transition>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Listview from 'base/listview/listview'
import {mapGetters} from 'vuex'
import {getUserHome} from 'api/recommend'
export default {
  components: {
    Scroll,
    Listview
  },
  data() {
    return {
      user: {},
      secdata: '',
      shareImg: false
    }
  },
  computed: {
    ...mapGetters([
      'item'
    ])
  },
  methods: {
    // 点赞
    thumbUp(item) {
      this._thumbUp(item)
    },
    share() {
      this.shareImg = !this.shareImg
    },
    _getUserHome() {
      if(!this.item.uid) {
        this.$router.back()
        return
      }
      getUserHome(this.item.uid, this.secdata).then((result) => {
        const res = JSON.parse(result)
        // console.log(res)
        if(res.result === 1) {
          this.user = res.data
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
    this._getUserHome()
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
  .user {
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
    .load-text {
      color: #666;
      font-size: 14px;
      padding-top: 20px;
      text-align: center;
    }
    .head-wrap {
      position: relative;
      z-index: 8;
      height: 141px;
      padding-bottom: 5px;
      background-color: #f5f5f5;
      .head-inner {
        background-color: #fff;
        padding: 15px;
        .user-info {
          display: flex;
          .avatar-wrap {
            width: 83px;
            height: 83px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 45px;
            .avatar {
              width: 100%;
              height: 100%;
              display: block;
            }
          }
          .right-info {
            flex: 1;
            display: inline-flex;
            flex-direction: column;
            justify-content: space-between;
            .count {
              display: flex;
              // justify-content: space-between;
              .item {
                display: inline-block;
                &+.item {
                  margin-left: 50px;
                }
                p {
                  margin: 0;
                  color: #333;
                  line-height: 1;
                  text-align: center;
                }
                .num {
                  font-size: 16px;
                  font-weight: 700;
                }
                .text {
                  font-size: 12px;
                  margin-top: 5px;
                }
              }
            }
            .open-app {
              display: block;
              width: 186px;
              height: 30px;
              border-radius: 30px;
              background-color: #f40009;
              font-size: 16px;
              color: #fff;
              text-align: center;
              line-height: 30px;
              text-decoration: none;
            }
          }
        }
        .userid {
          font-size: 14px;
          color: #666;
          margin: 0;
          margin-top: 10px;
        }
      }
    }
    .wrapper {
      position: absolute;
      top: 190px;
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

