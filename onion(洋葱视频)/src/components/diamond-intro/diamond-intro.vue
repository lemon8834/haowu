<template>
  <div class="container">
    <!-- <div class="container-inner">
      <div class="answer-wrap" v-for="(item, index) in questions" v-if="current == index" :key="index">
        <p class="subject">{{index + 1}}:{{item.question}}</p>
        <div class="options-wrap">
          <div class="option-item" v-for="(option, idx) in item.option" :key="idx" @click="selectOption(idx)">
            <p class="option-inner">{{setOption(idx)}}{{option}}</p>
          </div>
        </div>
      </div>
      <div class="redpacket-mask" v-show="redPacketShow">
        <div class="redpacket-wrap">
          <p class="total" v-show="!isGet">{{this.total}}</p>
          <p class="msg" v-show="!isGet">(可提现)</p>
          <p class="get-msg" v-show="isGet">您已领取过答题红包</p>
          <a class="btn-wrap" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo">
            <p class="btn-inner">去洋葱视频查看</p>
          </a>
          <div class="btn-wrap" @click="sharePic">
            <p class="btn-inner">分享</p>
          </div>
        </div>
      </div>
    </div> -->
    <div class="text-wrap">
      <p class="text bold">1.钻石是什么</p>
      <p class="text">钻石是官方根据上传视频的有趣程度，被欢迎程度和点击播放数量，点赞，评论，收藏数等综合因素，发送给上传视频作者的奖励。</p>
      <p class="text bold">2.钻石的发放时间</p>
      <p class="text">在视频发布成功的第二日，官方会把审核通过的视频对应的钻石发放到您的账户中。</p>
      <p class="text bold">3.钻石如何兑换</p>
      <p class="text">10000钻石约等于1元，会随着汇率有上下浮动</p>
      <p class="text bold">4.如何获得更多钻石</p>
      <p class="text">1.上传清晰度高，内容精彩，原创视频获得的钻石越多</p>
      <p class="text">2.上传的视频播放量、转发量、点赞、评论、收藏越多，获得的钻石越多。</p>
      <p class="text">3.上传的视频多多分享到微信、朋友圈让更多的人看到能也能获取钻石。</p>
    </div>    
  </div>
</template>
<script>
export default {
  data() {
    return {
      questions: [],
      current: 0,
      count: 0,
      total: '0.00',
      redPacketShow: false,
      isGet: false
    }
  },
  created() {
    // this._getQuestions()
    // this.redPacketShow = this.$route.params.redPacketShow || false
  },
  methods: {
    _getQuestions() {
      this.$axios.get(`${process.env.API_HOST}index.php?m=member&c=webApi&a=getQuestions`)
      .then(res => {
        if(res.data.result == 1) {
          this.questions = res.data.data
        } else if(res.data.result == 0 && res.data.errorNo == 1002) {
          this.redPacketShow = true
          this.isGet = true
        }
      })
    },
    setOption(idx) {
      switch (idx) {
        case 0:
          return 'A.  '
          break;
        case 1:
          return 'B.  '
          break;
        case 2:
          return 'C.  '
          break;
        case 3:
          return 'D.  '
          break;
      }
    },
    selectOption(idx) {
      if(this.chooseAnswer(idx) == this.questions[this.current].answer) {
        this.count++
      }
      switch (this.count) {
        case 1:
          this.total = (0.1 + Math.random() * 0.23).toFixed(2)
          break;
        case 2:
          this.total = (0.1 + Math.random() * 0.56).toFixed(2)
          break;
        case 3:
          this.total = (0.5 + Math.random() * 0.5).toFixed(2)
          break;      
        default:
          this.total = (0.1 + Math.random() * 0.23).toFixed(2)
          break;
      }
      this.current++
      if(this.current == 3) {
        this.$router.push({
          params: {
            total: this.total
          },
          name: 'reg'
        })
      }
    },
    chooseAnswer(idx) {
      switch (idx) {
        case 0:
          return 'A'
          break;
        case 1:
          return 'B'
          break;
        case 2:
          return 'C'
          break;
        case 3:
          return 'D'
          break;
      }
    },
    sharePic() {
      this.$router.push({
        path: '/sharePic'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~common/scss/mixin.scss';
  .container {
    background-color: #fff;
    .container-inner {
      width: 100%;
      min-height: 603px;
      @include bg-image('../../../static/images/page_bgimage', 'png');
      background-size: 100%;
      background-repeat: no-repeat;
      position: relative;
      .answer-wrap {
        height: 240px;
        position: absolute;
        left: 20px;
        right: 20px;
        top: 40px;
        padding: 25px 25px 0;
      }
      .subject {
        color: #333;
        font-size: 20px;
        line-height: 1.3;
        font-weight: 800;
      }
      .options-wrap {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 20px;
      }
      .option-item {
        width: 130px;
        height: 40px;
        background-color: #f99718;
        border-radius: 40px;
        margin-bottom: 20px;
        .option-inner {
          width: 100%;
          height: 40px;
          border-radius: 40px;
          text-align: center;
          line-height: 40px;
          background-color: #fbcf00;
          color: #873f00;
          font-size: 18px;
          transform: translate3d(0, -5px, 0);
        }
      }
      .redpacket-mask {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, .6);
        display: flex;
        align-items: center;
        justify-content: center;
        .redpacket-wrap {
          width: 313px;
          height: 263px;
          @include bg-image('../../../static/images/repack_bgimage', 'png');
          background-repeat: no-repeat;
          background-size: 100%;
          padding-top: 200px;
          .total {
            font-size: 35px;
            color: #ffda30;
            font-weight: 800;
            text-align: center;
          }
          .msg {
            color: #fff;
            font-size: 14px;
            text-align: center;
            margin-top: 5px;
          }
          .btn-wrap {
            width: 250px;
            height: 55px;
            background-color: #f99718;
            border-radius: 55px;
            display: block;
            margin: 0 auto;
            margin-top: 30px;
            .btn-inner {
              width: 100%;
              height: 55px;
              border-radius: 55px;
              text-align: center;
              line-height: 55px;
              background-color: #fbcf00;
              color: #873f00;
              font-size: 18px;
              transform: translate3d(0, -5px, 0);
              font-weight: 800;
            }
          }
          .btn-wrap + .btn-wrap  {
            margin-top: 19px;
          }
          .get-msg {
            text-align: center;
            height: 55px;
            font-size: 18px;
            color: #fff;
            line-height: 55px;
          }
        }
      }
    }
    .text-wrap {
      padding: 0 15px;
      .text {
        font-size: 14px;
        color: #333;
        line-height: 1.5;
        &.bold {
          font-weight: 800;
          margin-top: 10px;
        }
      }
    }
  }
</style>

