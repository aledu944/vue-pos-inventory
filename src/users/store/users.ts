import { onMounted } from "vue";
import { defineStore } from "pinia";
import { useToastStore } from "@/shared/stores/toast";

import { isAxiosError } from "axios";
import userService from "../services/user.service";
import router from "@/router";


export const useUsersStore = defineStore('users', () => {

    const toastStore = useToastStore();
        
    onMounted(() => {
        getAllUsers();
    })
    
    async function getAllUsers() {
        
    }

    async function createNewUser(user: { email: string, password: string, roleId: string, name: string, lastname: string }) {
        try {
            const token = localStorage.getItem('AUTH_INVENTORY_TOKEN');
            const data = await userService.create(user, token!);
            toastStore.showToast('success', "Usuario creado")
            router.push('/users');
        } catch (error) {
            handleError(error);
        }    


    }


    
    async function handleError(error:unknown) {
        if( isAxiosError(error) ){
            const errorMessage = error.response?.data.message;
            toastStore.showToast('error', Array.isArray(errorMessage) ? errorMessage[0] : errorMessage ) 
        }
    }

    return {
        createNewUser
    }
})