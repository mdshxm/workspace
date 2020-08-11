<template>
  <el-container class="container">
    <el-aside class="aside" width="300px" style="background-color: rgb(238, 241, 246)">
      <Menu />
    </el-aside>
    <el-container class="container">
      <el-header>
        <Header />
      </el-header>
      <el-main class="content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "./menu";
import Header from "./Header";
export default {
  components: {
    Menu,
    Header,
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
.aside,
.content {
  overflow: auto;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>