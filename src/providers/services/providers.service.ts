import inventoryDb from "@/shared/api/inventoryDb"
import type { IProvider } from "../interfaces/provider";

async function find(): Promise<IProvider[]> {
    try {
        
        const { data }= await inventoryDb.get<IProvider[]>('/providers');
        return data;
        
    } catch (error) {
        throw error;
    }
}

async function create(provider: { name: string, email: string, phone: string, direction: string}): Promise<string>{
    try {
        await inventoryDb.post('/providers', provider)
        return 'Se creo un nuevo proveedor'
    } catch (error) {
        throw error;
    }
}

async function remove(id:string): Promise<string> {
    try {
        const { data }= await inventoryDb.delete(`/providers/${id}`)
        console.log(data);
        return data.message;
    } catch (error) {
        throw error;
        
    }
}



export default {
    find,
    create,
    remove
}