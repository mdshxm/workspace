// import api from '@/api'

// import { Message } from 'iview';
const toUpperCase = word => `set${word.substring(0, 1).toUpperCase() + word.substring(1)}`;
let keys = {}
const initApi = p => {
    keys = p
}
const STATE = {
    data: {},//搜索参数
    total: 0,//总条数
    page: 1,//当前页
    pageSize: 10,//每页条数
    list: [],//当前列表
    details: {},//表单详情
    org: null,//当前组织，
    paramsId: "",//传入组件的查询id
    show: false
}
const ACTIONS = {
    // 初始化分页条件
    initPage({ commit }) {
        commit("setPage", 1);
        commit("setPageSize", 10)
    },
    // 获取列表数据
    async getLIist({ state, commit }) {
        let { data } = await api[keys.main][keys.getLIist]({
            queryParams: {
                page: state.page,
                pageSize: state.pageSize
            },
            data: state.data
        });
        if (data.code == 200) {
            commit("setList", data.data.records);
            commit("setTotal", data.data.total);
        } else {
            Message.success("获取失败,请重试！");
        }
    },
    // 搜索
    search({ dispatch }) {
        dispatch("initPage");
        dispatch("getLIist")
    },
    // 重置
    reset({ commit, dispatch }) {
        commit("setData", {})
        dispatch("initPage");
        dispatch("getLIist")
    },
    // 切换页面
    togglePage({ commit, dispatch }, index) {
        commit("setPage", index)
        dispatch("getLIist")
    },
    //切换每页条数
    togglePageSize({ commit, dispatch }, pageSize) {
        commit("setPage", 1);
        commit("setPageSize", pageSize);
        dispatch("getLIist")
    },
    // 获取当前组织
    async  getCurrentOrg({ commit }) {
        const data = await api.theme
            .getLocalOrgInfo({
                queryParams: { orgId: "" }
            })
        commit("setOrg", data.data);
        // this.sjdzzid = ;
    },
    //获取表单详情
    async  getDetails({ state, commit }) {
        const { data } = await api[keys.main][keys.getDetails]({
            pathParams: {
                id: state.paramsId
            }
        });
        if (data.code == 200) {
            commit("setDetails", data.data)
        } else {
            Message.success("获取失败,请重试！");
        }

    },
    // 删除该条
    async deleteItem({ state, commit, dispatch }, id) {
        let data = await api[keys.main][keys.deleteItem]({
            pathParams: {
                id: id
            }
        });
        if (data.status == 200) {
            Message.success("删除成功");
            if (state.list.length == 1 && state.list > 1)
                commit("setPage", state.page - 1);
            dispatch("getLIist")
        } else {
            Message.success("删除失败,请重试!!!");
        }
    },
    // 新增
    async addData({ state, commit, dispatch }) {
        const { data } = await api[keys.main][keys.addData]({
            data: state.details
        })
        if (data.code == 200) {
            commit("setShow", !state.show);
            dispatch("reset");
            Message.success("操作成功！");
        } else {
            Message.success("操作失败,请重试！");
        }
    },
    // 修改
    async updateData({ state, commit, dispatch }) {
        const { data } = await api[keys.main][keys.updateData]({
            data: state.details
        })
        if (data.code == 200) {
            commit("setShow", !state.show);
            dispatch("getLIist");
            Message.success("操作成功！");
        } else {
            Message.success("操作失败,请重试！");
        }

    }
}
const packaging = (params = STATE) => {
    let obj = {
        namespaced: true,
        getters: {},
        mutations: {},
        actions: {}
    }
    Object.keys(params).forEach(item => {
        obj.getters[item] = (state) => state[item];
        obj.mutations[toUpperCase(item)] = (state, p) => { state[item] = p }
    });
    obj.state = { ...STATE };
    obj.actions = { ...ACTIONS };
    return obj
}
export {
    initApi,
    packaging
}