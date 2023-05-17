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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
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
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/workbench',
    component: Layout,
    redirect: '/workbench/customer-check',
    name: 'Workbench',
    meta: {
      title: '审核中心',
      icon: 'el-icon-s-opportunity'
    },
    children: [
      {
        path: 'customer-check',
        component: () => import('@/views/workbench/customer-check'),
        name: 'CustomerCheck',
        meta: {
          title: '客户审核',
          icon: 'el-icon-s-custom'
        }
      },
      {
        path: 'quoted-price-check',
        component: () => import('@/views/workbench/quoted-price-check'),
        name: 'QuotedPriceCheck',
        meta: {
          title: '报价审核',
          icon: 'el-icon-s-cooperation'
        }
      },
      {
        path: 'purchase-order-check',
        component: () => import('@/views/workbench/purchase-order-check'),
        name: 'PurchaseOrderCheck',
        meta: {
          title: '备货采购审核',
          icon: 'el-icon-truck'
        }
      },
      {
        path: 'centralized-order-check',
        component: () => import('@/views/workbench/centralized-order-check'),
        name: 'CentralizedOrderCheck',
        meta: {
          title: '集采订单审核',
          icon: 'el-icon-s-data'
        }
      },
      {
        path: 'supplier-pay-check',
        component: () => import('@/views/workbench/supplier-pay-check'),
        name: 'SupplierPayCheck',
        meta: {
          title: '供应商充值',
          icon: 'el-icon-s-finance'
        }
      }
    ]
  },
  {
    path: '/seller',
    component: Layout,
    redirect: '/seller/order',
    alwaysShow: true,
    meta: { title: '销售', icon: 'dashboard' },
    children: [
      {
        path: 'order',
        name: 'SellerOrder',
        component: () => import('@/views/seller/order'),
        meta: { title: '代发订单', icon: 'form' }
      },
      {
        path: 'centralized-order',
        name: 'CentralizedOrder',
        component: () => import('@/views/seller/centralized-order'),
        meta: { title: '集采订单', icon: 'shopping' }
      },
      {
        path: 'batch',
        name: 'Batch',
        component: () => import('@/views/seller/batch'),
        meta: { title: '批次管理', icon: 'component' }
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
