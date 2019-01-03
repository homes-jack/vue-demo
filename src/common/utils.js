import { rejects } from "assert";

/**
 * 判断是否是微信
 * @return {Boolean}
 */
export const isWeixin = function () {
  const _userAgent = window.navigator.userAgent
  if (_userAgent.toLowerCase().match(/MicroMessenger/i) === 'micromessenger') {
    return true
  } else {
    return false
  }
}
/**
 * 通过数id来进行分页
 */


 /**
 *  获取带浏览器的参数的值
 * @return {Sring}
 */
export let getUrlParam = function (name) {
  let regParam = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let regHref = window.location.href;

  let numParam = regHref.indexOf("?");
  regHref = regHref.substr(numParam + 1); //问号后面的参数
  regHref = decodeURIComponent(regHref);
  regHref = regHref.match(regParam);
  let getFinalvalue = regHref != null ? unescape(regHref[2]) : null;
  return getFinalvalue;
}

// 处理urlSearch
export let handUrl = function (str, type) {
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

// 补0
export let fillZero = function (n, l = 2) {
  n = n + '';
  while (n.length < l) {
    n = '0' + n
  }
  return n;
}

// 处理日期
export let handDate = function (time, str = "yyyy-MM-dd") {
  if (!time) return '';
  let t = '';
  if (time instanceof Date) {
    t = time;
  } else {
    if (!(typeof time == 'number')) {
      time = time.replace(/ /, 'T')
    }
    if (/\+/g.test(time)) {
      let flag = Date.parse(time)
      time = time.split('+')[0];
      time = new Date(time).setHours(new Date(time).getHours()+8);
    }
    t = new Date(time);
  }

  let y = t.getFullYear() || '1970';
  let M = fillZero(t.getMonth() + 1) || '01';
  let d = fillZero(t.getDate()) || '01';
  let h = fillZero(t.getHours()) || '07';
  let m = fillZero(t.getMinutes()) || '00';
  let s = fillZero(t.getSeconds()) || '00';
  let S = fillZero(t.getMilliseconds(), 3) || '000';
  // console.log(y,M,d,h,m,s,S);
  return str.replace(/yyyy/g, y).replace(/MM/g, M).replace(/dd/g, d).replace(/hh/g, h).replace(/mm/g, m).replace(/ss/g, s).replace(/SS/g, S);
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
          return function from(arrayLike /*, mapFn, thisArg */ ) {
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
export let registryIncludes = ()=> {
    if (!String.prototype.includes) {
        String.prototype.includes = function (search, start) {
            'use strict';
            if (typeof start !== 'number') {
                start = 0;
            }

            if (start + search.length > this.length) {
                return false;
            } else {
                return this.indexOf(search, start) !== -1;
            }
        };
    }
}

export let registryFind = ()=> {
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
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
          // d. If testResult is true, return kValue.
          var kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue;
          }
          // e. Increase k by 1.
          k++;
        }

        // 7. Return undefined.
        return undefined;
      }
    });
  }
}

// 图片转base64
export let tobase64 = (image) => {
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;

	var ctx = canvas.getContext("2d");
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	var dataURL = canvas.toDataURL();
	canvas = null;
	return dataURL
}
export let imgToBase64 = (imgUrl) => {
	return new Promise((response,reject)=>{
		var image = new Image();
        image.crossOrigin = '';
        console.log('onload');
		image.onload = function () {
            console.log('img-loaded')
			let dataURL = tobase64(image);
			response(dataURL);
		}
		image.src = imgUrl;
	})
}
export let downloadImage = (file) => {
    // imgToBase64(file.fileUrl).then(res => {
    //     download(res, file.fileName);
    // })
	if (!file.fileUrl) return;
	var x=new XMLHttpRequest();
	x.open("GET", file.fileUrl, true);
	x.responseType = 'blob';
	x.onload=function(e){download(x.response, file.fileName ); }
	x.send();
}
export let clone = (data) => {
  return JSON.parse(JSON.stringify(data))
}
//C端活动-投放费用  指标数合计
export let custAll = (arr) => {
	let arrList = clone(arr);
	let cust = 0;
	let tagAll = [];
	if (arrList.length == 0) {
		return {
			cust,
			tagAll
		}
	}
	arrList.forEach(item => {
		cust += item.applyAmount - 0;
		if (item.actMediaPutIndexDtoList.length == 0) return;
		item.actMediaPutIndexDtoList.forEach(tag => {
			let ind = tagAll.findIndex(i => i.indexType == tag.indexType)
			if (ind == -1) {
				tag.indexNumber -= 0;
				tagAll.push(tag)
			} else {
				tagAll[ind].indexNumber += tag.indexNumber - 0
			}
		})
	});
	return {
		cust,
		tagAll
	}
}
//el-table 滚动条7px
let elTableHeight = 0;
export const resetTable = () => {
	if(!/WebKit/g.test(navigator.userAgent)) return;
  let elt = document.querySelector('.el-table__fixed-right');
	if(elt) {
		setTimeout(()=>{
			if(elTableHeight == elt.clientHeight) {
				return;
			}
			elt.style.height = elt.clientHeight + 7 +'px';
			elTableHeight = elt.clientHeight;
		})
	}else {
		setTimeout(()=>{
			resetTable();
		},50)
	}
}
let elTableWidth = 0;
export const resetTableY = () => {
	if(!/WebKit/g.test(navigator.userAgent)) return;
  let elt = document.querySelector('.el-table__body-wrapper table');
	if(elt) {
		setTimeout(()=>{
			if(elTableWidth == elt.clientWidth) {
				return;
			}
			elt.style.width = elt.clientWidth + 7 +'px';
			elTableWidth = elt.clientWidth;
		})
	}else {
		setTimeout(()=>{
			resetTable();
		},50)
	}
}