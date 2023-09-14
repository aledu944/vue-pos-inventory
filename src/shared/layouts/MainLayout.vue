<script setup lang='ts'>
import { RouterView } from 'vue-router';

import NavMenu from '../components/NavMenu.vue';
import SideMenu from '../components/SideMenu.vue';
import { useUiStore } from '../../stores/ui';

const uiStore = useUiStore();

</script>

<template>
    <SideMenu/>
    <div :class="uiStore.isMenuOpen ? 'blur-[4px] backdrop-blur-none' : ''">
        <NavMenu/>
        <RouterView/>
    </div>
</template>

