
class AlgorithmUtils {

  // 产生连续的字符串
  static generateRepeatStr(len, str) {
    let tmpArr = [];
    for (let i = 0; i < len; i++) {
      tmpArr.push(str);
    }

    return tmpArr.join('');
  }

  // fund_code 转 数字
  static fundCodeToCharCode(str) {
    // 设定 fund_code 的 字节数未 GY0010 6位
    // 根据 charcode的原则 设置每位长度为 3 则转换后的数据长度是 6 * 3 = 18
    let strArr = str.split('');
    let strArr1 = [];
    for (let i in strArr) {
      let tmpStr = strArr[i].charCodeAt(0)+'';
      if (tmpStr.length < 3) {
        tmpStr = AlgorithmUtils.generateRepeatStr(FUND_CODE_ONE_CHAR_LENGTH - tmpStr.length, '0') + tmpStr;
      }
      strArr1.push(tmpStr);
    }

    return strArr1.join('');
  }

  // 数字转fund_code
  static fundCodeFromCharCode(str) {
    // 设置 字符串长度为18 不足18位转前置用0补足
    str = '' + str;
    if (str.length < FUND_CODE_CHAR_LENGTH) {
      str = AlgorithmUtils.generateRepeatStr(FUND_CODE_CHAR_LENGTH - str.length, '0') + str + '';
    }
    
    // 分6组
    str = str.replace(/([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{3})/,'$1,$2,$3,$4,$5,$6');
    
    let strArr = str.split(',');
    let tmpStrArr = [];
    for(let i in strArr){
      tmpStrArr.push(String.fromCharCode(parseInt(strArr[i])));
    }
    
    return tmpStrArr.join('');
  }
}

export default AlgorithmUtils;
