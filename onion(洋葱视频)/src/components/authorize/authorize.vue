<template>
  <div class="container">
    <scroll class="wrapper">
      <div class="inner">
        <p class="order">1</p>
        <img src="../../../static/images/authorize/Group5Copy.jpg" alt="">
        <p class="order">2</p>
        <img src="../../../static/images/authorize/Group6Copy.jpg" alt="">
        <p class="order">3</p>
        <img src="../../../static/images/authorize/Group8Copy.jpg" alt="">   
        <p class="order">4</p>
        <img src="../../../static/images/authorize/Group9Copy.jpg" alt="">   
        <p class="order">5</p>
        <img src="../../../static/images/authorize/Group2Copy.jpg" alt="">   
        <p class="order">6</p>
        <img src="../../../static/images/authorize/Group12Copy.jpg" alt="">   
      </div>
    </scroll>
  </div>
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
      width: auto;
      display: block;
      margin: 10px auto 40px;
    }
  }
</style>
