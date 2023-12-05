import axios from "axios";
import inventoryDb from "@/shared/api/inventoryDb"
import { useToastStore } from "@/shared/stores/toast";

import type { IOrdersResponse } from "../interface/orders-response";
import type { IFullOrder } from "../interface/full-order";

const toastStore = useToastStore();


async function find() {

    const token = localStorage.getItem('AUTH_INVENTORY_TOKEN');

    try {
        const { data } = await inventoryDb.get<IOrdersResponse[]>('/orders', {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });

        return data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data.message;
            toastStore.showToast('error', Array.isArray(errorMessage) ? errorMessage[0] : errorMessage)
        }
    }
}

async function findById(id: string) {
    const token = localStorage.getItem('AUTH_INVENTORY_TOKEN');

    try {
        const { data } = await inventoryDb.get<IFullOrder>(`/orders/${ id }`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });

        return data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data.message;
            toastStore.showToast('error', Array.isArray(errorMessage) ? errorMessage[0] : errorMessage)
        }
    }
}


export default {
    find,
    findById
}