import fly from 'flyio'

export const inviteList = function(_secdata) {
  const url = `${process.env.API_HOST}index.php?m=wechatService&c=index&a=wechatInviteFollow`

  const data = Object.assign({}, {
    _secdata: _secdata
  })

  return fly.get(url, data).then((res) => {
    return Promise.resolve(res)
  })
}

export const openShare = function(_secdata, uid) {
  const url = `${process.env.API_HOST}index.php?m=wechatService&c=index&a=wechatInviteFollow`

  const data = Object.assign({}, {
    _secdata: _secdata,
    uid: uid
  })

  return fly.get(url, data).then((res) => {
    return Promise.resolve(res)
  })
}