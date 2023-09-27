import { storeToRefs } from 'pinia';
import { ref, defineProps, reactive } from 'vue';
import { useBrandsStore } from '../store/brands';

export const useBrands = () => {

    const brandsStore = useBrandsStore();
    const { brand } = storeToRefs(brandsStore);

    const isOpen = ref(false)
    const newBrand = reactive({
        name: ''
    })
      

    function closeModal() {
        isOpen.value = false
    }

    function openModal() {
        isOpen.value = true
    }
    
    const handleCreateSubmit = () => {
        brandsStore.createNewBrand( newBrand );
        newBrand.name = '';
        closeModal()          
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
        newBrand,
        isOpen,

        // METHODS
        closeModal,
        handleClick,
        handleCreateSubmit,
        handleEditSubmit,
        openModal,

    }
}