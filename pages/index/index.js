let dataRequest = require('../../utils/dataRequest.js');
let api = require('../../utils/api.js');
let app = getApp();
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
      class:"name",
      maxlength: 10
    },{
      label: "身份证号",
      placeholder: "请输入身份证号",
      type: "idcard",
      class: "id",
      maxlength:18
    }],
    results:[],
    resultShow:false,
    hiddenLoading:true
  },
  onLoad: function () {
    //进入自动登录一次，避免登陆过期
    
    // config.queryForBlack("jianghong","342725196409052010",function(data){
      
    // })
    api.login();
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     },
    //     fail: res=> {
    //       this.setData({
    //         getUserInfoFail: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  formSubmit (e){
    let idReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/
    if (e.detail.value.name.length == 0 ) {
      wx.showToast({
        title:'姓名不能为空',
        icon:"none",
        duration:1500
      })
    } else if (idReg.test(e.detail.value.id) === false){
      wx.showToast({
        title: '身份证号格式不对',
        icon: "none",
        duration: 1500
      })
    }else{
      this.setData({
        hiddenLoading: !this.data.hiddenLoading
      })
      let self = this;
      api.queryForBlack(e.detail.value.name, e.detail.value.id,function(res){
        self.setData({
          hiddenLoading: !self.data.hiddenLoading
        })
        if (res.data.error == 1){
          // console.info(res.data)
          self.setData({
            results : res.data.rows,
            resultShow :true
          })
        }else{
          wx.showToast({
            title: '查询失败',
            icon: "none",
            duration: 1500
          })
        }
      })
    }
  }
})