const menuList = [
  {
    path: '/layout',
    name: '首页',
    icon: "el-icon-user-solid",
    component: "layout",
    children: [
      {
        icon: "el-icon-s-tools",
        path: '/home',
        name: '工作首页',
        component: "home",
      },
    ]
  },
  {
    path: '/layout',
    name: '其他',
    component: "layout",
    icon: "el-icon-user-solid",
    children: [
      {
        icon: "el-icon-user-solid",
        path: '/other',
        name: '首页1',
        component: "other",
      }
    ]
  },
]

export default {
  'get|/getAuthList': () => {
    return {
      status: 200,
      message: 'success',
      data: [{ name: "admin", id: "1" }]
    };
  },

  'get|/login': () => {
    return {
      status: 200,
      message: 'success',
      data: {
        token: 123456780
      }
    };
  },
  'get|/getUerInfo': () => {
    return {
      status: 200,
      message: 'success',
      data: {
        userInfo: {
          userId: "ccc",
          username: "test"
        }
      }
    };
  },
  'get|/getMenuList': () => {
    return {
      status: 200,
      message: 'success',
      data: menuList
    };
  }
}

