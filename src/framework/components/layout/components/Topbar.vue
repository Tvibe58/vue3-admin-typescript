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
      个人中心
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
// import { defineComponent } from 'vue'
export default class Topbar extends Vue {}
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
