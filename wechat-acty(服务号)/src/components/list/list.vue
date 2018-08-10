<template>
  <div class="list">
    <scroll :data="list" 
            :pullup="pullup" 
            @scrollEnd="loadMore"
            class="scroll">
      <div>
        <div class="swiper" v-if="sliders.length">
          <slider>
            <div v-for="item in sliders" 
                 :key="item.id"
                 @click="selectItem(item)">
              <img :src="item.thumb" alt="">
            </div>
          </slider>
        </div>
        <ul class="list-ul">
          <li class="loading-text" v-show="!list.length">加载中...</li>
          <li class="item" v-for="(item, index) of list" :key="index" @click="selectItem(item)">
            <div class="video-wrap" 
                 :style="{backgroundImage: 'url('+item.thumb+')'}"></div>
            <p class="title">{{item.title}}</p>
            <div class="video-info">
              <span class="num">播放{{item.views}}</span>
              <span class="num">· 评论{{item.comments}}</span>
            </div>
          </li>
        </ul>
      </div>
    </scroll>
    <router-view />
  </div>
</template>

<script>
import {getVideoList, getSlide} from 'api/list'
import {mapMutations} from 'vuex'
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider'
export default {
  data() {
    return {
      list: [],
      sliders: [],
      dots: [],
      pullup: true,
      page: 1,
      perpage: 20,
      hasMore: true,
      currentPage: 0
    }
  },
  components: {
    Scroll,
    Slider
  },
  methods: {
    selectItem(item) {
      // console.log(item)
      this.$router.push({
        path: `listview/${item.id}`
      })
      this.setItem(item)
    },
    loadMore() {
      if(!this.hasMore) {
        return
      }
      this.page ++
      getVideoList(this.page, this.perpage).then((res) => {
        if(res.result === 1) {
          this.list = this.list.concat(res.data)
          this._checkMore(res.data)
        }
      })
    },
    _getVideoList() {
      this.hasMore = true
      getVideoList(this.page, this.perpage).then((res) => {
        if(res.result === 1) {
          this.list = res.data
          this._checkMore(res.data)          
        }
      })
    },
    _getSlide() {
      getSlide().then((res) => {
        if(res.result === 1) {
          this.sliders = res.data
        }
      })
    },
    _checkMore(data) {
      if(!data.length) {
        this.hasMore = false
      }
    },
    ...mapMutations({
      setItem: 'SET_ITEM'
    })
  },
  created() {
    this._getVideoList()
    this._getSlide()
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
  .swiper {
    width: 100%;
    height: 211px;
    overflow: hidden;
    margin-bottom: 20px;
    position: relative;
  }
  .list {
    height: 100%;
    position: relative;
    .scroll {
      height: 100%;
      background-color: #fff;
    }
    .list-ul {
      list-style: none;
      padding: 0;
      margin: 0;
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
          background-color: #f5f5f5;
          .play-icon {
            width: 60px;
            height: 60px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
          }
        }
        .title {
          width: 100%;
          height: 14px;
          box-sizing: border-box;
          padding-left: 10px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin: 0;
          margin-top: 10px;
          font-size: 14px;
          color: #333;
          line-height: 14px;
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
  a {
    text-decoration: none;
    &:active {
      color: #333;
    }
  }
</style>
