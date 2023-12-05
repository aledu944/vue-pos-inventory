import { onMounted, reactive, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router';
import productService from '../services/product.service';
import type { IProductsResponse } from '../interfaces/products-response';
import type { IFullProduct } from '../interfaces/full-product';




export const useProductsStore = defineStore('products', () => {
    const isLoading = ref(false);
    const products = ref<IProductsResponse[]>([])
    const product = reactive<{
        id: string,
        name: string;
        description: string;
        price: number;
        categoryId: string;
        brandId: string;
        providerId: string;
        stock: number;
    }>({
        id: '',
        name: "",
        description: "",
        price: 0,
        categoryId: "",
        brandId: "",
        providerId: "",
        stock: 0,
    })

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

    async function getProductById(id: string){
        try {
            const data = await productService.findById(id);
            product.id = data.id;
            product.brandId = data.brand.id;
            product.categoryId = data.category.id;
            product.description = data.description;
            product.name = data.name;
            product.price = data.price;
            product.stock = +data.stock;
            product.providerId = data.provider.id;
            
        } catch (error) {
            console.log(error);
        }
    }


    async function updateProduct(image: any,) {
        await productService.update(image, product);
        getProducts();
        router.back();
    }

    onMounted( async () => {
        getProducts();
    })

    return {
        product,
        products,
        isLoading,
        getProducts,
        createNewProduct,
        getProductById,
        updateProduct
    }

});