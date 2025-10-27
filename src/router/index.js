import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../pages/Landing.vue'
import Login from '../pages/Login.vue'
import Signup from '../pages/Signup.vue'
import Dashboard from '../pages/Dashboard.vue'
import CreateTicket from '../pages/CreateTicket.vue'
import EditTicket from '../pages/EditTicket.vue'
import NotFound from '../pages/NotFound.vue'
import { isLoggedIn } from '../utils/auth'

const routes = [
  { path: '/', component: Landing },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/create', component: CreateTicket, meta: { requiresAuth: true } },
  { path: '/edit/:id', component: EditTicket, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.requiresAuth && !isLoggedIn()) {
    next('/login')
  } else {
    next()
  }
})
