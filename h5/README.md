# vue移动端（上汽大通）
vue 移动端单页项目

# vue

> vue+webpack+mintui 单页项目

[![node version](https://img.shields.io/badge/node.js-%3E=_6.00-green.svg?style=flat-square)](http://nodejs.org/download/)
# 安装启动

#### 安装Node
推荐安装最新的 `LTS` 版本Node，如果本地没有安装Node或安装了低版本的Node，可以按下面的指引安装最新版的Node：

1. **Windows系统**，访问[https://nodejs.org/](https://nodejs.org/)，下载最新的 `LTS` 版本Node，点击默认安装即可。
2. **Mac系统**安装方式跟Windows一样。
3. **Linux系统**，推荐使用源码安装方式，这样无需自己配置 `path`，如果无法用源码安装，也可以直接二进制版本的Node，解压后把里面的bin目录路径加到系统的 `PATH` 即可：
	- **源码安装**：从[Node官网](https://nodejs.org/en/download/)下载最新版的**Source Code**(或者用`wget`命令下载)，解压文件(`tar -xzvf node-xxx.tar.gz`)，进入解压后的根目录(`node-xxx`)，依次执行`./configure`、`./make`和`./make install`。
	- **直接用二进制版本**：从[Node官网](https://nodejs.org/en/download/)下载最新版的**Linux Binaries**(或者用`wget`命令下载)，解压文件(`tar -xzvf node-xxx.tar.gz`)，解压后将Node二进制文件的bin目录完整路径加到系统的 `PATH`。

Node安装完成后，在命令行执行 `node -v` 查看下对应的Node版本是否安装成功：

	$ node -v
	v8.9.4
我们可以使用淘宝镜像：

	npm install cnpm -g --registry=https://registry.npm.taobao.org

## Build Setup

``` bash
# install dependencies
npm install 
or
cnpm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
## 打包
```js
sit环境的包
npm run sit

生产环境的包
npm run  build
```


## Root Folder Structure


###########目录结构描|--  
|-- Readme.md------------------------------------->help  
|-- src------------------------------------------->根目录  
|--     |-- assets---------------------------------->静态资源文件    
|--     |-- common--------------------------------->公共方法  api  工具类  
|--     |-- components----------------------------->组件(包含基本组件和业务组件)  
|--     |-- pages ---------------------------------->页面  有组件组成  
|--     |-- router -------------------------------->路由  (主要用一级路由)
|--     |-- components----------------------------->组件(包含基本组件和业务组件)  
|--     |-- store  -------------------------------->数据通信，组件共享(可以改用公司内部的，目前还没有)       
│   └── app.vue ------------------------------->根根组件  
├── build  ------------------------------------> webpack 配置  </br>  
│──  config ----------------------------------->上产环境开发，环境,接口代理  
├── dist   ------------------------------------> 打包后的目录  
├── static ------------------------------------>第三方库  
├── .babelrc----------------------------------->es6转es5 使用新特性,代码兼容  
|___ package.json------------------------------>项目运行，开发依赖包等等  
|——— .gitignore-------------------------------->git 忽略文件  
# 组件的封装的规范
公司前缀Smcv+组件名字  
组件结构 统一用 index.vue index.js  
导入的时候 import xxx from "@/components/xxx"  
引入mint-ui 的组件尽量不要直接使用 而是建议封装一层  



# page的书写规范
``` bash
template lang="html">
    <div>
        <Heador :props="props"/>
        <Life/>
        <Footor/>
        <Navbar/>
    </div>
</template>

<script>
import Heador from "../public/header.vue"  
import Footor from "../public/footer.vue"  
import Product from "./product.vue"  
import Life from "./life.vue"  
export default {
    components: {
        Heador,  
        Life,  
        Footor,  
        Navbar,  
    },
    data(){  
      return{  
        props:{}  
      }  
    }  
    created:function(){  
      api().then((response)=>{  
          this.props = response.xxx;  
      });  
    }  
}  
</script>

业务逻辑，api的调用尽量放在 page里面 组件的数据来自page，实现解耦
详情看 components/Hello/index.vue
``` 
#配置接口代理
``` bash
 静态资源文件夹
    assetsSubDirectory: 'static',
 发布路径
    assetsPublicPath: '/',

 代理配置表，在这里可以配置特定的请求代理到对应的API接口
 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
 代理可以配置多个 如下例子
    proxyTable: {
      '/api': {
        target: 'www.example.com/', -------------------> 接口的域名
        secure: false,   ------------------------------>如果是https接口，需要配置这个参数
        changeOrigin: true, ---------------------------> 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/api': ''
        }
      },
	  '/api1': {
        target: 'www.example1.com/', -------------------> 接口的域名
        secure: false,  --------------------------------> 如果是https接口，需要配置这个参数
        changeOrigin: true,  ---------------------------> 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/api1': ''
        }
      }
    },
```



