<template>
  <div>
    <table class="table" v-if="showHeader">
      <col :width="i.width||'auto'" v-for="(i,k) in realColumns" :key="k" />
      <tr class="my-table-head" v-for="(_i,_k) in newColumns" :key="'parent'+_k">
        <td
          class="my-table-cell my-table-head"
          v-for="(i,k) in _i"
          :key="'cell'+k"
          :rowspan="i.rowspan"
          :colspan="i.colspan"
        >
          <template v-if="!i.renderHeader">{{i.title}}</template>
          <render v-else :config="i" />
        </td>
      </tr>
    </table>
    <template v-if="data.length">
      <TBody :data="row" v-for="(row,key) in  data" :key="key" :realColumns="realColumns"></TBody>
    </template>
    <table class="table" v-else>{{emptyText}}</table>
  </div>
</template>

<script>
import TBody from "./TBody";
import mixins from "./mixins/tBody";
import render from "./render";
export default {
  components: { TBody, render },
  mixins: [mixins],
  provide() {
    return {
      MTable: {
        handleLoad: this.handleLoad
      }
    };
  },
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: () => []
    },
    emptyText: {
      type: String,
      default: "暂无数据"
    },

    columns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentData: {},
      realColumns: [] //绑定t-body/已加工无需处理
    };
  },
  mounted() {
  },
  methods: {
    // 异步加载回调
    handleLoad(row) {
      this.currentData = row;
      this.$emit("load", row, this.callback);
    },
    // 异步加载是参数拼接
    callback(data) {
      this.$set(this.currentData, "children", data);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./table.scss";
</style>