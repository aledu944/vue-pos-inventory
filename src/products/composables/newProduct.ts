import { reactive, ref } from 'vue';

import { useToastStore } from "@/shared/stores/toast";
import { useProductsStore } from "@/products/store/products";

export const useNewProduct = () => {
    
    const toastStore = useToastStore();
    const productsStore = useProductsStore();

    const image = ref();    
    const preImage = ref('');



    const newProduct = reactive({
        name: "",
        description: "",
        price: 0,
        categoryId: "",
        brandId: "",
        providerId: "",
        stock: 0,
    })


    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        image.value =  file;
        preImage.value = URL.createObjectURL(image.value);
    } 

    function handleSubmit() {
        if( Object.values(newProduct).includes('') ){
            toastStore.showToast('error',"Ingrese valores correctos")
            return;
        }

        productsStore.createNewProduct(image.value, newProduct)
    }

    
    return {
        preImage,
        newProduct,

        handleFileChange,
        handleSubmit,
    }
}