<script setup lang='ts'>
    import { RouterView } from 'vue-router';
    import LogoBanner from '../components/LogoBanner.vue';


</script>

<template> 
    <main class="min-h-screen grid grid-cols-2">
        <LogoBanner/>
        <RouterView/>
    </main>
</template>