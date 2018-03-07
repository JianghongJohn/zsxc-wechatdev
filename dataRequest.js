// 数据请求封装
//字符串MD5加密
function md5String(text) {

}
/**
 * 数据排序并拼接key=value
 */
function sortData(data) {
  var finalString = "";
  var dataArray =  Object.keys(data);
  //按照字母排序
  dataArray.sort();

  for (var index = 0; index < dataArray.length; index++) {
  var str = dataArray[index];
    //第一个不需要&字符
    if (index != 0) {
      finalString = finalString + "&";
    }
    finalString =  finalString + "" + str+"="+ data[str];
  }
  return finalString;
}

/**
 处理参数，加上本后台需求的新参数

 @param data oringin
 @param isLogin 根据是否登录区分加devid或者token、userId、orgId
 @return finalData
 */
// addBaseKeyWithData: (data, isLogin){
//   //每次请求都需要携带三个参数token+userId+orgId+devid,登录时需要携带devId(设备id).
//   var finalData;

//   if (isLogin) {
//     //设备Id

//     var devid = "";
//     finalData.devId = devId;

//     //时间戳
//     NSDate * now = [NSDate date];
//     long timestamp = [now timeIntervalSince1970] * 1000;
//     //用户信息
//     NSString * userId = [ZSXCUserManager getUserId];
//     NSString * orgId = [ZSXCUserManager getOrgId];

//     [finalData setObject:userId forKeyedSubscript:kuserId];
//     [finalData setObject:orgId forKeyedSubscript:korgId];

//     [finalData setObject:[NSString stringWithFormat:@"%ld", timestamp] forKey: ktime];
//     //key
//     [finalData setObject:@"123456" forKey: @"key"];

//   } else {
//     //设备Id
//     NSString * devid = [UUID getUUID];
//     [finalData setObject:devid forKey:kdevId];
//     //时间戳
//     NSDate * now = [NSDate date];
//     long timestamp = [now timeIntervalSince1970] * 1000;
//     [finalData setObject:[NSString stringWithFormat:@"%ld", timestamp] forKey: ktime];
//     //key
//     [finalData setObject:@"123456" forKey: @"key"];
//   }

//   return finalData;
// }

//数据排序分类并MD5加密(数据，是否需要登录)
function md5Prram(data,isLogin){
  var finalString = "";
  if(isLogin){
  var header = {
    "devId" : data.devId,
    "key": data.key,
    "time": data.time
  }

  }else{

  }
  finalString = md5String(finalString);
  return finalString;
};

