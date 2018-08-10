<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import {wxConfig} from 'common/js/wxConfig'
export default {
  name: 'App',
  created() {
    // 注入微信配置
    wxConfig()
  }
}
</script>

<style>
  body,
  html,
  #app {
    height: 100%;
    overflow: hidden;
    line-height: 1;
    -webkit-overflow-scrolling: touch;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    user-select: none;
  }
  p {
    margin: 0;
  }
  *:after,
  *:before {
    box-sizing: border-box;
  }
  ::-webkit-scrollbar {
    display:none;
  }
</style>
