import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../framework/components/layout/layout.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  //   meta: {
  //     title: '关于',
  //     icon: 'example',
  //     hidden: true
  //   }
  // },
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
          },
          {
            path: '/about88',
            name: 'Abouts88',
            component: Layout,
            meta: {
              title: 'ce-关于2',
              icon: 'example'
            },
            children: [
              {
                path: '/about',
                name: 'Abouts123',
                component: () => import('../views/About.vue'),
                meta: {
                  title: 'ceshi-关于',
                  icon: 'example'
                }
              },
              {
                path: '/about23',
                name: 'Abouts23',
                component: () => import('../views/About.vue'),
                meta: {
                  title: 'ceshi-关于223456',
                  icon: 'example'
                }
              }
            ]
          }
        ]
      },
      {
        path: '/about1',
        name: 'About1',
        component: () => import('../views/About.vue'),
        meta: {
          title: '关于',
          icon: 'example'
        }
      },
      {
        path: '/about6',
        name: 'About6',
        component: () => import('../views/About.vue'),
        meta: {
          title: '关于',
          icon: 'example'
        },
        children: [
          {
            path: '/about66',
            name: 'About66',
            component: () => import('../views/About.vue'),
            meta: {
              title: '关于',
              icon: 'example'
            }
          }
        ]
      }
    ]
  },
  // {
  //   path: '/test1',
  //   name: 'Test',
  //   component: Layout,
  //   meta: {
  //     title: '测试',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: 'test1',
  //       name: 'Test1',
  //       component: Home,
  //       meta: {
  //         title: '测试',
  //         icon: 'example'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/test2',
  //   name: 'Home2',
  //   component: Layout,
  //   meta: {
  //     title: '测试2-2child',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: '/about',
  //       name: 'Abouts',
  //       component: () => import('../views/About.vue'),
  //       meta: {
  //         title: 'ceshi-关于',
  //         icon: 'example'
  //       }
  //     },
  //     {
  //       path: '/about2',
  //       name: 'Abouts2',
  //       component: () => import('../views/About.vue'),
  //       meta: {
  //         title: 'ceshi-关于2',
  //         icon: 'example'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/about1',
  //   name: 'About1',
  //   component: () => import('../views/About.vue'),
  //   meta: {
  //     title: '关于',
  //     icon: 'example'
  //   }
  // },
  {
    path: '/about7',
    name: 'About7',
    component: Layout,
    meta: {
      title: '关于7',
      icon: 'example'
    },
    children: [
      {
        path: '/about77',
        name: 'About77',
        component: () => import('../views/About.vue'),
        meta: {
          title: '关于77',
          icon: 'example'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
