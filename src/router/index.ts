import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/article/create/',
    name: 'article_create',
    component: () => import('@/views/article/Create.vue')
  },
  {
    path: '/article/edit/:articleId?',
    name: 'article_edit',
    component: () => import('@/views/article/Edit.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
