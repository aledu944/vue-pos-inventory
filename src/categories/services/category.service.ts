import inventoryDb from "@/shared/api/inventoryDb"


const remove = async (id: string): Promise<{ message: string }> => {
    const { data } = await inventoryDb.delete<{ message: string }>(`/categories/${id}`);
    return data;
}

export default {
    remove
}