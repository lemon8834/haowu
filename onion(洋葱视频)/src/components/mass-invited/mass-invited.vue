<template>
  <div class="container">
    <div class="content">
      <div class="inner" v-show="stepNum == 0">
        <p class="tip-text">保存图片，然后点击下一步</p>
        <img class="wxThumb" :src="imgUrl" alt="">
      </div>
      <div class="inner" v-show="stepNum == 1">
        <p class="tip-text">复制你喜欢的文案，然后点击下一步</p>
        <ul class="text-list">
          <li class="item" v-for="(item, index) in textList" :key="index">
            <p class="text">{{item}}</p>
            <span class="copy-text" :class="copySuc==index ? 'copy-text_disable':''" @click="copyText(index)">{{copySuc==index ? '已复制':'复制'}}</span>
          </li>
        </ul>
      </div>
      <div class="inner" v-show="stepNum == 2">
        <ul class="carousel-warp" v-if="type == 0">
          <li class="item" :class="active==-1?'active':''"><img src="../../../static/images/mass_invited/android/a0@2x.jpg" alt=""></li>
          <li class="item" :class="active==index?'active':''" v-for="(item, index) in androidImg" :key="index" ref="carouselItem">
            <img :src="item" alt="">
          </li>
        </ul>
        <ul class="carousel-warp" v-else>
          <li class="item" :class="active==-1?'active':''"><img src="../../../static/images/mass_invited/android/a0@2x.jpg" alt=""></li>
          <li class="item" :class="active==index?'active':''" v-for="(item, index) in iosImg" :key="index" ref="carouselItem">
            <img :src="item" alt="">
          </li>
        </ul>
      </div>
      <div class="btn-wrap">
        <div class="btn-inner" v-show="stepNum == 0">
          <p class="btn" @click="saveImg" v-show="!isSaveImg">保存图片</p>
          <p class="btn btn-disable" v-show="isSaveImg">已保存</p>
          <p class="btn" :class="isSaveImg ? 'btn-active':'btn-disable'" @click="saveImgNext">下一步</p>
        </div>
        <div class="btn-inner" v-show="stepNum == 1">
          <p class="btn" :class="copySuc!=-1 ? 'btn-active':'btn-disable'" @click="copySucNext">{{copySuc!=-1 ? '复制成功下一步':'下一步'}}</p>
        </div>
        <div class="btn-inner" v-show="stepNum == 2">
          <p class="btn" @click="viewTutorial" v-show="playBtnShow">{{active >= 0 ? '重新播放':'查看教程'}}</p>
          <p class="btn btn-disable" v-show="!playBtnShow">重新播放</p>
          <p class="btn btn-active" @click="massInvited">立即群发</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getQueryString } from 'common/js/util'
export default {
  data() {
    return {
      // 步骤 0: 保存图片 1: 复制文字 2: 查看教程
      stepNum: 0,
      isSaveImg: false,
      // 复制文案按钮状态 -1: 未复制文案  其他为以复制
      copySuc: -1,
      // 图片播放顺序
      active: -1,
      // 图片轮播间隔
      interval: 3000,
      playBtnShow: true,
      type: getQueryString('type'),
      textList: [
        '免费看视频还能赚钱？这个看视频的一定要推荐给你扫码试试！一举两得的好事。操作简单，平常心浏览就可以了！',
        '想赚零花钱吗?来看视频吧免费扫码看还能赚零花,看得多赚得越多。多划算啊!不需要你投入,都是免费的哦！',
        '免费扫-码看视频还能赚零花,不止呢~还能微信提现或者兑话费!现在真的老火了,天天有很多人在玩！',
        '看视频领奖金,看得越多赚得越多!还能微信提现哦~又能长见识。过来这个村,可没这么好机会了。马上扫码试试吧！'
      ],
      androidImg: [
        './static/images/mass_invited/android/a1@2x.jpg',
        './static/images/mass_invited/android/a2@2x.jpg',
        './static/images/mass_invited/android/a3@2x.jpg',
        './static/images/mass_invited/android/a4@2x.jpg',
        './static/images/mass_invited/android/a5@2x.jpg',
        './static/images/mass_invited/android/a6@2x.jpg'
      ],
      iosImg: [
        './static/images/mass_invited/ios/i1@2x.jpg',
        './static/images/mass_invited/ios/i2@2x.jpg',
        './static/images/mass_invited/ios/i3@2x.jpg',
        './static/images/mass_invited/ios/i4@2x.jpg',
        './static/images/mass_invited/ios/i5@2x.jpg',
        './static/images/mass_invited/ios/i6@2x.jpg'
      ],
      imgUrl: ''
    }
  },
  methods: {
    // 保存图片
    saveImg() {
      window.location.href = `saveimage::${this.imgUrl}`
      this.isSaveImg = true
    },
    saveImgNext() {
      if(this.isSaveImg) {
        this.stepNum = 1
      }
    },
    // 复制文案
    copyText(idx) {
      this.copySuc = idx
      window.location.href = `copysharetext::${this.textList[idx]}`
    },
    copySucNext() {
      if(this.copySuc != -1) {
        this.stepNum = 2
      }
    },
    carousel() {
      clearInterval(this.timer)
      this.playBtnShow = false
      this.active = 0
      this.timer = setInterval(() => {
        this.active ++
        if(this.active == 4) {
          this.playBtnShow = true
        }
        if(this.active > 5) {
          this.active = 5
          clearInterval(this.timer)
        }
      }, this.interval)
    },
    viewTutorial() {
      this.carousel()
    },
    massInvited() {
      window.location.href = 'tomassinvited::tomassinvited'
    },
    _getImage() {
      this.$axios.get(`${process.env.API_HOST}index.php?m=member&c=webApi&a=createWxThumb`)
      .then(res => {
        this.imgUrl = res.data.data
      })
    }
  },
  created() {
    this._getImage()
  }
}
</script>
<style lang="scss" scoped>
  @import '~common/scss/mixin';
  .container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .content {
    flex: 1;
    position: relative;
    .inner {
      position: absolute;
      top: 0;
      bottom: 65px;
      width: 100%;
      .tip-text {
        width: 276px;
        height: 65px;
        background-color: #fff;
        font-size: 16px;
        color: #333;
        text-align: center;
        line-height: 65px;
        margin: 0 auto;
        background: url('../../../static/images/mass_invited/11.jpg') no-repeat;
        background-size: 100%;
      }
      .wxThumb {
        width: 345px;
        display: block;
        margin: 0 auto;
        margin-top: 15px;
      }
      .carousel-warp {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        overflow: hidden;
        .item {
          width: 100%;
          height: 592px;
          padding-top: 15px;
          margin: 0 auto;
          opacity: 0;
          position: absolute;
          left: 0;
          top: 0;
          &.active {
            opacity: 1;
          }
          img {
            width: 9.2rem;
            display: block;
            margin: 0 auto;
          }
        }
      }
    }
    :nth-child(2) {
      .tip-text {
        font-size: 18px;
        color: #333;
        width: 100%;
        text-align: center;
        padding: 15px 0;
        border-bottom: 1px solid #e8e8e8;
        background: none;
        height: 50px;
        line-height: 1;
        box-sizing: border-box;
      }
      .text-list {
        width: 100%;
        padding: 0 15px;
        box-sizing: border-box;
        position: absolute;
        top: 50px;
        bottom: 0;
        overflow-y: auto;
        .item {
          display: flex;
          align-items: center;
          padding: 15px 0;
          .text {
            font-size: 16px;
            color: #333;
            line-height: 1.5;
            text-align: justify;
            flex-grow: 1;
            margin-right: 20px;
          }
          .copy-text {
            flex: 0 0 74px;
            height: 30px;
            background-color: #e02e24;
            color: #fff;
            text-align: center;
            line-height: 30px;
            border-radius: 30px;
            &.copy-text_disable {
              background-color: #e4e4e4;
              color: #999;
            }
          }
        }
      }
    }
    .btn-wrap {
      width: 100%;
      border-top: 1px solid #e8e8e8;
      height: 65px;
      position: absolute;
      bottom: 0;
      background-color: #fff;    
      padding: 0 20px;
      box-sizing: border-box;    
      .btn-inner {
        width: 100%;
        height: 65px;
        display: flex;
        align-items: center;
        justify-content: space-between;      
      }
      .btn {
        width: 4.21rem;
        height: 1.01rem;
        text-align: center;
        line-height: 1.01rem;
        font-size: 16px;
        border: 1px solid #e4e4e4;
        border-radius: 40px;
        color: #333;
        
        &.btn-disable {
          background-color: #e4e4e4;
          color: #999;
        }
        &.btn-active {
          background-color: #e02e24;
          border: 1px solid #e02e24;
          color: #fff;
        }
      }
      :nth-child(2) {
        justify-content: center;
      }
    }
  }
</style>
