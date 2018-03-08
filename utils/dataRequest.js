let Md5 = require("Md5.js");
let config = require('../config')
// 数据请求统一封装
//字符串MD5加密
function md5String(text) {
  let md5FinalString = Md5.hexMD5(text);
  return md5FinalString;
}
/**
 * 数据排序并拼接key=value
 */
function sortData(data) {
  let finalString = "";
  let dataArray = Object.keys(data);
  //按照字母排序
  dataArray.sort();

  for (let index = 0; index < dataArray.length; index++) {
    let str = dataArray[index];
    //第一个不需要&字符
    if (index != 0) {
      finalString = finalString + "&";
    }
    finalString = finalString + "" + str + "=" + data[str];
  }
  return finalString;
}

/**
 处理参数，加上本后台需求的新参数

 @param data oringin
 @param isLogin 根据是否登录区分加devid或者token、userId、orgId
 @return finalData
 */
function addBaseKeyWithData(data, isLogin) {
  //每次请求都需要携带三个参数token+userId+orgId+devid,登录时需要携带devId(设备id).
  data.devId = config.devId;//设备Id
  let timestamp = new Date().getTime();//时间戳
  data.key = config.key;
  data.time = "" + timestamp;
  if (isLogin) {
    //用户信息
    data.uId = config.uId;
    data.orgId = config.orgId;
  } else {

  }

  return data;
}

//数据排序分类并MD5加密(数据，是否需要登录)
function md5Prram(data, isLogin) {
  let finalString = "";
  if (isLogin) {
    //分离头部和请求体
    let header = {
      "devId": data.devId,
      "key": data.key,
      "time": data.time
    }
    let headerStr = sortData(header);
    let body = JSON.parse(JSON.stringify(data));
    delete body["devId"];
    delete body["key"];
    delete body["time"];
    // debugger
    let bodyStr = sortData(body);
    if (bodyStr.length == 0) {
      finalString = headerStr;
    } else {
      finalString = bodyStr + "&" + headerStr;
    }
  } else {

  }
  
  finalString = md5String(finalString);
  
  return finalString;
};

module.exports = {
  addBaseKeyWithData: addBaseKeyWithData,
  md5Prram: md5Prram
}  
