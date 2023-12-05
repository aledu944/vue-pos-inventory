import { handleError, onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import orderService from '../services/order.service';
import type { IOrdersResponse } from '../interface/orders-response';
import type { IFullOrder } from '../interface/full-order';
import router from '@/router';
import { useToastStore } from '@/shared/stores/toast';
import axios from 'axios';
import { useCartStore } from '@/cart/store/cart';

export const useOrderStore = defineStore('order', () => {

    const isLoading = ref(false);
    const orders = ref<IOrdersResponse[]>([]);
    const order = ref<IFullOrder>({} as any);


    const cartStore = useCartStore();
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


    async function createNewOrder(sale:  { total: number; type: string; clientId: string; userId: string | undefined }) {
        
        const items = cartStore.cart.map(item => {
            return {
                productId: item.product.id,
                quantity: item.quantity,
            }
        })

        const order = {
            ...sale,
            items: [...items],
        }


        try {
            const message = await orderService.create(order);
            toastStore.showToast('success', message)
            await getAllOrders();
            router.replace('/orders')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data.message;
                toastStore.showToast('error', Array.isArray(errorMessage) ? errorMessage[0] : errorMessage)
            }
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