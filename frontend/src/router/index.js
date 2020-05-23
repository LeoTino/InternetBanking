import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import axios from "axios"

Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
  let token = localStorage.getItem("token");
  if (!token) {
    next()
    return
  }
  next('/about')
}

const ifAuthenticated = (to, from, next) => {
  let token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/customer/dashboard',
    name: 'customerDashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Customer/Dashboard.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/changepassword',
    name: 'ChangePassword',
    component: () => import('../views/ChangePassword.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPassword.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/customer/getAccounts/:MaKhachHang',
    name: 'getAccountsList',
    component: () => import('../views/Customer/DanhSachTaiKhoan.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/transfer/internal',
    name: 'ChuyenKhoanNoiBo',
    component: () => import('../views/Customer/ChuyenKhoanNoiBo.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/transfer/other-bank',
    name: 'ChuyenKhoanLienNganHang',
    component: () => import('../views/Customer/ChuyenKhoanLienNganHang.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/customer/receivemanagement',
    name: 'ReceiveManagement',
    component: () => import('../views/Customer/DanhSachNguoiNhan.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/customer/receivemanagement/edit/:soTK/:id',
    name: 'EditReceiveManagement',
    component: () => import('../views/Customer/EditNguoiNhan.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/customer/createNguoiNhan',
    name: 'CreateNguoiNhan',
    component: () => import('../views/Customer/CreateNguoiNhan.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/customer/debtmanagement',
    name: 'DebtManagement',
    component: () => import('../views/Customer/DanhSachNhacNo.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/customer/debtmanagement/delete/:id',
    name: 'DeleteDebt',
    component: () => import('../views/Customer/DeleteNhacNo.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/customer/debtmanagement/thanhtoan/:id',
    name: 'PaymentDebt',
    component: () => import('../views/Customer/ThanhToanNhacNo.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/customer/createNguoiNo',
    name: 'CreateNguoiNo',
    component: () => import('../views/Customer/CreateNguoiNo.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/customer/history',
    name: 'LichSuGiaoDich',
    component: () => import('../views/Customer/LichSuGiaoDich.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/step',
    name: 'MultipleStep',
    component: () => import('../views/MultipleStep.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/employee/createAccount',
    name: 'CreateAccount',
    component: () => import('../views/Employee/CreateAccount.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/employee/dashboard',
    name: 'EmployeeDashboard',
    component: () => import('../views/Employee/Dashboard.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/employee/naptien',
    name: 'EmployeeNapTien',
    component: () => import('../views/Employee/NapTien.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/employee/history',
    name: 'EmployeeHistory',
    component: () => import('../views/Employee/LichSuGiaoDich.vue'),
    beforeEnter: ifAuthenticated,
  },
]

const router = new VueRouter({
  routes
})

export default router
