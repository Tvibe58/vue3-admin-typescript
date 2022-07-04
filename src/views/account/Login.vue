<template>
  <div class="app-login">
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
          @click.prevent="handleLogin(loginFormRef)"
        >登录</el-button>
      </el-form-item>
    </el-form>
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
.app-login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #009688;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    box-shadow: 0px 1px 12px #6e6d6d96;
    margin: 200px auto 0;
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
