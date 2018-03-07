//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Wellcome',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log("===1"+app.globalData.userInfo);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      }),
        console.log("===2" + app.globalData.userInfo);
      wx.switchTab({
        url: '/pages/Home/home',
      });
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log("===3" + app.globalData.userInfo);
      app.userInfoReadyCallback = res => {
        console.log("===31" + app.globalData.userInfo);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
      wx.switchTab({
        url: '/pages/Home/home',
      });
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      console.log("===4" + app.globalData.userInfo);
      wx.getUserInfo({
        
        success: res => {
          console.log("===41" + app.globalData.userInfo);
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
            wx.switchTab({
              url: '/pages/Home/home',
            });
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.switchTab({
        url: '/pages/Home/home',
      });
  }
})
