<template>
  <el-form ref="ruleForm" :inline="inline" :model="model" :label-width="labelWidth" :rules="rules">
    <slot>
      <FormItem
        :style="{width: _i.width||'33%'}"
        v-for="(_i,_k) in config"
        :key="_k"
        :label="_i.label"
        v-model="model[_i.prop]"
        :prop="_i.prop"
      ></FormItem>
    </slot>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import FormItem from "./FormItem";
export default {
  components: { FormItem },
  provide() {
    return { P_Form: this };
  },
  props: {
    config: Array,
    model: Object,
    inline: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: "100px"
    }
  },
  data() {
    return {
      rules: {}
    };
  },
  created() {
    this.rules = this.initRules();
  },
  methods: {
    initRules() {
      let rules = {};
      this.config.forEach(i => {
        rules[i.prop] = [
          {
            required:
              i.required && typeof i.required == "function"
                ? i.required()
                : i.required || false,
            message: `${i.label}不能为空！`,
            trigger: "blur"
          }
        ];
      });
      return rules;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    clearValidate(prop) {
      this.$refs["ruleForm"].clearValidate(prop);
    }
  },
  watch: {
    model: {
      handler(val) {
        this.rules = this.initRules();
        this.$nextTick(() => {
          this.clearValidate();
        });
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>