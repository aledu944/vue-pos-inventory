import { onMounted } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router';
import productService from '../services/product.service';


interface ProductsStore {
    createNewProduct: (image: any, product: {
        name: string;
        description: string;
        categoryId: string;
        price: number;
    }) => Promise<void>
}

export const useProductsStore = defineStore('products', (): ProductsStore => {


    async function getProducts() {
        
    }

    async function createNewProduct(image: any, product: { name: string, description: string, categoryId: string, price: number  }) {
        await productService.create(image, product);
        getProducts();
        router.back();
    }

    onMounted( async () => {
        getProducts();
    })

    return {
        createNewProduct,
    }

});