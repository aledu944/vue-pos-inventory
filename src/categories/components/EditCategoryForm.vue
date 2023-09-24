<script setup lang='ts'>

</script>

<template>
    <form class="space-y-6">
        <div>
            <label for="edit-category-name">Nombre:</label>
            <input         
                type="text"
                id="edit-category-name" 
                class="border-gray-300 border-2" 
                placeholder="Auriculares, Computadoras, Herramientas..."
            />
        </div>
        <div>
            <label for="category-name">Descripcion:</label>
            <textarea 
                rows="3"
                id="category-name" 
                class="block border-gray-300 border-2" 
                placeholder="Agrega una descripcion del producto..." 
            ></textarea>
        </div>
        <div>
            <label for="category-image">Imagen del producto:</label>
            <input id="category-image" type="file">
        </div>
    </form>
</template>