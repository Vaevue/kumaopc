/*
* @Author: Administrator
* @Date:   2019-08-27 19:17:06
* @Last Modified by:   Administrator
* @Last Modified time: 2019-08-27 21:09:51
*/
import originJsonp from 'jsonp'
// 封装JSONP
export default function jsonp (url, data, opation) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + parme(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, opation, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function parme (data) {
  let url = ''
  for (var i in data) {
    let value = data[i] !== undefined ? data[i] : ''
    url += `&${i} = ${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
