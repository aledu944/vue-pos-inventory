<script setup lang='ts'>
import { RouterView } from 'vue-router';
import LogoBanner from '../components/LogoBanner.vue';
import ToastMessage from '@/shared/components/ToastMessage.vue';


</script>

<template>
    <main class="min-h-screen grid grid-cols-2 relative overflow-hidden">
        <ToastMessage />
        <LogoBanner />
        <RouterView />
    </main>
</template>