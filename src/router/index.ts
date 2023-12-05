import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import authService from '@/auth/services/auth.service';
import { useToastStore } from '@/shared/stores/toast';

import AuthLayout from "../auth/layouts/AuthLayout.vue";
import MainLayout from "../shared/layouts/MainLayout.vue";
import UsersLayout from '@/users/layouts/UsersLayout.vue';
import ProductsLayout from "@/products/layouts/ProductsLayout.vue";
import OrdersLayout from '@/orders/layouts/OrdersLayout.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      redirect: { name: 'auth-login' },
      component: AuthLayout,
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
      redirect: 'products',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/products',
          redirect: 'products',
          component: ProductsLayout,
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
          path: '/users',
          redirect: 'users',
          component: UsersLayout,
          meta: { requiresRoleAdmin: true },
          children: [
              {
                path: '/users',
                name: 'users',
                component: () => import('@/users/views/UsersView.vue'),
              },
              {
                path: '/users/new',
                name: 'new-user',
                component: () => import('@/users/views/NewUserView.vue'),
              },
          ]
        },
        {
          path: 'orders',
          name: 'orders',
          redirect: 'orders',
          component: OrdersLayout,
          children: [
            {
              path: '/orders',
              name: 'orders',
              component: () => import('@/orders/views/OrdersView.vue'),
            },
            {
              path: '/orders/:id',
              name: 'order',
              component: () => import('@/orders/views/OrderDetailsView.vue'),
            }

          ]
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

    const data = await authService.validate(token!);

    if (!data?.user) {
      next({ path: '/auth/login' })
      return;
    }

    localStorage.setItem('AUTH_INVENTORY_TOKEN', data.token);
    localStorage.setItem('AUTH_INVENTORY_USER', JSON.stringify(data.user));

    if (requiresRoleAdmin && data.user.role !== "admin") {

      toastStore.showToast('error', 'No tiene acceso a la ruta')
      next({ path: '/products' })
      return;

    }

    next();
    return;
  }

  next();
  return;

})

export default router