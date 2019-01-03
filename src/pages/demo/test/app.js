import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './app.vue'
import '../../../assets/css/reselt.css';
import 'es6-promise/auto'
import {registryFind,registryIncludes,registryFrom,registryFilter,registerFindIndex} from '../../../common/utils';
registryFind();
registryIncludes();
registryFrom();
registryFilter();
registerFindIndex();

Vue.use(ElementUI)
new Vue({
  el: '#app',
  render: h => h(App)
})
