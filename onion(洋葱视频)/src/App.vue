<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body,
html {
  line-height: 1;
  font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial,
    sans-serif, 'Droid Sans Fallback';
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  background-color: #fff;
  height: 100%;
  overflow: hidden;
}
::-webkit-scrollbar {
  display: none;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  position: relative;
}
.container {
  flex: 1;
  position: relative;
}
</style>
