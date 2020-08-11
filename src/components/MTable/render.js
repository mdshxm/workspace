import publicMethod from './mixins/publicMethod';
export default {
  extends: publicMethod,
  props: {
    // 当前cell配置
    config: {
      type: Object,
      default: () => ({})
    },
    // 当前行数据
    data: {
      type: Object,
      default: null
    }
  },
  render(h) {
    // 表头渲染
    if (!this.data) {
      return this.config.renderHeader(h)
    }
    // 表体render渲染
    if (this.config.render) {
      return this.config.render(h, this.data)
    }
    // 正常渲染
    return <div style="display: inline-block;">{this.eval(this.config.prop)}</div>

  },
};



