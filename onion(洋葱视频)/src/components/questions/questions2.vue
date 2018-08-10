<template>
  <transition name="slide">
    <div class="questions2">
      <scroll class="wrapper">
        <div class="inner">
          <img src="../../../static/images/authorize/image/1.jpg" alt="">
          <img src="../../../static/images/authorize/image/2.jpg" alt="">
          <img src="../../../static/images/authorize/image/3.jpg" alt="">
          <img src="../../../static/images/authorize/image/4.jpg" alt="">
          <img src="../../../static/images/authorize/image/5.jpg" alt="">
          <img src="../../../static/images/authorize/image/6.jpg" alt="">
          <img src="../../../static/images/authorize/image/7.jpg" alt="">
          <img src="../../../static/images/authorize/image/8.jpg" alt="">
          <img src="../../../static/images/authorize/image/7copy.jpg" alt=""> 
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
import Scroll from 'components/scroll/scroll'
export default {
  components: {
    Scroll
  }
}
</script>

<style lang="scss" scoped>
  .questions2 {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    z-index: 100;
  }
  .wrapper {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    .inner {
      padding: 15px;
    }
    .order {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #f85626;
      font-size: 18px;
      color: #fff;
      line-height: 40px;
      text-align: center;
      margin: 0 auto;
    }
    img {
      width: 100%;
      display: block;
      margin: 10px auto 40px;
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
