<script setup lang='ts'>

import { ref } from 'vue';
import ActionsMenu from './ActionsMenu.vue';
import EditCategoryModal from "./EditCategoryModal.vue";
import { useCategoriesStore } from '../stores/categories';


const useCategories = useCategoriesStore();


const isOpen = ref(false)

function closeModal() {
    isOpen.value = false
}

function openModal() {
    isOpen.value = true
}
</script>

<template>
    <EditCategoryModal :close-modal="closeModal" :is-open="isOpen" />

    <div class="overflow-x-scroll">
        <div class="bg-white py-8 px-6 rounded-md border border-gray-300 w-full min-w-[800px]">
            <div class="grid grid-cols-5 gap-[2rem] mb-3">
                <h4 class="font-bold">Codigo</h4>
                <h4 class="font-bold">Imagen</h4>
                <h4 class="font-bold">Nombre</h4>
                <h4 class="font-bold">Descripcion</h4>
                <h4 class="font-bold text-center">Acciones</h4>
            </div>
            <div class="border border-gray-100 mb-8"></div>

            <div class="space-y-6">
                <div v-for="category in useCategories.categories" :key="category.id"
                    class="grid items-center grid-cols-5 text-sm gap-[2rem]">

                    <p class="w-full text-gray-500 line-clamp-1">
                        #{{ category.id }}
                    </p>

                    <img class="max-w-[70px]" :src="category.image" :alt="category.name" srcset="">

                    <p class="text-gray-500">
                        {{ category.name }}
                    </p>
                    <p class="text-gray-500 line-clamp-2">
                        {{ category.description }}
                    </p>

                    <ActionsMenu :id="category.id" :open-modal="openModal"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>