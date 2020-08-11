<template>
  <div v-if="!menu.hidden">
    <el-menu-item
      :index="setCurTitle(menu).path"
      v-if="!menu.children||hasOneChildren(menu)"
      :key="setCurTitle(menu).path"
    >
      <i :class="menu.icon"></i>
      {{setCurTitle(menu).name}}
    </el-menu-item>
    <template v-else>
      <el-submenu :index="menu.path" :key="menu.path">
        <template slot="title">
          <i :class="menu.icon"></i>
          {{menu.name}}
        </template>
        <menu-item :menu="i" v-for="(i,k) in menu.children" :key="k" />
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    menu: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    hasOneChildren(menu) {
      if (menu.children && menu.children.length == 1) {
        return true;
      }
      return false;
    },
    setCurTitle(menu) {
      if (!menu.children) {
        return menu;
      } else if (menu.children && menu.children.length == 1) {
        return menu.children[0];
      }
    },
  },
};
</script>
<style lang='scss' scoped>
</style>