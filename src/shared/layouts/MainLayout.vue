<script setup lang='ts'>
    import NavMenu from '../components/NavMenu.vue';
    import { RouterView } from 'vue-router';


</script>

<template>
    <NavMenu/>
    <main class="container pt-[3rem]">
        <RouterView/>
    </main>
</template>

