import inventoryDb from "@/shared/api/inventoryDb";
import { useToastStore } from "@/shared/stores/toast";
import { isAxiosError } from "axios";
import type { IProductsResponse } from "../interfaces/products-response";

const toastStore = useToastStore();


async function find(): Promise<IProductsResponse[]> {
    const token = localStorage.getItem('AUTH_INVENTORY_TOKEN');

    const { data } = await inventoryDb.get<IProductsResponse[]>('/products',{
        headers: {
            Authorization: 'Bearer ' + token,
        }
    });
    return data;

}

async function create(image: any, product: { name: string, description: string, categoryId: string, price: number, stock: number }) {
    const formData = new FormData();
    formData.append('file', image);

    const token = localStorage.getItem('AUTH_INVENTORY_TOKEN');
    try {
        const { data: imageUrl } = await inventoryDb.post('/files/uploads', formData);
        await inventoryDb.post('/products', {
            ...product,
            image: imageUrl
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json'
            }
        })

        toastStore.showToast('success', "Producto creado")

    } catch (error) {
        if (isAxiosError(error)) {
            const errorMessage = error.response?.data.message;
            toastStore.showToast('error', Array.isArray(errorMessage) ? errorMessage[0] : errorMessage)
        }
    }
}

export default {
    create,
    find
}