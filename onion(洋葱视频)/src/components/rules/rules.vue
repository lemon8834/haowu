<template>
  <div class="container">
    <div class="inner" v-show="active == 0">
      <p class="text">你的账户被检测出违规操作，例如非正常收徒，利用其他手段获取零钱等。提现将被冻结。请遵守规则正常使用。</p>
    </div>
    <div class="inner" v-show="active == 1">
      <p class="text">每收一位徒弟奖励2100金币，分7次发放，每次奖励300金币。</p>
      <p class="text">发放条件：徒弟进贡50金币时，即可获得一次奖励，每个徒弟每天仅奖励一次。</p>
    </div>
    <div class="inner" v-show="active == 2">
      <p class="text">1.每人每天只能提交一次提现申请。</p>
      <p class="text">2.提现申请提交后<span class="highlight">1～3个工作日</span>到账。</p>
      <p class="text">3.非正常途径获取得金币和零钱提现申请将被驳回。</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    }
  },
  created() {
    if(this.$route.query.active) {
      this.active = this.$route.query.active
    }
  },
  methods: {
    authorize() {
      window.location.href = 'howtoauthorize::howtoauthorize'
      this.$router.push({
        path: '/authorize'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .inner {
    padding: 15px;
    .text {
      font-size: 15px;
      color: #333;
      text-align: justify;
      line-height: 1.4;
      .highlight {
        color: #F85626;
      }
    }
    .text + .text {
      margin-top: 20px;
    }
  }
</style>
