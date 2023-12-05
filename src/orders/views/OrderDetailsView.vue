<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

import { useOrderStore } from '../store/order';
import { formatCurrency } from '../../shared/helpers/format-currency';
import { formatDate } from '../../shared/helpers/format-date';
import CircularProgress from '@/shared/components/CircularProgress.vue';

const { params } = useRoute();
const orderStore = useOrderStore();
const { order, isLoading } = storeToRefs(orderStore);

orderStore.getOrderById(params.id as string);

</script>

<template>
    <main class="container pt-8">
        
        <CircularProgress v-if="isLoading" />

        <section  v-else class="bg-white p-8 rounded-md shadow-sm space-y-8">
            <h1 class="mb-8">Detalles de la venta</h1>

            <div>
                <h2 class="mb-4">Cliente</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div>
                        <label>Nombre:</label>
                        <input type="text" disabled :value="order?.client?.name">
                    </div>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" disabled :value="order?.client?.lastname">
                    </div>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" disabled :value="order?.client?.email">
                    </div>
                </div>
            </div>

            <div>
                <h2 class="mb-4">Detalles</h2>
                <div class="grid grid-cols-6 gap-8 font-bold">
                    <h4>Imagen</h4>
                    <h4>Producto</h4>
                    <h4>Precio</h4>
                    <h4>Cantidad</h4>
                    <h4>SubTotal</h4>
                    <h4>Emicion</h4>
                </div>
                <div class="border-t border-gray-200 my-4"></div>
                <ul class="space-y-4">
                    <li 
                    class="grid grid-cols-6 gap-8 items-center"
                    v-for="{ product, quantity } in order.orderDetails" :key="product.id">
                        <img
                            :src="product?.image"
                            :alt="product?.name"
                            class="max-w-[70px]"
                        />
                        <p>{{ product?.name }}</p>
                        <p>{{  formatCurrency( product.price )}}</p>
                        <p>{{ quantity }}</p>
                        <p>{{ formatCurrency( product?.price * quantity ) }}</p>
                        <p>{{ formatDate(order?.createdAt) }}</p>
                    </li>
                </ul>
                <div class="text-end">
                    <p class="text-xl font-bold">Total: {{ formatCurrency(order!.total) }}</p>
                </div>
            </div>

        </section>
    </main>
</template>
