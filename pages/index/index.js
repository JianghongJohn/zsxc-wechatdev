let dataRequest = require('../../utils/dataRequest.js');

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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
        },
        fail: res=> {
          this.setData({
            getUserInfoFail: true
          })
        }
      })
    }
  },
  getUserInfo (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  formSubmit (e){
    if (e.detail.value.name.length == 0 ) {
      wx.showToast({
        title:'姓名不能为空',
        icon:"none",
        duration:1500
      })
    } else if (e.detail.value.id.length != 15 && e.detail.value.id.length != 18){
      wx.showToast({
        title: '身份证号格式不对',
        icon: "none",
        duration: 1500
      })
    }else{
      this.setData({
        hiddenLoading: !this.data.hiddenLoading
      })
      var formData = e.detail.value;
      wx.request({
        url: '',
        data: formData,
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if(res){
            this.setData({
              hiddenLoading: !this.data.hiddenLoading,
              resultShow: !this.data.resultShow,
              results:res.rows
            })
          }
        }
      })  
    }
  }
})