<template>
  <div>
    <Card>
      <Form
        inline
        ref="home"
        :model="data"
        :label-width="80"
      >
        <FormItem label="ID:">
          <Input v-model="data.id"></Input>
        </FormItem>
        <FormItem label="姓名:">
          <Input v-model="data.name"></Input>
        </FormItem>
        <FormItem label="密码:">
          <Input v-model="data.password"></Input>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            @click="addUser"
          >新增</Button>
          <Button
            @click="delUser"
            style="margin-left: 8px"
          >删除</Button>
          <Button
            @click="updateUser"
            style="margin-left: 8px"
          >修改</Button>
          <Button
            type="primary"
            @click="selectUser"
          >查看</Button>
        </FormItem>
      </Form>
      <div>
        <Table
          border
          :columns="columns"
          :data="list"
        ></Table>
      </div>
      <Button @click="nextPage">下一页</Button>
    </Card>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      columns: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data: {},
      list: [],
      page: 1,
      pageSize: 10
    };
  },
  methods: {
    addUser() {
      this.postAxios("/user/add", this.data);
    },
    delUser() {
      this.delectAxios(`/user/delete/${this.data.id}`);
    },
    updateUser() {
      this.putAxios("/user/update", this.data);
    },
    selectUser() {
      this.getAxios(`/user/${this.data.id}`);
    },
    nextPage() {
      this.$router.push("/about");
    }
  },
  mounted() {
    console.log(341345);
  }
};
</script>

<style lang="scss" scoped>
.footer {
  text-align: right;
  padding: {
    top: 30px;
    right: 30px;
  }
}
</style>
