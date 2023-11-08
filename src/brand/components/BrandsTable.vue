<script setup lang='ts'>

import { storeToRefs } from 'pinia';
import { useBrandsStore } from '../store/brands';
import BrandsTableBody from './BrandsTableBody.vue';

const brandsStore = useBrandsStore()
const { brands } = storeToRefs(brandsStore);

</script>

<template>
    <div class="overflow-x-scroll">
        <div class="brand__table">
            <div class="brand__table--header">
                <h4>Codigo</h4>
                <h4>Nombre</h4>
                <h4>Creacion</h4>
                <h4>Ultima actualizacion</h4>
                <h4 class="text-center">Acciones</h4>
            </div>
            <div class="border border-gray-100 mb-6"></div>
            <p v-if="brands.length == 0" class="text-center text-2xl text-gray-500">No se encontraron marcas</p>
            <div v-else class="space-y-4">
                <BrandsTableBody :brand="brand" v-for="brand in brands" :key="brand.id" />
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "../../assets/main.css";

.brand__table {
    @apply bg-white py-8 px-6 rounded-md border border-gray-300 w-full min-w-[800px]
}

.brand__table--header {
    @apply grid grid-cols-5 font-bold mb-3
}
</style>