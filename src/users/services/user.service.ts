
import inventoryDb from '@/shared/api/inventoryDb';

async function create(user: { email: string, password: string, roleId: string, name: string, lastname: string }, token: string) {

    try {
        const { data } = await inventoryDb.post('/auth/register', user, {
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json'
            }
        })
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
}


export default {
    create,
}