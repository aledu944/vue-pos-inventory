import { onMounted, reactive, ref } from "vue";

import { useUsersStore } from "../store/users";
import authService from "@/auth/services/auth.service";
import type { IRolesResponse } from "@/auth/interfaces";

export const useCreateUser = () => {
    const usersStore = useUsersStore();
    const roles = ref<IRolesResponse[]>([])

    const newUser = reactive({
        name: '',
        lastname: '',
        email: '',
        password: '',
        roleId: '',
    })


    const getRoles = async () => {
        const token = localStorage.getItem('AUTH_INVENTORY_TOKEN');
        const rolesResponse = await authService.getAllRoles(token!);
        roles.value = rolesResponse!;
    }

    onMounted(() => {
        getRoles();
    })

    const handleSubmit = () => {
        usersStore.createNewUser(newUser);
    }


    return {

        roles,
        newUser,

        handleSubmit,

    }
}
