import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/login',
    component: () => import('@/pages/common/login/index.vue'),
  },
] as RouteRecordRaw[]
