<template>
  <div class="container">
    <div class="content">
      <div class="master-wrap">
        <p class="avatar-wrap"><img class="master-avatar" :src="master.headface" alt=""></p>
        <span class="master-nick">你的师父：{{master.nick}}</span>
      </div>
      <p class="top-msg">邀请你一起赚钱</p>
      <img class="disciple-avatar" :src="apprentice.headface" alt="">
      <p class="disciple-nick">{{apprentice.nick}}</p>
      <p class="bottom-msg"><span class="msg-highlight">现金红包</span>等你来拿</p>
      <div class="btn-wrap receive-redpack_wrap">
        <a class="btn-inner receive-redpack_inner" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo">已安装直接领取</a>
      </div>
      <div class="btn-wrap download-app_wrap">
        <a class="btn-inner download-app_inner" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.haowu.onionvideo">下载洋葱视频</a>
      </div>
    </div>
  </div>
</template>
<script>
import { getQueryString } from 'common/js/util'
export default {
  data() {
    return {
      master: {},
      apprentice: {},
      memberid: getQueryString('memberid'),
      uid: getQueryString('uid')
    }
  },
  created() {
    this._getAwakenData()
  },
  methods: {
    _getAwakenData() {
      this.$axios.get(`${process.env.API_HOST}index.php?m=member&c=webApi&a=awakenInfo&memberid=${this.memberid}&uid=${this.uid}`)
      .then(res => {
        this.apprentice = res.data.data.apprentice
        this.master = res.data.data.master
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';

.container {
  background-color: #fc4c38;
  .content {
    height: 667px;
    @include bg-image('../../../static/images/hxdisciple_bgimg', 'jpg');
    background-size: 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .master-wrap {
    width: 250px;
    height: 46px;
    border-radius: 46px;
    line-height: 44px;
    border: 1px solid rgba(255, 255, 255, 0.26);
    background-color: rgba(255, 255, 255, 0.2);
    box-sizing: border-box;
    padding-left: 85px;
    position: relative;
    margin-top: 46px;
    .avatar-wrap {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 2px solid #fff;
      box-sizing: border-box;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      img {
        display: block;
        width: 100%;
        border-radius: 50%;
      }
    }
    .master-nick {
      width: 140px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      color: #fff;
      display: inline-block;
    }
  }
  .top-msg {
    font-size: 12px;
    color: #f8e71c;
    margin-top: 20px;
    letter-spacing: 1px;
  }
  .disciple-avatar {
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-top: 44px;
  }
  .disciple-nick {
    font-size: 15px;
    color: #fff;
    margin-top: 15px;
  }
  .bottom-msg {
    font-size: 24px;
    color: #fff;
    margin-top: 10px;
    .msg-highlight {
      color: #f8e71c;
    }
  }
  .btn-wrap {
    width: 280px;
    height: 52px;
    border-radius: 52px;
    .btn-inner {
      width: 100%;
      height: 100%;
      border-radius: 52px;
      transform: translate3d(0, -4px, 0);
      text-align: center;
      line-height: 52px;
      font-size: 20px;
      font-weight: 600;
    }
    a {
      display: block;
    }
    .btn-inner.receive-redpack_inner {
      background-color: #fe9382;
      color: #fff;
    }
    .btn-inner.download-app_inner {
      background-color: #ffda30;
      color: #873f00;
    }
  }
  .btn-wrap.receive-redpack_wrap {
    background-color: #f2634c;
    margin-top: 85px;
  }
  .btn-wrap.download-app_wrap {
    background-color: #f99718;
    margin-top: 29px;
  }
}
</style>
