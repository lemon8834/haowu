import fly from 'flyio'

export function getVideoList(page, perpage) {
  const url = `${process.env.API_HOST}index.php?m=m&c=index&a=lists`

  const data = Object.assign({}, {
    page: page,
    pageNumber: perpage
  }) 

  return fly.post(url, data).then(res => {
    return Promise.resolve(res)
  })
}

export function getSlide() {
  const url = `${process.env.API_HOST}index.php?m=m&c=index&a=slide`

  return fly.get(url).then((res) => {
    return Promise.resolve(res)
  })
}

export function getRecommend(vid) {
  const url = `${process.env.API_HOST}index.php?m=m&c=index&a=related`

  const data = Object.assign({}, {
    vid: vid
  })
  
  return fly.get(url, data).then((res) => {
    return Promise.resolve(res)
  })
}

export function playEnd(vid) {
  const url = `${process.env.API_HOST}index.php?m=m&c=index&a=view`

  const data = Object.assign({}, {
    vid: vid
  })

  return fly.get(url, data).then((res) => {
    return Promise.resolve(res)
  })
}

export function getItem(vid) {
  const url = `${process.env.API_HOST}index.php?m=m&c=index&a=detail`

  const data = Object.assign({
    vid: vid
  })

  return fly.get(url, data).then((res) => {
    return Promise.resolve(res)
  })
}