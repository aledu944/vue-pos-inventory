<script setup lang='ts'>
    import PopoverProductNav from './PopoverProductNav.vue';
    import { ProductsNavOptions } from "../../shared/constants/products-nav";

</script>

<template>
    <nav class="bg-white py-6 shadow-sm">
        <div class="w-full flex flex-col md:flex-row gap-5 justify-evenly container">
            <PopoverProductNav 
                v-for="option in ProductsNavOptions" 
                :option="option"
                :key="option.name"
            />
        </div>
    </nav>
</template>