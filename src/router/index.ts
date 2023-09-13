import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from "../auth/layouts/AuthLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: () => AuthLayout,
      children: [
        {
          name: 'auth-login',
          path: 'login',
          component: () => import('../auth/views/LoginView.vue'),
        }
      ]
    },
  ]
})

export default router
