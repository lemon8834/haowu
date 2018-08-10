<template>
  <div class="container">
    <div class="banner"></div>
    <div class="btn-wrap" @click="cashDelivery">
      <img src="../../../static/images/activity_images/cash_out/2@2x.jpg" alt="" class="btn">
    </div>
    <div class="btn-wrap" @click="everyDayUnPack">
      <img src="../../../static/images/activity_images/cash_out/3@2x.jpg" alt="" class="btn">
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    everyDayUnPack() {
      window.location.href = 'toeverydayunpack::toeverydayunpack'
    },
    cashDelivery() {
      window.location.href = 'tocashdelivery::tocashdelivery'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~common/scss/mixin';
  .container {
    background-color: #faeedd;
    .banner {
      height: 226px;
      @include bg-image('../../../static/images/activity_images/cash_out/1', 'jpg');
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .btn-wrap {
      width: 355px;
      overflow: hidden;
      margin: 0 auto;
      margin-top: 40px;
      font-size: 0;
      &+.btn-wrap {
        margin-top: 30px;
      }
    }
  }
</style>
