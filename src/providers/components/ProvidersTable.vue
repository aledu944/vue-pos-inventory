<script setup lang='ts'>
import { storeToRefs } from 'pinia';

import ActionButton from './ActionButton.vue';
import { useProvidersStore } from '../store/providersStore';
import { formatDate } from '../../shared/helpers/format-date';
import CircularProgress from '@/shared/components/CircularProgress.vue';


const providersStore = useProvidersStore()
const { isLoading, providers } = storeToRefs( providersStore );

</script>

<template>
    <div class="overflow-x-scroll">
        <div class="bg-white py-8 px-6 rounded-md border border-gray-300 w-full min-w-[800px]">
            <div class="grid grid-cols-8 gap-[2rem] mb-3">
                <h4 class="font-bold">Codigo</h4>
                <h4 class="font-bold">Nombre</h4>
                <h4 class="font-bold">Correo</h4>
                <h4 class="font-bold">Telefono</h4>
                <h4 class="font-bold">Estado</h4>
                <h4 class="font-bold">Creación</h4>
                <h4 class="font-bold">Ultima actualización</h4>
                <h4 class="font-bold text-center">Acciones</h4>
            </div>
            <div class="border border-gray-100 mb-8"></div>

            <CircularProgress v-if="isLoading"/>
            
            <div v-else class="space-y-6">
                <div v-for="provider in providers" :key="provider.id"
                    class="grid items-center grid-cols-8 text-sm gap-[2rem] text-gray-500">

                    <p class="w-full text-gray-600 line-clamp-1">
                        #{{ provider.id }}
                    </p>

                    <p>
                        {{ provider.name }}
                    </p>
                    <p class="line-clamp-2">
                        {{ provider.email ? provider.email : 'No tiene email' }}
                    </p>

                    <p class="line-clamp-2">
                        {{ provider.phone ? provider.phone : 'No tiene numero' }}
                    </p>

                    <div @click="providersStore.changeStatusProvider(provider)" :class="provider.status ? 'budget-success' : 'budget-danger'" class="cursor-pointer">
                        {{ provider.status ? 'Activo' : 'Inactivo' }}
                    </div>

                    <p>{{ formatDate( provider.createdAt ) }}</p>
                    <p>{{ formatDate( provider.updatedAt ) }}</p>
                    
                    <ActionButton :id="provider.id"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

</style>