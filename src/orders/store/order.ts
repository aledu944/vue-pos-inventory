import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import orderService from '../services/order.service';
import type { IOrdersResponse } from '../interface/orders-response';

export const useOrderStore = defineStore('order', () => {

    const isLoading = ref(false);
    const orders = ref<IOrdersResponse[]>([]);

    async function getAllOrders() {
        isLoading.value = true;
        const data = await orderService.find();
        orders.value = data ?? [];
        isLoading.value = false;   
    }


    onMounted(() => {
        getAllOrders();
    })

    return {
        orders,
    }

});