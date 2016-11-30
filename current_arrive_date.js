/**
 * 活期赎回预计到账日
 * @param  {String} date 计算起始日期
 * @return {String}      计算结果日期
 */
static arriveDate(date = ''){
  let middleHour = 15;
  let timestamp = 0;

  // 当前星期
  // 当前小时
  let now;
  if(date){
    now = new Date(date);
  } else {
    now = new Date();
  }
  
  let week = now.getDay();
  let hours = now.getHours();

  let arriveDate = '';
  if (hours > middleHour) { // 大于 13 小时
    if (week == 5 || week == 6 || week == 0) { // 是否是周五，周六，周日
      switch (week) {
        case 5:
          timestamp = parseInt(now.valueOf() / 1000) + 4 * ONE_DAY_TIME;
          break;
        case 6:
          timestamp = parseInt(now.valueOf() / 1000) + 3 * ONE_DAY_TIME;
          break;
        case 0:
          timestamp = parseInt(now.valueOf() / 1000) + 2 * ONE_DAY_TIME;
          break;
      }

    } else {
      timestamp = parseInt(now.valueOf() / 1000) + 2 * ONE_DAY_TIME;
    }
  } else { // 小时 等于 13 小时
    if (week == 5 || week == 6 || week == 0) { // 是否是周五，周六，周日
      switch (week) {
        case 5:
          timestamp = parseInt(now.valueOf() / 1000) + 3 * ONE_DAY_TIME;
          break;
        case 6:
          timestamp = parseInt(now.valueOf() / 1000) + 2 * ONE_DAY_TIME;
          break;
        case 0:
          timestamp = parseInt(now.valueOf() / 1000) + ONE_DAY_TIME;
          break;
      }

    } else {
      timestamp = parseInt(now.valueOf() / 1000) + ONE_DAY_TIME;
    }
  }

  let resDate = new Date(timestamp * 1000);
  arriveDate = resDate.getFullYear() + '-' + (resDate.getMonth() + 1) + '-' + resDate.getDate();

  return {
    arriveDate
  }
}
