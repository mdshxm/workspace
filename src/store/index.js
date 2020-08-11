import Vue from 'vue'
import Vuex from 'vuex'
import { resetRouter } from "@/utils/routerUtil";
import { axios } from '../utils/http';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem("token"),
    defaultActive: sessionStorage.getItem("defaultActive"),
    userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
    authList: JSON.parse(sessionStorage.getItem("authList")),
    menus: JSON.parse(sessionStorage.getItem("menus"))
  },
  mutations: {
    setToken: (state, token) => { state.token = token; sessionStorage.setItem("token", token) },
    setDefaultActive: (state, defaultActive) => { state.defaultActive = defaultActive; sessionStorage.setItem("defaultActive", defaultActive) },
    setUserInfo: (state, userInfo) => { state.userInfo = userInfo; sessionStorage.setItem("userInfo", JSON.stringify(userInfo)) },
    setAuthList: (state, authList) => { state.authList = authList; sessionStorage.setItem("authList", JSON.stringify(authList)) },
    setMenus: (state, menus) => { state.menus = menus; sessionStorage.setItem("menus", JSON.stringify(menus)) },
  },
  getters: {
    defaultActive: state => state.defaultActive,
    token: state => state.token,
    userInfo: state => state.userInfo,
    menus: state => state.menus
  },
  actions: {
    async getTokenData({ commit }) {
      const data = await axios("/login");
      if (data.status == 200) {
        commit("setToken", data.data.token)
      } else {
        Promise.reject(data.msg)
      }
    },
    async getUerInfo({ commit }) {
      const data = await axios("/getUerInfo");
      if (data.status == 200) {
        commit("setUserInfo", data.data.userInfo)
      } else {
        Promise.reject(data.msg)
      }
    },

    async getAuthList({ commit }) {
      const data = await axios("/getAuthList");
      if (data.status == 200) {
        commit("setAuthList", data.data)
      } else {
        Promise.reject(data.msg)
      }
    },

    async getMenus({ commit, state }) {
      const data = await axios("/getMenuList");
      if (data.status == 200) {
        commit("setMenus", data.data);
        resetRouter(JSON.parse(JSON.stringify(state.menus)));
      } else {
        Promise.reject(data.msg)
      }
    },

  },
  modules: {
  }
})
