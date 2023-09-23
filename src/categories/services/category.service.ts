import inventoryDb from "@/shared/api/inventoryDb"
import { isAxiosError } from "axios";
import { useToastStore } from '../../shared/stores/toast';

const toastStore = useToastStore();

const remove = async (id: string): Promise<{ message: string }> => {
    const { data } = await inventoryDb.delete<{ message: string }>(`/categories/${id}`);
    return data;
}

const create = async ( image: any, category: { name:string, description: string }) => {
    const formData = new FormData();
    formData.append('file', image);
    
    try {
        const { data: imageUrl } = await inventoryDb.post('/files/uploads', formData);
        await inventoryDb.post('/categories', {
            ...category,
            image: imageUrl
        })

        toastStore.showToast('success', "Categoria creada") 
        
    } catch (error) {
        if( isAxiosError(error) ){
            const errorMessage = error.response?.data.message;
            toastStore.showToast('error', Array.isArray(errorMessage) ? errorMessage[0] : errorMessage ) 
        }
    }

}

export default {
    remove,
    create
}