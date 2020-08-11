<template>
  <div class="main">
    <div class="search"></div>
    <div class="content">
      <el-table :data="list" v-bind="tableConfig" v-on="$listeners">
        <el-table-column v-bind="i" v-for="(i,k) in tableColumn" :key="k">
          <template slot-scope="scope">
            <render :config="i" :scope="scope" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :layout="layout" :total="1000" v-bind="paginationConfig" v-on="$listeners"></el-pagination>
    </div>
  </div>
</template>
  
<script>
import render from "./render";
export default {
  components: { render },
  props: {
    // 接口参数
    params: {
      type: Object,
      default: () => ({}),
    },
    // 表格配置项
    tableConfig: {
      type: Object,
      default: () => ({}),
    },
    // 分页配置项
    paginationConfig: {
      type: Object,
      default: () => ({}),
    },
    // 列配置项
    tableColumn: {
      type: Array,
      default: () => [],
    },
    // 分页布局配置
    layout: {
      trpe: String,
      default: "sizes,prev, pager, next",
    },
  },
  data() {
    return {
      list: [],
      paramsData: {},
    };
  },
  mounted() {
    this.getListData();
  },
  methods: {
    async getListData() {
      this.$emit("getListData", this.callback);
    },
    callback(list) {
      this.list = list;
    },
  },
  watch: {
    params: {
      handler(v) {
        this.paramsData = v;
      },
      deep: true,
    },
    paramsData(v) {
      this.$emit("input", v);
    },
  },
};
</script>
<style lang="sass" scoped>

</style>
