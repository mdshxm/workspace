<template>
  <div class="content">
    <el-form-item v-bind="$attrs" :label="label" :prop="prop">
      <!-- 单选框 -->
      <template v-if="type=='radio'">
        <el-radio
          v-if="!$attrs.options"
          v-bind="$attrs"
          v-on="$listeners"
          v-model="newValue"
        >{{opt.text||opt.label}}</el-radio>
        <el-radio-group v-else v-bind="$attrs" v-model="newValue" v-on="$listeners">
          <el-radio v-for="(opt,k) in $attrs.options" v-bind="opt" :key="k">{{opt.text||opt.label}}</el-radio>
        </el-radio-group>
      </template>

      <!-- 多选框 -->
      <template v-else-if="type=='checkbox'">
        <el-checkbox
          v-if="!$attrs.options"
          v-bind="$attrs"
          v-on="$listeners"
          v-model="newValue"
        >{{opt.text||opt.label}}</el-checkbox>
        <el-checkbox-group v-else v-bind="$attrs" v-on="$listeners" v-model="newValue">
          <el-checkbox
            v-for="(opt,k) in $attrs.options"
            :key="k"
            v-bind="opt"
          >{{opt.text||opt.label}}</el-checkbox>
        </el-checkbox-group>
      </template>

      <!-- 计数器 -->
      <el-input-number
        v-on="$listeners"
        v-else-if="type=='input-number'"
        v-bind="$attrs"
        v-model="newValue"
      ></el-input-number>

      <!-- Select 选择器 -->
      <el-select v-on="$listeners" v-else-if="type=='select'" v-bind="$attrs" v-model="newValue">
        <el-option v-for="item in $attrs.options" v-bind="item"></el-option>
      </el-select>

      <!-- Cascader 级联选择器 -->
      <el-cascader
        v-on="$listeners"
        v-else-if="type=='cascader'"
        v-model="newValue"
        :options="$attrs.options"
      ></el-cascader>

      <!-- Switch 开关 -->
      <el-switch v-on="$listeners" v-else-if="type=='switch'" v-model="newValue" v-bind="$attrs"></el-switch>

      <!-- Slider 滑块 -->
      <el-slider v-on="$listeners" v-else-if="type=='slider'" v-model="newValue" v-bind="$attrs"></el-slider>

      <!-- TimePicker 时间选择器 -->
      <el-time-select
        v-on="$listeners"
        v-else-if="type=='time-select'"
        v-model="newValue"
        v-bind="$attrs"
      ></el-time-select>

      <!-- DatePicker 日期选择器 -->
      <el-date-picker
        v-on="$listeners"
        v-else-if="type=='date-picker'"
        v-model="newValue"
        v-bind="$attrs"
      ></el-date-picker>

      <!-- Rate 评分 -->
      <el-rate v-on="$listeners" v-else-if="type=='rate'" v-model="newValue" v-bind="$attrs"></el-rate>

      <!-- ColorPicker 颜色选择器 -->
      <el-color-picker
        v-on="$listeners"
        v-else-if="type=='color-picker'"
        v-model="newValue"
        v-bind="$attrs"
      ></el-color-picker>

      <!-- 输入框 -->
      <el-input v-else v-on="$listeners" v-bind="$attrs" v-model="newValue"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    prop: String,
    value: [String, Number, undefined, null],
  },
  data() {
    return {
      newValue: undefined,
    };
  },
  watch: {
    value(val) {
      this.newValue = val;
    },
    newValue(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: inline-block;
}
</style>