import fly from 'flyio'
export const getVideo = function(secdata, id, pid='') {
  const url = `${process.env.API_HOST}index.php?m=wechatService&c=index&a=show_detail`

  const data = Object.assign({}, {
    _secdata: secdata,
    id: id,
    pid: pid
  })

  return fly.post(url, data).then(res => {
    return Promise.resolve(res)
  })
}