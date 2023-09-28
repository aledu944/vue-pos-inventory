<script setup lang='ts'>
import { defineProps } from 'vue';
import { useCategory } from '../composables/useCategory';

const {} = defineProps<{
    closeModal: () => void
}>()
const { category, handleFileChange, preImage, handleUpdate } = useCategory();

</script>

<template>
    <form class="space-y-6" @submit.prevent="handleUpdate">
        <div>
            <label for="edit-category-name">Nombre:</label>
            <input         
                type="text"
                id="edit-category-name" 
                class="border-gray-300 border-2" 
                placeholder="Auriculares, Computadoras, Herramientas..."
                v-model="category.name"
            />
        </div>
        <div>
            <label for="category-name">Descripcion:</label>
            <textarea 
                rows="3"
                id="category-name" 
                class="block border-gray-300 border-2" 
                placeholder="Agrega una descripcion..." 
                v-model="category.description"

            ></textarea>
        </div>

        <div>
            <label for="category-image">Imagen del producto:</label>
            <input @change="handleFileChange" id="category-image" type="file">
        </div>
        <div class="flex flex-col justify-center items-center">
            <h2 class="">Imagen del producto</h2>
            <p v-if="preImage === ''" class="text-lg md:text-xl text-gray-400">Aun no selecciono una imagen</p>
            <img class="max-w-[100px]" :src="preImage"/>
        </div>

        <div class="mt-4 flex gap-2">
            <div class="btn-danger" @click="closeModal">
                Cerrar modal
            </div>
            <button type="submit" class="btn-secondary">
                Actualizar
            </button>
        </div>

    </form>
</template>