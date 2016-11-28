'use strict';

const moment = require('moment');
const DELIVERY_INTEVAL = 60; // 单位:秒
const SMS_EXPIRED_TIME = 10; // 单位:分钟
const INCOME_TYPE = 'income_type'; // 转入类型
const OUTCOME_TYPE = 'outcome_type'; // 转出类型
const CATEGORY_SYMBOL = 'jinhui';

class VCode {
  static _generateCode() {
    return CommonUtils.getRandWithNumString(6);
  }

  /**
   * 转入发送验证码
   *
   * @author durban.zhang <896360979@qq.com>
   * @date 2016-11-28
   */
  static async jinhuiIncomeSend(ctx, mobile) {
    // 查询对应手机号的验证码
    let sql = SqlBuilder.makeSimpleSelectSql(`${ctx.config.mysql.prefix}qeeniao_jiufu.vcode_info`, [
      'code', 'ctime'
    ], [
      `mobile=${ctx.escape(mobile)}`,
      `category=${CATEGORY_SYMBOL}`,
      `type='${INCOME_TYPE}'`
    ]);

    let res;

    try {
      res = await ctx.mysqlQuery({ sql: sql });
    } catch (err) {
      ctx.logger.error({ tag: 'mysql-error' }, { error: err, sql: sql });
      throw err;
    }

    let code = VCode._generateCode();
    let codeSql;
    if (!res || !res.legnth) {
      codeSql = SqlBuilder.makeInsertSql(`${ctx.config.mysql.prefix}qeeniao_jiufu.vcode_info`, {
        'code': code,
        'mobile': mobile,
        'ctime': moment().add(SMS_EXPIRED_TIME, 'minute').unix(),
        'category': CATEGORY_SYMBOL,
        'type': INCOME_TYPE
      });
    } else {
      // 短信发送间隔

      codeSql = SqlBuilder.makeUpdateSql(`${ctx.config.mysql.prefix}qeeniao_jiufu.vcode_info`, {
        'code': code,
        'ctime': moment().add(SMS_EXPIRED_TIME, 'minute').unix()
      }, {
        'mobile': mobile,
        'category': CATEGORY_SYMBOL,
        'type': INCOME_TYPE
      });
    }

    if (parseInt(new Date().valueOf() / 1000) < ((+res[0].ctime) + DELIVERY_INTEVAL)) { //发送间隔不足
      throw new Error('短信发送过于频繁！');
    }

    try {
      res = await ctx.mysqlQuery({ sql: codeSql });
    } catch (err) {
      ctx.logger.error({ tag: 'mysql-error' }, { error: err, sql: codeSql });
      throw err;
    }

    let sendRes;
    try {
      sendRes = await SMSUtils.send(ctx.config.sms, mobile, { code: code }, 'jinhui-income-msg');
    } catch (err) {
      throw err;
    }

    return sendRes;
  }

  /**
   * 转入验证验证码
   *
   * @author durban.zhang <896360979@qq.com>
   * @date 2016-11-28
   */
  static jinhuiIncomeCheck(ctx, mobile, code) {
    // 查询对应手机号的验证码
    let sql = SqlBuilder.makeSimpleSelectSql(`${ctx.config.mysql.prefix}qeeniao_jiufu.vcode_info`, [
      'code', 'ctime'
    ], [
      `mobile=${ctx.escape(mobile)}`,
      `code=${ctx.escape(code)}`
      `category=${CATEGORY_SYMBOL}`,
      `type='${INCOME_TYPE}'`
    ]);

    let res;

    try {
      res = await ctx.mysqlQuery({ sql: sql });
    } catch (err) {
      ctx.logger.error({ tag: 'mysql-error' }, { error: err, sql: sql });
      throw err;
    }

    if (!res || !res.legnth) {
      throw new Error('验证码错误！');
    } else {
      if (parseInt(new Date().valueOf() / 1000) > ((+res[0].ctime) + SMS_EXPIRED_TIME * DELIVERY_INTEVAL)) {
        throw new Error('验证码过期，请重新获取！');
      }
    }

    return true;
  }

  /**
   * 转出发送验证码
   *
   * @author durban.zhang <896360979@qq.com>
   * @date 2016-11-28
   */
  static jinhuiOutcomeSend(ctx, mobile){
    // 查询对应手机号的验证码
    let sql = SqlBuilder.makeSimpleSelectSql(`${ctx.config.mysql.prefix}qeeniao_jiufu.vcode_info`, [
      'code', 'ctime'
    ], [
      `mobile=${ctx.escape(mobile)}`,
      `category=${CATEGORY_SYMBOL}`,
      `type='${OUTCOME_TYPE}'`
    ]);

    let res;

    try {
      res = await ctx.mysqlQuery({ sql: sql });
    } catch (err) {
      ctx.logger.error({ tag: 'mysql-error' }, { error: err, sql: sql });
      throw err;
    }

    let code = VCode._generateCode();
    let codeSql;
    if (!res || !res.legnth) {
      codeSql = SqlBuilder.makeInsertSql(`${ctx.config.mysql.prefix}qeeniao_jiufu.vcode_info`, {
        'code': code,
        'mobile': mobile,
        'ctime': moment().add(SMS_EXPIRED_TIME, 'minute').unix(),
        'category': CATEGORY_SYMBOL,
        'type': OUTCOME_TYPE
      });
    } else {
      // 短信发送间隔

      codeSql = SqlBuilder.makeUpdateSql(`${ctx.config.mysql.prefix}qeeniao_jiufu.vcode_info`, {
        'code': code,
        'ctime': moment().add(SMS_EXPIRED_TIME, 'minute').unix()
      }, {
        'mobile': mobile,
        'category': CATEGORY_SYMBOL,
        'type': OUTCOME_TYPE
      });
    }

    if (parseInt(new Date().valueOf() / 1000) < ((+res[0].ctime) + DELIVERY_INTEVAL)) { //发送间隔不足
      throw new Error('短信发送过于频繁！');
    }

    try {
      res = await ctx.mysqlQuery({ sql: codeSql });
    } catch (err) {
      ctx.logger.error({ tag: 'mysql-error' }, { error: err, sql: codeSql });
      throw err;
    }

    let sendRes;
    try {
      sendRes = await SMSUtils.send(ctx.config.sms, mobile, { code: code }, 'jinhui-income-msg');
    } catch (err) {
      throw err;
    }

    return sendRes;
  }

  /**
   * 转出验证验证码
   *
   * @author durban.zhang <896360979@qq.com>
   * @date 2016-11-28
   */
  static jinhuiOutcomeCheck(ctx, mobile, code){
    // 查询对应手机号的验证码
    let sql = SqlBuilder.makeSimpleSelectSql(`${ctx.config.mysql.prefix}qeeniao_jiufu.vcode_info`, [
      'code', 'ctime'
    ], [
      `mobile=${ctx.escape(mobile)}`,
      `code=${ctx.escape(code)}`
      `category=${CATEGORY_SYMBOL}`,
      `type='${OUTCOME_TYPE}'`
    ]);

    let res;

    try {
      res = await ctx.mysqlQuery({ sql: sql });
    } catch (err) {
      ctx.logger.error({ tag: 'mysql-error' }, { error: err, sql: sql });
      throw err;
    }

    if (!res || !res.legnth) {
      throw new Error('验证码错误！');
    } else {
      if (parseInt(new Date().valueOf() / 1000) > ((+res[0].ctime) + SMS_EXPIRED_TIME * DELIVERY_INTEVAL)) {
        throw new Error('验证码过期，请重新获取！');
      }
    }

    return true;
  }

}

export default VCode;
