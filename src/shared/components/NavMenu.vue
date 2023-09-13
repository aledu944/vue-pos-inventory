<script setup lang='ts'>
    import { RouterLink } from "vue-router";
    import NavMenuAvatar from "./NavMenuAvatar.vue";
</script>

<template>
    <nav class="navbar">
        <div class="container flex justify-between items-center py-4 text-slate-300">
            <RouterLink class="font-extrabold md:text-2xl text-white" :to="{ name:'dashboard' }">
                Vue <span class="text-gradient">Inventory</span>
            </RouterLink>
            <ul class="hidden md:flex gap-4">
                <li>
                    <RouterLink class="nav__link" active-class="nav__link--active" :to="{ name:'products' }">
                        Productos
                    </RouterLink>
                </li>
            </ul>
            <NavMenuAvatar/>
        </div>
    </nav>
</template>
