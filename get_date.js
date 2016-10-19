/**
 * 返回 相隔指定天数的时间戳
 * @param  {int} timeLong 整数天
 * @return {int}          时间戳
 */
static getDate(timeLong){
  let currentTime = parseInt(new Date().valueOf() / 1000) + (timeLong * 24 * 60 * 60);
  return Util.timeToDateString(currentTime);
}
