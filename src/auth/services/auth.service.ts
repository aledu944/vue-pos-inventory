import axios from "axios";
import inventoryDb from "@/shared/api/inventoryDb"
import { useToastStore } from "@/shared/stores/toast";
import type { ILoginResponse, IRolesResponse } from "../interfaces";
import type { IClientsResponse } from "../interfaces/clients-response";


async function login(email: string, password: string) {
    const toastStore = useToastStore();

    try {
        const { data } = await inventoryDb.post<ILoginResponse>('/auth/login', { email, password });
        toastStore.showToast('success', 'Inicio de sesion correcto');
        return data;

    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toastStore.showToast('error', error.response?.data.message)
        }
    }
}

async function validate(token: string) {
    const toastStore = useToastStore();

    try {
        const { data } = await inventoryDb.get<ILoginResponse>('/auth/check-auth', {
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json'
            }
        });
        return data;

    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toastStore.showToast('error', error.response?.data.message ? 'No esta autenticado' : error.response?.data.message)
        }
    }
}

async function getAllRoles( token: string ) {
    const toastStore = useToastStore();

    try {
        const { data } = await inventoryDb.get<IRolesResponse[]>('/roles', {
            headers: {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json'
            }
        });
        return data;

    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toastStore.showToast('error', error.response?.data.message ? 'No esta autenticado' : error.response?.data.message)
        }
    }
}


async function getAllClients() {
    const token = localStorage.getItem('AUTH_INVENTORY_TOKEN');
    const toastStore = useToastStore();

    try {
        const { data } = await inventoryDb.get<IClientsResponse[]>('/auth/clients', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return data;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            toastStore.showToast('error', error.response?.data.message ? 'No esta autenticado' : error.response?.data.message)
        }
    }
}

export default {
    login,
    validate,
    getAllRoles,
    getAllClients
}