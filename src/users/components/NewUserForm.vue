<script lang="ts" setup>
import { useCreateUser } from '../composables/useCreateUser';

const { handleSubmit, newUser, roles } = useCreateUser();

</script>

<template>
    <form
        @submit.prevent="handleSubmit"
        class="new--user__form"
    >

        <div>
            <label for="name">Nombre: </label>
            <input class="border-gray-300 border-2" v-model="newUser.name" type="text" name="name" id="name" placeholder="Nombre del usuario">
        </div>

        <div>
            <label for="lastname">Apellidos: </label>
            <input class="border-gray-300 border-2" v-model="newUser.lastname"  type="text" name="lastname" id="lastname" placeholder="Apellidos del usuario">
        </div>

        <div>
            <label for="email">Correo electronico: </label>
            <input class="border-gray-300 border-2" v-model="newUser.email" type="email" name="email" id="email" placeholder="usuario@correo.com">
        </div>

        <div class="flex items-end gap-3">
            <div>
                <label for="password">Contraseña: </label>
                <input class="border-gray-300 border-2" v-model="newUser.password" type="password" name="password" id="password" placeholder="Contraseña">
            </div>
            <div class="btn-secondary max-w-max cursor-pointer">Generar contraseña</div>
        </div>

        <select v-model="newUser.roleId"
            class="border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:border-primary outline-none">
            <option disabled value="">Seleccione un rol</option>
            <option :value="role.id" v-for="role in roles" :key="role.id">
                {{ role.name }}
            </option>
        </select>

        <button class="btn-primary" type="submit">Añadir usuario</button>


    </form>
</template>
