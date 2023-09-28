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
    category: Ref<ICategory>;
    categories: Ref<ICategory[]>;

    getCategory: (id: string) => Promise<void>
    getAllCategories: () => Promise<void>
    deleteCategory: (id: string) => Promise<void>
    createNewCategory(image: any, category: { name: string; description: string }): Promise<void>;
    updateCategory(id: string, image: any, category: { name: string; description: string }): Promise<void>
} 

export const useCategoriesStore = defineStore('categories', (): CategoriesStore => {

    const toastStore = useToastStore();

    const isLoading = ref(false);
    const category = ref<ICategory>({} as ICategory);
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

    async function updateCategory( id: string, image: any, category: { name:string, description: string } ){
        try {
            await categoryService.update(id, image, category);
            getAllCategories();
            toastStore.showToast('success', 'Se actualizo la categoria' )             
        } catch (error) {
            if( isAxiosError(error) ){
                const errorMessage = error.response?.data.message;
                toastStore.showToast('error', Array.isArray(errorMessage) ? errorMessage[0] : errorMessage ) 
            }
        }
    }

    async function getCategory(id:string) {
        category.value = categories.value.find( cat => cat.id === id)!;
    }


    onMounted(() => {
        getAllCategories();
    });

    return {
        isLoading,
        category,
        categories,
        updateCategory,

        // METHOS
        createNewCategory,
        deleteCategory,
        getAllCategories,
        getCategory,
    }
    
});