<template>
  <transition name="slide">
    <div class="detail-wrap">
      <div class="content">
        <p class="title">视频解说</p>
        <div class="video-item unfold">
          <div class="item-title">
            <span class="text">如何下载安装洋葱视频？</span>
            <!-- <span class="arrow"></span> -->
          </div>
          <div class="item-content">
            <router-link tag="p" to="/questions/videoDetail" class="video-detail">苹果手机下载安装</router-link>
            <router-link tag="p" to="" class="video-detail">小米手机下载安装</router-link>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>

.detail-wrap {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #fff;
  .content {
    padding: 0 15px;
    padding-top: 30px;
    .title {
      font-size: 16px;
      color: #f85626;
    }
    .video-item {
      margin-top: 60px;
      height: 22px;
      overflow: hidden;
      .item-title {
        height: 22px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          display: inline-block;          
        }
        .arrow {
          width: 14px;
          height: 14px;
          background: url('../../../static/images/questions_images/55@2x.jpg') no-repeat;
          background-size: 100%;
        }
      }
      &.unfold {
        height: auto;
        .arrow {
          width: 14px;
          height: 14px;
          background: url('../../../static/images/questions_images/44@2x.jpg') no-repeat;
          background-size: 100%;
        }
      }
      .item-content {
        padding-top: 25px;
        .video-detail {
          color: #2043a3;
          font-size: 14px;
          &+.video-detail {
            margin-top: 15px;
          }
        }
      }
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
