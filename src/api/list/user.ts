export default {
  login: {
    name: 'user.login',
    description: '用户登录',
    method: 'POST',
    url: '/veeker-admin/backend/login/token',
    unAuth: true,
    mockData: {
      access_token: '124'
    }
  },
  info: {
    name: 'user.info',
    description: '用户信息',
    method: 'PUT',
    url: '/oklifeserver/api/user/resource',
    mockData: {
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin',
      userSidebar: [
        'Root', 'Dashboard',
        'WechatRoot',
        'AuthRoot', 'AuthList'
      ]
    }
  },
  logout: {
    name: 'user.logout',
    description: '用户登出',
    method: 'GET',
    url: '/user/logout',
    mockData: true
  }
}
