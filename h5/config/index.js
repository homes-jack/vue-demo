'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
/*
* Todo 静态资源地址配置*/
let assetsPublicPath = {
  dev: "",
  sit: "https://test34.maxuscloud.cn/web/ampApp/",
  uat: "http://testdms.maxuscloud.cn/web/ampApp/",
  sitb: 'https://test102.maxuscloud.cn/web/ampApp/',
  production: "https://xyx.saicmaxus.com/web/ampApp/",
};
console.log('config',process.env.NODE_ENV)
// https://xyx.saicmaxus.com/web/km/
//https://test34.maxuscloud.cn/km  assetsRoot['dev']


const path = require('path')
module.exports = {
  dev: {
    env: require('./dev.env'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/', //publicPath: assetsPublicPath[process.env.NODE_ENV]
    proxyTable: {
      '/api': {
        // target: 'https://test34.maxuscloud.cn/ampService',
        target: 'https://test102.maxuscloud.cn/ampService/',
        // target: 'http://testdms.maxuscloud.cn/ampService/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/auth': {
        // target: 'https://test34.maxuscloud.cn/auth',
        target: 'https://test102.maxuscloud.cn/auth',
        // target: 'http://testdms.maxuscloud.cn/auth',
        changeOrigin: true,
        pathRewrite: {
          '^/auth': ''
        }
      },
      '/origin': {
        // target: 'https://test34.maxuscloud.cn',
        target: 'https://test102.maxuscloud.cn',
        // target: 'http://testdms.maxuscloud.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/origin': ''
        }
      },
    },

    // Various Dev Server settings
    host:'0.0.0.0', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    disableHostCheck:true,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../ampApp/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../ampApp'), //km
    assetsSubDirectory: "static",
    assetsPublicPath:assetsPublicPath[process.env.NODE_ENV],
    // 打包的时候不生成map文件 有效减小打包体积
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}



