<script setup lang='ts'>
import { ref } from "vue";
import { useAuthStore } from '../stores/auth';


const email = ref('');
const password = ref('');

const authStore = useAuthStore();
const handleSubmit = () => {
    authStore.loginWithCredentials(email.value, password.value);
}

</script>

<template>
    <form @submit.prevent="handleSubmit" class="w-full px-8 flex flex-col">
        <div class="max-w-sm w-full mx-auto flex flex-col gap-2 mb-6">
            <label for="login-email">Correo electronico:</label>
            <input id="login-email" type="email" name="email" placeholder="correo@correo.com" v-model="email">
        </div>

        <div class="max-w-sm w-full mx-auto flex flex-col gap-2 mb-8">
            <label for="login-password">Contraseña:</label>
            <input autocomplete="current-password" id="login-password" type="password" name="password" placeholder="Tu contraseña" v-model="password">
        </div>
        <button type="submit" class="max-w-sm mx-auto text-center btn-primary">
            Iniciar Sesion
        </button>
    </form>
</template>
