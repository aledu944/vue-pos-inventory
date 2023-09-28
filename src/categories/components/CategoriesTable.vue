<script setup lang='ts'>

import { formatDate } from '../../shared/helpers/format-date';
import { useCategory } from "../composables/useCategory";

import ActionsMenu from './ActionsMenu.vue';
import CircularProgress from "@/shared/components/CircularProgress.vue";


const { isLoading, openModal, categories } = useCategory();

</script>

<template>
    <div class="overflow-x-scroll">
        <div class="bg-white py-8 px-6 rounded-md border border-gray-300 w-full min-w-[800px]">
            <div class="grid grid-cols-7 gap-[2rem] mb-3">
                <h4 class="font-bold">Codigo</h4>
                <h4 class="font-bold">Imagen</h4>
                <h4 class="font-bold">Nombre</h4>
                <h4 class="font-bold">Descripcion</h4>
                <h4 class="font-bold">Creación</h4>
                <h4 class="font-bold">Ultima actualización</h4>
                <h4 class="font-bold text-center">Acciones</h4>
            </div>
            <div class="border border-gray-100 mb-8"></div>

            <CircularProgress v-if="isLoading"/>
            
            <div v-else class="space-y-6">
                <div v-for="category in categories" :key="category.id"
                    class="grid items-center grid-cols-7 text-sm gap-[2rem] text-gray-500">

                    <p class="w-full text-gray-500 line-clamp-1">
                        #{{ category.id }}
                    </p>

                    <img class="max-w-[70px]" :src="category.image" :alt="category.name" srcset="">

                    <p>
                        {{ category.name }}
                    </p>
                    <p class="line-clamp-2">
                        {{ category.description }}
                    </p>

                    <p>{{ formatDate( category.createdAt ) }}</p>
                    <p>{{ formatDate( category.updatedAt ) }}</p>
                    
                    <ActionsMenu :id="category.id" :open-modal="openModal" />
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>