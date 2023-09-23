import { reactive, ref } from 'vue';
import { useToastStore } from '../../shared/stores/toast';
import { useCategoriesStore } from '../stores/categories';

export const useNewCategory = () => {

    const toastStore = useToastStore();
    const categoryStore = useCategoriesStore();

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

        categoryStore.createNewCategory(image.value, newCategory)
    }

    return {
        preImage,
        newCategory,

        handleFileChange,
        handleSubmit
    }
}