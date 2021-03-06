import Cookies from 'js-cookie'

// App
const sidebarStatusKey = 'sidebarStatus'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => Cookies.set(sidebarStatusKey, sidebarStatus)
