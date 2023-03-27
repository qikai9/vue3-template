import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/errorPage/404.vue')
  },
  {
    path: '/worker',
    name: 'worker',
    component: () => import('@/views/worker/index.vue')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/list/index.vue')
  },
  {
    path: '/promise',
    name: 'promise',
    component: () => import('@/views/promise/index.vue')
  },
  {
    path: '/reactive',
    name: 'reactive',
    component: () => import('@/views/reactive/index.vue')
  },
  {
    path: '/vue2',
    name: 'vue2',
    component: () => import('@/views/vue2/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
