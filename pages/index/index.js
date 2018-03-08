const config = require('../../utils/api.js');

const app = getApp();
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse,
    buttonText:'查询',
    formInfo:[{
      label:"姓名",
      placeholder:"请输入姓名",
      type:"text",
      class:"name"
    },{
      label: "身份证号",
      placeholder: "请输入身份证号",
      type: "idcard",
      class: "id"
    }],
    results:[]
  },
  onLoad: function () {
    //进入自动登录一次，避免登陆过期
    config.login();
    // config.queryForBlack("jianghong","342725196409052010",function(data){
      
    // })


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})