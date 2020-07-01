export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    render(h) {
      return h("div", "11111");
    }
  }
};


