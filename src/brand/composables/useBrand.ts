import { storeToRefs } from 'pinia';
import { ref, defineProps } from 'vue';
import { useBrandsStore } from '../store/brands';

export const useBrands = () => {

    const brandsStore = useBrandsStore();
    const { brand } = storeToRefs(brandsStore);

    const isOpen = ref(false)


    function closeModal() {
        isOpen.value = false
    }

    function openModal() {
        isOpen.value = true
    }

    const handleEditSubmit = () => {
        closeModal()
    }

    function handleClick(id: string){
        brandsStore.getBrand(id)
        openModal()
    }  
    
    
    
    return {
        brand,
        isOpen,

        // METHODS
        closeModal,
        handleClick,
        handleEditSubmit,
        openModal,

    }
}