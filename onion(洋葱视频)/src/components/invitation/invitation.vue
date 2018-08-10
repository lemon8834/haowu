<template lang="html">
  <scroll class="wrapper">
    <div class="inner">
      <div class="head">        
        <!-- <p class="code" ref="code" v-show="!isActivity">{{inviteData.inviteCode}}</p>
        <p class="click-copy" @click="copy" v-show="!isActivity">点击复制邀请码</p> -->
        <!-- <div class="invite-code_wrap">
          <p class="invite-code" ref="code">{{inviteData.inviteCode}}</p>
          <p class="copy" @click="copy">复制</p>
        </div> -->
        <p class="rules" @click="newRule" v-show="false">规则</p>
        <!-- <div class="share-btn_wrap" @click="showActionSheet">
          <p class="share-btn__inner">收徒赚钱</p>
        </div> -->
        <div class="share-btn__new" @click="showActionSheet">点击邀请好友</div>
        <div class="invite-code_wrap_new">
          <p class="invite-code" ref="code" @click="copy">我的邀请码:{{inviteData.inviteCode}}</p>
          <p class="copy" @click="copy">复制</p>
        </div>
        <!-- <p class="activity-time">活动时间：6月16日-6月30日</p> -->
        <!-- <div class="activity-pannel">
          <div class="invite-list" @click="viewList">
            <img src="../../../static/images/activity_images/new_activity/invite_list_icon@3x.png" alt="" class="btn">
          </div>
          <div class="pannel-inner">
            <div class="pannel-item">
              <span class="count">{{activityData.invitefriend}}</span>
              <span class="text">新增徒弟</span>
            </div>
            <span class="line"></span>
            <div class="pannel-item">
              <span class="count">{{activityData.effectivefriend}}</span>
              <span class="text">有效徒弟(位)</span>
            </div>
            <span class="line"></span>
            <div class="pannel-item">
              <span class="count">{{countAward(activityData.effectivefriend)}}</span>
              <span class="text">预计奖励</span>
            </div>
          </div>
        </div> -->
        <!-- <p class="invite-tips">收徒奖励=基础奖励+额外活动奖励，上不封顶</p> -->
      </div>
      <div class="main">
        <div class="share-btn__group">
          <p class="share-tips">点击下方按钮分享给好友</p>
          <div class="share-btn_wrap">
            <div class="btn-item" @click="momentsInvited">
              <img src="../../../static/images/share_pyq@2x.png" alt="" class="btn-icon">
              <span class="btn-name">朋友圈</span>
            </div>
            <div class="btn-item" @click="wechatInvited">
              <img src="../../../static/images/share_wechat@2x.png" alt="" class="btn-icon">
              <span class="btn-name">微信好友</span>
            </div>
            <div class="btn-item" @click="qqInvited">
              <img src="../../../static/images/share_qq@2x.png" alt="" class="btn-icon">
              <span class="btn-name">QQ</span>
            </div>
          </div>          
        </div>
        <img src="../../../static/images/mass_invited/new_img/invite_gl.png" alt="" class="invite_gl">
        <div class="tab-wrap">
          <div class="tabs">
            <span class="tab-item" 
                  :class="{active: active === index}" 
                  v-for="(item, index) in tabs"
                  @click="select(index)">{{item.tab}} {{getNumber(index)}}</span>
          </div>
          <div class="tab-content">
            <div class="list-wrap" v-show="active == 0 & isActivity">
              <div class="activity-img"></div>
              <div class="activity-text_wrap">
                <p class="activity-text">1.每收到一位有效徒弟最多可奖励2100金币,分7次奖励。</p>
                <p class="activity-text">2.第1次奖励发放条件:徒弟下载并登录App奖励200金币,徒弟完成签到再奖励100金币。</p>
                <p class="activity-text">3.其他6次奖励发放条件:徒徒弟每日进贡达到50金币时,即可获得300金币奖励,每个徒弟每天仅奖励1次。</p>
                <p class="activity-text">有效徒弟：活动期间内新收的每位徒弟，累积进贡超过50金币，即为有效徒弟。</p>
                <p class="activity-detail" @click="activityDetail">查看活动详情</p>
              </div>
            </div>
            <!-- <div class="list-wrap" v-show="active == 0">
              <img src="../../../static/images/mass_invited/new_img/invite_top@2x.jpg" alt="" class="top_img">
              <img src="../../../static/images/mass_invited/new_img/invite_bottom@2x.jpg" alt="">
              <div class="invite_tips__wrap">
                <p class="title">收徒技巧</p>
                <p class="small-title">收徒成功率提高200%</p>
                <p class="text">1.邀请您的家人、朋友、同学、同事成功率最高，被邀请人也可获得<span class="highlight">0.5元现金奖励+600金币</span></p>
                <p class="text">2.分享到3个以上的微信群/QQ群，收徒成功率<span class="highlight">提高200%</span></p>
                <p class="text">3.可以告诉您的好友，注册可领取<span class="highlight">0.5元现金</span>，可微信提现</p>
              </div>
            </div> -->
            <div class="list-wrap" v-show="active == 0 & !isActivity">
              <div class="list-inner">
                <div class="list-head">
                  <span class="vacancy"></span>
                  <span class="disciple">收徒</span>
                  <span class="earning" style="text-align: right;">本周收益</span>
                </div>
                <div class="list-content">
                  <div class="list-item" v-for="(item, index) in hits">
                    <span :class="getRankCls(index)">{{getRankText(index)}}</span>
                    <div class="user-info">
                      <img class="avatar" :src="item.headface">
                      <span class="nick">{{item.nick}}</span>
                    </div>
                    <span class="disciple-num">{{item.PupilNum}}人</span>
                    <span class="money">{{item.weekAccount}}元</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="list-wrap" v-show="active == 1">
              <div class="blank" v-if="!inviteList.length">
                <p class="msg">招收1名徒弟最多奖励<span class="msg-highlight">2100金币</span></p>
                <p class="msg">收徒越多奖励越多，奖励无上限！</p>
              </div>
              <div class="list-inner" v-if="inviteList.length">
                <div class="list-head disciple-head">
                  <span class="vacancy"></span>
                  <!-- <span class="earning">本周贡献</span>
                  <span class="total-earning">总贡献</span> -->
                </div>
                <div class="list-content disciple-content">
                  <div class="list-item" v-for="(item, index) in inviteList" v-show="item.isUnLogin != 0">
                    <span class="rank state"></span>
                    <div class="user-info" style="margin-left: 15px;">
                      <img class="avatar" :src="item.headface">
                      <span class="nick">{{item.nick}}</span>
                    </div>
                    <span class="money"></span>
                    <span class="tip-text" @click="awakenPanel">未登录</span>
                  </div>
                  <div class="list-item" v-for="(item, index) in inviteList" v-show="item.isUnLogin != 1">
                    <span :class="getRankCls(index)">{{getRankText(index)}}</span>
                    <div class="user-info" style="margin-left: 15px;">
                      <img class="avatar" :src="item.headface">
                      <span class="nick">{{item.nick}}</span>
                    </div>
                    <!-- <span class="money">{{item.week}}金币</span>
                    <span class="total-money">{{item.contribution}}金币</span> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="list-wrap" v-show="active == 2">
              <div class="blank" v-if="!awaken.length">
                <p class="msg">招收1名徒弟最多奖励<span class="msg-highlight">2100金币</span></p>
                <p class="msg">收徒越多奖励越多，奖励无上限！</p>
              </div>
              <div class="list-inner" v-if="awaken.length">
                <div class="list-content disciple-content">
                  <div class="padding-top-15"></div>
                  <div class="list-item" v-for="(item, index) in awaken">
                    <div class="user-info">
                      <img class="avatar" :src="item.headface">
                      <span class="nick">{{item.nick}}</span>
                    </div>
                    <span class="days">{{item.leaveDay}}未登陆</span>
                    <span class="rouse" @click="awakenApprentice(index)">唤醒</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main" v-show="false">
        <div class="group-wrap">
          <div class="group-inner">
            <p class="group-title">基础奖励</p>
            <p class="group-text">每邀一位有效徒弟奖励<span class="highlight">3元</span></p>
            <p class="group-tips">有效徒弟：徒弟前三天每天累计观看视频30分钟为有效徒弟。</p>
            <p class="group-tips">徒弟每天观看30分钟分钟奖励1元，共3元</p>
          </div>
        </div>
        <div class="group-wrap">
          <div class="group-inner">
            <p class="group-title long">额外活动奖励</p>
            <p class="group-tips">活动期间邀请有效收徒还可获得<span class="highlight small">额外阶梯奖励</span></p>
            <div class="activity-img"></div>
          </div>
        </div>
        <div class="group-wrap">
          <div class="group-inner">
            <p class="group-title long">如何获得奖励</p>
            <p class="method-title">方法一</p>
            <img src="../../../static/images/activity_images/new_activity/1@3x.png" alt="" class="img">
            <p class="method-title">方法二</p>
            <p class="group-msg">好友下载APP，输入您的红包邀请码，观看视频</p>
            <div class="invite-code">
              <span class="code">邀请码：{{inviteData.inviteCode}}</span>
              <span class="copy-btn" @click="copy">复制</span>
            </div>
          </div>
        </div>
        <div class="share-btn__group group-wrap">
          <div class="group-inner">
            <p class="share-tips">点击下方按钮分享给好友</p>
            <div class="share-btn_wrap">
              <div class="btn-item" @click="momentsInvited">
                <img src="../../../static/images/activity_images/new_activity/moments_icon@3x.png" alt="" class="btn-icon">
                <span class="btn-name">朋友圈</span>
              </div>
              <div class="btn-item" @click="wechatInvited">
                <img src="../../../static/images/activity_images/new_activity/wechat_icon@3x.png" alt="" class="btn-icon">
                <span class="btn-name">微信好友</span>
              </div>
              <div class="btn-item" @click="qqInvited">
                <img src="../../../static/images/activity_images/new_activity/qq_icon@3x.png" alt="" class="btn-icon">
                <span class="btn-name">QQ</span>
              </div>
            </div>
          </div>        
        </div>
      </div>
    </div>
    <!-- <router-view /> -->
    <!-- <div class="footer">
      <div class="share-btn_wrap" v-show="active == 0 & isActivity">
        <div class="share-btn" @click="wechatInvited">
          <img src="../../../static/images/activity_images/cash_out/16@2x.jpg" alt="" class="wechat-icon">
          <span class="btn-name">微信收徒</span>
        </div>
        <div class="share-btn" @click="momentsInvited">
          <img src="../../../static/images/activity_images/cash_out/17@2x.jpg" alt="" class="moments-icon">
          <span class="btn-name">朋友圈收徒</span>
        </div>
      </div>
      <span class="footer-item border-right" @click="toSkill" v-show="active == 1 || active == 0 & !isActivity">收徒技巧></span>
      <span class="footer-item" @click="rules" v-show="active == 1 || active == 0 & !isActivity">收徒规则></span>
      <div class="footer-item last" v-show="active == 2" @click="activityPanel">
        <img src="../../../static/images/1_invited@2x.png" alt="">
        <span>唤醒徒弟</span>
      </div>
    </div> -->
    <div class="master-modal" v-show="awakenPanelShow">
      <div class="master-content">
        <p class="master-title">唤醒徒弟活动</p>
        <p class="master-text">您的徒弟还未登录过他的洋葱视频账号，徒弟登录账号后才能获得相对应的奖励哦！</p>
        <span class="konw" @click="awakenPanel">知道了</span>
        <span class="close" @click="awakenPanel"></span>
      </div>
    </div>
    <div class="master-modal" v-if="msaterModalShow">
      <div class="master-content">
        <img class="avatar" :src="masterInfo.headface" alt="">
        <p class="nick">{{masterInfo.nick}}</p>
        <p class="total-disciple">你的师傅总共收徒<span class="num">{{masterInfo.PupilNum}}</span>人</p>
        <p class="total-money">累计收入<span class="num">{{masterInfo.total_account}}</span>元</p>
      </div>
      <div class="close-btn" @click="MasterModal"></div>
    </div>
    <div class="master-modal" v-show="activityPanelShow">
      <div class="master-content awaken">
        <p class="master-title">唤醒徒弟活动</p>
        <p class="master-text">成功唤醒后师傅得<span class="highlight">500金币</span>，徒弟得<span class="highlight">200金币</span>，唤醒徒弟越多，奖励越多</p>
        <p class="master-message">什么是成功唤醒？<br>1.师傅需点击“唤醒”按钮，并通过QQ或微信发送链接给徒弟<br>2.徒弟需点击师傅的链接并登录洋葱视频<br>3.徒弟需观看3个完整视频<br>4.师傅点击“唤醒”按钮后，分享的链接3天有效<br>5.若徒弟还未回来,3天后需要重新唤醒哦！</p>
        <span class="konw" @click="activityPanel">立即参与</span>
        <span class="close" @click="activityPanel"></span>
      </div>
    </div>
    <div class="master-modal" v-show="newRuleShow">
      <div class="master-content awaken">
        <p class="master-title">活动规则</p>
        <ul>
          <!-- <li class="text">活动时间：6月16日-6月30日</li>
          <li class="text">奖金发放时间：7月5日-7月7日</li> -->
          <li class="text">在活动期间内，有效好友达到指定数量，除每个好友可得3元基础奖励外，可额外获得阶梯奖励。（从收徒之日起，徒弟完成前三天的30分钟观看任务才可获得额外奖励）</li>
          <li class="text">最高1200元，邀请好友越多奖励越高</li>
          <li class="text">现金奖励只可领取一次，以最高梯次奖励计算。</li>
          <li class="msg-title">郑重声明</li>
          <li class="msg-text">为保证广大用户收益不受影响，对于存在违规邀请好友的行为的用户，平台将取消其参加活动的资格，并扣除所有奖励。请遵守平台规则，正常邀请好友。</li>
          <li class="tips">本活动最终解释权归洋葱视频所有</li>
        </ul>
        <!-- <span class="konw" @click="newRule">立即参与</span> -->
        <span class="close" @click="newRule"></span>
      </div>
    </div>
    <div class="actionSheet-wrap old" v-if="!versionNum" v-show="isShowActionSheet">
      <div class="actionSheet-mask" @click.prevent="showActionSheet"></div>
      <div class="actionSheet-inner" :class="isShowActionSheet ? 'slide-up' : ''">
        <div class="btn-group">
          <div class="item" @click="momentsInvited">
            <i class="icon"></i>  
            <span class="btn-name">朋友圈</span>
          </div>
          <div class="item" @click="wechatInvited">
            <i class="icon"></i>
            <span class="btn-name">微信</span>
          </div>
          <div class="item" @click="qqInvited">
            <i class="icon"></i>
            <span class="btn-name">QQ</span>
          </div>
          <div class="item" @click="qzoneInvited">
            <i class="icon"></i>
            <span class="btn-name">QQ空间</span>
          </div>
          <div class="item" @click="sinaInvited">
            <i class="icon"></i>
            <span class="btn-name">新浪微博</span>
          </div>
        </div>
        <div class="cancel-share" @click="showActionSheet">取消分享</div>
      </div>
    </div>
    <div class="actionSheet-wrap" v-else v-show="isShowActionSheet">
      <div class="actionSheet-mask" @click.prevent="showActionSheet"></div>
      <div class="actionSheet-inner" :class="isShowActionSheet ? 'slide-up' : ''">
        <div class="btn-group">
          <div class="item" @click="momentsInvited">
            <i class="icon"></i>  
            <span class="btn-name">朋友圈邀请</span>
          </div>
          <div class="item" @click="wechatInvited">
            <i class="icon"></i>
            <span class="btn-name">微信邀请</span>
          </div>
          <div class="item" @click="qqInvited">
            <i class="icon"></i>
            <span class="btn-name">QQ邀请</span>
          </div>
          <div class="item" @click="SMSInvited">
            <i class="icon"></i>
            <span class="btn-name">短信邀请</span>
          </div>
          <div class="item" @click="massInvited">
            <i class="icon"></i>
            <span class="btn-name">群发邀请</span>
          </div>
          <div class="item" @click="scanAQRCode">
            <i class="icon"></i>
            <span class="btn-name">面对面邀请</span>
          </div>
        </div>
        <div class="cancel-share" @click="showActionSheet">取消分享</div>
      </div>
    </div>
    <div class="top-right_corner_btn showInput" @click="fillIn" v-if="inviteData.isBinded === 0"></div>
    <div class="top-right_corner_btn master-btn" @click="MasterModal" v-else></div>
  </scroll>
</template>

<script>
import Scroll from 'components/scroll/scroll'
import { getQueryString } from 'common/js/util'
import { Toast } from 'mint-ui'
export default {
  components: {
    Scroll
  },
  data() {
    return {
      tabs: [{ tab: '本周排行' }, { tab: '我的徒弟' }, { tab: '唤醒徒弟' }],
      active: 0,
      isActivity: false,
      inviteData: {},
      inviteList: [],
      awaken: [],
      masterInfo: {},
      hits: [],
      isShowActionSheet: false,
      sucMaster: false,
      msaterModalShow: false,
      awakenPanelShow: false,
      activityPanelShow: false,
      secdata: this.$route.query._secdata || 0,
      defaultAvatar: '../../../static/images/logo.jpg',
      versionNum: this.$route.query.version || 0,
      newRuleShow: false,
      activityData: {}
    }
  },
  created() {
    this._getinviteData()
    // console.log(this.versionNum)
  },
  methods: {
    select(index) {
      this.active = index
    },
    // 排名添加icon
    getRankCls(index) {
      if (index <= 2) {
        return `rank icon${index}`
      } else {
        return 'rank'
      }
    },
    getRankText(index) {
      if (index > 2) {
        return index + 1
      }
    },
    getNumber(idx) {
      if (idx == 1) {
        return this.inviteData.inviteNum
      } else if (idx == 2) {
        return this.awaken.length
      } else {
        return
      }
    },
    // 显示/隐藏分享modal
    showActionSheet() {
      this.isShowActionSheet = !this.isShowActionSheet      
    },
    awakenApprentice(index) {
      window.location.href = `awaken::${this.awaken[index].memberid}`
    },
    MasterModal() {
      this.msaterModalShow = !this.msaterModalShow
    },
    // 确认拜师
    confirmMaster() {
      this.isShowModal = false
      this.sucMaster = true
    },
    // 复制邀请码
    copy() {
      window.location.href = `copyinvitecode::${this.inviteData.inviteCode}`
    },
    wechatInvited() {
      window.location.href = 'wechat::wechat'
      this.isShowActionSheet = false
    },
    momentsInvited() {
      window.location.href = `moments::moments`
      this.isShowActionSheet = false
    },
    qqInvited() {
      window.location.href = 'qq::qq'
      this.isShowActionSheet = false
    },
    qzoneInvited() {
      window.location.href = 'qzone::qzone'
      this.isShowActionSheet = false
    },
    sinaInvited() {
      window.location.href = 'sina::sina'
      this.isShowActionSheet = false
    },
    SMSInvited() {
      window.location.href = 'smsinvited::smsinvited'
      this.isShowActionSheet = false
    },
    massInvited() {
      window.location.href = 'massinvited::massinvited'
      this.isShowActionSheet = false
      // this.$router.push({
      //   path: '/massInvited'
      // })
    },
    scanAQRCode() {
      window.location.href = 'scanaqrcode::scanaqrcode'
      this.isShowActionSheet = !this.isShowActionSheet
    },
    fillIn() {
      window.location.href = 'fillin::fillin'
    },
    toSkill() {
      window.location.href = 'anapprenticeskills::anapprenticeskills'
      this.$router.push({
        path: '/questions/2'
      })
    },
    activityDetail() {
      window.location.href = "tocashdelivery::tocashdelivery"
    },
    viewInvitedCode() {
      // window.location.href = 'routerlink::routerlink'
      this.$router.push({
        path: '/inviteCD', 
        query: {
          code: this.inviteData.inviteCode
        }
      })
    },
    _getinviteData() {
      this.$axios.get(`${process.env.API_HOST}index.php?m=member&c=webApi&a=invite&_secdata=${this.secdata}`)
      .then(res => {
        this.inviteData = res.data.data
        this.inviteList = res.data.data.inviteList
        this.awaken = res.data.data.awaken
        this.masterInfo = res.data.data.masterInfo
        this.hits = res.data.data.hits
        this.inviteNum = res.data.data
      })
    },
    _getActivityInfo() {
      this.$axios.get(`${process.env.API_HOST}index.php?m=member&c=webApi&a=ladderActivity&_secdata=${this.secdata}`)
      .then(res => {
        this.activityData = res.data
        // console.log(this.activityData)
      })
    },
    rules() {
      window.location = 'markingrules::markingrules'
      this.$router.push({
        path: '/rules',
        query: {
          active: 1
        }
      })
    },
    awakenPanel() {
      this.awakenPanelShow = !this.awakenPanelShow
    },
    activityPanel() {
      this.activityPanelShow = !this.activityPanelShow
    },
    newRule() {
      this.newRuleShow = !this.newRuleShow
    },
    viewList() {
      this.$router.push({
        name: 'activityNew',
        params: {
          awaken: this.awaken,
          inviteList: this.inviteList
        }
      })
    },
    countAward(num) {
      if(num >= 2 && num < 4) {
        return 4
      }else if(num >= 4 && num < 6) {
        return 10
      }else if(num >= 6 && num < 10) {
        return 18
      }else if(num >= 10 && num < 20) {
        return 40
      }else if(num >= 20 && num < 50) {
        return 90
      }else if(num >= 50 && num < 80) {
        return 250
      }else if(num >= 80 && num < 120) {
        return 440
      }else if(num >= 120 && num < 180) {
        return 720
      }else if(num >= 180) {
        return 1200
      }else {
        return 0
      }
    }
  },
  mounted() {
    window.viewInvitedCode = this.viewInvitedCode
    // this._getActivityInfo()
  }
}
</script>

<style scoped lang="scss">
@import '~common/scss/mixin';

.inner {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-image:linear-gradient(0deg, #ff6912 0%, #e93614 100%);
  // background-color: #fff;
}
.left-btn {
  width: 40px;
  height: 138px;
  @include bg-image('../../../static/images/left_btn', 'png');
  background-size: 100%;
  position: fixed;
  left: 0;
  top: 157px;
  z-index: 100;
}
.top-right_corner_btn {
  height: 30px;
  border-radius: 30px 0 0 30px;
  position: fixed;
  right: 0;
  top: 15px;
  box-shadow: 0 2px 4px 0 rgba(166, 147, 142, 0.43);
}
.top-right_corner_btn.showInput {
  width: 130px;
  @include bg-image('../../../static/images/3', 'jpg');
  background-size: 100%;
  background-repeat: no-repeat;
}
.top-right_corner_btn.master-btn {
  width: 75px;
  @include bg-image('../../../static/images/7', 'jpg');
  background-size: 100%;
  background-repeat: no-repeat;
}
.wrapper {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  overflow: hidden;
  .modal-wrap {
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 199;
    .modal-mask {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
    }
    .modal-inner {
      width: 257px;
      height: 320px;
      border-radius: 24px;
      @include bg-image('../../../static/images/invite_modal_bg', 'png');
      background-size: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 2px 6px 0 #9b1167;
      .modal-input {
        width: 220px;
        height: 40px;
        border-radius: 40px;
        background-color: #fff;
        padding: 0 20px;
        box-sizing: border-box;
        color: #333;
        font-size: 14px;
        margin-top: 160px;
      }
      .modal-msg {
        font-size: 12px;
        color: #fff;
        margin-top: 10px;
        line-height: 1;
        letter-spacing: 1px;
      }
    }
    .confirm-btn {
      width: 168px;
      height: 38px;
      color: #333;
      font-size: 18px;
      text-align: center;
      line-height: 38px;
      border: 1px solid #fff;
      border-radius: 40px;
      position: absolute;
      left: 0;
      right: 0;
      top: calc(50% + 180px);
      margin: auto;
      color: #fff;
      background-color: transparent;
    }
  }
  .master-modal {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 199;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .master-content {
      width: 315px;
      min-height: 300px;
      border-radius: 8px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      // justify-content: center;
      position: relative;
      justify-content: center;
      &.awaken {
        padding: 52px 0 30px;
      }
      .master-title {
        width: 168px;
        height: 42px;
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate3d(-50%, -6px, 0);
        color: #fff;
        font-size: 18px;
        line-height: 42px;
        text-align: center;
        background: url('../../../static/images/activity_images/new_activity/rule_title_bgimg@2x.png') no-repeat;
        background-size: 100%;
      }
      ul {
        width: 100%;
        // padding: 0 15px 0 25px;
        box-sizing: border-box;
        .tips {
          font-size: 12px;
          color: #999;
          line-height: 22px;
          text-align: center;
        }
      }
      .text {
        list-style-type: disc;
        font-size: 15px;
        color: #333;
        line-height: 24px;
        font-weight: 650;
        text-align: justify;
        margin: 0 15px 0 30px;
        &+.text {
          margin-top: 10px;
        }
      }
      .msg-title {
        width: 100%;
        font-size: 15px;
        color: #333;
        font-weight: 650;
        margin-top: 30px;
        text-align: center;
      }
      .msg-text {
        color: #999;
        font-size: 12px;
        line-height: 22px;
        text-align: justify;
        margin: 0 15px;
        margin-top: 10px;
      }
      .master-text {
        font-size: .53rem;
        color: #333;
        line-height: 1.5;
        text-align: justify;
        padding: 0 .4rem;
        .highlight {
          color: #e02e24;
        }
      }
      .master-message {
        color: #666;
        font-size: 16px;
        line-height: 1.5;
        // margin-top: 20px;
        padding: 0 15px;
        &.new-rule {
          color: #333;
        }
      }
      .master-tips {
        font-size: 13px;
        color: #333;
        line-height: 1.5;
        margin-top: 20px;
        padding: 0 15px;
      }
      .konw {
        display: inline-block;
        width: 220px;
        height: 1.39rem;
        border-radius: 52px;
        margin-top: 27px;
        color: #fff;
        font-size: 20px;
        text-align: center;
        background-color: #e02e24;
        margin-top: .72rem;
        line-height: 1.39rem;
      }
      .close {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../../../static/images/3_invited@2x.png') no-repeat;
        background-size: 100%;
        position: absolute;
        top: 15px;
        right: 20px;
        &:after {
          content: '';
          position: absolute;
          top: -10px;
          bottom: -10px;
          left: -10px;
          right: -10px;
        }
      }
      .avatar {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        overflow: hidden;
        display: block;
      }
      .nick {
        font-size: 18px;
        color: #333;
        margin-top: 15px;
        line-height: 1.2;
      }
      .total-disciple {
        font-size: 16px;
        color: #333;
        margin-top: 36px;
        .num {
          color: #e02e24;
        }
      }
      .total-money {
        font-size: 16px;
        color: #333;
        margin-top: 15px;
        .num {
          color: #e02e24;
        }
      }
    }
    .close-btn {
      width: 32px;
      height: 32px;
      @include bg-image('../../../static/images/close_btn', 'png');
      margin-top: 25px;
      background-size: 100%;
    }
  }
  .actionSheet-wrap {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 199;
    &.old {
      .actionSheet-inner {
        height: 165px;
        .btn-group {
          padding: 25px 20px 0;
        }
        .item {
          flex: 0 0 50px;
          &:nth-child(4) .icon {
            @include bg-image('../../../static/images/share_qzone', 'png');
          }
          &:nth-child(5) .icon {
            @include bg-image('../../../static/images/share_sina', 'png');
          }
        }
      }
    }
    .actionSheet-mask {
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, .6);
    }
    .actionSheet-inner {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 268px;
      background-color: #f3f2f2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: block .3s;      
      .btn-group {
        width: 100%;
        padding: 25px 10px 0;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .item {        
        flex: 0 0 33.33%;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        font-size: 10px;
        color: #333;
        padding-bottom: 25px;
        .icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-size: 100%;
          display: inline-block;
          background-size: 100%;
        }
        &:nth-child(1) .icon {
          @include bg-image('../../../static/images/share_pyq', 'png');
        }
        &:nth-child(2) .icon {
          @include bg-image('../../../static/images/share_wechat', 'png');
        }
        &:nth-child(3) .icon {
          @include bg-image('../../../static/images/share_qq', 'png');
        }        
        &:nth-child(4) .icon {
          @include bg-image('../../../static/images/share_b', 'png');
        }
        &:nth-child(5) .icon {
          @include bg-image('../../../static/images/share_a', 'png');
        }
        &:nth-child(6) .icon {
          @include bg-image('../../../static/images/share_qrcode', 'png');
        }
        .btn-name {
          display: inline-block;
          margin-top: 10px;
        }
      }
      .cancel-share {
        width: 100%;
        height: 44px;
        background-color: #fff;
        font-size: 16px;
        color: #333;
        text-align: center;
        line-height: 44px;
      }
    }
  }
  .head {
    width: 100%;
    // height: 316px;
    height: 544px;
    display: flex;
    align-items: center;
    flex-direction: column;
    // @include bg-image('../../../static/images/mass_invited/new_img/invite_head', 'png');
    @include bg-image('../../../static/images/mass_invited/new_img/invite_head11', 'png');
    // @include bg-image('../../../static/images/invite_banner', 'jpg');
    // @include bg-image('../../../static/images/activity_images/new_activity/invite_head_bgimg', 'png');
    background-size: 100%;
    background-repeat: no-repeat;
    line-height: 1;
    position: relative;
    &.activity {
      height: 250px;
      @include bg-image('../../../static/images/activity_images/cash_out/14', 'jpg');
      background-size: 100%;
      .share-btn_wrap {
        margin-top: 120px;
      }
    }
    .activity-time {
      font-size: 14px;
      color: #fff;
      margin: 15px 0;
      line-height: 1;
      text-align: center;
    }
    .activity-pannel {
      width: 345px;
      height: 75px;
      box-sizing: border-box;
      padding: 3px;
      border-radius: 75px;
      background-color: #fef8c6;
      position: relative;
      .invite-list {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: absolute;
        top: -50%;
        left: 10px;
        overflow: hidden;
        transform: translate3d(0, 30%, 0);
        .btn {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .pannel-inner {
        height: 100%;
        border: 1px solid #D57A34;
        border-radius: 69px;
        display: flex;
        align-items: center;
        justify-content: center;
        .pannel-item {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          line-height: 1;
          .count {
            font-size: 20px;
            color: #bb581e;
            font-weight: 700;
            margin-bottom: 10px;
          }
          .text {
            font-size: 12px;
            color: #d57a34;
          }
        }
        .line {
          margin:0 20px;
          display: inline-block;
          width: 1px;
          height: 34px;
          background-color: #d57a34;
        }
      }
    }
    .invite-tips {
      font-size: 13px;
      color: #666;
      margin-top: 10px;
      padding-bottom: 20px;
      text-align: center;
    }
    .share-btn__new {
      background-image:linear-gradient(-1deg, #ffb200 0%, #f6ff6c 100%);
      box-shadow:0 4px 9px 0 rgba(165,3,23,0.50);
      border-radius:100px;
      width:270px;
      height:55px;
      text-align: center;
      line-height: 55px;
      font-size:22px;
      color:#b41905;
      letter-spacing:0.49px;
      text-shadow:0 1px 0 #fff2ab;
      font-weight: 600;
      margin-top: 191px;
    }
    .invite-code_wrap_new {
      margin-top: 15px;
      font-size: 16px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      .invite-code {
        text-decoration: underline;
        @include extend-click;
      }
      .copy {
        width: 45px;
        height: 22px;
        border: 1px solid #fff;
        border-radius: 24px;
        text-align: center;
        line-height: 22px;
        margin-left: 10px;
        font-size: 14px;
      }
    }
    .activity-date {
      font-size: 12px;
      color: #fff;
      line-height: 1.5;
      text-align: center;
      margin-top: 6px;
    }
    .view-detail {
      font-size: 16px;
      color: #fff;
      margin-top: 15px;
      text-decoration: underline;
      @include extend-click;
    }

    .invite-code_wrap {
      width: 262px;
      height: 40px;
      margin: 0 auto;
      border-radius: 40px;
      display: flex;
      line-height: 40px;
      overflow: hidden;
      font-weight: 600;
      margin-top: 131px;
      .invite-code {
        flex: 1;
        font-size: 26px;
        color: #952d12;
        text-align: center;
        background-color: #fff;
      }
      .copy {
        width: 86px;
        background-color: #f5a623;
        color: #fff;
        font-size: 18px;
        text-align: center;
      }
    }    
    .rules {
      width: 58px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      background-color: #fff;
      color: #a3120f;
      font-size: 14px;
      position: absolute;
      left: 0;
      top: 71px;
      border-radius: 0 24px 24px 0;
    }
    .code {
      font-size: 30px;
      color: #952d12;
      margin-top: 1.33rem;
      font-weight: bolder;
      margin-bottom: 0.67rem;
      letter-spacing: 3px;
    }
    .click-copy {
      font-size: 14px;
      color: #952d12;
      @include extend-click;
    }
    .share-btn_wrap {
      width: 200px;
      height: 40px;
      background-color: #d4ba0b;
      border-radius: 40px;
      position: relative;
      margin-top: 15px;
      .share-btn__inner {
        width: 100%;
        height: 100%;
        background-color: #fde43f;
        border-radius: 40px;
        position: absolute;
        left: 0;
        top: -3px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #952d12;
        font-weight: 800;
      }
    }
  }
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    .share-tips {
      font-size: 13px;
      color: #fff;
      text-align: center;
      padding-top: 20px;
    }
    .share-btn_wrap {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      .btn-item {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;
        color: #fff;
        margin: 0 20px;
        .btn-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          margin-bottom: 10px;
        }
      }
    }
    .invite_gl {
      width: 353px;
      display: block;
      margin: 0 auto;
      margin-top: 20px;
    }
    .tab-wrap {
      width: 345px;
      background:#fef5ea;
      box-shadow:0 2px 4px 0 rgba(186,95,5,0.50);
      border-radius:8px;
      margin: 0 auto;
      margin-top: 20px;
    }
    .tabs {
      width: 100%;
      height: 48px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e8e8e8;
      .tab-item {
        flex: 33.33%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #999;
        font-size: 14px;
        position: relative;
        &.active {
          color: #333;
          &:after {
            content: '';
            display: block;
            width: 20px;
            height: 4px;
            border-radius: 4px;
            background-color: #e02e24;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
          }
        }
      }
    }
    .tab-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      .list-wrap {
        flex: 1;
        padding: 0 .4rem 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        min-height: 300px;
        .top_img {
          margin: 30px 0 40px;
        }
        .invite_tips__wrap {
          width: 100%;
          background-color: #f5f5f5;
          box-sizing: border-box;
          padding: 15px;
          text-align: center;
          color: #333;
          margin-top: 30px;
          .title {
            font-size: 17px;
            font-weight: 600;
          }
          .small-title {
            font-size: 12px;
            margin-top: 6px;
          }
          .text {
            font-size: 14px;
            margin-top: 15px;
            text-align: left;
            .highlight {
              color: #f40009;
              line-height: 1.5;
            }
            &+.text {
              margin-top: 5px;
            }
          }
        }
        .blank {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .msg {
          font-size: 14px;
          color: #333;
          text-align: center;
          .msg-highlight {
            color: #e02e24;
          }
        }
        .msg + .msg {
          margin-top: 10px;
        }
        .view-jq {
          width: 130px;
          height: 34px;
          background-color: #e02e24;
          border-radius: 34px;
          color: #fff;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          margin: 0 auto;
          margin-top: 20px;
        }
        .list-inner {
          width: 100%;
        }
        .list-head {
          width: 100%;
          padding: 15px 0 10px;
          display: flex;
          font-size: 11px;
          color: #999;
          .vacancy {
            flex-grow: 1;
          }
          .disciple {
            flex: 0 0 20%;
            text-align: center;
          }
          .earning {
            flex: 0 0 25%;
            text-align: center;
          }
        }
        .list-head.disciple-head {
          .disciple {
            flex: 0 0 15%;
          }
          .earning {
            flex: 0 0 25%;
          }
          .total-earning {
            flex: 0 0 25%;
            text-align: center;
          }
        }
        .list-content {
          width: 100%;
          .padding-top-15 {
            padding-top: 15px;
          }
          .list-item {
            display: flex;
            align-items: center;
            width: 100%;
            line-height: 1;
          }
          .list-item + .list-item {
            margin-top: 15px;
          }
          .rank {
            display: inline-flex;
            flex: 0 0 21px;
            height: 22px;
            text-align: center;
            line-height: 22px;
            background-size: 100%;
            align-items: center;
            justify-content: center;
            &.state:after {
              content: '';
              display: block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: #1dcc24;
            }
            &.icon0 {
              @include bg-image('../../../static/images/Group2', 'png');
            }
            &.icon1 {
              @include bg-image('../../../static/images/Group3', 'png');
            }
            &.icon2 {
              @include bg-image('../../../static/images/Group4', 'png');
            }
          }
          .tip-text {
            color: #fff;
            font-size: 14px;
            width: 100%;
            height: 30px;
            background-color: #1dcc24;
            border-radius: 30px;
            text-align: center;
            line-height: 30px;
            display: inline-block;
          }
          .user-info {
            flex-grow: 1;
            display: inline-flex;
            align-items: center;
            margin-left: .4rem;
            .avatar {
              width: .8rem;
              height: .8rem;
              border-radius: 50%;
            }
            .nick {
              font-size: 14px;
              color: #000;
              margin-left: .27rem;
              width: 90px;
              @include nowrap;
              text-align: left;
              line-height: 1.2;
            }
          }
          .disciple-num {
            flex: 0 0 20%;
            text-align: center;
            color: #e02e24;
            font-size: 14px;
          }
          .money {
            flex: 0 0 25%;
            text-align: right;
            color: #e02e24;
            font-size: 14px;
            @include nowrap;
          }
          .rouse {
            flex: 0 0 50px;
            height: 20px;
            box-sizing: border-box;
            border: 1px solid #e02e24;
            text-align: center;
            line-height: 18px;
            font-size: 12px;
            color: #e02e24;
            border-radius: 20px;
          }
          .days {
            flex: 0 0 35%;
            font-size: 12px;
            color: #999;
            text-align: center;
          }
        }
        .list-content.disciple-content {
          text-align: center;
          color: #e02e24;
          font-size: 14px;
          .disciple-num {
            flex: 0 0 15%;
          }
          .user-info {
            margin-left: 0;
          }
          .money {
            flex: 0 0 25%;
            text-align: center;
          }
          .total-money {
            flex: 0 0 25%;
          }
        }
        .activity-img {
          width: 100%;
          height: 619px;
          @include bg-image('../../../static/images/activity_images/cash_out/18', 'jpg');
          background-size: 100%;
          background-repeat: no-repeat;
          margin-top: 20px;
        }
        .activity-text_wrap {
          width: 100%;
          height: 348px;
          @include bg-image('../../../static/images/activity_images/cash_out/21', 'jpg');
          background-size: 100%;
          background-repeat: no-repeat;
          margin-top: 20px;
          padding: 51px 15px 0;
          box-sizing: border-box;
          .activity-text {
            font-size: 15px;
            color: #854711;
            line-height: 1.4;
            &+.activity-text {
              margin-top: 7px;
            }
          }
          .activity-detail {
            font-size: 17px;
            color: #f43714;
            width: 220px;
            height: 44px;
            border: 1px solid #f43714;
            border-radius: 44px;
            text-align: center;
            line-height: 42px;
            margin: 0 auto;
            margin-top: 20px;
          }
        }
      }
    }
    .group-wrap {
      padding-top: 5px;
      background-color: #f5f5f5;
      .group-inner {
        background-color: #fff;
        padding: 20px 0;
        text-align: center;
      }
      .group-title {
        display: inline-block;
        padding: 0 31px 0 27px;
        height: 24px;
        line-height: 24px;
        @include bg-image('../../../static/images/activity_images/new_activity/title_bg-img', 'png');
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 24px;
        font-size: 14px;
        color: #333;
        font-weight: 700;
        &.long {
          padding: 0 31px 0 40px;
        }
      }
      .group-text {
        font-size: 16px;
        color: #333;
        font-weight: 700;
        margin-top: 10px;
      }
      .highlight {
        color: #f40009;
        font-size: 20px;
        &.small {
          font-size: 13px;
        }
      }
      .group-tips {
        font-size: 13px;
        color: #666;
        margin-top: 10px;
        line-height: 1;
      }
      .activity-img {
        margin-top: 20px;
        height: 376px;
        @include bg-image('../../../static/images/activity_images/new_activity/activity_img', 'png');
        background-size: 317px;
        background-position: 50%;
        background-repeat: no-repeat;
      }
      .method-title {
        margin-top: 10px;
        color: #333;
        font-size: 14px;
      }
      .img {
        width: 269px;
        margin-top: 10px;
        margin-bottom: 30px;
      }
      .group-msg {
        font-size: 13px;
        color: #333;
        margin-top: 10px;
      }
      .invite-code {
        display: inline-flex;
        align-items: center;
        width: 280px;
        height: 44px;
        border: 1px solid #f40009;
        border-radius: 44px;
        padding: 3px 3px 3px 16px;
        background-color: #fff;
        box-sizing: border-box;
        margin-top: 10px;
        .code {
          font-size: 16px;
          color: #f40009;
          flex: 1;
          text-align: left;
        }
        .copy-btn {
          display: inline-block;
          width: 70px;
          height: 38px;
          background-color: #f40009;
          border-radius: 38px;
          line-height: 38px;
          color: #fff;
          text-align: center;
          font-size: 16px;
        }
      }
    }
  }
  .footer {
    width: 100%;
    height: 40px;
    background-color: #e02e24;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    .share-btn_wrap {
      width: 100%;
      height: 40px;
      background-color: #fff;
      border-top: 1px solid #e4e4e4;
      display: flex;
      .share-btn {
        flex: 0 0 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .btn-name {
        font-size: 16px;
        color: #333;
        margin-left: 7px;
      }
      .wechat-icon {
        width: 21px;
        height: 18px;
      }
      .moments-icon {
        width: 19px;
        height: 19px;
      }
      :first-child {
        border-right: 1px solid #e4e4e4;
      }
    }
    .footer-item {
      flex: 0 0 50%;
      color: #fff;
      text-align: center;
      font-size: 15px;
      // padding: 10px 0;
      box-sizing: border-box;
      @include extend-click;
      &.border-right {
        border-right: 1px solid #fff;
      }
      &.last {
        flex: 0 0 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        font-size: 16px;
        color: #fff;
        img {
          width: 18px;
          height: 22px;
          margin-right: 5px;
        }
      }      
    }
    
  }
}
.slide-enter-active, .slide-leave-active {
  transition: all .3s;
}
.slide-enter, .slide-leave-to {
  transform: translate3d(0, 100%, 0);
}
.slide-up {
  animation: slide-up .3s 1;
}

@keyframes slide-up {
  0% {
    transform: translate3d(0, 100%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
