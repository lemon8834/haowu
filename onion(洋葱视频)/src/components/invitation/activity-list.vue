<template>
  <transition name="slide">
    <scroll class="scroll">
      <div class="inner">
        <div class="tab-wrap">
          <div class="tabs">
            <span class="tab-item" 
                  :class="{active: current === index}" 
                  v-for="(item, index) in tabs"
                  @click="select(index)"
                  :key="index">{{item}}</span>
          </div>
          <div class="tab-content">
            <div class="list-wrap" v-show="current == 0">
              <div class="blank" v-if="!inviteList.length">
                <p class="msg">招收1名徒弟最多奖励<span class="msg-highlight">2100金币</span></p>
                <p class="msg">收徒越多奖励越多，奖励无上限！</p>
              </div>
              <div class="list-inner" v-if="inviteList.length">
                <div class="list-head disciple-head">
                  <span class="vacancy"></span>
                  <!-- <span class="earning">本周贡献</span>
                  <span class="total-earning">总贡献</span> -->
                </div>
                <div class="list-content disciple-content">
                  <div class="list-item" v-for="(item, index) in inviteList" v-show="item.isUnLogin != 0">
                    <span class="rank state"></span>
                    <div class="user-info" style="margin-left: 15px;">
                      <img class="avatar" :src="item.headface">
                      <span class="nick">{{item.nick}}</span>
                    </div>
                    <span class="money"></span>
                    <span class="tip-text">未登录</span>
                  </div>
                  <div class="list-item" v-for="(item, index) in inviteList" v-show="item.isUnLogin != 1">
                    <span :class="getRankCls(index)">{{getRankText(index)}}</span>
                    <div class="user-info" style="margin-left: 15px;">
                      <img class="avatar" :src="item.headface">
                      <span class="nick">{{item.nick}}</span>
                    </div>
                    <!-- <span class="money">{{item.week}}金币</span>
                    <span class="total-money">{{item.contribution}}金币</span> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="list-wrap" v-show="current == 1">
              <div class="blank" v-if="!awaken.length">
                <p class="msg">招收1名徒弟最多奖励<span class="msg-highlight">2100金币</span></p>
                <p class="msg">收徒越多奖励越多，奖励无上限！</p>
              </div>
              <div class="list-inner" v-if="awaken.length">
                <div class="list-content disciple-content">
                  <div class="padding-top-15"></div>
                  <div class="list-item" v-for="(item, index) in awaken" :key="index">
                    <div class="user-info">
                      <img class="avatar" :src="item.headface">
                      <span class="nick">{{item.nick}}</span>
                    </div>
                    <span class="days">{{item.leaveDay}}未登陆</span>
                    <span class="rouse" @click="awakenApprentice(index)">唤醒</span>
                  </div>
                </div>
              </div>
            </div>
          </div>          
        </div>
      </div>
    </scroll>
  </transition>
</template>

<script>
import Scroll from 'components/scroll/scroll'
export default {
  components: {
    Scroll
  },
  data() {
    return {
      current: 0,
      tabs: ['我的徒弟', '唤醒徒弟'],
      inviteList: [],
      awaken: []
    }
  },
  created() {
    this.inviteList = this.$route.params.inviteList
    this.awaken = this.$route.params.awaken
  },
  methods: {
    select(index) {
      this.current = index
    },
    awakenApprentice(index) {
      window.location.href = `awaken::${this.awaken[index].memberid}`
    },
    // 排名添加icon
    getRankCls(index) {
      if (index <= 2) {
        return `rank icon${index}`
      } else {
        return 'rank'
      }
    },
    getRankText(index) {
      if (index > 2) {
        return index + 1
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  @import '~common/scss/mixin';
  .scroll {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    z-index: 99;
    .inner {
      width: 100%;
      min-height: 316px;
      display: flex;
      align-items: center;
      flex-direction: column;
      @include bg-image('../../../static/images/activity_images/new_activity/invite_head_bgimg', 'png');
      background-size: 100%;
      background-repeat: no-repeat;
      position: relative;
      .tab-wrap {
        width: calc(100% - 30px);
        margin-top: 240px;
        border: 1px solid #d57a34;
        border-radius: 10px 10px 0 0;
      }
      .tabs {
        width: 100%;
        height: 48px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #d57a34;
        background-color: #FEF8C6;
        border-radius: 10px 10px 0 0;
        .tab-item {
          flex: 1;
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: #333;
          font-size: 14px;
          position: relative;
          &.active {
            color: #d57a34;
            &:after {
              content: '';
              display: block;
              width: 20px;
              height: 4px;
              border-radius: 4px;
              background-color: #d57a34;
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              margin: auto;
            }
          }
        }
      }
      .tab-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        .list-wrap {
          flex: 1;
          padding: 0 .4rem 20px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-height: 300px;
          .top_img {
            margin: 30px 0 40px;
          }
          .invite_tips__wrap {
            width: 100%;
            background-color: #f5f5f5;
            box-sizing: border-box;
            padding: 15px;
            text-align: center;
            color: #333;
            margin-top: 30px;
            .title {
              font-size: 17px;
              font-weight: 600;
            }
            .small-title {
              font-size: 12px;
              margin-top: 6px;
            }
            .text {
              font-size: 14px;
              margin-top: 15px;
              text-align: left;
              .highlight {
                color: #f40009;
                line-height: 1.5;
              }
              &+.text {
                margin-top: 5px;
              }
            }
          }
          .blank {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }
          .msg {
            font-size: 14px;
            color: #333;
            text-align: center;
            .msg-highlight {
              color: #e02e24;
            }
          }
          .msg + .msg {
            margin-top: 10px;
          }
          .view-jq {
            width: 130px;
            height: 34px;
            background-color: #e02e24;
            border-radius: 34px;
            color: #fff;
            text-align: center;
            line-height: 34px;
            font-size: 14px;
            margin: 0 auto;
            margin-top: 20px;
          }
          .list-inner {
            width: 100%;
          }
          .list-head {
            width: 100%;
            padding: 15px 0 10px;
            display: flex;
            font-size: 11px;
            color: #999;
            .vacancy {
              flex-grow: 1;
            }
            .disciple {
              flex: 0 0 20%;
              text-align: center;
            }
            .earning {
              flex: 0 0 25%;
              text-align: center;
            }
          }
          .list-head.disciple-head {
            .disciple {
              flex: 0 0 15%;
            }
            .earning {
              flex: 0 0 25%;
            }
            .total-earning {
              flex: 0 0 25%;
              text-align: center;
            }
          }
          .list-content {
            width: 100%;
            .padding-top-15 {
              padding-top: 15px;
            }
            .list-item {
              display: flex;
              align-items: center;
              width: 100%;
              line-height: 1;
            }
            .list-item + .list-item {
              margin-top: 15px;
            }
            .rank {
              display: inline-flex;
              flex: 0 0 21px;
              height: 22px;
              text-align: center;
              line-height: 22px;
              background-size: 100%;
              align-items: center;
              justify-content: center;
              &.state:after {
                content: '';
                display: block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #1dcc24;
              }
              &.icon0 {
                @include bg-image('../../../static/images/Group2', 'png');
              }
              &.icon1 {
                @include bg-image('../../../static/images/Group3', 'png');
              }
              &.icon2 {
                @include bg-image('../../../static/images/Group4', 'png');
              }
            }
            .tip-text {
              color: #fff;
              font-size: 14px;
              width: 100%;
              height: 30px;
              background-color: #1dcc24;
              border-radius: 30px;
              text-align: center;
              line-height: 30px;
              display: inline-block;
            }
            .user-info {
              flex-grow: 1;
              display: inline-flex;
              align-items: center;
              margin-left: .4rem;
              .avatar {
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
              }
              .nick {
                font-size: 14px;
                color: #000;
                margin-left: .27rem;
                // width: 90px;
                @include nowrap;
                text-align: left;
                line-height: 1.2;
              }
            }
            .disciple-num {
              flex: 0 0 20%;
              text-align: center;
              color: #e02e24;
              font-size: 14px;
            }
            .money {
              flex: 0 0 25%;
              text-align: right;
              color: #e02e24;
              font-size: 14px;
              @include nowrap;
            }
            .rouse {
              flex: 0 0 50px;
              height: 20px;
              box-sizing: border-box;
              border: 1px solid #e02e24;
              text-align: center;
              line-height: 18px;
              font-size: 12px;
              color: #e02e24;
              border-radius: 20px;
            }
            .days {
              flex: 0 0 35%;
              font-size: 12px;
              color: #999;
              text-align: center;
            }
          }
          .list-content.disciple-content {
            text-align: center;
            color: #e02e24;
            font-size: 14px;
            .disciple-num {
              flex: 0 0 15%;
            }
            .user-info {
              margin-left: 0;
            }
            .money {
              flex: 0 0 25%;
              text-align: center;
            }
            .total-money {
              flex: 0 0 25%;
            }
          }
          .activity-img {
            width: 100%;
            height: 619px;
            @include bg-image('../../../static/images/activity_images/cash_out/18', 'jpg');
            background-size: 100%;
            background-repeat: no-repeat;
            margin-top: 20px;
          }
          .activity-text_wrap {
            width: 100%;
            height: 348px;
            @include bg-image('../../../static/images/activity_images/cash_out/21', 'jpg');
            background-size: 100%;
            background-repeat: no-repeat;
            margin-top: 20px;
            padding: 51px 15px 0;
            box-sizing: border-box;
            .activity-text {
              font-size: 15px;
              color: #854711;
              line-height: 1.4;
              &+.activity-text {
                margin-top: 7px;
              }
            }
            .activity-detail {
              font-size: 17px;
              color: #f43714;
              width: 220px;
              height: 44px;
              border: 1px solid #f43714;
              border-radius: 44px;
              text-align: center;
              line-height: 42px;
              margin: 0 auto;
              margin-top: 20px;
            }
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
