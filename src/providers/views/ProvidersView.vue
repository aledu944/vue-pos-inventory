<script setup lang='ts'>
import NewProviderModal from '../components/NewProviderModal.vue';
import ProvidersTable from '../components/ProvidersTable.vue';


</script>

<template>
    
    <main class="container pt-[2rem]">
        <div class="flex items-center justify-between mb-6">
            <h1>Gestiona tus proveedores</h1>
            <NewProviderModal/>
        </div>
        <ProvidersTable/>
    </main>
</template>

<style>

</style>
