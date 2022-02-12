import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/article/:articleId/',
    name: 'article_detail',
    component: () => import('@/views/article/Detail.vue')
  },
  {
    path: '/article/create/',
    name: 'article_create',
    component: () => import('@/views/article/Create.vue')
  },
  {
    path: '/article/manage/',
    name: 'article_manage',
    component: () => import('@/views/article/Manage.vue')
  },
  {
    path: '/article/edit/:articleId',
    name: 'article_edit',
    component: () => import('@/views/article/Edit.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
