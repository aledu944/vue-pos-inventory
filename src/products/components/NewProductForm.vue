<script setup lang='ts'>

import { onMounted } from 'vue';
import { useNewProduct } from '../composables/newProduct';
import { useCategoriesStore } from '../../categories/stores/categories';
import { useBrandsStore } from '../../brand/store/brands';
import { useProvidersStore } from '../../providers/store/providersStore';
const { handleFileChange, handleSubmit, newProduct, preImage } = useNewProduct();

const categoriesStore = useCategoriesStore()
const brandStore = useBrandsStore();
const providerStore = useProvidersStore();

const fetchData = [
    categoriesStore.getAllCategories(),
    brandStore.getBrands(),
    providerStore.getProviders(),
]

onMounted(() => {
    Promise.all(fetchData);
})

</script>

<template>
    <div class="grid grid-cols-2">
        <div class="flex flex-col justify-center items-center">
            <h2 class="">Imagen del producto</h2>

            <p v-if="preImage === ''" class="text-lg md:text-xl text-gray-400">Aun no selecciono una imagen</p>
            <img class="max-w-sm" :src="preImage" />

        </div>
        <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
                <label for="prooduct-name">Nombre:</label>
                <input 
                    type="text"
                    id="prooduct-name" 
                    class="border-gray-300 border-2 " 
                    placeholder="Auriculares, Computadoras, Herramientas..." 
                    v-model="newProduct.name" />
            </div>
            <div>
                <label for="prooduct-name">Descripcion:</label>
                <textarea id="prooduct-name" class="block border-gray-300 border-2" rows="3"
                    placeholder="Agrega una descripcion del producto..." v-model="newProduct.description"></textarea>
            </div>
            <div>
                <label for="prooduct-image">Imagen del producto:</label>
                <input @change="handleFileChange" id="prooduct-image" type="file">
            </div>
            <div>
                <label for="prooduct-price">Stock disponible: </label>
                <input min="0" class="border-gray-300 border-2 " v-model="newProduct.stock" id="product-stock" type="number">
            </div>
            <div>
                <label for="prooduct-price">Precio del producto (Bs):</label>
                <input min="0" class="border-gray-300 border-2 " v-model="newProduct.price" id="prooduct-price" type="number">
            </div>
            <div>
                <label for="">Selecciona el proveedor: </label>
                <select v-model="newProduct.categoryId" class="border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:border-primary outline-none" id="">
                    <option disabled value="">Seleccione una categoria</option>
                    <option v-for="category in categoriesStore.categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                    </option>
                </select>
            </div>

            <div>
                <label for="">Selecciona la una marca: </label>
                <select v-model="newProduct.brandId" class="border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:border-primary outline-none" id="">
                    <option disabled value="">Seleccione una marca</option>
                    <option v-for="brand in brandStore.brands" :key="brand.id" :value="brand.id">
                    {{ brand.name }}
                    </option>
                </select>
            </div>

            <div>
                <label for="">Selecciona la categoria: </label>
                <select v-model="newProduct.providerId" class="border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:border-primary outline-none" id="">
                    <option disabled value="">Seleccione una categoria</option>
                    <option v-for="provider in providerStore.providers" :key="provider.id" :value="provider.id">
                    {{ provider.name }}
                    </option>
                </select>
            </div>


            <button type="submit" class="btn-primary">Crear producto</button>
        </form>
    </div>
</template>ç

<style></style>