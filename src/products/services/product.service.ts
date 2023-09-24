import inventoryDb from "@/shared/api/inventoryDb";
import { useToastStore } from "@/shared/stores/toast";
import { isAxiosError } from "axios";

const toastStore = useToastStore();

async function create( image: any, product: { name: string, description: string, categoryId: string, price: number  } ) {
    const formData = new FormData();
    formData.append('file', image);
    

    try {
        const { data: imageUrl } = await inventoryDb.post('/files/uploads', formData);
        await inventoryDb.post('/products', {
            ...product,
            image: imageUrl
        })

        toastStore.showToast('success', "Producto creado") 
        
    } catch (error) {
        if( isAxiosError(error) ){
            const errorMessage = error.response?.data.message;
            toastStore.showToast('error', Array.isArray(errorMessage) ? errorMessage[0] : errorMessage ) 
        }
    }    
}

export default {
    create
}