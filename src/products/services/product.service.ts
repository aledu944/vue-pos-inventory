import inventoryDb from "@/shared/api/inventoryDb";
import { useToastStore } from "@/shared/stores/toast";
import { isAxiosError } from "axios";
import type { IProductsResponse } from "../interfaces/products-response";
import type { IFullProduct } from "../interfaces/full-product";

const toastStore = useToastStore();


async function find(): Promise<IProductsResponse[]> {
    const token = localStorage.getItem('AUTH_INVENTORY_TOKEN');

    const { data } = await inventoryDb.get<IProductsResponse[]>('/products', {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    });
    return data;

}

async function findById(id: string): Promise<IFullProduct> {
    const token = localStorage.getItem('AUTH_INVENTORY_TOKEN');
    try {
        const { data } = await inventoryDb.get<IFullProduct>('/products/' + id, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });
        return data;

    } catch (error) {
        throw error;
    }

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

async function remove(id:string) {
    try {
        await inventoryDb.delete(`/products/${id}`);
        toastStore.showToast('success', "Producto eliminado")

    } catch (error) {
        if (isAxiosError(error)) {
            const errorMessage = error.response?.data.message;
            toastStore.showToast('error', Array.isArray(errorMessage) ? errorMessage[0] : errorMessage)
        }
    }
}

async function update(image: any, product: { id: string, name: string, description: string, categoryId: string, price: number, stock: number }) {
    const formData = new FormData();
    formData.append('file', image);

    const token = localStorage.getItem('AUTH_INVENTORY_TOKEN');
    
    
    try {
        if( image ){
            const { data: imageUrl } = await inventoryDb.post('/files/uploads', formData);
            await inventoryDb.patch('/products/' + product.id, {
                name: product.name,
                description: product.description,
                categoryId: product.categoryId,
                price: product.price,
                stock: product.stock,
                image: imageUrl
            }, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/json'
                }
            })
    
            toastStore.showToast('success', "Producto actualizado")
            return;
        }
        await inventoryDb.patch('/products/' + product.id, {
            name: product.name,
            description: product.description,
            categoryId: product.categoryId,
            price: product.price,
            stock: product.stock,
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json'
            }
        })
        toastStore.showToast('success', "Producto actualizado")

    } catch (error) {
        if (isAxiosError(error)) {
            const errorMessage = error.response?.data.message;
            toastStore.showToast('error', Array.isArray(errorMessage) ? errorMessage[0] : errorMessage)
        }
    }
}

export default {
    create,
    find,
    findById,
    update,
    remove
}