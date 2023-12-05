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
                        <div>
                            <p class="font-bold">{{product.name}}</p>
                            <p class="text-slate-600">SubTotal: {{formatCurrency(product.price * quantity)}}</p>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-4 border border-slate-300 p-2 rounded-lg">
                                <i @click="cartStore.decrementProductQuantity(product)" class="uil uil-minus cursor-pointer"></i>
                                <p>{{quantity}}</p>
                                <i @click="cartStore.addProductCart(product, 1)" class="uil uil-plus cursor-pointer"></i>
                            </div>
                            <div class="text-xl text-red-500 cursor-pointer" @click="cartStore.removeProductFromCart(product.id)">
                                <i class="uil uil-trash-alt"></i>
                            </div>
                        </div>
                    </li>
                </ul>
                <p class="text-xl font-bold mt-8">Total: {{ formatCurrency(cartStore.total) }}</p>
                <RouterLink :to="{ name:'checkout' }"  class="btn-secondary text-center block ">Ir a generar venta</RouterLink>
            </div>
        </section>
    </main>
</template>
