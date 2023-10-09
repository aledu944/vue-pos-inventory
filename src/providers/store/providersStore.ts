import { onMounted, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { isAxiosError } from 'axios';

import { useToastStore } from '@/shared/stores/toast';
import type { IProvider } from '../interfaces/provider';
import providersService from '../services/providers.service';


interface ProvidersStore {
    isLoading: Ref<boolean>,
    providers: Ref<IProvider[]>
}

export const useProvidersStore = defineStore('providers', (): ProvidersStore => {
    
    const toastStore = useToastStore();

    const providers = ref<IProvider[]>([]);
    const isLoading = ref(false);

    async function getProviders() {
        isLoading.value = true;
        try {
            const data = await providersService.find();
            providers.value = data;

        } catch (error) {
            if( isAxiosError(error) ){
                toastStore.showToast('error', error.response?.data.message);
            }
        } finally {
            isLoading.value = false;
        }
    }

    onMounted( async () => {
        getProviders();
    })

    return {
        isLoading,
        providers,
    }

});