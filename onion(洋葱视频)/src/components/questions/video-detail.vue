<template>
  <transition name="slide">
    <div class="container">
      <div class="video-wrap">
        <video class="video" src="http://v.qianqiana.com/tutorial/20180329155809.mp4" controls></video>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  top: 0;
  bottom: 0;
  position: absolute;
  background-color: #fff;
  .video-wrap {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    .video {
      width: 100%;
      height: 100%;
    }
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
