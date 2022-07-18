<template>
  <div class="app-login">
    <ul class="bg-bubbles">
      <li
        v-for="i in 10"
        :key="i"
      ></li>
    </ul>
    <div class="form-wrapper">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginFormRef"
        label-position="top"
        label-width="80px"
        class="login-form"
        size="large"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="密码"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="imageCode">
          <el-input
            v-model="loginForm.imageCode"
            placeholder="图形验证码"
            maxlength="6"
          >
            <template v-slot:append>
              <div class="code-wrapper">
                <img
                  :src="`/veeker-admin/backend/login/image/${loginForm.uid}`"
                  class="number-code"
                  @click="changeNumCode"
                />
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            color="#009688"
            style="width:100%;"
            :loading="loading"
            @click="handleLogin(loginFormRef)"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import type { FormInstance } from 'element-plus'
import { v4 as uuidv4 } from 'uuid'
import { defineComponent, ref, reactive } from 'vue'
export default defineComponent({
  name: 'Login',
  components: {
  },
  setup() {
    // 在 setup() 函数中，不需要将类型传递给 props 参数，因为它将从 props 组件选项推断类型。
    const loginFormRef = ref<FormInstance>()
    const loginForm = reactive({
      username: '',
      password: '',
      imageCode: '',
      uid: uuidv4().replace(/-/g, '')
    })
    const rules = reactive({
      username: [
        { required: true, message: '请输入账号', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '请输入6位以上的密码', trigger: 'blur' }
      ],
      imageCode: [
        { required: true, message: '请输入图形验证码', trigger: 'blur' },
        { min: 4, message: '请输入4位以上的图形验证码', trigger: 'blur' }
      ]
    })
    const loading = ref(false)
    return {
      loginFormRef,
      loginForm,
      rules,
      loading
    }
  },
  methods: {
    changeNumCode() {
      this.loginForm.uid = uuidv4().replace(/-/g, '')
    },
    handleLogin(formEL: FormInstance | undefined) {
      if (!formEL) return
      formEL.validate(validate => {
        if (validate) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
            this.changeNumCode()
          })
        } else {
          console.log('error submit')
          return false
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
$transformHeight: 960px;
$bgColor: #50a3a2;
$bgColor2: #53e3a6;
.app-login {
  background: #009688;
  background: -webkit-linear-gradient(top left, $bgColor 0%, $bgColor2 100%);
  background: linear-gradient(to bottom right, $bgColor 0%, $bgColor2 100%);
  opacity: 0.8;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 400px;
  overflow: hidden;
  .form-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .login-form {
    z-index: 2;
    width: 400px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 0 auto 0;
    background: #fff;
    border-radius: 4px;
    .code-wrapper {
      display: flex;
      align-items: center;
      img {
        cursor: pointer;
      }
    }
  }
  .bg-bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    li {
      position: absolute;
      list-style: none;
      display: block;
      width: 40px;
      height: 40px;
      background-color: rgba(255, 255, 255, 0.15);
      bottom: -160px;
      -webkit-animation: square 25s infinite;
      animation: square 25s infinite;
      -webkit-transition-timing-function: linear;
      transition-timing-function: linear;
      &:nth-child(1) {
        left: 10%;
      }
      &:nth-child(2) {
        left: 20%;
        width: 80px;
        height: 80px;
        -webkit-animation-delay: 2s;
        animation-delay: 2s;
        -webkit-animation-duration: 17s;
        animation-duration: 17s;
      }
      &:nth-child(3) {
        left: 25%;
        -webkit-animation-delay: 4s;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        -webkit-animation-duration: 22s;
        animation-duration: 22s;
        background-color: rgba(255, 255, 255, 0.25);
      }
      &:nth-child(5) {
        left: 70%;
      }
      &:nth-child(6) {
        left: 80%;
        width: 120px;
        height: 120px;
        -webkit-animation-delay: 3s;
        animation-delay: 3s;
        background-color: rgba(255, 255, 255, 0.2);
      }
      &:nth-child(7) {
        left: 32%;
        width: 160px;
        height: 160px;
        -webkit-animation-delay: 7s;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 55%;
        width: 20px;
        height: 20px;
        -webkit-animation-delay: 15s;
        animation-delay: 15s;
        -webkit-animation-duration: 40s;
        animation-duration: 40s;
      }
      &:nth-child(9) {
        left: 25%;
        width: 10px;
        height: 10px;
        -webkit-animation-delay: 2s;
        animation-delay: 2s;
        -webkit-animation-duration: 40s;
        animation-duration: 40s;
        background-color: rgba(255, 255, 255, 0.3);
      }
      &:nth-child(10) {
        left: 90%;
        width: 160px;
        height: 160px;
        -webkit-animation-delay: 11s;
        animation-delay: 11s;
      }
    }
  }
  @-webkit-keyframes square {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(-700px) rotate(600deg);
      transform: translateY(-700px) rotate(600deg);
    }
  }
  @keyframes square {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(-$transformHeight) rotate(600deg);
      transform: translateY(-$transformHeight) rotate(600deg);
    }
  }
}
</style>
<style lang="scss">
.app-login {
  .el-form-item {
    .el-input-group__append {
      padding: 0;
    }
  }
}
</style>
