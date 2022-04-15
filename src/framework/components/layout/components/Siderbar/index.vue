<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :unique-opened="false"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in routes()"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        :is-collapse="isCollapse"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SidebarItemLink',
  components: { SidebarItem },
  data () {
    return {
      color: 'orange',
      isCollapse: false,
      variables: variables
    }
  },
  methods: {
    routes () {
      // 重构
      let newRoute: any = []
      this.$router.options.routes.forEach((route: any) => {
        if (route.meta.isRoot) {
          newRoute = newRoute.concat(route.children)
        } else newRoute.push(route)
      })
      return newRoute
    }
  }
})
</script>
<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
