<template lang="html">
  <div class="container">
    <div class="tab">
      <div class="item" :class="{active: active == index}"  v-for="(item, index) in tabs" @click="select(index)">{{item.tab}}</div>
    </div>
    <div class="scroll-wrap">
      <scroll class="scroll" :data="paymentDetail"
                             :pullup="pullup">
        <div v-if="active == 0">
          <p class="no-record" v-show="!paymentDetail.length">暂时没有记录!</p>
          <ul class="list" v-show="paymentDetail.length">
            <li class="item" v-for="item in paymentDetail">
              <div class="info">
                <p class="way">{{item.note}}</p>
                <p class="date">{{item.formatTime}}</p>
              </div>
              <div class="msg">{{getMode(item.mold)}}{{item.point}}金币</div>
            </li>
          </ul>
          <p v-show="paymentDetail.length" class="tips">系统只保留最近3天的收支明细</p>
        </div>
        <div v-if="active == 1">
          <p class="no-record" v-show="!paymentDetail.length">暂时没有记录!</p>
          <ul class="list" v-show="paymentDetail.length">
            <li class="item" v-for="item in paymentDetail">
              <div class="info">
                <p class="way">{{item.note}}</p>
                <p class="date">{{item.formatTime}}</p>
              </div>
              <div class="msg">{{getMode(item.mold)}}{{item.point}}元</div>
            </li>
          </ul>
          <p v-show="paymentDetail.length" class="tips">系统只保留最近3天的收支明细</p>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import Scroll from 'components/scroll/scroll'
import Loading from 'components/loading/loading'
import { getQueryString } from 'common/js/util'
export default {
  components: {
    Scroll,
    Loading
  },
  data() {
    return {
      tabs: [{ tab: '金币' }, { tab: '零钱' }],
      active: 0,
      paymentDetail: [],
      pullup: true,
      secdata: getQueryString('_secdata')
    }
  },
  methods: {
    select(index) {
      this.active = index
      this._getPaymentDetail(index);
    },
    _getPaymentDetail(type) {
      this.$axios.get(`${process.env.API_HOST}/index.php?m=member&c=webApi&a=paymentDetail`,
        {
          params: {
            _secdata: this.secdata,
            type: type
          }
        }
      ).then(res => {
        console.log(res)
        this.paymentDetail = res.data.data
      })
    },
    getMode(type) {
      if (type == 1) {
        return '-'
      } else {
        return '+'
      }
    },
  },
  created() {
    this._getPaymentDetail(0)
  }
}
</script>

<style scoped lang="scss">
.scroll-wrap {
  position: absolute;
  top: 1.17rem;
  left: 0;
  right: 0;
  bottom: 0;
  // overflow-y: auto;
  .scroll {
    height: 100%;
    overflow: hidden;
  }
  .scroll > div {
    min-height: 100%;
    position: relative;
  }
}
.tab {
  position: relative;
  display: flex;
  background-color: #fff;
  z-index: 50;
  .item {
    flex: 0 0 50%;
    text-align: center;
    font-size: 14px;
    color: #333;
    position: relative;
    padding: 20px 0 9px;
  }
  .item.active:after {
    content: '';
    display: block;
    width: 20px;
    height: 4px;
    background-color: #e02e24;
    border-radius: 4px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
.no-record {
  font-size: 16px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
.list {
  padding: 0 15px;
  border-bottom: 1px solid #e8e8e8;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.27rem 0;
    .way {
      font-size: 0.37rem;
      color: #333;
      line-height: 1.4;
    }
    .date {
      font-size: 0.32rem;
      color: #c1c1c1;
      line-height: 1.4;
      margin-top: 0.13rem;
    }
    .msg {
      font-size: 0.4rem;
      color: #e02e24;
    }
  }
}
.tips {
  text-align: center;
  line-height: 1;
  font-size: 13px;
  color: #999;
  padding: 20px 0;
}
.loading-wrap {
  width: 100%;
  padding: 0.27rem 0;
}
</style>
