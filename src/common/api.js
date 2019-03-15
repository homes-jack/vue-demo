import ajax from './ajax'
import qs from 'qs'
const baseUrl = {
  serverLmp: {
    dev: 'http://testdms.maxuscloud.cn/ampService',
    uat: 'https://test34.maxuscloud.cn/ampService',
    production: 'https://xyx.saicmaxus.com/ampService',
    sitb: 'https://test102.maxuscloud.cn/ampService'
  },
  authUrl: {
    dev: 'http://testdms.maxuscloud.cn/auth',
    uat: 'https://test34.maxuscloud.cn/auth',
    production: 'https://xyx.saicmaxus.com/auth',
    sitb: 'https://test102.maxuscloud.cn/auth'
  }
}

export const getUrlParams = (param) => {
  return qs.stringify(param)
}

export const selectPermissionListAppCode = async (param = {}, config = {
  dev: 'origin'
}) => await ajax.get(`${url[process.env.NODE_ENV] || ''}/menu/resource/selectPermissionByAppCode`, param, config)

//活动列表查询
export const postQueryActivityList = async (param = {}, config = {}) =>
await ajax.post(`${baseUrl.serverLmp[process.env.NODE_ENV] || ''}/activityWebController/queryActivityListByParam`, param, config)