import ajax from './ajax'
import qs from 'qs'
/*
* Todo 接口地址配置 andriod ios 下载地址配置*/
console.log('api',process.env.NODE_ENV)
let baseUrl = {
  serverA:{
    dev:"",
    sit: "https://test34.maxuscloud.cn/ampService/",
    uat: "http://testdms.maxuscloud.cn/ampService/",
    sitb: 'https://test102.maxuscloud.cn/ampService/',
    production:"https://xyx.saicmaxus.com/ampService/"
  },
  authUrl: {
    dev: '',
    sit: "https://test34.maxuscloud.cn/auth",
    uat: 'http://testdms.maxuscloud.cn/auth',
    sitb: 'https://test102.maxuscloud.cn/auth',
    production: 'https://xyx.saicmaxus.com/auth'
  },
  origin:{
    dev: '',
    sit: "https://test34.maxuscloud.cn",
    uat: 'http://testdms.maxuscloud.cn',
    sitb: 'https://test102.maxuscloud.cn',
    production: 'https://xyx.saicmaxus.com'
  }
};

//权限list
export const selectPermissionListAppCode = async (param = {}, config = {
  dev: 'origin'
}) => await ajax.get(`${baseUrl.origin[process.env.NODE_ENV] || ''}/menu/resource/selectPermissionByAppCode`, param, config)
