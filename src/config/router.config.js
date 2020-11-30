// eslint-disable-next-line
import { UserLayout, BasicLayout } from '@/layouts'
import { bxAnaalyse, discovery } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Screen'),
        meta: { title: '监控大厅', icon: bxAnaalyse }
      },
      {
        path: '/infoDiscover',
        name: 'infoDiscover',
        redirect: '/infoDiscover/clueDiscover',
        component: RouteView,
        meta: { title: '情报发现', keepAlive: true, icon: discovery },
        children: [
          {
            path: 'clueDiscover',
            name: 'ClueDiscover',
            component: () => import('@/views/infoDiscover/ClueDiscover'),
            meta: { title: '线索发现', keepAlive: false }
          },
          {
            path: 'clueSearch',
            name: 'ClueSearch',
            component: () => import('@/views/infoDiscover/ClueSearch'),
            meta: { title: '线索查询', keepAlive: false }
          },
          {
            path: 'eventReport',
            name: 'EventReport',
            component: () => import('@/views/infoDiscover/EventReport'),
            meta: { title: '事件上报', keepAlive: false }
          },
          {
            path: 'eventSearch',
            name: 'EventSearch',
            component: () => import('@/views/infoDiscover/EventSearch'),
            meta: { title: '事件查询', keepAlive: false }
          },
          {
            path: 'eventFollow',
            name: 'EventFollow',
            component: () => import('@/views/infoDiscover/EventFollow'),
            meta: { title: '事件跟踪', keepAlive: false }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
