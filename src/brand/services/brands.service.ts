import inventoryDb from "@/shared/api/inventoryDb";

async function find(limit:number = 10, offset:number = 0) {
    const { data } = await inventoryDb.get('/brands');
    return data;
}

async function remove( id: string ): Promise<string | null> {
    try {
        const { data } = await inventoryDb.delete(`/brands/${id}`);
        return data.message;
        
    } catch (error) {
        throw error
    }
}

export default {
    find,
    remove
}