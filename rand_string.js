'use strict';
var a = '!@#$%^&*()_+-=';
var b = '1234567890';
var c = 'abcdefghijklmnopqrstuvwxyz';

a = a.split('');
b = b.split('');
c = c.split('');

var d = a.concat(b);
d = d.concat(c)

function getRandString(strArr, len) {

  let result = [];

  for (let i = 0; i < len; i++) {
    let randNum = Math.ceil(Math.random() * strArr.length); //生成一个0到25的数字
    result.push(strArr[randNum]);
  }
  return result.join('');
}

var res = getRandString(d,32)
console.log(res);
