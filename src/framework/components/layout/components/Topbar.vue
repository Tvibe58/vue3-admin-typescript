<template>
  <div class="topbar">
    <div class="left">
      <div
        class="logo"
        @click="$router.push('/')"
      >
        <img
          src="../../../../assets/logo.png"
          class="user-avatar"
        >
      </div>
      <div class="title">&nbsp;后台管理系统</div>
    </div>

    <div class="right">
      <el-dropdown class="ctrl">
        <span class="el-dropdown-link">
          {{ name ||  '个人中心'}}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              icon="MoonNight"
              @click="logout"
            >退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  computed: {
    name() {
      return this.$store.state.user.userInfo.name
    }
  },
  methods: {
    logout() {
      this.$router.push({
        name: 'Login'
      })
      this.$store.dispatch('LogOut').then(() => {
        location.reload()
      })
    }
  }
})
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.topbar {
  background: #fff;
  box-shadow: 0px 1px 6px #0000002a;
}
</style>
