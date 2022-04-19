import { defineComponent } from 'vue'
import { AppModule, DeviceType } from '@/store/modules/app'

const WIDTH = 992 // refer to Bootstrap's responsive design

export default defineComponent({
  name: 'ResizeMixin',
  computed: {
    sidebar () {
      return AppModule.sidebar
    },
    device () {
      return AppModule.device
    }
  },
  watch: {
    $route () {
      if (this.device === DeviceType.Mobile && this.sidebar.opened) {
        AppModule.CloseSideBar(false)
      }
    }
  },
  beforeMount () {
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    isMobile () {
      const rect = document.body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    resizeHandler () {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        AppModule.ToggleDevice(
          isMobile ? DeviceType.Mobile : DeviceType.Desktop
        )
        if (isMobile) {
          AppModule.CloseSideBar(true)
        }
      }
    }
  }
})
