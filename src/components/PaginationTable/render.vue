<script>
export default {
  props: {
    config: {
      type: Object,
      default: null,
    },
    scope: {
      type: Object,
      default: () => ({}),
    },
  },
  render(h) {
    return this.render ? (
      this.render(h, this.scope)
    ) : (
      <div>{this.getValues()}</div>
    );
  },
  methods: {
    getValues() {
      return eval(`this.scope.row.${this.config.prop}`);
    },
  },
};
</script>
