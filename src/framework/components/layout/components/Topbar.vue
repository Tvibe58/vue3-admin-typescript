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
      <div class="title">&nbsp;&nbsp;&nbsp;微客云后台管理系统</div>
    </div>

    <div class="right">
      <el-dropdown class="ctrl">
        <span class="el-dropdown-link">
          个人中心
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="Plus">Action 1</el-dropdown-item>
            <el-dropdown-item icon="CirclePlusFilled">
              Action 2
            </el-dropdown-item>
            <el-dropdown-item icon="CirclePlus">Action 3</el-dropdown-item>
            <el-dropdown-item icon="Check">Action 4</el-dropdown-item>
            <el-dropdown-item icon="CircleCheck">Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
// import { defineComponent } from 'vue'
export default class Topbar extends Vue { }
// export default class extends Vue {}
// export default defineComponent({
//   // 已启用类型推断
// })
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.topbar {
  background: #fff;
  box-shadow: 0px 1px 6px #00000036;
}
</style>
