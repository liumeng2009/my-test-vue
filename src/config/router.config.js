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
    meta: { title: '首页' },
    redirect: '/screen',
    children: [
      // dashboard
      {
        path: '/screen',
        name: 'screen',
        component: () => import('@/views/dashboard/Screen'),
        meta: { title: '监控大厅', icon: bxAnaalyse }
      },
      {
        path: '/infoDiscover',
        redirect: '/infoDiscover/clueDiscover',
        component: RouteView,
        meta: { title: '情报发现', icon: discovery },
        children: [
          {
            path: '/infoDiscover/clueDiscover',
            name: 'ClueDiscover',
            component: () => import('@/views/infoDiscover/ClueDiscover'),
            meta: { title: '线索发现' }
          },
          {
            path: '/infoDiscover/clueDiscover/detail',
            name: 'ClueDiscoverDetail',
            hidden: true,
            component: () => import('@/views/infoDiscover/ClueDiscoverDetail'),
            meta: { title: '线索发现详情' }
          },
          {
            path: '/infoDiscover/clueSearch',
            name: 'ClueSearch',
            component: () => import('@/views/infoDiscover/ClueSearch'),
            meta: { title: '线索查询', keepAlive: false }
          },
          {
            path: '/infoDiscover/eventReport',
            name: 'EventReport',
            component: () => import('@/views/infoDiscover/EventReport'),
            meta: { title: '事件上报', keepAlive: false }
          },
          {
            path: '/infoDiscover/eventReport/fermentDetail',
            name: 'EventFermentDetail',
            hidden: true,
            component: () => import('@/views/infoDiscover/EventFermentDetail'),
            meta: { title: '事件发酵详情', keepAlive: false }
          },
          {
            path: '/infoDiscover/eventReport/actionDetail',
            name: 'EventActionDetail',
            hidden: true,
            component: () => import('@/views/infoDiscover/EventActionDetail'),
            meta: { title: '事件行动详情', keepAlive: false }
          },
          {
            path: '/infoDiscover/eventSearch',
            name: 'EventSearch',
            component: () => import('@/views/infoDiscover/EventSearch'),
            meta: { title: '事件查询', keepAlive: false }
          },
          {
            path: '/infoDiscover/eventFollow',
            name: 'EventFollow',
            component: () => import('@/views/infoDiscover/EventFollow'),
            meta: { title: '事件跟踪', keepAlive: false }
          }
        ]
      },
      {
        path: '/impAccount',
        name: 'impAccount',
        redirect: '/impAccount/list',
        component: RouteView,
        meta: { title: '重点账号', icon: bxAnaalyse },
        children: [
          {
            path: '/impAccount/list',
            name: 'ImpAccountList',
            component: () => import('@/views/impAccount/index'),
            meta: { title: '重点账号管理', keepAlive: false }
          },
          {
            path: '/impAccount/info',
            name: 'ImpAccountInfo',
            component: () => import('@/views/impAccount/info'),
            meta: { title: '重点账号信息', keepAlive: false }
          }
        ]
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        // hideChildrenInMenu: true,
        hidden: true,
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
        children: [
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'user' ] }
              }
            ]
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
