import { onMounted, reactive, ref, type Ref } from "vue";
import { defineStore } from "pinia";
import router from "@/router";

import { isAxiosError } from 'axios';
import inventoryDb from "@/shared/api/inventoryDb";
import type { ICategory } from "../interfaces/category";
import categoryService from "../services/category.service";
import { useToastStore } from '../../shared/stores/toast';

interface CategoriesStore {
    isLoading: Ref<boolean>;
    categories: Ref<ICategory[]>;

    getAllCategories: () => Promise<void>
    deleteCategory: (id: string) => Promise<void>
    createNewCategory(image: any, category: { name: string; description: string }): Promise<void>;
} 

export const useCategoriesStore = defineStore('categories', (): CategoriesStore => {

    const toastStore = useToastStore();

    const isLoading = ref(false);
    const categories = ref<ICategory[]>([]);

    const getAllCategories = async () => {
        isLoading.value = true;

        try {
            const { data } = await inventoryDb.get<ICategory[]>('/categories');
            categories.value = data;
            isLoading.value = false;

        } catch (error) {
            
        } finally {
            isLoading.value = false;
        }
    }


    async function deleteCategory( id: string ){
        const { message } = await categoryService.remove(id);
        getAllCategories();
    }

    async function createNewCategory( image: any, category: { name:string, description: string } ){
        try {
            await categoryService.create(image, category);
            getAllCategories();
            router.back();
            toastStore.showToast('success', 'La categoria fue creada' ) 
        } catch (error) {
            if( isAxiosError(error) ){
                const errorMessage = error.response?.data.message;
                toastStore.showToast('error', Array.isArray(errorMessage) ? errorMessage[0] : errorMessage ) 
            }
        }
    }


    onMounted(() => {
        getAllCategories();
    });

    return {
        isLoading,
        categories,

        // METHOS
        getAllCategories,
        deleteCategory,
        createNewCategory
    }
    
});