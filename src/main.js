import Vue from 'vue'
import App from './components/App'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from './utils/http';
Vue.config.productionTip = false
Vue.use(ViewUI);
axios.install(Vue)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
