<script setup lang='ts'>

import PopoverUserNav from './PopoverUserNav.vue';
import { UsersNavOptions  } from "../../shared/constants/users-nav";

</script>

<template>
    <nav class="bg-white py-6 shadow-sm">
        <div class="w-full flex flex-col md:flex-row gap-5 justify-evenly container">
            <PopoverUserNav v-for="option in UsersNavOptions" :option="option" :key="option.name" />
        </div>
    </nav>
</template>