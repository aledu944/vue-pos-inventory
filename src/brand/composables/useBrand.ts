import { storeToRefs } from 'pinia';
import { ref, reactive } from 'vue';
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

    const handleEditSubmit = (id: string, name: string) => {
        brandsStore.updateBrand(id, name)
        closeModal()
    }

    function handleClick(id: string){
        brandsStore.getBrand(id)
        openModal()
    }  
    
    
    
    return {
        brand,
        isOpen,
        newBrand,
        // METHODS
        closeModal,
        handleClick,
        handleCreateSubmit,
        handleEditSubmit,
        openModal,

    }
}