// import {
//   request
// } from "https"
import qs from 'qs';

let _toString = Object.prototype.toString

let _toEach = Array.prototype.forEach

/**
 * 请求参数转换
 * */
export const getUrlParams = (param) => {
  return qs.stringify(param)
}
/**o
 * 判断是否是微信
 * @return {Boolean}
 */
export let isWeixin = function () {
  let _userAgent = window.navigator.userAgent;

  if (_userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}
/**o
 * 判断是否是车主APP打开的
 * @return {Boolean}
 */
export let isChezhu = function () {
  let _userAgent = window.navigator.userAgent;
  if (_userAgent.toLowerCase().match(/maxuslife/i) == 'maxuslife') {
    return true;
  } else {
    return false;
  }
}
/**
 * 判断是否是数组
 * @return {Boolean}
 */
export let isArray = function (arr) {
  return Array.isArray(arr)
}
/**
 * 判断是否是null undefined
 * @return {Boolean}
 */
export let isUndef = function (v) {
  return v === undefined || v === null
}
/**
 *  数值转化为序列化，并渲染出来
 * @return {String}
 */
export let toString = function (val) {
  return val == null ?
    '' :
    typeof val === 'object' ?
      JSON.stringify(val, null, 2) :
      String(val)
}
/**
 *  数值转化为数字
 * @return {Number}
 */
export let toNumber = function (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}
/**
 *  继承
 * @return {Object}
 */
export let _extend = function (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}
/**
 *  对象或者数组
 * @return {Boolean}
 */
export let isArrayOrObj = function (obj) {
  return isArray(obj) || isPlainObject(obj)
}
/**
 *  克隆
 * @return {Object}
 */
export let clone = function (obj) {
  if (isArrayOrObj(obj)) {
    return JSON.parse(JSON.stringify(obj))
  }
  return obj;

}
/**
 *  是否是对象
 * @return {Boolean}
 */
export let isPlainObject = function (obj) {
  return _toString.call(obj) === '[object Object]'
}
/**
 *  判断字符串是否为空
 * @return {Boolean}
 */
export let isNullString = function (str) {
  return trim(str).length === 0
}
/**
 *  去除空格
 * @return {String}
 */
export let trim = function (str) {
  if (typeof str === 'string') {
    return String.prototype.trim.bind(str)()
  }
}


/**
 *  判断是否为邮箱
 * @return {Boolean}
 */
export let isEmail = function (str) {
  var reg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
  if (reg.test(str)) {
    return true;
  }
  return false
}

/**
 *  判断是否为手机
 * @return {Boolean}
 */
export let isMobile = function (str) {
  var reg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
  if (reg.test(str)) {
    return true;
  }
  return false
}
/**
 *  只保留数字
 * @return {String}
 */
export let isSaveNumber = function (str) {
  return str.replace(/[^0-9.]/g, '')
}
/**
 *  获取cookie
 * @return {String}
 */
export let getCookie = function (name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=")
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1
      c_end = document.cookie.indexOf(";", c_start)
      if (c_end == -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ""
};
/**
 *  设置cookie
 */
export let setCookie = function (c_name, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = c_name + "=" + escape(value) +
    ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}
/**
 *  获取本地存储数据  统一用Object或者Array
 *  return {Object String}
 */
export let getStore = function (name) {
  if (window.localStorage) {

    let data = localStorage.getItem(name);
    if (!data) {
      return null
    }
    let dataObj = JSON.parse(data);
    if (new Date().getTime() - dataObj.time > 10080000) {
      return null
    } else {
      let dataObjDatatoJson = dataObj.data
      return dataObjDatatoJson;
    }
  }
  return null
}
export let getLocalStorage = function (name) {
  if (window.localStorage) {
    return JSON.parse(localStorage.getItem(name))
  }
}
/**
 *  设置本地存储书籍 统一用Object或者Array
 */
export let setStore = function (name, val = {}) {
  if (window.localStorage) {
    //默认7天过期时间
    var curTime = new Date().getTime();
    localStorage.setItem(name, JSON.stringify({
      data: val,
      time: curTime
    }))
  }

}
/**
 *  只保留中文
 *  return {Object String}
 */
export let toCN = function () {
  var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g;
  return this.replace(regEx, '');
}

/**
 * Check if value is primitive
 */
export let isPrimitive = function (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}
/**
 * Remove an item from an array
 */
export let remove = function (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
/**
 *  返回唯一的实例
 *  return {Object String}
 */
export let getSingle = function (fn) {
  var result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  }
};

/**
 * Merge an Array of Objects into a single Object.
 */
export let toObject = function (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * 延迟函数
 */
export let delay = function (fn, time) {
  setTimeout(function () {
    fn && fn();
  }, time)
}
export let getNowFormatDate = function () {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  var strHour = date.getHours()
  var strMinutes = date.getMinutes()
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (strHour >= 0 && strHour <= 9) {
    strHour = "0" + strHour;
  }

  if (strMinutes >= 0 && strMinutes <= 9) {
    strMinutes = "0" + strMinutes;
  }

  var currentdate = year + month + strDate + strHour + strMinutes + '00';
  return currentdate;
}

export let illegalChar = function (str) {
  if (str) {
    return str.replace(/\\/g, "")
  }
}
export let setRequestCode = function (obj, code) {
  obj.appRequestVO.requestCode = code
  return obj
}
export let log = function (args) {
  // console.log(args)
}

/**
 * 补0
 */
export let fillZero = function (n, l = 2) {
  n = n + '';
  while (n.length < l) {
    n = '0' + n
  }
  return n;
}
/**
 * 处理日期
 */
export let handDate = function (time, str = 'yyyy-MM-dd',isFill=true) {
  if(!time) return '';
  let t = new Date(time);
  let y = t.getFullYear() || '1970';
  let M = isFill ? fillZero(t.getMonth() + 1) : t.getMonth() + 1 || '01';
  let d = isFill ? fillZero(t.getDate()) : t.getDate() || '01';
  let h = isFill ? fillZero(t.getHours()) : t.getHours() || '07';
  let m = isFill ? fillZero(t.getMinutes()) : t.getMinutes() || '00';
  let s = isFill ? fillZero(t.getSeconds()) : t.getSeconds() || '00';
  let S = isFill ? fillZero(t.getMilliseconds(), 3) : t.getMilliseconds() || '000';

  return str.replace(/yyyy/g, y).replace(/MM/g, M).replace(/dd/g, d).replace(/hh/g, h).replace(/mm/g, m).replace(/ss/g, s).replace(/SS/g, S);
}

export let ymdDate = function (value) {
  if (!toNumber(value)) {
    return ""
  }
  let date = new Date(toNumber(value))
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = date.getDate()
  D = D < 10 ? '0' + D : D
  return Y + M + D
}

/**
 * 普通数组 => 树状数组
 */
export let toTree = function (arr, parentId, id = 'id', key = 'children') {
  let tree = [];
  let children = arr.filter(i => i.parentId == parentId);
  children.forEach(item => {
    let child = toTree(arr, item[id], id);
    item[key] = child;
    tree.push(item);
  });
  return tree;
}

/*将code转成文字（根据code找到codeName）*/
/*将code转成文字（根据code找到codeName）*/
export let reasonToText = (codeType, value) => {
    // console.log('asdsad>>>>>>>>>>',codeType,value);
	let codelist = JSON.parse(localStorage.getItem('10041')).fcList;
	if (value) {
		return codelist.find((v, i) => {
			return v.code == value;
		}).codeName;
	} else {
		return ""
	}

}

export let escape2Html = function (str) {
  var arrEntities = {
    'lt': '<',
    'gt': '>',
    'nbsp': ' ',
    'amp': '&',
    'quot': '"'
  }
  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
    return arrEntities[t];
  })
}

/**
 * 获取codeType list
 */
export let codeList = function (codeType) {
  return JSON.parse(localStorage.getItem('10041')).fcList.filter(i => i.codeType == codeType).map(i => {
    i.title = i.codeName;
    return i;
  })
}

export let registerFindIndex = () => {
  if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
      value: function (predicate) {
        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }
        var o = Object(this);
        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;
        // 3. If IsCallable(predicate) is false, throw a TypeError exception.
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
        var thisArg = arguments[1];
        // 5. Let k be 0.
        var k = 0;
        // 6. Repeat, while k < len
        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return k.
          var kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return k;
          }
          // e. Increase k by 1.
          k++;
        }
        // 7. Return -1.
        return -1;
      }
    });
  }
}
export let registryFilter = () => {
  if (!Array.prototype.filter) {
    Array.prototype.filter = function (func, thisArg) {
      'use strict';
      if (!((typeof func === 'Function' || typeof func === 'function') && this))
        throw new TypeError();

      var len = this.length >>> 0,
        res = new Array(len), // preallocate array
        t = this,
        c = 0,
        i = -1;
      if (thisArg === undefined) {
        while (++i !== len) {
          // checks to see if the key was set
          if (i in this) {
            if (func(t[i], i, t)) {
              res[c++] = t[i];
            }
          }
        }
      } else {
        while (++i !== len) {
          // checks to see if the key was set
          if (i in this) {
            if (func.call(thisArg, t[i], i, t)) {
              res[c++] = t[i];
            }
          }
        }
      }

      res.length = c; // shrink down array to proper size
      return res;
    };
  }
}
export let registryFrom = () => {
  if (!Array.from) {
    Array.from = (function () {
      var toStr = Object.prototype.toString;
      var isCallable = function (fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };
      var toInteger = function (value) {
        var number = Number(value);
        if (isNaN(number)) {
          return 0;
        }
        if (number === 0 || !isFinite(number)) {
          return number;
        }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var toLength = function (value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      };

      // The length property of the from method is 1.
      return function from(arrayLike /*, mapFn, thisArg */) {
        // 1. Let C be the this value.
        var C = this;

        // 2. Let items be ToObject(arrayLike).
        var items = Object(arrayLike);

        // 3. ReturnIfAbrupt(items).
        if (arrayLike == null) {
          throw new TypeError("Array.from requires an array-like object - not null or undefined");
        }

        // 4. If mapfn is undefined, then let mapping be false.
        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;
        if (typeof mapFn !== 'undefined') {
          // 5. else
          // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          }

          // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
          if (arguments.length > 2) {
            T = arguments[2];
          }
        }

        // 10. Let lenValue be Get(items, "length").
        // 11. Let len be ToLength(lenValue).
        var len = toLength(items.length);

        // 13. If IsConstructor(C) is true, then
        // 13. a. Let A be the result of calling the [[Construct]] internal method
        // of C with an argument list containing the single item len.
        // 14. a. Else, Let A be ArrayCreate(len).
        var A = isCallable(C) ? Object(new C(len)) : new Array(len);

        // 16. Let k be 0.
        var k = 0;
        // 17. Repeat, while k < len… (also steps a - h)
        var kValue;
        while (k < len) {
          kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
          k += 1;
        }
        // 18. Let putStatus be Put(A, "length", len, true).
        A.length = len;
        // 20. Return A.
        return A;
      };
    }());
  }
}
export let registryFill = () => {
  if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, 'fill', {
      value: function (value) {
        // Steps 1-2.
        if (this == null) {
          throw new TypeError('this is null or not defined');
        }

        var O = Object(this);

        // Steps 3-5.
        var len = O.length >>> 0;

        // Steps 6-7.
        var start = arguments[1];
        var relativeStart = start >> 0;

        // Step 8.
        var k = relativeStart < 0 ?
          Math.max(len + relativeStart, 0) :
          Math.min(relativeStart, len);

        // Steps 9-10.
        var end = arguments[2];
        var relativeEnd = end === undefined ?
          len : end >> 0;

        // Step 11.
        var final = relativeEnd < 0 ?
          Math.max(len + relativeEnd, 0) :
          Math.min(relativeEnd, len);

        // Step 12.
        while (k < final) {
          O[k] = value;
          k++;
        }

        // Step 13.
        return O;
      }
    });
  }
}
export let registrySome = () => {
	if (!Array.prototype.some) {
		Array.prototype.some = function(fun/*, thisArg*/) {
			'use strict';
			if (this == null) {
				throw new TypeError('Array.prototype.some called on null or undefined');
			}
			if (typeof fun !== 'function') {
				throw new TypeError();
			}
			var t = Object(this);
			var len = t.length >>> 0;
			var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
			for (var i = 0; i < len; i++) {
				if (i in t && fun.call(thisArg, t[i], i, t)) {
				return true;
				}
			}
			return false;
		};
	}
}

/**
 * 来源code2name
 */
export let crmName = (code) => {
  if(!code) return '';
  return JSON.parse(localStorage.getItem('10041')).crmList.filter(i => i.id == code)[0].name;
}

/**
 *  获取带#号的浏览器的参数的值
 * @return {Sring}
 */
export let getQueryParamSharp = function (name) {
  let regParam = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let regHref = window.location.href;

  let numParam = regHref.indexOf("?");
  regHref = regHref.substr(numParam + 1); //问号后面的参数
  regHref = regHref.match(regParam)[2];
  if (isWeixin()) {
    regHref = decodeURIComponent(decodeURIComponent(regHref)); //解码中文
  } else {
    regHref = decodeURIComponent(decodeURIComponent(regHref)); //解码中文
  }
  let getFinalvalue = regHref != null ? regHref : null;
  return getFinalvalue;
}
/** */
export let isCardNo = function (card) {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(card) === false) {
    return false;
  }
  return true
}

//获取车辆库存状态，返回String

export let kcName = (code) => {
  if(!code){
    return '';
  }
  return JSON.parse(localStorage.getItem('10041')).fcList.filter(i => i.code == code)[0].codeName;
}
/**
 * emoji表情检测
 */
export let emojiTest = (str) => {
  return /([\u00A9\u00AE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9-\u21AA\u231A-\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA-\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614-\u2615\u2618\u261D\u2620\u2622-\u2623\u2626\u262A\u262E-\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665-\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B-\u269C\u26A0-\u26A1\u26AA-\u26AB\u26B0-\u26B1\u26BD-\u26BE\u26C4-\u26C5\u26C8\u26CE-\u26CF\u26D1\u26D3-\u26D4\u26E9-\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733-\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934-\u2935\u2B05-\u2B07\u2B1B-\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70-\uDD71\uDD7E-\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01-\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50-\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96-\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF])|(\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F-\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95-\uDD96\uDDA4-\uDDA5\uDDA8\uDDB1-\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB-\uDEEC\uDEF0\uDEF3-\uDEF6])|(\uD83E[\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0])/g.test(str);
}

/**
 * 深拷贝
 */
 export let copy = (data) => {
   return JSON.parse(JSON.stringify(data))
 };

 export let eptToStr = (str = '') =>{
  if((str+'').length) return str+'';
  return '';
 }
/**
 * 日期格式 yyyy/mm/dd
*/
export const formatDateString = (str = '') => {
  return str.replace(/\-/g, '/');
}
// 处理urlSearch
export const handUrl = function (str, type) {
  let outPut = '';
  str = str.slice(1);
  str.split('&').forEach(item => {
    var arr = item.split('=');
    if (arr[0] == type) {
      outPut = arr[1]
    }
  });
  return outPut;
}