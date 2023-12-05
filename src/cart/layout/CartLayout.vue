<script lang="ts" setup>
import { useCartStore } from '../store/cart';
import { storeToRefs } from 'pinia';
import { formatCurrency } from '../../shared/helpers/format-currency';
const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);



</script>

<template>
    <main class="min-w-full md:flex h-screen">
        <section>
            <RouterView/>
        </section>
        <section class="max-w-md w-full bg-white ">
            <div class="p-8">
                <h2 class="mb-6">Carrito</h2>
                <ul class="space-y-4">
                    <li class="flex justify-between" v-for="{ product, quantity } in cart" :key="product.id">
                        <p class="font-semibold">{{product.name}}</p>
                        <p>x {{quantity}}</p>
                    </li>
                </ul>
                <p class="text-xl font-bold mt-8">Total: {{ formatCurrency(cartStore.total) }}</p>
                <RouterLink :to="{ name:'checkout' }"  class="btn-secondary text-center block ">Ir a generar venta</RouterLink>
            </div>
        </section>
    </main>
</template>
