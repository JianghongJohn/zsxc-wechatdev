// 数据请求类
const config = require('../config');
const dataRequest = require("dataRequest.js");
//用户登录
function login(){
  var baseData = {
    "account": "xiaochengxu", "pwd": "123456"
  };
  //测试数据请求的加密方法
  var data = dataRequest.addBaseKeyWithData(baseData, false);
  //生成签名
  var sign = dataRequest.md5Prram(data, true);
  data.sign = sign;
  let time1 = data.time;
  let time2 = time1;
  var requestHeader = {
    "devId": config.devId,
    "time": time2,
    'content-type': 'application/json', // 默认值
  }
  // delete data["devId"];
  // delete data["key"];
  // delete data["time"];
debugger
  wx.request({
    url: config.url + "app/login",
    data: data,
    header: requestHeader,
    success: function (res) {
      console.log(res.data)
    }
  })
}


/**
 * 黑名单查询(传入姓名和身份证号)
 */

function queryForBlack(name , cardNo) {
  var baseData = {
    "name": name, "cardNo": cardNo
  };
  //测试数据请求的加密方法
  var data = dataRequest.addBaseKeyWithData(baseData, true);
  //生成签名
  var sign = dataRequest.md5Prram(data, true);
  baseData.sign = sign;

  var requestHeader = {
    "devId": data.devId,
    "time": data.time,
    'content-type': 'application/json', // 默认值
  }
  delete data["devId"];
  delete data["key"];
  delete data["time"];

  wx.request({
    url: config.url + "risk/queryForBlack",
    data: data,
    method: POST,

    header: requestHeader,
    success: function (res) {
      console.log(res.data)
    }
  })
}



module.exports = {
  queryForBlack: queryForBlack,
  login: login
}  