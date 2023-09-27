<script setup lang='ts'>

import BrandsTable from "../components/BrandsTable.vue";
import NewBrandModal from "../components/NewBrandModal.vue";
</script>

<template>
        
    <main class="container pt-[2rem]">
        <div class="flex justify-between items-center mb-6">
            <h1>Listado de marcas</h1>
            <NewBrandModal/>
        </div>
        <BrandsTable/>
    </main>
</template>