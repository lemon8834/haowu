const formatNumber = function (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

