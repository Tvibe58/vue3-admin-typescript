<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[
      isCollapse ? 'simple-mode' : 'full-mode',
      { 'first-level': isFirstLevel }
    ]"
  >
    <template v-if="
        !alwaysShowRootMenu() &&
        theOnlyOneChild() &&
        !theOnlyOneChild().children
      ">
      <sidebar-item-link
        v-if="theOnlyOneChild().meta"
        :to="resolvePath(theOnlyOneChild().path)"
      >
        <el-menu-item
          :index="resolvePath(theOnlyOneChild().path)"
          :class="{ 'submenu-title-noDropdown': isFirstLevel }"
        >
          <SvgIcon
            v-if="theOnlyOneChild().meta.icon"
            :name="theOnlyOneChild().meta.icon"
          />
          <template
            v-if="theOnlyOneChild().meta.title"
            #title
          >
            {{ theOnlyOneChild().meta.title }}
          </template>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-sub-menu
      v-else
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template #title>
        <SvgIcon
          v-if="item.meta && item.meta.icon"
          :name="item.meta.icon"
        />
        <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
import path from 'path'
import { isExternal } from '@/utils/validate'
import SidebarItemLink from './SidebarItemLink.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SidebarItem',
  components: { SidebarItemLink },
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    },
    isCollapse: {
      type: Boolean,
      default: false
    },
    isFirstLevel: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    alwaysShowRootMenu() {
      if (this.item.meta && this.item.meta.alwaysShow) {
        return true
      }
      return false
    },
    showingChildNumber() {
      if (this.item.children) {
        const showingChildren = this.item.children.filter((item: any) => {
          if (item.meta && item.meta.hidden) {
            return false
          } else {
            return true
          }
        })
        return showingChildren.length
      }
      return 0
    },
    theOnlyOneChild() {
      if (this.showingChildNumber() > 1) {
        return null
      }
      if (this.item.children) {
        for (const child of this.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      // If there is no children, return itself with path removed,
      // because this.basePath already conatins item's path information
      return { ...this.item, path: '' }
    },
    resolvePath(routePath: string) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
})
</script>

<style lang="scss">
.full-mode {
  .nest-menu .el-sub-menu > .el-sub-menu__title,
  .el-sub-menu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
  .el-sub-menu > .el-sub-menu__title {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $menuHover !important;
    }
  }
  .is-active > .el-sub-menu__title {
    color: $menuActiveText !important;
  }
  .is-active {
    background-color: $menuActiveBg !important;
    .el-sub-menu__title {
      background-color: $menuHover !important;
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-sub-menu {
      overflow: hidden;

      & > .el-sub-menu__title {
        padding: 0px !important;

        .el-sub-menu__icon-arrow {
          display: none;
        }

        & > span {
          visibility: hidden;
        }
      }
    }
  }
  .el-sub-menu .el-sub-menu__title {
    &:hover {
      background-color: $menuHover !important;
    }
  }
  .is-active > .el-sub-menu__title {
    color: $menuActiveText !important;
  }
  .is-active {
    background-color: $menuActiveBg !important;
    .el-sub-menu__title {
      background-color: $menuHover !important;
    }
  }
}
</style>
