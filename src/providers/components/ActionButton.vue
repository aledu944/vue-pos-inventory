<script setup lang='ts'>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useProvidersStore } from '../store/providersStore';

const { deleteProviderById } = useProvidersStore();
defineProps<{
    id: string,
}>();
</script>

<template>
    <Menu as="div" class="inline-block">
        <MenuButton
            class="focus:outline-none text-xl mx-auto focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <i class="uil uil-ellipsis-v"></i>
        </MenuButton>

        <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
            <MenuItems
                class="absolute right-20 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                    <button
                        :class="[active ? 'bg-primary text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm']"
                        class="flex gap-4">
                        <i class="uil uil-pen"></i>
                        Editar
                    </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <button @click="deleteProviderById(id)"
                        :class="[active ? 'bg-red-500 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm']"
                        class="flex gap-4">
                        <i class="uil uil-trash"></i>
                        Eliminar
                    </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<style></style>