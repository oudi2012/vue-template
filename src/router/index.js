import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * 地址访问常量
 */
export const constantRoutes = [
  {
    path: '/Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: 'dashboard',
      name: '管理首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '管理首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/sysInfo',
    component: Layout,
    name: 'sysInfo',
    meta: { title: '系统设置', icon: 'form' },
    children: [
      {
        path: 'sysInfoList',
        name: 'sysInfoList',
        component: () => import('@/views/sysInfo/sysInfoList'),
        meta: { title: '系统管理', icon: 'table' }
      }, {
        path: 'sysInfoAdd',
        name: 'sysInfoAdd',
        component: () => import('@/views/sysInfo/sysInfoAdd'),
        meta: { title: '系统添加', icon: 'table' }
      }, {
        path: 'appInfoList/:parentId',
        name: 'appInfoList',
        component: () => import('@/views/sysInfo/appInfoList'),
        meta: { title: '应用管理', icon: 'table' }
      }, {
        path: 'appInfoAdd/:parentId',
        name: 'appInfoAdd',
        component: () => import('@/views/sysInfo/appInfoAdd'),
        meta: { title: '应用添加', icon: 'table' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'),
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
