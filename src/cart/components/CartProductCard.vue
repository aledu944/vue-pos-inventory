<script lang="ts" setup>
import type { IProductsResponse } from '../../products/interfaces/products-response';
import { formatCurrency } from '../../shared/helpers/format-currency';
import { useCartStore } from '../store/cart';

defineProps<{
    product: IProductsResponse;
}>()


const cartStore = useCartStore();


</script>

<template>
    <div class="bg-white p-8 rounded-md shadow-sm">
        <img
            :src="product.image"
            :alt="product.name"
        />
        <h3>{{ product.name }}</h3>
        <p class="text-slate-600 line-clamp-2 mb-2">{{ product.description }}</p>
        <p>Precio: {{ formatCurrency(product.price) }}</p>
        <p>Stock: {{ product.stock }}</p>
        <button @click="cartStore.addProductCart(product, 1)" class="btn-secondary">Agregar al carrito</button>

    </div>
</template>
