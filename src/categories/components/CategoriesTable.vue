<script setup lang='ts'>
    import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
    import { useCategoriesStore } from '../stores/categories';
    
    const useCategories = useCategoriesStore();
</script>

<template>
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
                <div 
                    v-for="category in useCategories.categories" :key="category.id"
                    class="grid items-center grid-cols-5 text-sm gap-[2rem]"
                >
                    <p class="w-full text-gray-500 line-clamp-1">
                        #{{ category.id }}
                    </p>
                    
                    <p class="min-w-min w-full text-gray-500">Imagen</p>
                    
                    <p class="text-gray-500">
                        {{ category.name }}
                    </p>
                    <p class="text-gray-500 line-clamp-2">
                        {{ category.description }}
                    </p>
                    
                    <Menu as="div" class="inline-block text-center">
                        <MenuButton class="focus:outline-none text-xl mx-auto focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <i class="uil uil-ellipsis-v"></i>                
                        </MenuButton>

                        <transition
                            enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                        >
                            <MenuItems 
                                class="absolute right-20 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                                <div class="px-1 py-1">
                                    <MenuItem v-slot="{ active }">
                                        <button
                                            :class="[ active ? 'bg-primary text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm' ]"
                                            class="flex gap-4"
                                        >
                                            <i class="uil uil-pen"></i>
                                            Editar
                                        </button>
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }">
                                        <button
                                            @click="useCategories.deleteCategory(category.id)"
                                            :class="[ active ? 'bg-red-500 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm' ]"
                                            class="flex gap-4"
                                        >
                                            <i class="uil uil-trash"></i>
                                            Eliminar
                                        </button>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </transition>
                    </Menu>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

</style>