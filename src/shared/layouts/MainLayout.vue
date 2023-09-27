<script setup lang='ts'>
import { RouterView } from 'vue-router';
import { useUiStore } from '../stores/ui';

import NavMenu from '../components/NavMenu.vue';
import SideMenu from '../components/SideMenu.vue';
import ToastMessage from '../components/ToastMessage.vue';

const uiStore = useUiStore();

</script>

<template>
    <SideMenu/>
    <div class="overflow-x-hidden relative min-h-screen" :class="uiStore.isMenuOpen ? 'blur-[4px] backdrop-blur-none' : ''">
        <ToastMessage/>
        <NavMenu/>
        <RouterView/>
    </div>
</template>