<template>
  <div
    :class="{
      hideSidebar: !sidebar.opened,
      openSidebar: sidebar.opened,
      withoutAnimation: sidebar.withoutAnimation,
      mobile: device === 'mobile'
    }"
    class="app-wrapper"
  >
    <div class="topbar-container">
      <Topbar />
    </div>
    <Siderbar class="sidebar-container" />
    <div class="main-container">
      <router-view class="app-container" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AppModule } from '@/store/modules/app'
import { Topbar, Siderbar } from './components/index'
import ResizeMixin from './mixin/resize'
export default defineComponent({
  name: 'SidebarItemLink',
  components: {
    Topbar,
    Siderbar
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar () {
      return AppModule.sidebar
    },
    device () {
      return ''
    }
  }
})
</script>
