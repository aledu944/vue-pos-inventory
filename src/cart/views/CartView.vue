<script lang="ts" setup>
import { useProductsStore } from '../../products/store/products';
import { storeToRefs } from 'pinia';
import CartProductCard from '../components/CartProductCard.vue';

const productsStore = useProductsStore();
const { products } = storeToRefs(productsStore);

</script>

<template>
    <section class="container pt-8">
        <ul class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-8">
            <li v-for="product in products" :key="product.id">
                <CartProductCard v-show="+product.stock > 0" :product="product"/>
            </li>
        </ul>        
    </section>
</template>
