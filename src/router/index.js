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
  {
    path: '/purchase',
    component: Layout,
    redirect: '/purchase/alloc', // 默认子路由
    name: 'Purchase',
    meta: { title: '采购', icon: 'el-icon-sold-out' },
    children: [
      {
        path: 'alloc',
        name: 'AllocOrder',
        component: () => import('@/views/purchase/alloc'),
        meta: { title: '待分配订单', icon: 'el-icon-receiving' }
      },
      {
        path: 'alloc-no-stock',
        name: 'AllocNoStockOrder',
        component: () => import('@/views/purchase/alloc-no-stock'),
        meta: { title: '异常订单', icon: 'el-icon-warning' }
      },
      {
        path: 'alloc-done',
        name: 'AllocDoneOrder',
        component: () => import('@/views/purchase/alloc-done'),
        meta: { title: '已分配订单', icon: 'el-icon-s-order' }
      },
      {
        path: 'purchase-manage',
        name: 'PurchaseManage',
        component: () => import('@/views/purchase/purchase-manage'),
        meta: { title: '备货采购', icon: 'el-icon-goods' }
      },
      {
        path: 'private-warehouse',
        name: 'PrivateWarehouse',
        component: () => import('@/views/purchase/private-warehouse'),
        meta: { title: '自营仓', icon: 'el-icon-office-building' }
      },
      {
        path: 'outside-warehouse',
        name: 'OutsideWarehouse',
        component: () => import('@/views/purchase/outside-warehouse'),
        meta: { title: '外仓', icon: 'el-icon-box' }
      },
      {
        path: 'supplier',
        name: 'Supplier',
        component: () => import('@/views/purchase/supplier'),
        meta: { title: '供应商管理', icon: 'el-icon-user' }
      }
    ]
  },
  {
    path: '/after-sales',
    component: Layout,
    redirect: '/after-sales/after-sales-order',
    name: 'AfterSales',
    meta: {
      title: '售后',
      icon: 'el-icon-s-cooperation'
    },
    children: [
      {
        path: 'after-sales-order',
        component: () => import('@/views/after-sales/after-sales-order'),
        name: 'AfterSalesOrder',
        meta: {
          title: '售后订单'
        }
      },
      {
        path: 'abnormal',
        component: () => import('@/views/after-sales/abnormal'),
        name: 'Abnormal',
        meta: {
          title: '物流异常订单'
        }
      }
    ]
  },

  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/customer-recharge',
    name: 'Finance',
    meta: {
      title: '财务管理',
      icon: 'el-icon-money'
    },
    children: [
      {
        path: 'customer-recharge',
        component: () => import('@/views/finance/customer-recharge'),
        name: 'CustomerRecharge',
        meta: {
          title: '客户充值',
          icon: 'el-icon-s-ticket'
        }
      },
      {
        path: 'customer-invoices',
        component: () => import('@/views/finance/customer-invoices'),
        name: 'CustomerInvoices',
        meta: {
          title: '客户开票',
          icon: 'el-icon-s-ticket'
        }
      },
      {
        path: 'pay-manage',
        component: () => import('@/views/finance/pay-manage'),
        name: 'PayManage',
        meta: {
          title: '采购付款',
          icon: 'el-icon-s-order'
        }
      },
      {
        path: 'supplier-pay-manage',
        component: () => import('@/views/finance/supplier-pay-manage'),
        name: 'SupplierPayManage',
        meta: {
          title: '供应商充值',
          icon: 'el-icon-s-finance'
        }
      },
      {
        path: 'account-manage',
        component: () => import('@/views/finance/account-manage'),
        name: 'AccountManage',
        meta: {
          title: '账户管理',
          icon: 'el-icon-user'
        }
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/customer-manage',
    name: 'Customer',
    meta: {
      title: '客户管理',
      icon: 'el-icon-user'
    },
    children: [
      {
        path: 'customer-manage',
        component: () => import('@/views/customer/customer-manage'),
        name: 'CustomerManage',
        meta: { title: '客户充值', icon: 'el-icon-money' }
      },
      {
        path: 'customer-quote',
        component: () => import('@/views/customer/customer-quote'),
        name: 'CustomerQuote',
        meta: { title: '客户报价', icon: 'el-icon-price-tag' }
      }
    ]
  },

  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/goods-manage',
    name: 'Goods',
    meta: { title: '商品管理', icon: 'shopping' },
    children: [
      {
        path: 'goods-manage',
        component: () => import('@/views/goods/goods-manage'),
        name: 'GoodsManage',
        meta: { title: '基础商品', icon: 'clipboard' }
      },
      {
        path: 'combined-goods-manage',
        component: () => import('@/views/goods/combined-goods-manage'),
        name: 'CombinedGoodsManage',
        meta: { title: '组合商品', icon: 'tree' }
      },
      {
        path: 'goods-stock-apply',
        component: () => import('@/views/goods/goods-stock-apply'),
        name: 'GoodsStockApply',
        meta: { title: '备货记录', icon: 'time' }
      }
    ]
  },

  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/department-manage',
    name: 'Sys',
    meta: { title: '系统设置', icon: 'el-icon-setting' },
    children: [
      {
        path: 'department-manage',
        component: () => import('@/views/sys/department-manage'),
        name: 'DepartmentManage',
        meta: { title: '部门管理', icon: 'el-icon-office-building' }
      },
      {
        path: 'sys-user-manage',
        component: () => import('@/views/sys/sys-user-manage'),
        name: 'SysUserManage',
        meta: { title: '账号管理', icon: 'el-icon-user' }
      },
      {
        path: 'sys-roles',
        component: () => import('@/views/sys/sys-roles'),
        name: 'SysRoles',
        meta: { title: '角色权限', icon: 'el-icon-lock' }
      },
      {
        path: 'edit-info',
        component: () => import('@/views/sys/edit-info'),
        name: 'EditInfo',
        meta: { title: '个人信息', icon: 'el-icon-user-solid' }
      },
      {
        path: 'export-file',
        component: () => import('@/views/sys/export-file'),
        name: 'ExportFile',
        meta: { title: '数据下载', icon: 'el-icon-download' }
      },
      {
        path: 'sys-log',
        component: () => import('@/views/sys/sys-log'),
        name: 'SysLog',
        meta: { title: '系统日志', icon: 'el-icon-notebook-2' }
      }
    ]
  },
  {
    path: '/debug',
    component: Layout,
    redirect: '/debug/unknown',
    name: 'Debug',
    meta: { title: '调试功能', icon: 'bug' },
    children: [
      {
        path: 'unknown',
        component: () => import('@/views/debug/unknown'),
        name: 'Unknown',
        meta: { title: '暂时不知道干嘛', icon: 'link' }
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
