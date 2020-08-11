<template>
  <div class="login">
    <el-card class="login-content">
      <el-form ref="form" :model="data" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="data.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="data.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="rememberMe">记住我</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button round type="primary" @click="onSubmit">登录</el-button>
          <!-- <el-link type="primary">忘记密码</el-link> -->
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      rememberMe: false,
      data: {
        username: "",
        password: "",
        code: "",
      },
    };
  },
  methods: {
    ...mapActions(["getTokenData", "getUerInfo", "getAuthList", "getMenus"]),
    async onSubmit() {
      try {
        await this.getTokenData();
        await this.getUerInfo();
        await this.getAuthList();
        await this.getMenus();
        this.$nextTick(() => {
          this.goNextPage();
        });
      } catch (error) {
        console.log(error);
      }
    },
    goNextPage() {
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url("../assets/image/bg3.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  &-content {
    width: 400px;
  }
}
</style>