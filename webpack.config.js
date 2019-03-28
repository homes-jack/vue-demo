'use strict'
if(process.env.NODE_ENV!=='development'){

  console.log(`打包环境${process.env.NODE_ENV}`)
}
var assetsPublicPath={
  development:"/",
  dev: "http://testdms.maxuscloud.cn/web/amp/",
  uat: "https://test34.maxuscloud.cn/web/amp/",
  production: "http://39.104.176.9/hzh/",
  sitb: 'https://test102.maxuscloud.cn/web/amp/'
}
const { join, resolve } = require('path')
const webpack = require('webpack')
const glob = require('glob')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var MultipageWebpackPlugin = require('multipage-webpack-plugin')

const vueLoaderConfig = require("./vue-loader.js")
const utils = require("./vue-loader-utils")

const entries = {}
glob.sync('./src/pages/**/app.js').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('/app.js')[0]
  entries[chunk] = path
})
// glob.sync('./src/pages/activityapprovalprocess/reject/app.js').forEach(path => {
//   const chunk = path.split('./src/pages/')[1].split('/app.js')[0]
//   entries[chunk] = path
// })
// glob.sync('./src/pages/autoshow/edit/app.js').forEach(path => {
//   const chunk = path.split('./src/pages/')[1].split('/app.js')[0]
//   entries[chunk] = path
// })

let rulesArr = [
	{
		test: /\.vue$/,
		loader: 'vue-loader',
		options: vueLoaderConfig
  },
  {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /node_modules/,
    options: {
       appendTsSuffixTo: [/\.vue$/],
    }
  },
	{
		test: /\.js$/,
		use: 'babel-loader',
		exclude: /node_modules/
	},
	{
		test: /\.html$/,
		use: [{
			loader: 'html-loader',
			options: {
				root: resolve(__dirname, 'src'),
				attrs: ['img:src', 'link:href']
			}
		}]
	},
	{
		test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
		exclude: /favicon\.png$/,
		loader: 'url-loader',
		options: {
			limit: 10000,
			name: 'assets/img/[name].[hash:7].[ext]'
		}
	}
];

rulesArr = rulesArr.concat(utils.styleLoaders({sourceMap: true, usePostCSS: true}))

const config = {
  entry: entries,
  output: {
    path: resolve(__dirname, './hzh'),
    filename: 'assets/js/[name].js',
    publicPath: assetsPublicPath[process.env.NODE_ENV]
  },
  resolve: {
    extensions: ['.js', '.vue','.ts'],
    alias: {
      assets: join(__dirname, '/src/assets'),
      components: join(__dirname, '/src/components'),
      root: join(__dirname, 'node_modules'),
      '@': resolve('src')
    }
  },
  module: {
    rules: rulesArr
  },
  plugins: [
	  new webpack.optimize.ModuleConcatenationPlugin(),
    new MultipageWebpackPlugin({
      // replace [name] in template path
      htmlTemplatePath: resolve('./src/pages/[name]/app.html'),
      templateFilename: '[name].html',
      templatePath: './',
      // some other options in htmlWebpackPlugin
      htmlWebpackPluginOptions: {
        chunks: ['manifest', 'vendor', '[name]'],
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        hash: process.env.NODE_ENV === 'production'
      }
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: 8011,
    historyApiFallback: false,
    noInfo: true,
    proxy: {
      '/api':{
        target: 'https://test102.maxuscloud.cn/ampService',
        // target: 'http://10.64.58.76:8100',
        // target: 'http://testdms.maxuscloud.cn/ampService/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/auth': {
        target: 'https://test102.maxuscloud.cn/auth',
        // target: 'http://testdms.maxuscloud.cn/auth',
        changeOrigin: true,
        pathRewrite: {
          '^/auth': ''
        }
      },
      '/origin': {
        target: 'https://test102.maxuscloud.cn',
        // target: 'http://testdms.maxuscloud.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/origin': ''
        }
      },
      '/serverB':{
        target:'http://asd.asd.com1/',
        changeOrigin: true,
        pathRewrite: {
          '^/serverB': ''
        }
      },
      '/serverA':{
        target:'http://asd.baidu.com1/',
        changeOrigin: true,
        pathRewrite: {
          '^/serverA': ''
        }
      },


    },
    open: true,
    openPage: 'demo/test.html'
  },
  devtool: '#eval-source-map'
}

module.exports = config
let NODEENV= process.env.NODE_ENV;
module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${NODEENV}"`
      }
    })
  ])
if (NODEENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true,
      },
      output:{
        beautify: false,
        comments: false,
      },
      sourceMap: false
    }),
    new OptimizeCSSPlugin()
  ])
}
