<template>
  <table class="table">
    <thead>
      <tr v-for="(_item,_key) in table" :key="_key">
        <th v-for="(item,key) in _item" :key="key" :colspan="item.rowspan">{{item.title}}</th>
      </tr>
    </thead>
    <tbody>
      <!-- <template v-if="data||data.length>0">
        <tr></tr>
        <template v-for="(item,index) in data" :key="index">
          <tr v-if="item.ch"></tr>
        </template>
      </template>
      <template v-else>
        <tr>暂无数据</tr>
      </template>-->
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    columns: Array,
    data: Array
  },
  data() {
    return {
      table: [],
      index: 0
    };
  },
  computed: {},
  methods: {
    getRowspan(item) {
      return item.children && item.children.length > 0 ? item.children : 0;
    },
    getTable(array) {
      const newArray = array.map(item => {
        if (item.children && item.children.length > 0) {
          item.rowspan = item.children.length;
          this.getTable(item.children);
        }
        delete item.children;
        return item;
      });
      this.table.push(newArray);
      if (item.children && item.children.length > 0) {
        this.getTable(item.children);
      }
    }
  },
  mounted() {
    this.getTable(this.columns);
    console.log(this.table, "qqq");
  }
};
</script>

<style lang="scss" scoped>
.table {
  border: 1px solid #000000;
}
tr,
td,
th {
  @extend .table;
}
</style>