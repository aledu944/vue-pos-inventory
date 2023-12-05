<script lang="ts" setup>
import PopoverProductNav from '@/products/components/PopoverProductNav.vue';
import { OrdersNavOptions } from '@/shared/constants/orders-nav';


</script>

<template>
    <nav class="bg-white py-6 shadow-sm">
        <div class="w-full flex flex-col md:flex-row gap-5 justify-evenly container">
            <PopoverProductNav 
                v-for="option in OrdersNavOptions" 
                :option="option"
                :key="option.name"
            />
        </div>
    </nav>
</template>
