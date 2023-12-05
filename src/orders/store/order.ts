import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import orderService from '../services/order.service';
import type { IOrdersResponse } from '../interface/orders-response';
import type { IFullOrder } from '../interface/full-order';
import router from '@/router';
import { useToastStore } from '@/shared/stores/toast';

export const useOrderStore = defineStore('order', () => {

    const isLoading = ref(false);
    const orders = ref<IOrdersResponse[]>([]);
    const order = ref<IFullOrder>({} as IFullOrder);


    const toastStore = useToastStore();

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


    async function createNewOrder(sale:any) {
        try {
            const message = await orderService.create(sale);
            toastStore.showToast('success', message)
            router.push('/orders');
            getAllOrders();
        } catch (error) {
            toastStore.showToast('error', 'Error al crear la venta')
        }
    }

    onMounted(() => {
        getAllOrders();
    })

    return {
        order,
        orders,
        isLoading,
        getOrderById,
        createNewOrder
    }

});