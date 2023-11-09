<script lang="ts" setup>
import { useUsersStore } from '../store/users';
import { formatDate } from '../../shared/helpers/format-date';
import type { IUser } from '../../auth/interfaces/user';

const usersStore = useUsersStore()
const session: IUser = JSON.parse(localStorage.getItem('AUTH_INVENTORY_USER')!);


console.log(session)
</script>

<template>
    <div class="overflow-x-scroll">
        <div class="bg-white py-8 px-6 rounded-md border border-gray-300 w-full min-w-[800px]">
            <div class="grid grid-cols-8 gap-[2rem] mb-3">
                <h4 class="font-bold">Codigo</h4>
                <h4 class="font-bold">Nombres</h4>
                <h4 class="font-bold">Apellidos</h4>
                <h4 class="font-bold">Correo</h4>
                <h4 class="font-bold">Rol</h4>
                <h4 class="font-bold">Creación</h4>
                <h4 class="font-bold text-center">Acciones</h4>
            </div>
            <div class="border border-gray-100 mb-8"></div>

            <div class="space-y-6">
                <div v-for="user in usersStore.users" :key="user.id"
                    class="grid items-center grid-cols-8 text-sm gap-[2rem] text-gray-500">

                    <p class="w-full text-gray-600 line-clamp-1">
                        #{{ user.id }}
                    </p>

                    <p>
                        {{ user.name }}
                        <span class="budget-success" v-show="user.id == session.id">
                            Tu cuenta
                        </span>
                    </p>
                    <p>
                        {{ user.lastname }}
                    </p>
                    <p class="line-clamp-2">
                        {{ user.email ? user.email : 'No tiene email' }}
                    </p>

                    <p class="line-clamp-2">
                        {{ user.role.name }}
                    </p>

                    <p>{{ formatDate(user.createdAt) }}</p>

                    <ActionButton :id="user.id" />
                </div>
            </div>
        </div>
    </div>
</template>
