'use strict';

import Util from 'Util';

Util.makeRequest('GET', {
  path: path,
  endPoint: '/'
}).then(res => {
  if (res.status >= 400) {
    throw new Error("Bad response from server");
  }
  return res.json();
}, err => {
  throw err;
}).then(res => {
  wx.config({
    debug: false,
    appId: res.app_id || '',
    timestamp: res.timestamp || '',
    nonceStr: res.noncestr || '',
    signature: res.signature || '',
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone'
    ]
  });

  wx.ready(function() {
    //分享到朋友圈
    wx.onMenuShareTimeline({
      title: res.title, // 分享标题
      desc: res.desc, // 分享标题
      link: res.link, // 分享链接
      imgUrl: res.imgUrl, // 分享图标
      success: function() {
        doStat('分享到朋友圈');
      },
      cancel: function() {}
    });

    //分享给朋友
    wx.onMenuShareAppMessage({
      title: res.title, // 分享标题
      desc: res.desc, // 分享标题
      link: res.link, // 分享链接
      imgUrl: res.imgUrl, // 分享图标
      success: function() {
        doStat('分享给朋友');
      },
      cancel: function() {}
    });

    //分享到QQ
    wx.onMenuShareQQ({
      title: res.title, // 分享标题
      desc: res.desc, // 分享标题
      link: res.link, // 分享链接
      imgUrl: res.imgUrl, // 分享图标
      success: function() {
        doStat('分享到QQ');
      },
      cancel: function() {}
    });

    //分享到腾讯微博
    wx.onMenuShareWeibo({
      title: res.title, // 分享标题
      desc: res.desc, // 分享标题
      link: res.link, // 分享链接
      imgUrl: res.imgUrl, // 分享图标
      success: function() {
        doStat('分享到腾讯微博');
      },
      cancel: function() {}
    });

    //分享到QQ空间
    wx.onMenuShareQZone({
      title: res.title, // 分享标题
      desc: res.desc, // 分享标题
      link: res.link, // 分享链接
      imgUrl: res.imgUrl, // 分享图标
      success: function() {
        doStat('分享到QQ空间');
      },
      cancel: function() {}
    });
  });
}, err => {
  throw err;
}).catch(err => {
  console.log(err);
});
