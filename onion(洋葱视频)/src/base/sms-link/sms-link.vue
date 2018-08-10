<template>
  <div class="container">
    <div class="bg-image">
      <div class="btn-group">
        <!-- <router-link tag="div" to="/download" class="btn-wrap download">未安装去下载</router-link> -->
        <a href="http://android.myapp.com/myapp/detail.htm?apkName=com.haowu.onionvideo" class="btn-wrap download">立刻下载提现</a>
      </div>
      <div class="roll-wrap">
        <div class="roll-inner" :class="{margin_top:animate}">
          <div class="roll-item" v-for="(item, index) in marqueeList" :key="index">
            <img class="avatar" :src="item.avatar" alt="">
            <div class="info-wrap">
              <span class="nick">{{item.nickName}}</span>
              <span class="date">{{item.date}}</span>
            </div>
            <span class="money-text">微信红包{{item.money}}元</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      marqueeList: [
        {
          avatar: 'http://imgcdn.qianqiana.com/2018/0302/024833l82w6Sjz0.jpg-A100',
          nickName: 'Aliens',
          date: '1分钟前',
          money: 20
        },
        {
          avatar: 'http://imgcdn.qianqiana.com/2018/0302/024830YnsD1qV6i.jpg-A100',
          nickName: '海枯石烂',
          date: '1分钟前',
          money: 30
        },
        {
          avatar: 'http://imgcdn.qianqiana.com/2018/0302/024826VhhExhHFx.jpg-A100',
          nickName: 'J姜月',
          date: '1分钟前',
          money: 30
        },
        {
          avatar: 'http://imgcdn.qianqiana.com/2018/0302/024817oNSkCld1x.jpg-A100',
          nickName: '宝宝乖乖',
          date: '1分钟前',
          money: 50
        },
        {
          avatar: 'http://imgcdn.qianqiana.com/2018/0302/024813NLOZ1nSE0.jpg-A100',
          nickName: '自由呼吸',
          date: '2分钟前',
          money: 20
        },
        {
          avatar: 'http://imgcdn.qianqiana.com/2018/0302/024812ClUcCc98S.jpg-A100',
          nickName: '不苟言笑',
          date: '2分钟前',
          money: 50
        }
      ],
      animate: false
    }
  },
  created() {
    setInterval(this.roll, 2000)
  },
  methods: {
    roll() {
      this.animate = true
      setTimeout(() => {
        this.marqueeList.push(this.marqueeList[0])
        this.marqueeList.shift()
        this.animate = false
      }, 500)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~common/scss/mixin';
.container {
  background-color: #e9351e;
}
.bg-image {
  width: 100%;
  height: 603px;
  @include bg-image('../../../static/images/sms_bgimage', 'jpg');
  background-size: 100%;
  background-repeat: no-repeat;
  padding-top: 249px;
  box-sizing: border-box;
  .btn-group {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btn-wrap {
    width: 245px;
    height: 44px;
    border-radius: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    &.download {
      background-color: #f8e71c;
      box-shadow:0 5px 0 0 #efa40a;
      color: #f85626;
    }
    &.open {
      background-color: #f85626;
      box-shadow:0 4px 0 0 #d83708;
      color: #fff;
      display: inline-block;
    }
  }
}
.roll-wrap {
  margin-top: 64px;
  padding: 0 15px;
  // border-top: 10px solid #f4f5f4;
  height: 300px;
  box-sizing: border-box;
  overflow: hidden;
  .roll-inner {
    padding: 20px 0;
  }
  .margin_top {
    margin-top: -60px;
    transition: .5s;
  }
  .roll-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    &+.roll-item {
      border-top: 1px solid rgba(248, 231, 28, .2);
    }
    .avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid #fff;
    }
    .info-wrap {
      flex-grow: 1;
      flex-direction: column;
      display: inline-flex;
      margin-left: 15px;
      line-height: 1;
      .nick {
        font-size: 18px;
        color: #fff;
      }
      .date {
        font-size: 12px;
        color: #fff;
        margin-top: 5px;
      }
    }
    .money-text {
      font-size: 18px;
      color: #fff;
      line-height: 1;
    }
  }
}

</style>
