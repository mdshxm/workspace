export default {
  methods: {
    // 获取当前数据
    eval(prop) {
      const result = eval("this.data." + prop);
      return result;
    }
  }

}