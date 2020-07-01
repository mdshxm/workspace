<template>
  <div>
    <input v-bind="$attrs" v-on="currentFun" @input="handleInput" />
  </div>
</template>

<script>
export default {
  name: "m-input",
  computed: {
    currentFun() {
      const result = {};
      for (let key in this.$listeners) {
        if (key != "input") {
          result[key] = this.$listeners[key];
        }
      }
      return result;
    }
  },
  methods: {
    handleInput(msg) {
      this.$emit("input", msg.target.value);
    }
  }
};
</script>
