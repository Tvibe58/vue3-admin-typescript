<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <h1>Layout</h1>
    <div class="topbar-container">
      <Topbar />
    </div>
    <Siderbar class="sidebar-container" />
    <router-view class="app-container" />
  </div>
</template>

<script lang="ts">
// import { defineComponent } from 'vue'
// import { Topbar } from './components'
// export default defineComponent({
//   components: {
//     Topbar
//   }
//   // 已启用类型推断
// })
import { Options, Vue } from 'vue-class-component'
import { Topbar, Siderbar } from './components/index'

@Options({
  components: {
    Topbar,
    Siderbar
  }
})
export default class layout extends Vue {}
</script>

<style lang="scss" scoped>
</style>
