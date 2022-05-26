export default {
  login: {
    name: 'user.login',
    description: '用户登录',
    method: 'POST',
    url: '',
    unAuth: true
  },
  verifyImg: {
    name: 'user.verifyImg',
    description: '图形验证码',
    method: 'PUT',
    url: '/veeker-admin/backend/login/image',
    unAuth: true
  }
}
