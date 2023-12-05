import { ref } from "vue";
import router from "@/router";
import { defineStore } from "pinia";

import type { IUser } from "../interfaces";
import authService from "../services/auth.service";
import { useToastStore } from "@/shared/stores/toast";


export const useAuthStore = defineStore('auth', () => {

    const toastStore = useToastStore();
    const user = ref<IUser | null>(null);
    const token = ref<string | null>(null);
    const isLoading = ref(false);


    async function loginWithCredentials(email: string, password: string) {
        isLoading.value = true;
        if (email.trim() === '' || password.trim() === '') {
            toastStore.showToast('error', 'Inserte datos validos')
        }

        const data = await authService.login(email, password);

        if (!data) {
            isLoading.value = false;
            return;
        }

        localStorage.setItem('AUTH_INVENTORY_TOKEN', data.token);
        localStorage.setItem('AUTH_INVENTORY_USER', JSON.stringify(data.user));


        user.value = data!.user;
        token.value = data!.token;

        isLoading.value = false;
        router.push('/products');
    }

    async function logout() {
        localStorage.removeItem('AUTH_INVENTORY_TOKEN');
        localStorage.removeItem('AUTH_INVENTORY_USER');
        toastStore.showToast('success', "Sesion cerrada")
        router.push('/auth/login');
    }

    return {
        loginWithCredentials,
        logout,
        user
    }
})