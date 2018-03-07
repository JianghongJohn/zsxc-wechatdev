const dataRequest = require("../../utils/dataRequest.js");
Page({
  data: {

  },
  onLoad: function () {
    //测试数据请求的加密方法
    console.log("我的");
    var data = dataRequest.addBaseKeyWithData({}, true);
    console.log(data);
    //生成签名
    var sign = dataRequest.md5Prram(data, true);
    console.log(sign);
  }
})
