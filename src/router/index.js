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
  }, {
    path: '/',
    component: Layout,
    children: [{
      path: 'dashboard',
      name: '管理首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '管理首页', icon: 'dashboard' }
    }]
  }, {
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
        path: 'sysParamInfoList',
        name: 'sysParamInfoList',
        component: () => import('@/views/sysInfo/sysParamInfoList'),
        meta: { title: '参数管理', icon: 'table' }
      }, {
        path: 'fileTypeList',
        name: 'fileTypeList',
        component: () => import('@/views/sysInfo/fileTypeList'),
        meta: { title: '导出类型', icon: 'table' }
      }, {
        path: 'sysInfoAdd',
        name: 'sysInfoAdd',
        component: () => import('@/views/sysInfo/sysInfoAdd')
      }, {
        path: 'appInfoList/:parentId',
        name: 'appInfoList',
        component: () => import('@/views/sysInfo/appInfoList')
      }, {
        path: 'appInfoAdd/:parentId',
        name: 'appInfoAdd',
        component: () => import('@/views/sysInfo/appInfoAdd')
      }, {
        path: 'appInfoEdit/:parentId/:appId',
        name: 'appInfoEdit',
        component: () => import('@/views/sysInfo/appInfoEdit')
      }, {
        path: 'apiInfoList/:appId',
        name: 'apiInfoList',
        component: () => import('@/views/sysInfo/apiInfoList')
      }, {
        path: 'apiInfoAdd/:appId',
        name: 'apiInfoAdd',
        component: () => import('@/views/sysInfo/apiInfoAdd')
      }, {
        path: 'apiInfoEdit/:appId/:apiId',
        name: 'apiInfoEdit',
        component: () => import('@/views/sysInfo/apiInfoEdit')
      }, {
        path: 'templateList/:apiId',
        name: 'templateList',
        component: () => import('@/views/sysInfo/templateList')
      }, {
        path: 'templateAdd/:apiId',
        name: 'templateAdd',
        component: () => import('@/views/sysInfo/templateAdd')
      }, {
        path: 'templateItemList/:tplId',
        name: 'templateItemList',
        component: () => import('@/views/sysInfo/templateItemList')
      }, {
        path: 'templateItemAdd/:tplId',
        name: 'templateItemAdd',
        component: () => import('@/views/sysInfo/templateItemAdd')
      }, {
        path: 'sysParamInfoAdd',
        name: 'sysParamInfoAdd',
        component: () => import('@/views/sysInfo/sysParamInfoAdd')
      }, {
        path: 'sysParamInfoEdit/:paramId',
        name: 'sysParamInfoEdit',
        component: () => import('@/views/sysInfo/sysParamInfoEdit')
      }, {
        path: 'fileTypeEdit/:id',
        name: 'fileTypeEdit',
        component: () => import('@/views/sysInfo/fileTypeEdit')
      }
    ]
  }, {
    path: '/queueInfo',
    component: Layout,
    name: 'queueInfo',
    meta: { title: '任务管理', icon: 'form' },
    children: [
      {
        path: 'queueInfoList',
        name: 'taskList',
        component: () => import('@/views/queue/queueInfoList'),
        meta: { title: '任务列表', icon: 'table' }
      }, {
        path: 'testRequestUrl',
        name: 'testRequestUrl',
        component: () => import('@/views/queue/virtualDataDetail'),
        meta: { title: '模拟请求', icon: 'table' }
      }, {
        path: 'urlToJson',
        name: 'urlToJson',
        component: () => import('@/views/queue/urlToJsonDetail'),
        meta: { title: 'urlToJson', icon: 'table' }
      }, {
        path: 'queueInfoEdit/:id',
        name: 'queueInfoEdit',
        component: () => import('@/views/queue/queueInfoEdit')
      }
    ]
  }, {
    path: '/demoInfo',
    component: Layout,
    name: 'demoInfo',
    meta: { title: '对接案例', icon: 'form' },
    children: [
      {
        path: 'ERP-Order',
        name: 'ERP-Order',
        component: () => import('@/views/example/erp_order'),
        meta: { title: 'ERP订单导出', icon: 'table' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
