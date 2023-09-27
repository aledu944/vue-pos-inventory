import { onMounted, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import brandsService from '../services/brands.service';
import { useToastStore } from '@/shared/stores/toast';
import type { IBrand } from '../interfaces/brands';
import { isAxiosError } from 'axios';


interface BrandsStore {
    brands: Ref<IBrand[]>;

    getBrands: () => void;
    deleteBrand: (id: string) => Promise<void>;
    createNewBrand(brand: { name: string }): Promise<void>
}

export const useBrandsStore = defineStore('brands', (): BrandsStore => {

    const toastStore = useToastStore();

    const brands = ref<IBrand[]>([]);
    const isLoading = ref(false);



    const getBrands = async (limit: number = 10, offset: number = 0) => {
        isLoading.value = true;

        try {
        
            brands.value = await brandsService.find(limit, offset);
        
        } catch (error) {
            toastStore.showToast('error', 'Error al cargar, recargue la pagina')
        }
    }

    async function createNewBrand( brand: { name: string } ) {
        isLoading.value = true;
        try {
            await brandsService.create(brand);
            toastStore.showToast('success', 'Se creo la nueva marca')
            getBrands();
            isLoading.value = false;
        } catch (error) {
            if( isAxiosError(error) ){
                toastStore.showToast('error', error.response?.data.message);
            }
        } finally {
            isLoading.value = false;
        }
    }

    async function deleteBrand( id: string ){
        try {
            const message = await brandsService.remove(id);
            toastStore.showToast('success', message!)
            getBrands();
        } catch (error) {
            if( isAxiosError(error) ){
                toastStore.showToast('error', error.response?.data.message);
            }
        }
    }

    onMounted( async () => {
        getBrands();
    })

    return {
        brands,

        getBrands,
        deleteBrand,
        createNewBrand
    }

});