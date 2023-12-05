<script setup lang='ts'>

import { RouterLink } from "vue-router";
import NavMenuAvatar from "./NavMenuAvatar.vue";
import { useUiStore } from '@/shared/stores/ui';
import { useAuthStore } from '../../auth/stores/auth';
import { storeToRefs } from 'pinia';

const uiStore = useUiStore();

const authStore = useAuthStore();
const { user } = storeToRefs(authStore)

</script>

<template>
    <nav class="navbar">
        <div class="container flex justify-between items-center py-4 text-slate-300">
            <RouterLink class="font-extrabold text-xl md:text-2xl text-white" :to="{ name:'dashboard' }">
                Vue <span class="text-gradient">Inventory</span>
            </RouterLink>
            <ul class="hidden md:flex gap-4">
                <li>
                    <RouterLink class="nav__link" active-class="nav__link--active" :to="{ name: 'products' }">
                        Productos
                    </RouterLink>
                </li>
                <li>
                    <RouterLink class="nav__link" active-class="nav__link--active" :to="{ name: 'orders' }">
                        Ventas
                    </RouterLink>
                </li>
                <li>
                    <RouterLink v-if="user?.role === 'admin'" class="nav__link" active-class="nav__link--active" :to="{ name: 'users' }">
                        Usuarios
                    </RouterLink>
                </li>
            </ul>
            <NavMenuAvatar/>
            <div @click="uiStore.handleMenuState" class="flex md:hidden text-xl ml-4">
                <i class="uil uil-bars"></i>
            </div>
        </div>
    </nav>
</template>
@/shared/stores/ui