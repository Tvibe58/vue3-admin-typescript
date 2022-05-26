<template>
  <div class="app-login">
    <el-form
      :model="form"
      :rules="rules"
      label-position="top"
      label-width="80px"
      class="login-form"
      size="large"
    >
      <el-form-item>
        <el-input
          v-model="form.name"
          placeholder="用户名"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.password"
          placeholder="密码"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.imageCode"
          placeholder="图形验证码"
          maxlength="6"
        >
          <template v-slot:append>
            <img
              :src="verifyImg"
              class="number-code"
              @click="changeNumCode"
            />
            <!-- <img
              :src="`/veeker-admin/backend/login/image/${form.uid}`"
              class="number-code"
              @click="changeNumCode"
            /> -->
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          color="#009688"
          style="width:100%;"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Login',
  components: {
  },
  data () {
    return {
      form: {
        name: '',
        password: '',
        imageCode: '',
        uid: uuidv4().replace(/-/g, '')
      },
      verifyImg: '12',
      rules: {
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
      }
    }
  },
  created () {
    // console.log('api', this.$api)
    // console.log('uuid', uuidv4().replace(/-/g, ''))
  },
  methods: {
    changeNumCode () {
      console.log('click')
      this.form.uid = uuidv4().replace(/-/g, '')
      this.changeVerifyImg()
    },
    changeVerifyImg () {
      this.$api('user.verifyImg', this.form.uid).then((res: any) => {
        console.log('res', res)
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
    margin: 200px auto 0;
    background: #fff;
    border-radius: 4px;
  }
}
</style>
