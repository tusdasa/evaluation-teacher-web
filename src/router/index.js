import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/rest',
    component: () => import('@/views/password'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/main',
    component: Layout,
    redirect: '/main/table',
    name: 'Example',
    meta: { title: '评价', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '教师评价', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '说明', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '成绩', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'),
        name: 'Menu1',
        meta: { title: '指标管理' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: '一级指标' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: '二级指标' }
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: '三级指标' }
          },
          {
            path: 'menu1-4',
            component: () => import('@/views/nested/menu1/menu1-4'),
            name: 'Menu1-4',
            meta: { title: '计算规则' }
          },
          {
            path: 'menu1-5',
            component: () => import('@/views/nested/menu1/menu1-5'),
            name: 'Menu1-5',
            meta: { title: '等级规则' }
          },
          {
            path: 'menu1-6',
            component: () => import('@/views/nested/menu1/menu1-6'),
            name: 'Menu1-6',
            meta: { title: '举证规则' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '权限管理' }
      },
      {
        path: 'menu3',
        component: () => import('@/views/nested/menu3/index'),
        meta: { title: '用户管理' },
        children: [
          {
            path: 'menu1-2-1',
            component: () => import('@/views/nested/menu3/menu1-2-1'),
            name: 'Menu1-2-1',
            meta: { title: '学生管理' }
          },
          {
            path: 'menu1-2-2',
            component: () => import('@/views/nested/menu3/menu1-2-2'),
            name: 'Menu1-2-2',
            meta: { title: '教师管理' }
          }
        ]
      },
      {
        path: 'menu4',
        component: () => import('@/views/nested/menu4/index'),
        meta: { title: '成绩汇总' }
      },
      {
        path: 'menu5',
        component: () => import('@/views/nested/menu5/index'),
        meta: { title: '数据统计' }
      },
      {
        path: 'menu6',
        component: () => import('@/views/nested/menu6/index'),
        meta: { title: '学期管理' }
      },
      {
        path: 'menu7',
        component: () => import('@/views/nested/menu7/index'),
        meta: { title: '学年管理' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
