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
import Vue from "vue";
import {logUrl} from '@/common/api.js';
let vm = new Vue();
const URL_reg = /tSourceWebController|tFixCodeWebController|getAllSeries|queryOrgDtoListByParentOrgId|getPromotionPlanTemplateInfo|getNavRightMenuRight|getCurrentAndLastPersonInfo|selectPermissionListByAppCode|queryActivityListByParam|queryActSpreadPlanListByConditions|queryActChangeApprovalPageByParam|queryRegionByParentId|userMenuInfoList|queryActDealerList|getAuditHistoryDetail|deleteActivity|getMainMenuByUser|getBehaviors|querySourceListByPid|userService|getActAuditHistoryMain|queryActInfoChangeApprovalList|queryActDealerListPageByParam|getSecMenuByUser|selectPermissionByAppCode|queryByCodeType|queryActFlowByFlowNo|getTemplateInfo|querySourceListByPidAndType|userInfoController|queryActDealerVerificationListPageByParam|queryActDealerBudget/
const axiosIns = axios.create()
// 设置默认返回数据类型
// axiosIns.defaults.responseType = 'json'
// 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
axiosIns.defaults.validateStatus = function (status) {
  return true
}
// 前置序列化表单默认为false
axiosIns.defaults.isForm = false
localStorage.setItem('isModalShow', false);
    // axios 请求拦截器，前置登录
axiosIns.interceptors.request.use(function (config) {
  // 配置config
  if(config.token) {
    config.headers[config.token] = sessionStorage.getItem(config.token)
  }else {
    config.headers.xyx_jwt = sessionStorage.getItem('xyx_jwt')
    if (process.env.NODE_ENV === 'development') {
      config.headers.xyx_jwt = "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMDAwMDAwMDAwNDk4MyIsIm1heHVzVXNlcklkIjoxMzQ3OTQwLCJ1c2VyT3JnTmFtZSI6IuS_oemYs-W4guaxh-WvjOWkp-mAmuaxvei9pumUgOWUruacjeWKoeaciemZkOWFrOWPuCIsInVzZXJOYW1lIjoi5a-85YWl5rWL6K-VMTAiLCJ1c2VySWQiOjEwMDAwMDAwMDA1NjkwLCJwcmV2aW91c1VzZXJJZCI6MTAwMDAwMDAwMDQ5ODMsInVzZXJPcmdJZCI6MTAwMzc3NjIsIm1heHVzUHJldmlvdXNVc2VySWQiOjEyNDA4MTgsInVzZXJQb3NpdGlvbiI6IjEwNDExMDA3IiwiaXNNb2JpbGUiOjAsInByZXZpb3VzVXNlck5hbWUiOiLmnY7ot68iLCJwcmV2aW91c1VzZXJPcmdJZCI6MTAwMDAwMDEsInByZXZpb3VzVXNlclBvc2l0aW9uIjoiMTAwODEwNjkiLCJleHAiOjE1NDU5NzMzOTcsImNsYXNzIjoiY29tLnNtY3YubWF4dXMuYXV0aC5lbnRpdHkuWHl4Snd0VXNlckNsYWltcyIsImlhdCI6MTU0NTM2ODU5NywianRpIjoiYjQwOTliZDYtMzM0Yy00YzlmLWJlOGQtNmUzYmU3NzZkMjliIiwicHJldmlvdXNVc2VyT3JnTmFtZSI6IuS4iuaxveWkp-mAmiJ9.HvZhp3HU4uwKybH3PR4kd0AtXPpjH-FrQyB9jgU-MdjygoQvHuvo062-hp47UkxfVr_y05bMAfUbExZyTvlkGzZO1TCgP6eNsRqCyrqe2p-glD5f9s0HCunZqwyNOGEIIOF5A_TqSjoIWspPivkGhpNLef2EGa99QbacSGBMjhg";
    }
  }

  if (!URL_reg.test(config.url)) {
    localStorage.setItem('isModalShow', true);
  }

  // config.headers.Accept = 'application/json'
  const configs = config.data || {}
  if (config.isForm || configs.isForm) {
    config.transformRequest = [function (data) {
      return JSON.stringify(data)
    }]
  }
  return config
})

// axios 响应拦截器，状态码判断
axiosIns.interceptors.response.use(function (response) {
  if (!URL_reg.test(response.config.url)) {
    localStorage.setItem('isModalShow', false);
  }
  const status = response.status
  if (status === 200) {
    return Promise.resolve(response)
  } if (status == 401){
    vm.$message({showClose: true,message: "账号过期,将在3S后自动跳转至登录页面", type: 'error'});
    if (process.env.NODE_ENV != 'development') {
      setTimeout(() => {
        window.location.href = logUrl
      }, 3000)
    }
    return Promise.reject(response)
  }else if ( status == 403 ){
    vm.$message({showClose: true,message: "没权限，请重新登录", type: 'error'});
    if (process.env.NODE_ENV != 'development') {
      setTimeout(() => {
        window.location.href = logUrl
      }, 1000)
    }
    return Promise.reject(response)
  }else if (status == 400 || status == 500){
    vm.$message({showClose: true,message: "后台服务器开小差，请稍后重试", type: 'error'});
    return Promise.reject(response)
  }else {
    vm.$message({showClose: true, message: "后台服务器开小差，请稍后重试", type: 'error'});
    return Promise.reject(response)
  }
})

/*
 * @desc 封装请求接口
 * @param url {string}
 * @param data {object}
 * @param config {object} 配置文件
 */
const ajaxMethod = ['get', 'post']
const api = {}
ajaxMethod.forEach((method) => {
    // 数组取值的两种方式
  api[method] = async(url, data, config) => {
    if (process.env.NODE_ENV === 'development') {
      if (config.dev) {
        axiosIns.defaults.baseURL = `/${config.dev}`
      } else {
        axiosIns.defaults.baseURL = '/api'
      }
    }
    return new Promise(function (resolve, reject) {
      let data_ = {}
      if (method === 'get') {
        data_.params = data
      } else {
        data_ = data
      }
      if (config) {
        Object.keys(config).forEach(key => {
          if(key !== 'dev' && (typeof data_ == 'object')) {
            data_[key] = config[key]
          }
        })
      }
      axiosIns[method](url, data_, config).then((response) => {
                /* 根据后台数据进行处理
                 *code===200   正常数据+错误数据     code!==200   网络异常等
                 */
        resolve(response)
      }).catch((err) => {
        console.error(err)
        reject(err)
      })
    })
  }
})

export default api