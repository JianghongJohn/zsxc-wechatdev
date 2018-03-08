// 数据请求类
const config = require('../config');
const dataRequest = require("dataRequest.js");
//用户登录
function login(){
  
  var baseData = {
    "account": "xiaochengxu", "pwd": "123456"
  };
  //测试数据请求的加密方法
  var finalData = dataRequest.addBaseKeyWithData(baseData, false);
  var body = JSON.parse(JSON.stringify(finalData)); 
  //生成签名
  var sign = dataRequest.md5Prram(finalData, true);
  body.sign = sign;
  var requestHeader = {
    "devId": finalData.devId,
    "time": finalData.time,
    'content-type': 'application/x-www-form-urlencoded',
  }
  delete body["devId"];
  delete body["key"];
  delete body["time"];
  wx.request({
    url: config.url + "app/login",
    data: body,
    method: "POST",
    header: requestHeader,
    success: function (res) {
      console.log(res.data)
    }
  })
}


/**
 * 黑名单查询(传入姓名和身份证号)
 */

function queryForBlack(name , cardNo ,callBack) {
  
  var baseData = {
    "name": name, "cardNo": cardNo
  };
  //测试数据请求的加密方法
  var finalData = dataRequest.addBaseKeyWithData(baseData, true);
  var body = JSON.parse(JSON.stringify(finalData));
  //生成签名
  var sign = dataRequest.md5Prram(finalData, true);
  body.sign = sign;
  var requestHeader = {
    "devId": finalData.devId,
    "time": finalData.time,
    'Content-type': 'application/json',
  }
  delete body["devId"];
  delete body["key"];
  delete body["time"];
  debugger
  wx.request({
    url: config.url + "risk/queryForBlack",
    data: body,
    // method: "POST",
    header: requestHeader,
    success: function (res) {
      console.log(res.data)
      callBack(res)
    },
    fail(res){
      callBack(res)
    }
  })
}



module.exports = {
  queryForBlack: queryForBlack,
  login: login
}  