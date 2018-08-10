<template>
  <div class="container">
    <scroll class="scroll"
            :pullup="pullup"
            @scrollEnd="scrollEnd"
            :data="list">
      <listview @viewUser="viewUser"
                :commentShow="commentShow"
                @submitComment="submitComment"
                @thumbUp="thumbUp"
                @share="share"
                :list="list"></listview>
      <p class="load-text" v-show="!list.length">加载中...</p>
    </scroll>
    <div class="share-img" @click="share" v-show="shareImg"></div>
    <router-view />
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Listview from 'base/listview/listview'
import {getFunny} from 'api/recommend'
import {mapMutations} from 'vuex'
import wx from 'weixin-js-sdk'
export default {
  components: {
    Scroll,
    Listview
  },
  data() {
    return {
      // 是否开启上拉加载
      pullup: true,
      // 是否还有数据
      hasMore: true,
      // 是否显示评论
      commentShow: true,
      // 页数
      page: 1,
      // 每页加载数据条数
      perpage: 10,
      // 用户身份
      secdata: '',
      // 列表数据
      list: [],
      // 评论内容
      commentCon: '',
      // 加载文字显示
      loading: true,
      // 提示分享
      shareImg: false
    }
  },
  methods: {
    scrollEnd() {
      if(!this.hasMore) {
        return
      }
      this.page ++
      this.loading = true
      getFunny(this.page, this.perpage, this.secdata).then(res => {
        const result = JSON.parse(res)
        if(result.result === 1) {
          this.loading = false
          this.list = this.list.concat(result.list)
          this._checkMore(result.list)
        }
      })
    },
    viewUser(item) {
      this.$router.push({
        path: `/user?_secdata=${this.secdata}`
      })
      this.setItem(item)
    },
    submitComment(item, commentBox) {
      if(!commentBox.value) {
        return
      }
      this.commentCon = commentBox.value
      this._sendComment(item)
      commentBox.value = ''
    },
    // 点赞
    thumbUp(item) {
      this._thumbUp(item)
    },
    share() {
      this.shareImg = !this.shareImg
    },
    toMyHome() {
      this.$router.push({
        path: `/myhome?_secdata=${this.secdata}`
      })
    },
    // 是否还有数据
    _checkMore(data) {
      if(!data.length) {
        this.hasMore = false
      }
    },
    // 搞笑列表
    _getFunny() {
      this.hasMore = true
      getFunny(this.page, this.perpage, this.secdata, this._shareid).then(res => {
        const result = JSON.parse(res)
        if(result.result === 1) {
          this.list = result.list
          this._checkMore(result.list)
        }
      })
    },
    // 点赞接口
    _thumbUp(item) {
      this.$fly.get(`${process.env.API_HOST}index.php?m=weChatVideo&c=index&a=praise`, {
        vid: item.id,
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
    },
    // 提交评论接口
    _sendComment(item) {
      this.$fly.get(`${process.env.API_HOST}index.php?m=weChatVideo&c=index&a=comment`, {
        vid: item.id,
        content: this.commentCon,
        _secdata: this.secdata
      }).then(result => {
        const res = JSON.parse(result)
        if(res.result === 1) {
          item.comments ++
          this._refreshComment(item)
        }
      })
    },
    // 刷新评论接口
    _refreshComment(item) {
      this.$fly.get(`${process.env.API_HOST}index.php?m=weChatVideo&c=index&a=commentList`, {
        vid: item.id,
        _secdata: this.secdata
      }).then(result => {
        const res = JSON.parse(result)
        if(res.result === 1) {
          if(res.data.length > 2) {
            item.comment = [res.data[0], res.data[1]]
          }else {
            item.comment = res.data
          }
        }
      })
    },
    // _getShareId() {
    //   this.$fly.get(`${process.env.API_HOST}index.php?m=wechatService&c=share&a=share`, {
    //     _secdata: this.secdata
    //   }).then(result => {
    //     const res = JSON.parse(result)
    //     if(res.result === 1) {
    //       this.shareid = res.shareid
    //     }
    //   })
    // },
    ...mapMutations({
      setItem: 'SET_ITEM'
    })
  },
  created() {
    document.title = '搞笑视频'
    this.secdata = this.$route.query._secdata ? this.$route.query._secdata : ''
    this._shareid = this.$route.query.shareid ? this.$route.query.shareid : ''
    this._getFunny()
    // this._getShareId()
  },
  mounted() {
    const _this = this
    wx.ready(() => {
      wx.onMenuShareAppMessage({
        title: '洋葱视频', // 分享标题
        desc: '看视频 能赚钱 提现快！', // 分享描述
        link: `http://wechat.qianqiana.com/index.php?m=weChatVideo&c=weixin&a=location_mv`,
        imgUrl: `https://www.yangcongv.com/wechatservice/image/${Math.floor(Math.random()*10+1)}.png`, // 分享图标
        success() {
        // 用户点击了分享后执行的回调函数
          _this.shareImg = false
        }
      })
      wx.onMenuShareTimeline({
        title: '洋葱视频',
        imgUrl: `https://www.yangcongv.com/wechatservice/image/${Math.floor(Math.random()*10+1)}.png`,
        link: `http://wechat.qianqiana.com/index.php?m=weChatVideo&c=weixin&a=location_mv`,
        success() {
          _this.shareImg = false
        }
      })
    })
  },
  computed: {
    topTips() {
      return this._shareid ? '微信关注“洋葱视频APP”公众号，领取现金红包':'分享视频给好友获取幸运大转盘抽奖次数，1元可提现'
    }
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
    position: relative;
    .top-tip {
      width: 100%;
      height: 36px;
      background-color: #f40009;
      line-height: 36px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99;
    }
    .scroll {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      background-color: #fff;
      .load-text {
        color: #666;
        font-size: 14px;
        padding-top: 20px;
        text-align: center;
      }
    }
    .tabbar {
      width: 100%;
      height: 50px;
      border-top: 1px solid #e8e8e8;
      box-sizing: border-box;
      background-color: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      .tab-item {
        flex: 0 0 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .upload {
          width: 100%;
          display: block;
          height: 49px;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
        }
        .icon {
          width: 28px;
          height: 28px;
          display: inline-block;
          margin-right: 5px;
        }
        .name {
          font-size: 17px;
          color: #333;
          display: inline-block;
          font-weight: 600;
        }
        &+.tab-item {
          border-left: 1px solid #e8e8e8;
        }
      }
    }
    .share-img {
      width: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      .bg-image('./share-img');
      background-color: rgba(0, 0, 0, .8);
      background-size: 100%;
      background-repeat: no-repeat;
      z-index: 150;
    }
  }
</style>
