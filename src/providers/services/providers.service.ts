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
        return data.message;
    } catch (error) {
        throw error;
        
    }
}

async function changeStatus(provider:IProvider) {
    try {
        const data = await inventoryDb.patch(`/providers/${provider.id}`, { status: !provider.status })
        return 'Se cambio es estado'
        
    } catch (error) {
        throw error;
    }
}

export default {
    find,
    create,
    remove,
    changeStatus
}