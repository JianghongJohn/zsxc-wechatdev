//service.js
//封装了http服务,getUserInfo,提供回调函数
var recourse = {
  doMain: "http://www.domain.com/"
}
module.exports = {
  //Http Get
  requestGet: function (url, data, cb) {
    wx.request({
      url: recourse.doMain + url,
      data: data,
      method: 'GET',
      header: {},
      success: function (res) {
        cb(res, true)
      },
      fail: function () {
        cb(data, false)
      }
    })
  },
  //Http POST
  requestPost: function (url, data, cb) {
    wx.request({
      url: recourse.doMain + url,
      data: data,
      method: 'POST',
      header: {},
      success: function (res) {
        cb(res, true)
      },
      fail: function () {
        cb(data, false)
      }
    })
  },
  //获取第三方sessionId
  getSession: function (code, cb) {
    wx.request({
      url: recourse.doMain + 'SmallRoutine/PostCode',
      data: { code: code },
      method: 'POST',
      success: function (res) {
        cb(res, true)
      },
      fail: function (res) {
        cb(res, false)
      }
    })
  },
  //获取用户信息
  getUserInfo: function (cb) {
    wx.getUserInfo({
      success: function (res) {
        cb(res, true)
      },
      fail: function (res) {
        cb(res, false)
      }
    })
  },
  //获取解密数据
  getDecryptionData: function (cb) {
    wx.request({
      url: recourse.doMain + 'SmallRoutine/Decryption',
      data: {
        encryptedData: wx.getStorageSync('encryptedData'),
        iv: wx.getStorageSync('iv'),
        session: wx.getStorageSync('thirdSessionId'),
      },
      method: 'POST',
      success: function (res) {
        cb(res, true)
      },
      fail: function (res) {
        cb(res, false)
      }
    })
  }
}