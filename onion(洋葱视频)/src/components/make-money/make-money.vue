<template>
  <div class="container">
    <div class="video-wrap">
      <video class="video" src="http://v.yangcongv.com/2018/0529/953tQaciHmdrULHl.mp4" :width="screenWidth" poster="http://v.yangcongv.com/2018/0529/20180529153343.png" :controls="controls" ref="video"></video>
      <p class="play-icon" @click="videoPlay" v-show="playIcon"></p>
    </div>
    <div class="activity-btn">
      <img src="../../../static/images/reg_packet_activity_images/acticity_btn1.png" alt="" class="btn-icon" @click="everyDayUnPack">
    </div>
    <div class="bottom-wrap">
      <div class="tab-ctrl">
        <p class="ctrl-item" :class="{active:active == index}" v-for="(item, index) in tabName" :key="index" @click="tabCtrl(index)">{{item}}</p>
      </div>
      <div class="tab-content" v-show="active == 0">
        <p class="text-msg">每邀请一位好友，最多可获得3元现金。</p>
        <p class="text-msg">收徒越多，奖励越多，奖励无上限！</p>
        <p class="skil-btn" @click="toInvited">立即收徒</p>
        <p class="questions-btn" @click="toQuestions">我还有疑问>></p>
      </div>
      <div class="tab-content" v-show="active == 1">
        <p class="text-msg">只要看视频就能得到随机红包！</p>
        <p class="text-msg">看视频越多，红包越多！超多红包等你领！</p>
        <p class="skil-btn" @click="toViewVideo">立即看视频</p>
        <p class="questions-btn" @click="toQuestions">我还有疑问>></p>
      </div>
      <div class="tab-content" v-show="active == 2">
        
        <p class="text-msg">在【每日任务】完成任务就能获得相应奖励</p>
        <p class="text-msg">坚持签到有惊喜，天天宝箱领金币！</p>
        <p class="skil-btn" @click="toTaskCenter">立即做任务</p>
        <p class="questions-btn" @click="toQuestions">我还有疑问>></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabName: [
        '收徒弟赚钱',
        '看视频赚钱',
        '做任务赚钱'
      ],
      controls: false,
      playIcon: true
    }
  },
  computed: {
    screenWidth() {
      return window.screen.width
    }
  },
  methods: {
    videoPlay() {
      this.playIcon = false
      this.$refs.video.play()
      this.controls = true
    },
    tabCtrl(idx) {
      this.active = idx
    },
    toTaskCenter() {
      window.location.href = 'totaskcenter::totaskcenter'
    },
    toQuestions() {
      window.location.href = 'toquestions::toquestions'
      this.$router.push({
        path: '/questions?active=-1'
      })
    },
    toInvited() {
      window.location.href = 'toinvited::toinvited'
    },
    toViewVideo() {
      window.location.href = 'toviewvideo::toviewvideo'
    },
    everyDayUnPack() {
      // window.location.href = 'toeverydayunpack::toeverydayunpack'
      window.location.href = 'toinvited::toinvited'
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
  @import '~common/scss/mixin';
  .video-wrap {
    width: 100%;
    height: 211px;
    overflow: hidden;
    position: relative;
    .play-icon {
      width: 54px;
      height: 54px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      background: url('../../../static/images/play_icon_1.png') no-repeat;
      background-size: 100%;
    }
    .video {
      width: 100%;
      height: 211px;
    }
  }
  .activity-btn {
    padding: 15px 0;
    .btn-icon {
      width: 345px;
      height: 60px;
      display: block;
      margin: 0 auto;
    }
  }
  .bottom-wrap {
    position: absolute;
    width: 100%;
    top: 301px;
    bottom: 0;
    background-color: #fff;
    .tab-ctrl {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #e8e8e8;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      .ctrl-item {
        flex: 0 0 33.33%;
        font-size: 14px;
        color: #666;
        padding: 17px 0;
        text-align: center;
        position: relative;
        &.active {
          color: #333;
          &:after {
            content: '';
            display: block;
            width: 20px;
            height: 4px;
            border-radius: 4px;
            background-color: #f40009;
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
      width: 100%;
      position: absolute;
      top: 50px;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .text-msg {
        font-size: 14px;
        color: #333;
        text-align: center;
        &+.text-msg {
          margin-top: 10px;
        }
      }
      .skil-btn {
        width: 220px;
        height: 44px;
        background-color: #f40009;
        color: #fff;
        border-radius: 44px;
        text-align: center;
        line-height: 44px;
        font-size: 16px;
        margin: 0 auto;
        margin-top: 58px;
      }
      .questions-btn {
        width: 100%;
        display: block;
        font-size: 12px;
        color: #4a90e2;
        text-align: center;
        margin-top: 20px;
        @include extend-click;
      }
    }
  }
</style>
