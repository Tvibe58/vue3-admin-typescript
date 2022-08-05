import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../framework/components/layout/layout.vue'

/**
 * path: '' 路由路径
 * name: '' 路由名称
 * meta: {
 * title: '登录' 菜单名称
 * icon: 'svg-name' svg图标名称
 * hidden: true 是否在左侧菜单栏显示
 * }
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/account/Login.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/',
    name: 'Root',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'example',
      isRoot: true
    },
    children: [
      {
        path: '/test1',
        name: 'Home',
        component: Home,
        meta: {
          title: '测试',
          icon: 'example'
        }
      },
      {
        path: '/test2',
        name: 'Home2',
        component: Home,
        meta: {
          title: '测试2-2child',
          icon: 'example'
        },
        children: [
          {
            path: '/abouts',
            name: 'Abouts',
            component: () => import('../views/About.vue'),
            meta: {
              title: 'ceshi-关于',
              icon: 'example'
            }
          },
          {
            path: '/about2897',
            name: 'Abouts2897',
            component: () => import('../views/About.vue'),
            meta: {
              title: 'ceshi-关于2',
              icon: 'example'
            }
          }
        ]
      },
      {
        path: '/about1',
        name: 'About1',
        component: () => import('../views/About.vue'),
        meta: {
          title: '关于',
          icon: 'guide'
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/NotFound.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
