import fly from 'flyio'

export function getRecommend(page, pageNum, secdata, shareid) {
  const url = `${process.env.API_HOST}index.php?m=wechatService&c=share&a=videolists`

  const data = Object.assign({}, {
    page: page,
    pageNumber: pageNum,
    _secdata: secdata,
    shareid: shareid
    // _secdata: 'UQmyatOQImaqG0nC4GG3i84GHPQjb3O-ICh4GI5Ya9noIWcgofFRnOVvhV8GRIYFj80e5xKtDdiJqvTVlFreYiPR4jhL6aRYcWJn0XdXWOTj296S'
  })

  return fly.post(url, data).then(res => {
    return Promise.resolve(res)
  })
}
// 搞笑视频
export function getFunny(page, perpage, secdata, shareid) {
  const url = `${process.env.API_HOST}index.php?m=weChatVideo&c=index&a=videoList`

  const data = Object.assign({}, {
    page: page,
    pageNumber: perpage,
    _secdata: secdata
    // _secdata: 'UQmyatOQImaqG0nC4GG3i84GHPQjb3O-ICh4GI5Ya9noIWcgofFRnOVvhV8GRIYFj80e5xKtDdiJqvTVlFreYiPR4jhL6aRYcWJn0XdXWOTj296S'
  })

  return fly.post(url, data).then(res => {
    return Promise.resolve(res)
  })
}
// 获取用户主页
export function getUserHome(uid, secdata) {
  const url = `${process.env.API_HOST}index.php?m=wechatService&c=share&a=myHome`

  const data = Object.assign({}, {
    uid: uid,
    _secdata: secdata
    // _secdata: 'UQmyatOQImaqG0nC4GG3i84GHPQjb3O-ICh4GI5Ya9noIWcgofFRnOVvhV8GRIYFj80e5xKtDdiJqvTVlFreYiPR4jhL6aRYcWJn0XdXWOTj296S'
  })

  return fly.post(url, data).then(res => {
    return Promise.resolve(res)
  })
}
// 获取我的主页
export function getMyHome(secdata, page = 1, perpage = 10) {
  const url = `${process.env.API_HOST}index.php?m=wechatService&c=upload&a=myHome`

  const data = Object.assign({}, {
    _secdata: secdata,
    page: page,
    pageNumber: perpage
    // _secdata: 'UQmyatOQImaqG0nC4GG3i84GHPQjb3O-ICh4GI5Ya9noIWcgofFRnOVvhV8GRIYFj80e5xKtDdiJqvTVlFreYiPR4jhL6aRYcWJn0XdXWOTj296S'
  })

  return fly.post(url, data).then(res => {
    return Promise.resolve(res)
  })
}