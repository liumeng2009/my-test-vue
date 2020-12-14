// eslint-disable-next-line
import { UserLayout, BasicLayout } from '@/layouts'
import { discovery } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    redirect: '/main',
    meta: { title: '首页' },
    children: [
      {
        path: '/main',
        name: 'mainPage',
        hidden: true,
        component: () => import('@/views/dashboard/MainPage'),
        meta: { title: '请选择功能' }
      },
      {
        path: '/info',
        name: 'info',
        component: RouteView,
        redirect: '/info/screen',
        meta: { title: '情报发现', icon: discovery },
        children: [
          {
            path: '/info/screen',
            name: 'screen',
            component: () => import('@/views/dashboard/Screen'),
            meta: { title: '监控大厅' }
          },
          {
            path: '/info/clueSearch',
            name: 'ClueSearch',
            component: () => import('@/views/infoDiscover/ClueSearch'),
            meta: { title: '线索查询', keepAlive: false }
          },
          {
            path: '/info/clueSearchDetail',
            name: 'ClueSearchDetail',
            hidden: true,
            component: () => import('@/views/infoDiscover/ClueDiscoverDetail'),
            meta: { title: '线索查询详情', keepAlive: false }
          },
          {
            path: '/info/eventReport',
            name: 'EventReport',
            component: () => import('@/views/infoDiscover/EventReport'),
            meta: { title: '事件上报', keepAlive: false }
          },
          {
            path: '/info/eventReport/fermentDetail',
            name: 'EventFermentDetail',
            hidden: true,
            component: () => import('@/views/infoDiscover/EventFermentDetail'),
            meta: { title: '事件发酵详情', keepAlive: false }
          },
          {
            path: '/info/eventReport/actionDetail',
            name: 'EventActionDetail',
            hidden: true,
            component: () => import('@/views/infoDiscover/EventActionDetail'),
            meta: { title: '事件行动详情', keepAlive: false }
          },
          {
            path: '/info/eventSearch',
            name: 'EventSearch',
            component: () => import('@/views/infoDiscover/EventSearch'),
            meta: { title: '事件查询', keepAlive: false }
          },
          {
            path: '/info/accountList',
            name: 'ImpAccountList',
            component: () => import('@/views/impAccount/index'),
            meta: { title: '重点账号管理', keepAlive: false }
          },
          {
            path: '/info/accountInfo',
            name: 'ImpAccountInfo',
            component: () => import('@/views/impAccount/info'),
            meta: { title: '重点账号信息', keepAlive: false }
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
        path: '/verify',
        name: 'verify',
        component: RouteView,
        meta: { title: '核查核证' },
        redirect: '/verify/select',
        children: [
          {
            path: '/verify/select',
            name: 'select',
            component: () => import('@/views/verify/select'),
            // hidden: true,
            meta: { title: '选择社交平台' }
          },
          {
            path: '/verify/twitter',
            name: 'Twitter',
            component: () => import('@/views/verify/twitter'),
            meta: { title: 'twitter查询', keepAlive: false }
          },
          {
            path: '/verify/facebook',
            name: 'Facebook',
            component: () => import('@/views/verify/facebook'),
            meta: { title: 'facebook查询', keepAlive: false }
          },
          {
            path: '/verify/telegram',
            name: 'Telegram',
            component: () => import('@/views/verify/telegram'),
            meta: { title: 'telegram查询', keepAlive: false }
          },
          {
            path: '/verify/detail',
            name: 'TwitterDetail',
            hidden: true,
            component: () => import('@/views/verify/detail'),
            meta: { title: '详情', keepAlive: false }
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
