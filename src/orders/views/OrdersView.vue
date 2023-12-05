<script setup lang='ts'>
import OrdersTable from "@/orders/components/OrdersTable.vue";
import { onMounted } from 'vue';
import { useOrderStore } from '../store/order';
const orderStore = useOrderStore();

onMounted(() => {
    orderStore.getAllOrders();
})

</script>

<template>
    <main class="container pt-[2rem]">
        <section class="mb-6">
            <h1>Gestion de ventas</h1>
            <p>Controla tus ventas</p>
        </section>

        <OrdersTable/>

    </main>
</template>
