<template>
  <div class="listview">
    <ul class="list">
      <li class="item" v-for="(item, index) of list" :key="item.id">
        <div class="item-inner">
          <div class="user" @click="viewUser(item, index)">
            <div class="avatar-wrap">
              <img :src="item.headface" alt="" class="avatar">
            </div>
            <span class="nick">{{item.nick}}</span>
          </div>
          <p class="title" v-show="item.title">{{item.title}}</p>
          <div class="video-wrap" :style="{backgroundImage: 'url('+ item.thumb +')'}" @click="playVideo(index)">
            <video :src="item.video"
                   class="video"
                   ref="video"
                   :posert="item.thumb"
                   :controls="currentIndex==index"
                   x5-playsinline 
                   playsinline 
                   webkit-playsinline>
              <source :src="item.video" type="video/mp4">
            </video>
            <div class="play" v-show="currentIndex!=index">
              <img src="./play-icon@3x.png" alt="" class="play-icon">
            </div>
          </div>
          <div class="count-wrap">
            <div class="count-item" @click="thumbUp(item)">
              <img :src="item.ispraise==0?'./static/images/thumb-up-icon@3x.png':'./static/images/thumb-up-icon-high@3x.png'" alt="" class="icon">
              <span class="num">{{item.praises}}</span>
            </div>
            <div class="count-item">
              <img src="./comment-icon@3x.png" alt="" class="icon comment">
              <span class="num">{{item.comments}}</span>
            </div>
            <div class="count-item" @click="share">
              <img src="./share-icon@3x.png" alt="" class="icon share">
            </div>
          </div>
          <div class="comment-wrap" v-show="commentShow">
            <ul class="comment-list">
              <li class="comment-item" v-for="(comment, idx) of item.comment" :key="idx">
                <span class="nick">{{comment.nickname}}：</span>{{comment.content}}
              </li>
            </ul>
            <div class="input-wrap">
              <div class="input-box">
                <img src="./input-icon@3x.png" alt="" class="icon">
                <input ref="input"
                       type="text" 
                       class="input" 
                       placeholder="说点什么吧">
              </div>
              <span class="submit-comment" @click="submitComment(item, index)">发送</span>
            </div>
          </div>
        </div>
      </li>
      <!-- <li class="loading" v-show="loading">加载中...</li> -->
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    commentShow: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentIndex: -1
    }
  },
  methods: {
    viewUser(item, index) {
      if(this.commentShow) {
        this.$emit('viewUser', item)
      }
    },
    playVideo(index) {
      this.currentIndex = index
      this.$refs.video[index].play()
    },
    submitComment(item, index) {
      if(this.commentShow) {
        this.$emit('submitComment', item, this.$refs.input[index])
      }
    },
    thumbUp(item) {
      this.$emit('thumbUp', item)
    },
    share() {
      this.$emit('share')
    }
  },
  watch: {
    currentIndex(newVal, oldVal) {
      if(oldVal >= 0) {
        this.$refs.video[oldVal].pause()
      }
    },
    $route() {
      if(this.currentIndex >= 0) {
        this.$refs.video[this.currentIndex].pause()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .extend-click() {
    position: relative;
    &:after {
      position: absolute;
      top: -10px;
      bottom: -10px;
      left: -10px;
      right: -10px;
    }
  }
  .list {
    list-style: none;
    padding: 0;
    margin: 0;
    .item {
      background-color: #f5f5f5;
      img {
        display: block;
        border: none;
      }
      P {
        margin: 0;
      }
      .item-inner {
        width: 100%;
        background-color: #fff;
        padding: 10px 15px 20px;
        overflow: hidden;
        box-sizing: border-box;
        .user {
          display: flex;
          align-items: center;
          padding-bottom: 5px;
          .avatar-wrap {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
            overflow: hidden;
            .avatar {
              width: 100%;
              height: 100%;
            }
          }
          .nick {
            font-size: 14px;
            color: #333;
            line-height: 1;
            font-weight: 700;
          }
        }
        .title {
          font-size: 16px;
          color: #333;
          line-height: 26px;
          text-align: justify;
          // margin-top: 5px;
        }
        .video-wrap {
          margin-top: 5px;
          width: 100%;
          position: relative;
          overflow: hidden;
          background-size: cover;
          background-position: 50%;
          background-repeat: no-repeat;
          .video {
            display: block;
            width: 100%;
            object-fit: contain;
            object-position: center center;
          }
          .play {
            width: 54px;
            height: 54px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
            .play-icon {
              width: 100%;
              display: block;
            }
          }
        }
        .count-wrap {
          display: flex;
          margin-top: 10px;
          .count-item {
            display: inline-flex;
            align-items: center;
            position: relative;
            &:after {
              position: absolute;
              content: '';
              top: -10px;
              bottom: -10px;
              left: -10px;
              right: -10px;
            }
            .icon {              
              display: inline-block;
              margin-right: 8px;
              width: 22px;
              height: 22px;
            }
            .num {
              font-size: 13px;
              color: #666;
              line-height: 1;
            }
            &+.count-item {
              margin-left: 20px;
            }
          }
        }
        .comment-wrap {
          margin-top: 20px;
          .comment-list {
            list-style: none;
            padding: 0;
            margin: 0;
            .comment-item {
              line-height: 1;
              font-size: 16px;
              margin-bottom: 20px;
              width: 345px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: #333;
              .nick {
                color: #666;
              }
            }
          }
          .input-wrap {
            display: flex;
            align-items: center;
            .input-box {
              width: 298px;
              height: 36px;
              display: inline-flex;
              align-items: center;
              background-color: #f5f5f5;
              border-radius: 4px;
              padding-left: 10px;
              box-sizing: border-box;
              .icon {
                width: 22px;
                height: 20px;
                display: inline-block;
                margin-right: 8px;
              }
              .input {
                flex: 1;
                background-color: transparent;
                border: none;
                height: 30px;
                font-size: 14px;
                color: #333;
                ::-webkit-input-placeholder {
                  color: #999;
                }
                &:focus {
                  outline: none;
                  border: none;
                }
              }
            }
            .submit-comment {
              height: 36px;
              line-height: 36px;
              font-size: 16px;
              color: #f40009;
              flex: 1;
              text-align: right;
            }
          }
        }
      }
      &+.item {
        padding-top: 5px;
      }
    }
    .loading {
      color: #666;
      font-size: 14px;
      padding-top: 10px;
      text-align: center;
    }
  }
</style>

