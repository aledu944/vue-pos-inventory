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


export default {
    find,
}