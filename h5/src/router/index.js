import Router from 'vue-router'
import Vue from "vue";
const test = reslove => require(['@/pages/test'],reslove);

Vue.use(Router)
const router = new Router({
  mode: 'hash',
  // mode: 'history',
  // base:"/cx/cxj/cxjappweb/yearFeedback",
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test
    },
  ]
})

export default router
