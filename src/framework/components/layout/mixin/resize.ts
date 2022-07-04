import { defineComponent } from 'vue'
import { DeviceType } from '@/store/modules/app'
import { store } from '@/store'

const WIDTH = 992 // refer to Bootstrap's responsive design

export default defineComponent({
  name: 'ResizeMixin',
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    }
  },
  watch: {
    $route() {
      if (this.device === DeviceType.Mobile && this.sidebar.opened) {
        store.dispatch('CloseSideBar', true)
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    isMobile() {
      const rect = document.body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        store.dispatch('ToggleDevice', isMobile ? DeviceType.Mobile : DeviceType.Desktop)
        if (isMobile) {
          store.dispatch('CloseSideBar', true)
        }
      }
    }
  }
})
