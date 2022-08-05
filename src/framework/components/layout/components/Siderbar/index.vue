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
    <div class="collapse">
      <hamburger
        :toggle-click="toggleSideBar"
        :is-active="sidebar.opened"
      />
    </div>
  </el-scrollbar>
</template>

<script lang="ts">
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem.vue'
import { defineComponent } from 'vue'
import Hamburger from '@/framework/components/Hamburger/index.vue'
export default defineComponent({
  name: 'SidebarItemLink',
  components: {
    SidebarItem,
    Hamburger
  },
  data() {
    return {
      variables: variables
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    isCollapse() {
      return !this.$store.state.app.sidebar.opened
    }
  },
  methods: {
    routes() {
      // 重构
      let newRoute: any = []
      this.$router.options.routes.forEach((route: any) => {
        if (route.meta && route.meta.isRoot) {
          newRoute = newRoute.concat(route.children)
        } else newRoute.push(route)
      })
      return newRoute
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar', false)
    }
  }
})
</script>
<style lang="scss">
.scrollbar-wrapper {
  .collapse {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    margin: 10px 0;
    .com-hamburger {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 36px;
      height: 36px;
      margin: 0 auto;
      cursor: pointer;
      border-radius: 50%;
      transition: background 0.3s;
      &:hover {
        background: #35485d;
      }
      svg {
        fill: #fff;
      }
    }
  }
}
</style>
