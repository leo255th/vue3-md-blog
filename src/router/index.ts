import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue')
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
  },
  {
    path:'/404',
    name:"NotFound",
    component:()=>import('@/views/404.vue')
  },
  {
    path:'/:pathMatch(.*)*',
    redirect:'/404',
    component:()=>import('@/views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
