import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'reset.css'
import 'mint-ui/lib/style.css'
import router from './router'
import 'animate.css'
import './assets/font/iconfont.css';
import {
  vuemaxusstore,
  vuemaxus
} from "./vuemaxus";
import maxusdata from "./maxusdata";
import "@/common/filter"
// import VConsole from "vconsole"
// 移动端调试
  // var vConsole = new VConsole()
// import attachFastClick from "fastclick"
// attachFastClick.attach(document.body)
// FastClick.attach(document.body);

Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(vuemaxus)

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  vuemaxusstore: vuemaxusstore(maxusdata),
  template: '<App/>'
})
