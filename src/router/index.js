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
      }, {
        path: 'apiInfoList/:appId',
        name: 'apiInfoList',
        component: () => import('@/views/sysInfo/apiInfoList'),
        meta: { title: '接口管理', icon: 'table' }
      }, {
        path: 'apiInfoAdd/:appId',
        name: 'apiInfoAdd',
        component: () => import('@/views/sysInfo/apiInfoAdd'),
        meta: { title: '接口添加', icon: 'table' }
      }, {
        path: 'templateList/:apiId',
        name: 'templateList',
        component: () => import('@/views/sysInfo/templateList'),
        meta: { title: '接口文件导出模板', icon: 'table' }
      }, {
        path: 'templateAdd/:apiId',
        name: 'templateAdd',
        component: () => import('@/views/sysInfo/templateAdd'),
        meta: { title: '添加文件导出模板', icon: 'table' }
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
