<script setup lang='ts'>
import { useCategory } from '../composables/useCategory';

const { handleFileChange, handleSubmit, newCategory, preImage } = useCategory();

</script>

<template>
    <div class="grid grid-cols-2">
        <div class="flex flex-col justify-center items-center">
            <h2 class="">Imagen del producto</h2>
            
            <p v-if="preImage === ''" class="text-lg md:text-xl text-gray-400">Aun no selecciono una imagen</p>
            <img class="max-w-sm" :src="preImage"/>
            
        </div>
        <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
                <label for="category-name">Nombre:</label>
                <input 
                    id="category-name"
                    class="border-gray-300 border-2 " 
                    type="text"
                    placeholder="Auriculares, Computadoras, Herramientas..."
                    v-model="newCategory.name"
                />
            </div>
            <div>
                <label for="category-name">Descripcion:</label>
                <textarea
                    id="category-name"
                    class="block border-gray-300 border-2" 
                    rows="3"
                    placeholder="Agrega una descripcion del producto..."
                    v-model="newCategory.description"
                ></textarea>
            </div>
            <div>
                <label for="category-image">Imagen del producto:</label>
                <input @change="handleFileChange" id="category-image" type="file">
            </div>
            <button type="submit" class="btn-primary">Guardar categoria</button>
        </form>
    </div>
</template>

<style>

</style>../composables/useCategory