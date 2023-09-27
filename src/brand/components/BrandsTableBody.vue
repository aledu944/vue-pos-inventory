<script setup lang='ts'>

import { defineProps } from 'vue';
import { type IBrand } from '../interfaces/brands';
import { formatDate } from '../../shared/helpers/format-date';
import { useBrandsStore } from '../store/brands';
import EditBrandModal from './EditBrandModal.vue';

const { deleteBrand } = useBrandsStore();

defineProps<{
    brand: IBrand
}>()

</script>

<template>
    <div class="grid grid-cols-5 items-center justify-center text-gray-500 mb-6">
        <p class="line-clamp-1">#{{ brand.id }}</p>
        <p>{{brand.name }}</p>
        <p>{{ formatDate(brand.createdAt) }}</p>
        <p>{{ formatDate(brand.updatedAt) }}</p>
        <div class="flex items-center justify-center gap-4">
            <!-- <div class="bg-primary/30 rounded-full cursor-pointer max-w-max p-2 hover:scale-[1.025] active:saturate-100 transition-all">
                <i class="flex text-primary uil uil-pen"></i>
            </div> -->
            <EditBrandModal :id="brand.id"/>
            <div @click="deleteBrand(brand.id)" class="bg-red-500/30 rounded-full cursor-pointer max-w-max p-2 hover:scale-[1.025] active:saturate-100 transition-all">
                <i class="flex text-red-500 uil uil-trash"></i>
            </div>
        </div>
    </div>
</template>

<style>

</style>