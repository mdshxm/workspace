<template>
  <el-menu router :default-active="defaultActive" @select="onSelect">
    <menu-item :menu="menu" v-for="(menu,k) in menus" :key="k" />
  </el-menu>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import MenuItem from "./MenuItem";
export default {
  components: { MenuItem },
  computed: {
    ...mapGetters(["menus", "defaultActive"]),
  },
  mounted() {
    console.log(this.$route.path);
    this.setDefaultActive(this.$route.path);
  },
  methods: {
    ...mapMutations(["setDefaultActive"]),
    onSelect(index) {
      this.setDefaultActive(index);
    },
  },
};
</script>

<style  lang="scss" scoped>
</style>