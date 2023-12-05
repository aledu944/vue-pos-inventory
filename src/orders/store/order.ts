import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import orderService from '../services/order.service';
import type { IOrdersResponse } from '../interface/orders-response';
import type { IFullOrder } from '../interface/full-order';
import router from '@/router';

export const useOrderStore = defineStore('order', () => {

    const isLoading = ref(false);
    const orders = ref<IOrdersResponse[]>([]);
    const order = ref<IFullOrder>({} as IFullOrder);

    async function getAllOrders() {
        isLoading.value = true;
        const data = await orderService.find();
        orders.value = data ?? [];
        isLoading.value = false;   
    }

    async function getOrderById(id:string) {
        isLoading.value = true;
        const data = await orderService.findById(id);
        if( !data ){
            router.push('/orders');
            return;
        }
        order.value = data!;
        isLoading.value = false;   
        
    }

    onMounted(() => {
        getAllOrders();
    })

    return {
        order,
        orders,
        isLoading,
        getOrderById
    }

});