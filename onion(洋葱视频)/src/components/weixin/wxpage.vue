<template lang="html">
  <div class="wxpage">
    <h2 class="title" v-text="title"></h2>
    <p v-text="msg"></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      msg: ''
    }
  },
  created() {
    if(this._getQueryString('state') == 1) {
      this.title = '授权成功'
      this.msg = '可以去"洋葱视频"APP内申请提现了！'
    }else {
      this.title = '授权失败'
      this.msg = '您未在"洋葱视频"APP内绑定过微信，或您授权时登录的微信号和APP内绑定的微信号不一致'
    }
  },
  methods: {
    _getQueryString(name) {
       var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
       var r = window.location.hash.split("?")[1].match(reg);
       if(r!=null)return  unescape(r[2]); return null;
    }
  }
}
</script>

<style scoped lang="scss">
  .wxpage {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    text-align: center;
    .title {
      width: 100%;
      color: #333;
      font-size: .59rem;
      margin: 4rem 0 1.33rem;
    }
    p {
      width: 94%;
      padding: 0 3%;
      color: #999;
      font-size: .45rem;
      line-height: 1.6;
    }
  }
</style>
