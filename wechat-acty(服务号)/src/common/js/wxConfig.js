import fly from 'flyio'
import wx from 'weixin-js-sdk'

export const wxConfig = function() {
  let noncestr = (Math.random().toString(36)).substr(2)
  let timestamp = new Date().getTime()

  fly.post(`${process.env.API_HOST}index.php?m=wechatService&c=weixin&a=get_js_sign`, {
    noncestr: noncestr,
    timestamp: timestamp
  }).then(res => {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wx929070ad17f4db30', // 必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: noncestr, // 必填，生成签名的随机串
      signature: res,// 必填，签名
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'hideMenuItems',
        'previewImage'
      ] // 必填，需要使用的JS接口列表
    })
    // return Promise.resolve()
  })
}