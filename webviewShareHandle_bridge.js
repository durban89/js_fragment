'use strict';

const connectWebViewJavascriptBridge = (callback) => {
  if (window.WebViewJavascriptBridge) {
    callback(window.WebViewJavascriptBridge);
  } else {
    document.addEventListener('WebViewJavascriptBridgeReady', function () {
      callback(window.WebViewJavascriptBridge);
    }, false);
  }
};

const getDeviceType = () => {
  if (navigator.userAgent.match(/Android/i)) {
    return 'android';
  } else if (navigator.userAgent.match(/iOS|iPhone|iPad|iPod/i)) {
    return 'ios';
  }
};

//调用原生分享
const webviewShareHandle = (options) => {
  let shareArgs = JSON.stringify(options);

  let device = getDeviceType();
  switch (device) {
    case 'ios':
      connectWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('webviewShareHandle', shareArgs, function(response) {
          console.log('JS got response', response);
        });
      });
      break;
    case 'android':
      if (window.pwBrigde) {
        try {
          window.pwBrigde['webviewShareHandle'](shareArgs);
        } catch (e) {
          console.log(e);
        }
      } else {
        throw new Error('Not support in Android:webviewShareHandle');
      }
      break;
    default:
      break;
  }
}
