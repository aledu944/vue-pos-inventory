import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from "../auth/layouts/AuthLayout.vue";
import MainLayout from "../shared/layouts/MainLayout.vue";
import ProductsLayout from "@/products/layouts/ProductsLayout.vue";

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
    {
      path: '/',
      name: 'dashboard',
      component: () => MainLayout,
      children: [
        {
          path: '/products',
          redirect: 'products',
          component: () => ProductsLayout,
          children: [
            {
              path: '/products',
              name: 'products',
              component: () => import('../products/views/ProductsView.vue'),
            },
            {
              path: 'new',
              name: 'new-product',
              component: () => import('../products/views/NewProductView.vue'),
            },
            {
              path: '/categories',
              name: 'categories',
              component: () => import('../categories/views/CategoriesView.vue'),
            },
            {
              path: '/categories/new',
              name: 'new-category',
              component: () => import('../categories/views/NewCategoryView.vue'),
            },
          ]
        },

      ]
    }
  ]
})

export default router
