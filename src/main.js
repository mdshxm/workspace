import './mock';
import Vue from 'vue'
import App from './App'
import _ from 'lodash';
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from './utils/http'
import directive from './utils/directive'
import 'element-ui/lib/theme-chalk/index.css'
import { initRouter } from './utils/routerUtil'
import path from 'path';

Vue.config.productionTip = false;

Vue.prototype._ = _

Vue.use(axios)
Vue.use(directive)
Vue.use(ElementUI);

//防止刷新页面空白
initRouter()


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
