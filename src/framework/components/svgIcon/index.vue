<template>
  <svg class="svg-icon">
    <use :xlink:href="`#icon-${props.name}`" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
      default: 'email'
    },
    size: {
      type: Number,
      default: 32
    },
    color: {
      type: String,
      default: '#000'
    }
  },
  setup (props) {
    return {
      props
    }
  }
})
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
