import inventoryDb from "@/shared/api/inventoryDb";

async function find(limit:number = 10, offset:number = 0) {
    const { data } = await inventoryDb.get('/brands');
    return data;
}

async function create(brand: { name: string }) {
    try {
        const data = await inventoryDb.post('/brands', { name: brand.name });
        return data;   
    } catch (error) {
        throw error
    }
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
    create,
    remove
}