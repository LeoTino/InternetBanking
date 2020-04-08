import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/customer/getAccounts/:MaKhachHang',
    name: 'getAccountsList',
    component: () => import('../views/Customer/DanhSachTaiKhoan.vue'),
    beforeEnter: ifAuthenticated,
  },
]

const router = new VueRouter({
  routes
})

export default router
