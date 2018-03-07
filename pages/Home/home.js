const Marquee = require('../../utils/marquee.js').marquee;
const app = getApp();
Page({
  data: {
    imgUrls: [
      'http://res1.age06.com/FileStore/PortalIPSForQX/V3/d6cedf78-a699-4322-8d8b-af976fc94bc1/c3d432b8-290d-4a4c-9598-187342ae4d9d/c77ab157-e2d3-4c79-b92b-167e30b76d0c.jpg',
      'http://img.zcool.cn/community/01711b59426ca1a8012193a31e5398.gif',
      'http://img.zcool.cn/community/01080755c1edaf32f87528a18e9840.jpg@900w_1l_2o_100sh.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    buttons:[
      {
        img:'/image/首页 保险.png',
        text:'保险'
      },
      {
        img: '/image/首页 二手车评估.png',
        text: '二手车评估'
      },
      {
        img: '/image/首页 我的订单.png',
        text: '我的订单'
      }, {
        img: '/image/首页 车贷计算器.png',
        text: '车贷计算器'
      }
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse
  },
  
  onLoad: function () {
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
    // 跑马灯插件
    new Marquee({
      text: ['我是一条长长的通知我是一条长长的通知我是一条长长的通知'],
      marqueePace: 1,         // 滚动速度
      marqueeDistance: 0,     // 初始滚动距离
      size: 14,
      orientation: 'left',    // 滚动方向
      interval: 20            // 时间间隔
    }).on('ready', () => {
      console.log('初始化完成');
    }).on('run', (count) => {
      console.log('开始运行第' + (count + 1) + '条');
    }).on('change', (count) => {
      console.log('切换到第' + (count + 1) + '条');
    }).run();
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