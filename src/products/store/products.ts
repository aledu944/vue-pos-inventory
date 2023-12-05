import { onMounted, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router';
import productService from '../services/product.service';
import type { IProductsResponse } from '../interfaces/products-response';




export const useProductsStore = defineStore('products', () => {
    const isLoading = ref(false);
    const products = ref<IProductsResponse[]>([])

    async function getProducts() {
        isLoading.value = true;
        try {
            products.value = await productService.find();
            isLoading.value = false;
        } catch (error) {
            console.log(error);
        } finally {
            isLoading.value = false;
        }
    }

    async function createNewProduct(image: any, product: { name: string, description: string, categoryId: string, price: number, stock: number  }) {
        
        await productService.create(image, product);
        getProducts();
        router.back();
    }

    onMounted( async () => {
        getProducts();
    })

    return {
        products,
        getProducts,
        createNewProduct,
    }

});