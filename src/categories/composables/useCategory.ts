import { reactive, ref } from 'vue';
import { useToastStore } from '../../shared/stores/toast';
import { useCategoriesStore } from '../stores/categories';
import { storeToRefs } from 'pinia';

export const useCategory = () => {

    const toastStore = useToastStore();
    const categoriesStore = useCategoriesStore();
    const { isLoading, categories, category } = storeToRefs(categoriesStore);


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

    function handleUpdate() {
        console.log(image)
        if( Object.values(category).includes('') ){
            toastStore.showToast('error',"Ingrese valores correctos")
            return;
        }
        console.log(category.value.id)
        categoriesStore.updateCategory(category.value.id, image.value, { name: category.value.name, description: category.value.description })
        closeModal();
    }

    function handleClickEdit(id: string){
        categoriesStore.getCategory(id)
        openModal();
    }

    function closeModal() {
        isOpen.value = false
    }
    
    function openModal() {
        isOpen.value = true
    }

    return {
        categories,
        category,
        isLoading,
        isOpen,
        newCategory,
        preImage,
        
        closeModal,
        handleClickEdit,
        handleFileChange,
        handleSubmit,
        handleUpdate,
        openModal,
    }
}