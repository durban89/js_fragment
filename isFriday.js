/**
 * Created by durban on 16/5/20.
 */

class DateUtils {
  
  /**
   * 是否是周五
   * 
   * @author durban.zhang <durban.zhang@gmail.com>
   * @date 2017-01-09
   */

  static isFriday (date){

    let now;
    if(!date){
      now = new Date();
    } else {
      now = new Date(date);
    }

    let week = now.getDay();

    if(week == 5){
      return true;
    }

    return false;
  }
}
