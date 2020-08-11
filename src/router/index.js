import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui';

Vue.use(Router)


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/login.vue'),
  },
  // {
  //   path: '/layout',
  //   name: 'layout',
  //   component: () => import(/* webpackChunkName: "about" */ '@/views/layout'),
  //   children: [
  //     {
  //       path: '/',
  //       name: 'home',
  //       component: () => import(/* webpackChunkName: "about" */ '@/views/Home'),
  //     }
  //   ]
  // },
]
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export {
  routes
}

router.beforeEach((to, from, next) => {
  if (to.name == "login") {
    next()
  } else {
    if (sessionStorage.getItem("token")) {
      if (to.name) {
        next()
      } else {
        Message.error("页面未授权，请授权后再操作！")
      }

    } else {
      next("/login")
    }
  }


})

export default router
