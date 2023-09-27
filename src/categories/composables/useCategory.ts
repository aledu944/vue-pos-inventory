import { reactive, ref } from 'vue';
import { useToastStore } from '../../shared/stores/toast';
import { useCategoriesStore } from '../stores/categories';
import { storeToRefs } from 'pinia';

export const useCategory = () => {

    const toastStore = useToastStore();
    const categoriesStore = useCategoriesStore();
    const { isLoading, categories } = storeToRefs(categoriesStore);


    const isOpen = ref(false)

    const image = ref();
    const preImage = ref('');

    const newCategory = reactive({
        name: '',
        description: '',
    });

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        image.value =  file;
        preImage.value = URL.createObjectURL(image.value);
    } 

    function handleSubmit() {
        if( Object.values(newCategory).includes('') ){
            toastStore.showToast('error',"Ingrese valores correctos")
            return;
        }

        categoriesStore.createNewCategory(image.value, newCategory)
    }

    function closeModal() {
        isOpen.value = false
    }
    
    function openModal() {
        isOpen.value = true
    }

    return {
        categories,
        isLoading,
        isOpen,
        newCategory,
        preImage,
        
        closeModal,
        handleFileChange,
        handleSubmit,
        openModal,
    }
}