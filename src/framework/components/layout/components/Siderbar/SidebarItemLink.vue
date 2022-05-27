<template>
  <a v-if="checkExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <router-link v-else :to="to">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { isExternal } from '@/utils/validate'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SidebarItemLink',
  props: {
    to: {
      type: String
    }
  },
  methods: {
    checkExternal(url: string) {
      return isExternal(url)
    }
  }
})
</script>
