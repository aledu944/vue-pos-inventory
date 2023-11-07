import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from "../auth/layouts/AuthLayout.vue";
import MainLayout from "../shared/layouts/MainLayout.vue";
import ProductsLayout from "@/products/layouts/ProductsLayout.vue";
import UsersLayout from '@/users/layouts/UsersLayout.vue';
import authService from '@/auth/services/auth.service';
import type { IUser } from '@/auth/interfaces';
import { useToastStore } from '@/shared/stores/toast';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      redirect: { name: 'auth-login' },
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
      meta: { requiresAuth: true },
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
            {
              path: '/brands',
              name: 'brands',
              component: () => import('../brand/views/BrandsView.vue'),
            },
            {
              path: '/providers',
              name: 'providers',
              component: () => import('../providers/views/ProvidersView.vue'),
            },
          ]
        },
        {
          path: 'users',
          name: 'users',
          component: UsersLayout,
          meta: { requiresRoleAdmin: true },
          children: [
            {
              path: '/users',
              name: 'users',
              component: () => import('../users/views/UsersView.vue'),
            }
          ]
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('@/orders/views/OrdersView.vue'),
        }

      ]
    }
  ]
})

router.beforeEach(async (to, form, next) => {

  const requiresAuth = to.matched.some(url => url.meta.requiresAuth);
  const requiresRoleAdmin = to.matched.some(url => url.meta.requiresRoleAdmin);
  const toastStore = useToastStore();


  if (requiresAuth) {
    const token = localStorage.getItem('AUTH_INVENTORY_TOKEN');

    if (!token)
      next({ path: '/auth/login' })


    // VALIDAR EL TOKEN
    const data = await authService.validate(token!);

    if (!data?.user) {
      next({ path: '/auth/login' })
      return;
    }

    localStorage.setItem('AUTH_INVENTORY_TOKEN', data.token);
    localStorage.setItem('AUTH_INVENTORY_USER', JSON.stringify(data.user));

    next();
    return;

  }

  next();
  return;


})

export default router