/* =====================================================================
 * @desc 封装请求接口
 * @param uri {string}
 * @param data {object} post直接传值，get添加params字段{params:{字段1:值}}
 * @param config {object} 配置文件
 * @autor zhangweidong
 * =====================================================================
 * 1 根据process.env.NODE_ENV 获取对应的apiDomain
 * 2 处理ajax库axios，为了以后不重复引用，挂在原型对象上
 * 3 组件里面使用this.$axios.get/post(url,data,config)
 * 4 config参数如有需要可以参照https://www.kancloud.cn/yunye/axios/234845，或axios官网自己配置
 * 5 前置登录请在config里配置 isCheckLogin:true
 * 6 请求数据序列化，如果需要请在config传入{isForm:true}
 *----------------------------------------------------------------------
 * （1）post/get 例子
    this.$ajax.post("/user/checkLogin.htm", {id:2222}
    ).then((res)=>{
        console.log(res.data)
    })
 *---------------------------------------------------------------------
 */

import axios from 'axios';
// import '../assets/Maxus.js'
import {getNowFormatDate,JW_token} from "./utils.js";


let axiosIns = axios.create();
//设置默认返回数据类型
axiosIns.defaults.responseType = 'json';

axiosIns.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest', "accept": "*/*",
  // "connection": "Keep-Alive",
  "appKey": "clm",
  "version": "1",
  "format": "json",
  "signatureMethod": "md5",
  "signature": "",
  "common": "Authorization",
  'X-Custom-Header': 'foobar',
};

//定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
axiosIns.defaults.validateStatus = function (status) {
  return true;
};
//前置序列化表单默认为false
axiosIns.defaults.isForm = false
//axios 请求拦截器，前置登录
axiosIns.interceptors.request.use(function (config) {
  config.headers.xyx_jwt = sessionStorage.getItem('xyx_jwt');
  if (process.env.NODE_ENV === 'dev' && !navigator.userAgent.match(/Joywok/i)) {
    config.headers.xyx_jwt = "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMDAwMDAwMDAwNTI3OCIsIm1heHVzVXNlcklkIjoxMjQwNzk3LCJ1c2VyT3JnTmFtZSI6IuS4iuaxveWkp-mAmiIsInVzZXJOYW1lIjoi6IOh5b-X5rWpIiwidXNlcklkIjoxMDAwMDAwMDAwNTI3OCwicHJldmlvdXNVc2VySWQiOm51bGwsInVzZXJPcmdJZCI6MTAwMDAwMDEsIm1heHVzUHJldmlvdXNVc2VySWQiOm51bGwsInVzZXJQb3NpdGlvbiI6IjEwMDgxMDAzIiwiaXNNb2JpbGUiOjAsInByZXZpb3VzVXNlck5hbWUiOm51bGwsInByZXZpb3VzVXNlck9yZ0lkIjpudWxsLCJwcmV2aW91c1VzZXJQb3NpdGlvbiI6bnVsbCwiZXhwIjoxNTQ1Mzc5ODIzLCJjbGFzcyI6ImNvbS5zbWN2Lm1heHVzLmF1dGguZW50aXR5Llh5eEp3dFVzZXJDbGFpbXMiLCJpYXQiOjE1NDQ3NzUwMjMsImp0aSI6IjNiZWE0ZTgyLWI3MGMtNDgyMS1iZGYxLTBhZDhhNmEwMDNkYSIsInByZXZpb3VzVXNlck9yZ05hbWUiOm51bGx9.W8d_0MiTz1FQxDsTv5jIVch2vInl25JZ54wJ8v7Mha6uGeLEKyYkW5-LwSBh-30dh9cI9INQc3vw2aDeHyiJ4VriKdJ70I0JmadVmrB7ghNUh0bWX7aN0koLSn6aaFaht0P0CL7BKfBhIwAz5k6plYe1JRBRbgTjFh1iZuCZsrA";
  }
  config.headers.Accept = 'application/json';
  const configs = config.data || {}
  if (config.isForm || configs.isForm) {
    config.transformRequest = [function (data) {
      return JSON.stringify(data);
    }];
  }
  return config;
});
//axios 响应拦截器，状态码判断
axiosIns.interceptors.response.use(function (response) {
  // console.log('maxusdata_userId',maxusdata.maxusUserId)
  let datas = response.data;
  let status = response.status;
  if (status === 200) {
    return Promise.resolve(response);
  } else if(status == 401 || status == 403) {
    return Promise.reject(response);
  }else {
    return Promise.reject(response);
  }
});
/*
 * @desc 封装请求接口
 * @param url {string}
 * @param data {object}
 * @param config {object} 配置文件
 */
let ajaxMethod = ['get', 'post']
let api = {};
ajaxMethod.forEach((method) => {
  //数组取值的两种方式
  api[method] = async (url, data, config) => {
    if (process.env.NODE_ENV == 'dev') {
      if (config.dev) {
        axiosIns.defaults.baseURL = `/${config.dev}`
      } else {
        axiosIns.defaults.baseURL = '/api'
      }
    }
    return new Promise(function (resolve, reject) {
      let data_ = {};
      if (method == "get") {
        data_.params = data
      } else {
        data_ = data;
      }
      axiosIns[method](url, data_).then((response) => {
        /*根据后台数据进行处理
         *code===200   正常数据+错误数据     code!==200   网络异常等
         */
        resolve(response)

      }).catch((err) => {
        console.error(err);
        reject(err);
      });
    })
  }
});

export default api
