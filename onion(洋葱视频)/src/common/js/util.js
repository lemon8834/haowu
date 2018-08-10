export const getQueryString = name => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.hash.split('?')[1].match(reg)
  if (r != null) return unescape(r[2])
  return null
}
