import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Root',
      redirect: '/runner'
    },
    {
      path: '/runner',
      name: 'Runner',
      component: () => import('@/views/Runner.vue')
    },
    {
      path: '/exec/:id',
      name: 'Exec',
      component: () => import('@/views/Exec.vue')
    },
    {
      path: '/setting',
      name: 'Setting',
      component: () => import('@/views/Setting.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/About.vue')
    }
  ]
})

export default router
