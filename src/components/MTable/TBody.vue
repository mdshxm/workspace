<template>
  <div>
    <table class="table">
      <col :width="i.width||'auto'" v-for="(i,k) in MTable.columns" :key="k" />
      <tr class="my-table-row">
        <td
          class="my-table-cell"
          :style="key==0?{'text-indent':`${textIndent}px`}:{}"
          v-for="(item,key) in $attrs.realColumns"
          :key="key"
        >
          <div style="width:14px;display:inline-block;text-indent:0">
            <template v-if="data.hasChildren&&!key">
              <i @click="handleChange(data)" v-if="data.show" class="el-icon-caret-bottom"></i>
              <i @click="handleChange(data)" v-else class="el-icon-caret-right"></i>
            </template>
          </div>
          <render :config="item" :data="data" />
        </td>
      </tr>
    </table>
    <template v-if="data.children&&data.children.length&&data.show">
      <TBody
        :data="row"
        v-for="(row,key) in  data.children"
        :key="key"
        :textIndent="textIndent + 15"
        :realColumns="$attrs.realColumns"
      />
    </template>
  </div>
</template>

<script>
import render from "./render";
import publicMethod from "./mixins/publicMethod";
export default {
  name: "TBody",
  inject: ["MTable"],
  components: { render },
  extends: publicMethod,
  props: {
    // 当前行数据
    data: {
      type: Object,
      default: () => ({})
    },
    // 有子级时间隔
    textIndent: {
      default: 0
    }
  },
  methods: {
    // 加载子级函数
    handleChange(row) {
      if (!row.show) {
        this.MTable.handleLoad(row);
      }
      this.$set(row, "show", row.show ? false : true);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./table.scss";
</style>