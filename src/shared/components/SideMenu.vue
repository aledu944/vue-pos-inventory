<script setup lang='ts'>
import { RouterLink } from 'vue-router';
import { useUiStore } from '../stores/ui';
import { useAuthStore } from '@/auth/stores/auth';
import { storeToRefs } from 'pinia';

const uiStore = useUiStore();

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

</script>

<template>
    <nav  :class="uiStore.isMenuOpen ? 'sidemenu-active' : '' " class="sidemenu">
        <RouterLink class="font-extrabold text-xl" :to="{ name:'dashboard' }">
            Vue <span class="text-gradient">Inventory</span>
        </RouterLink>
        <div class="divider"></div>

        <ul class="flex flex-col gap-2">
            <RouterLink @click="uiStore.handleMenuState" class="sidemenu__link" active-class="sidemenu__link--active" :to="{ name:'products' }">
                <li class="w-full">
                    Productos
                </li>
            </RouterLink>
            <RouterLink @click="uiStore.handleMenuState" class="sidemenu__link" active-class="sidemenu__link--active" :to="{ name:'orders' }">
                <li>
                    Ordenes
                </li>
            </RouterLink>
            <RouterLink  v-if="user?.role === 'admin'" @click="uiStore.handleMenuState" class="sidemenu__link" active-class="sidemenu__link--active" :to="{ name:'users' }">
                <li>
                    Usuarios
                </li>
            </RouterLink>
        </ul>
        <div @click="uiStore.handleMenuState" class="rounded-full border-2 border-gray-400 max-w-max p-1 mx-auto mt-8 cursor-pointer text-gray-500 text-lg">
            <i class="uil uil-multiply flex"></i>
        </div>
    </nav>  

</template>

<style scoped>
    @import "../../assets/main.css";

    @layer components {
        .sidemenu {
            @apply z-20 py-8 px-6 shadow-xl bg-white fixed top-0 -right-[100%] min-w-[300px] h-full transition-all
        }

        .sidemenu-active {
            @apply right-0 rounded-lg min-w-[300px] h-full
        }

        .divider {
            @apply border-t-[1px] border-gray-300 my-3 w-full
        }
    
        .sidemenu__link{
            @apply text-gray-500 p-1 px-3 rounded-md hover:sidemenu__link--active
        }

        .sidemenu__link--active {
            @apply text-white bg-gradient w-full
        }
    
    }

</style>../stores/ui