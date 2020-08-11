export default {
  computed: {
    newColumns() {
      return this.initHead();
    }
  },
  methods: {
    // 初始化表头
    initHead() {
      const newHead = this.initAllRow();
      newHead.forEach((i, k) => {
        this.initRowspan(i, newHead.length);
        if (k == 0) {
          // 设置表体prop
          this.realColumns = this.initColspan(i);
        } else {
          this.initColspan(i);
        }
      });
      return newHead;
    },

    initRowspan(header, row) {
      header.forEach(i => {
        if (!i.children) {
          i.rowspan = row - i.step + 1;
        }
      });
      return header;
    },

    initColspan(header) {
      let arr = [];
      const callback = (row = header) => {
        row.forEach(i => {
          const row = this.initColspan2(i);
          i.colspan = row.length;
          if (row && row.length) {
            arr = arr.concat(row);
          }
        });
      };
      callback();
      return arr;
    },

    initColspan2(header) {
      let arr = [];
      const callback = (row = header) => {
        if (!row.children) {
          arr.push(row);
        } else {
          row.children.forEach(i => {
            callback(i);
          });
        }
      };
      callback();
      return arr;
    },

    // 换算表头格式
    initAllRow(columns = this.columns) {
      let newColumns = [];
      let step = 1;
      const callback = i => {
        const curRow = this.getCurRow(i, step);
        if (curRow && curRow.length) {
          newColumns.push(curRow);
        }
        step++;
        if (curRow && curRow.length) {
          callback(curRow);
        }
      };
      callback(columns);
      return newColumns;
    },

    getCurRow(columns, step) {
      let curRow = [];
      columns.forEach(i => {
        if (step == 1) {
          curRow.push({ ...i, step });
        } else {
          i.children &&
            i.children.length &&
            (curRow = i.children.map(i => ({ ...i, step })));
        }
      });
      return curRow;
    }
  }

}