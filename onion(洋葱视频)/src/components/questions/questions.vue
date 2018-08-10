<template lang="html">
  <div class="container">
    <div class="FAQ-wrap fixation" v-show="fixation">
      <div class="FAQ-inner">
        <p class="FAQ-item" :class="{active: active == 1}" @click="toQuestion(1)">新手问题</p>
        <p class="FAQ-item" :class="{active: active == 2}" @click="toQuestion(2)">金币问题</p>
        <p class="FAQ-item" :class="{active: active == 3}" @click="toQuestion(3)">钻石问题</p>
        <p class="FAQ-item" :class="{active: active == 4}" @click="toQuestion(4)">收徒问题</p>
        <p class="FAQ-item" :class="{active: active == 5}" @click="toQuestion(5)">提现问题</p>
        <p class="FAQ-item" :class="{active: active == 6}" @click="toQuestion(6)">账号问题</p>
      </div>
    </div>
    <scroll class="questions-wrap" 
      :listen-scroll="listenScroll" 
      :probe-type="probeType" 
      @scroll="scrollSpy"
      :scrollToEndFlag="scrollToEndFlag"
      ref="questionWrap">
      <div class="questions-inner">
        <router-link tag="div" class="head-banner" to="/questions/videoCourse" v-show="false"></router-link>
        <div class="FAQ-wrap" ref="FAQWrap">
          <div class="FAQ-inner">
            <p class="FAQ-item" :class="{active: active == 1}" @click="toQuestion(1)">新手问题</p>
            <p class="FAQ-item" :class="{active: active == 2}" @click="toQuestion(2)">金币问题</p>
            <p class="FAQ-item" :class="{active: active == 3}" @click="toQuestion(3)">钻石问题</p>
            <p class="FAQ-item" :class="{active: active == 4}" @click="toQuestion(4)">收徒问题</p>
            <p class="FAQ-item" :class="{active: active == 5}" @click="toQuestion(5)" style="margin-left: 0;">提现问题</p>
            <p class="FAQ-item" :class="{active: active == 6}" @click="toQuestion(6)">账号问题</p>
          </div>
        </div>
        <div class="content">
          <div class="item-wrap" ref="item1">
            <div class="item-inner">
              <p class="question-title">新手问题</p>
              <div class="question-item" :class="current==1?'unfold':''">
                <div class="question-name_wrap" data-idx="1" @click="viewQuestion">
                  <p class="question-name">1.洋葱视频是什么</p>
                  <span class="question-icon"></span>
                </div>
                <div class="question-desc_wrap">
                  <p class="question-desc">洋葱视频是一款短视频资讯类软件，提供更多有趣的视频内容给大家。</p>
                </div>
              </div>
              <div class="question-item">
                <router-link tag="div" class="question-name_wrap" to="/questions/1">
                  <p class="question-name">2.手把手教您赚零花钱</p>
                  <span class="question-icon link"></span>
                </router-link>
              </div>
              <div class="question-item" :class="current==2?'unfold':''">
                <div class="question-name_wrap" data-idx="2" @click="viewQuestion">
                  <p class="question-name">3.邀请好友有什么好处？</p>
                  <span class="question-icon"></span>
                </div>
                <div class="question-desc_wrap">
                  <p class="question-desc">每邀请一位好友，最多可获得3元现金，徒弟前三天，每天观看视频30分钟，师父每天可获得1元奖励。 徒弟每天观看30分钟，也可额外获得200金币奖励。收徒越多，奖励越多，奖励无上限</p>
                </div>
              </div>
            </div>
          </div>
          <div class="item-wrap" ref="item2">
            <div class="item-inner">
              <p class="question-title">金币问题</p>
              <div class="question-item" :class="current==3?'unfold':''">
                <div class="question-name_wrap" data-idx="3" @click="viewQuestion">
                  <p class="question-name">1.金币是什么</p>
                  <span class="question-icon"></span>
                </div>
                <div class="question-desc_wrap">
                  <p class="question-desc">金币是洋葱视频里的货币单位。当天获取的金币会在第二天自动转换为零钱，累计到您的账户。</p>
                </div>
              </div>
              <div class="question-item" :class="current==4?'unfold':''">
                <div class="question-name_wrap" data-idx="4" @click="viewQuestion">
                  <p class="question-name">2.金币如何兑换成零钱？</p>
                  <span class="question-icon"></span>
                </div>
                <div class="question-desc_wrap">
                  <p class="question-desc">零钱=昨天金币*昨日汇率／1000，汇率值与运营收益有关，因平台每天的运营收益都不一样，汇率也会受影响而上下浮动。</p>
                </div>
              </div>
              <div class="question-item" :class="current==5?'unfold':''">
                <div class="question-name_wrap" data-idx="5" @click="viewQuestion">
                  <p class="question-name">3.一金币等于多少人民币</p>
                  <span class="question-icon"></span>
                </div>
                <div class="question-desc_wrap">
                  <p class="question-desc">一个金币等于多少钱并不固定，以次日转换为准。</p>
                </div>
              </div>
              <div class="question-item" :class="current==6?'unfold':''">
                <div class="question-name_wrap" data-idx="6" @click="viewQuestion">
                  <p class="question-name">4.签到奖励/开宝箱奖励</p>
                  <span class="question-icon"></span>
                </div>
                <div class="question-desc_wrap">
                  <p class="question-desc">签到奖励：每日签到是给新老用户的福利！第一天20金币、第二天30币、……第六天100金币，第七天现金红包。最高奖励为现金红包，若中断则将从第一天开始重新计算。连续签到7天后，从第一天重新开始签到。7天一个周期。</p>
                  <p class="question-desc">宝箱奖励：开宝箱也是一项福利任务！每日任务的签到栏的下方会显示开宝箱的时间。每天每隔四个小时就会有一次开宝箱的机会，近期收徒与阅读越多，获得金币就越多</p>
                </div>
              </div>
            </div>
          </div>
          <div class="item-wrap" ref="item3">
            <div class="item-inner">
              <p class="question-title">钻石问题</p>
              <div class="question-item" :class="current==7?'unfold':''">
                <div class="question-name_wrap" data-idx="7" @click="viewQuestion">
                  <p class="question-name">1.钻石是什么</p>
                  <span class="question-icon"></span>
                </div>
                <div class="question-desc_wrap">
                  <p class="question-desc">钻石是官方根据上传视频的有趣程度，被欢迎程度和点击播放数量，点赞，评论，收藏数等综合因素，发送给上传视频作者的奖励。</p>
                </div>
              </div>
              <div class="question-item" :class="current==8?'unfold':''">
                <div class="question-name_wrap" data-idx="8" @click="viewQuestion">
                  <p class="question-name">2.钻石如何兑换成零钱</p>
                  <span class="question-icon"></span>
                </div>
                <div class="question-desc_wrap">
                  <p class="question-desc">钻石会第二天自动兑换成零钱</p>
                </div>
              </div>
              <div class="question-item" :class="current==9?'unfold':''">
                <div class="question-name_wrap" data-idx="9" @click="viewQuestion">
                  <p class="question-name">3.钻石和零钱的兑换比例</p>
                  <span class="question-icon"></span>
                </div>
                <div class="question-desc_wrap">
                  <p class="question-desc">10000在钻石约等于1元，会随着汇率有上下浮动</p>
                </div>
              </div>
            </div>
          </div>
          <div class="item-wrap" ref="item4">
            <div class="item-inner">
              <p class="question-title">收徒问题</p>
              <div class="question-item" :class="current==10?'unfold':''">
                <div class="question-name_wrap" data-idx="10" @click="viewQuestion">
                  <p class="question-name">1.如何收徒</p>
                  <span class="question-icon"></span>
                </div>
                <div class="question-desc_wrap">
                  <router-link tag="p" class="question-desc link" to="/questions/2">如何分享收徒？</router-link>
                  <router-link tag="p" class="question-desc link" to="/questions/3">如何注册洋葱视频？</router-link>
                  <router-link tag="p" class="question-desc link" to="/questions/4">如何安装洋葱视频？</router-link>
                </div>
              </div>
              <div class="question-item">
                <router-link tag="div" class="question-name_wrap" to="/questions/5">
                  <p class="question-name">2.邀请码怎么用？</p>
                  <span class="question-icon link"></span>
                </router-link>
              </div>
              <div class="question-item">
                <router-link tag="div" class="question-name_wrap" to="/questions/6">
                  <p class="question-name">3.如何微信群发快速收徒？</p>
                  <span class="question-icon link"></span>
                </router-link>
              </div>
            </div>
          </div>
          <div class="item-wrap" ref="item5">
            <div class="item-inner">
              <p class="question-title">提现问题</p>
              <div class="question-item" :class="current==11?'unfold':''">
                <div class="question-name_wrap" data-idx="11" @click="viewQuestion">
                  <p class="question-name">1.如何提现？</p>
                  <span class="question-icon"></span>
                </div>
                <div class="question-desc_wrap">
                  <p class="question-desc">当您零钱达到提现额度时，即可进入【我的】页面->进入【我的钱包】->点击卡片上的【提现】按钮->进入【我的金币零钱】或【我的钻石】选择相应的提现额度按钮。绑定微信和手机号，即可等待提现。</p>
                </div>
              </div>
              <div class="question-item" :class="current==12?'unfold':''">
                <div class="question-name_wrap" data-idx="12" @click="viewQuestion">
                  <p class="question-name">2.提现多久能到账？</p>
                  <span class="question-icon"></span>
                </div>
                <div class="question-desc_wrap">
                  <p class="question-desc">提现申请后，次日开始计算1～3个工作日处理完成（双休日，节假日顺延）</p>
                </div>
              </div>
              <div class="question-item" :class="current==13?'unfold':''">
                <div class="question-name_wrap" data-idx="13" @click="viewQuestion">
                  <p class="question-name question-badge">3.如何在微信中实名认证？</p>
                  <span class="question-icon"></span>
                </div>
                <div class="question-desc_wrap">
                  <router-link tag="p" class="question-desc link" to="/questions/8">方法一：通过验证身份证</router-link>
                  <router-link tag="p" class="question-desc link" to="/questions/9">方法二：通过添加银行卡</router-link>
                </div>
              </div>
              <div class="question-item" :class="current==14?'unfold':''">
                <div class="question-name_wrap" data-idx="14" @click="viewQuestion">
                  <p class="question-name question-badge">4.为什么提现后显示“提现失败”？</p>
                  <span class="question-icon"></span>
                </div>
                <div class="question-desc_wrap">
                  <p class="question-desc">出现这种情况，是因为您绑定的微信号未通过实名认证或日常使用频率较低。转账失败后零钱也将退回到您的洋葱视频账号上，请您在微信内完成身份认证或绑定银行卡，或者更换绑定的微信号后重新提交申请。若完成身份认证后转账依然失败，而且您也没有其他的微信号，多使用该微信号是唯一解决办法，您通过其他渠道反馈也是同样的结果。</p>
                </div>
              </div>
            </div>
          </div>
          <div class="item-wrap" ref="item6">
            <div class="item-inner">
              <p class="question-title">账号问题</p>
              <div class="question-item">
                <router-link tag="div" class="question-name_wrap" to="/questions/7">
                  <p class="question-name">1.如何绑定微信号？</p>
                  <span class="question-icon link"></span>
                </router-link>
              </div>
              <div class="question-item" :class="current==15?'unfold':''">
                <div class="question-name_wrap" data-idx="15" @click="viewQuestion">
                  <p class="question-name">2.为什么提示“该微信号已绑定其他洋葱视频账号”？</p>
                  <span class="question-icon"></span>
                </div>
                <div class="question-desc_wrap">
                  <p class="question-desc">同一个微信号不能同时绑定两个洋葱视频账号。如想把名为“张三”的微信号绑在洋葱视频账号A上，但该微信号之前已绑定了洋葱视频账号B，则必须先退出账号A，在APP注册/登录页选择微信登录方式直接登录洋葱视频，在账号管理中解绑名为“张三”的微信号，再退出该账号B重新登录账号A，此时就可以将该微信绑定在账号A上了。</p>
                </div>
              </div>
              <div class="question-item" :class="current==16?'unfold':''">
                <div class="question-name_wrap" data-idx="16" @click="viewQuestion">
                  <p class="question-name">3.为什么我不能解绑所有绑定的账号？？</p>
                  <span class="question-icon"></span>
                </div>
                <div class="question-desc_wrap">
                  <p class="question-desc">每个洋葱视频账号必须绑定一个第三方社交账号或手机号，以保证您的正常登录。如解绑了所有账号，意味着该洋葱视频账号将从此无法再登录，所含个人资料及账户信息均永久无法取回，目前暂不支持该操作哦~</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <router-view />
  </div>
</template>

<script>
import Scroll from 'components/scroll/scroll'
import { getQueryString } from 'common/js/util'
export default {
  components: {
    Scroll
  },
  data() {
    return {
      current: -1,
      fixation: false,
      scrollY: -1,
      scrollToEndFlag: false,
      active: this.$route.query.active || -1
    }
  },
  methods: {
    viewQuestion(e) {
      let idx = e.target.dataset.idx | e.target.parentNode.dataset.idx
      this.current == idx ? this.current = -1 : this.current = idx
      // console.log(idx)
    },
    scrollSpy(pos) {
      this.scrollY = pos.y
    },
    toQuestion(itemIdx) {
      this.active = itemIdx
      switch(itemIdx) {
        case 1:
          this.scrollY = -this.$refs.item1.offsetTop
          this.$refs.questionWrap.scrollTo(0, -(this.$refs.item1.offsetTop - this.offsetHeight), 0)
          break
        case 2:
          this.scrollY = -this.$refs.item2.offsetTop
          this.$refs.questionWrap.scrollTo(0, -(this.$refs.item2.offsetTop - this.offsetHeight), 0)
          break
        case 3:
          this.scrollY = -this.$refs.item3.offsetTop
          this.$refs.questionWrap.scrollTo(0, -(this.$refs.item3.offsetTop - this.offsetHeight), 0)
          break
        case 4:
          this.scrollY = -this.$refs.item4.offsetTop
          this.$refs.questionWrap.scrollTo(0, -(this.$refs.item4.offsetTop - this.offsetHeight), 0)
          break
        case 5:
          this.scrollY = -this.$refs.item5.offsetTop
          this.$refs.questionWrap.scrollToElement(this.$refs.item5, 0, 0)
          break
        case 6:
          this.scrollY = -this.$refs.item5.offsetTop
          this.$refs.questionWrap.scrollToElement(this.$refs.item6, 0, 0)
          break
      }
    }
  },
  mounted() {
    this.offsetTop = this.$refs.FAQWrap.offsetTop
    this.offsetHeight = this.$refs.FAQWrap.offsetHeight
    if(this.active == 5) {
      this.scrollY = -this.$refs.item4.offsetTop
      this.scrollToEndFlag = true
      this.current = 14
    }
  },
  created() {
    this.listenScroll = true
    this.probeType = 3
  },
  watch: {
    scrollY(newY, old) {
      -newY > this.offsetTop ? this.fixation = true : this.fixation = false
    }
  }
}
</script>

<style scoped lang="scss">
@import '~common/scss/mixin';
  .container {
    height: 100%;
  }
  .questions-wrap {
    height: 100%;
  }
  .head-banner {
    width: 100%;
    height: 60px;
    @include bg-image('../../../static/images/questions_images/11', 'jpg');
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .FAQ-wrap {
    width: 100%;
    height: 120px;
    background-color: #fff;
    &.fixation {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99;
    }
    .FAQ-inner {
      height: 120px;
      padding: 0 15px;
      font-size: 0;
      padding-top: 25px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .FAQ-item {
        width: 98px;
        height: 30px;
        border: 1px solid #e8e8e8;
        box-sizing: border-box;
        text-align: center;
        line-height: 28px;
        border-radius: 30px;
        font-size: 14px;
        color: #333;
        display: inline-block;
        margin-bottom: 15px;
        &.active {
          background-color: #f85626;
          color: #fff;
          border: 1px solid #f85626;
        }
      }
    }
  }
  .item-wrap {
    background-color: #f5f5f5;
    &+.item-wrap {
      padding-top: 10px;
    }
    .item-inner {
      padding: 0 15px 15px;
      background-color: #fff;
    }
    .question-title {
      padding: 15px 0;
      font-size: 16px;
      color: #f85626;
      line-height: 1;
    }
    .question-item {
      width: 100%;
      height: 44px;
      overflow: hidden;
      &.unfold {
        height: auto;
        .question-icon {
          background: url('../../../static/images/questions_images/44@2x.jpg') no-repeat;
          background-size: 100%;
        }
      }
      .question-name_wrap {
        display: flex;
        justify-content: space-between;
        padding: 15px 0;
      }
      .question-name {
        font-size: 14px;
        color: #333;
        position: relative;
        &.question-badge:after {
          content: '';
          display: block;
          width: 26px;
          height: 17px;
          position: absolute;
          right: 0;
          top: -3px;
          transform: translate3d(100%, 0, 0);
          background: url('../../../static/images/questions_images/2@2x.jpg') no-repeat;
          background-size: 100%;
        }
      }
      .question-icon {
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url('../../../static/images/questions_images/55@2x.jpg') no-repeat;
        background-size: 100%;
        &.link {
          background: url('../../../static/images/questions_images/33@2x.jpg') no-repeat;
          background-size: 100%;
        }
      }
      .question-desc_wrap {
        padding-bottom: 15px;
        .question-desc {
          font-size: 12px;
          color: #999;
          line-height: 1.5;
          &+.question-desc {
            margin-top: 15px;
          }
          &.link {
            color: #2043a3;
          }
        }
      }
    }
  }
</style>
