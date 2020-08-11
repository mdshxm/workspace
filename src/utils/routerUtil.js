import Router from 'vue-router'
import store from '../store'
import router, { routes } from '../router/index';
import layout from '@/layout';

// 路由懒加载
export function loadView(view) {
  // return resolve => require([`@/views/${view}`], resolve);
  return () => import(/* webpackChunkName: "about" */ `@/views/${view}`)
}

export function filterAsyncRouter(arr) {
  return arr.map(i => {
    if (i.children) {
      i.children = filterAsyncRouter(i.children)
    }
    if (i.component == "layout") {
      i.component = layout
    } else {
      i.component = loadView(i.component)
    }
    return i
  })
}

export const resetRouter = (route) => {
  router.matcher = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [...routes, ...filterAsyncRouter(route)]
  }).matcher;
}
export const initRouter = () => {
  if (store.state.menus && store.state.menus.length > 0) {
    resetRouter(JSON.parse(JSON.stringify(store.state.menus)));
  }
}
