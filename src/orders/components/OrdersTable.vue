<script setup lang='ts'>

import { useOrderStore } from '../store/order';
import { formatDate } from '../../shared/helpers/format-date';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const orderStore = useOrderStore();

</script>

<template>
    <section class="overflow-x-scroll">
        <div class="bg-white py-8 px-6 rounded-md border border-gray-300 w-full min-w-3xl">
            <div class="grid grid-cols-7 gap-[2rem] mb-3">
                <h4 class="font-bold">Codigo</h4>
                <h4 class="font-bold">Cliente</h4>
                <h4 class="font-bold">Nro. Productos</h4>
                <h4 class="font-bold">Total</h4>
                <h4 class="font-bold">Generado por:</h4>
                <h4 class="font-bold">Fecha:</h4>
                <h4 class="font-bold">Acciones</h4>
            </div>
            <div class="border border-gray-100 mb-8"></div>


            <p v-show="orderStore.orders.length === 0" class="text-center font-semibold text-gray-500">No se encontraron
                ventas</p>
            <ul class="space-y-4">
                <li v-for="order in orderStore.orders.reverse()" :key="order.id"
                    class="grid items-center grid-cols-7 text-sm gap-[2rem]">
                    <p class="w-full text-gray-500 line-clamp-1">#{{ order.id }}</p>
                    <p class="w-full text-gray-500 line-clamp-1">{{ order.client.name }}</p>
                    <p class="text-gray-500">#{{ order.orderDetails.length }}</p>
                    <p class="text-gray-500 line-clamp-2">{{ order.total }}Bs</p>
                    <p class="text-gray-500">{{ order.user.name }}</p>
                    <p class="text-gray-500">{{ formatDate(order.createdAt) }}</p>

                    <Menu as="div" class="inline-block text-left">
                        <MenuButton
                            class="focus:outline-none text-xl focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <i class="uil uil-ellipsis-v"></i>
                        </MenuButton>

                        <transition enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0">
                            <MenuItems
                                class="absolute right-20 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div class="px-1 py-1">
                                    <MenuItem v-slot="{ active }">
                                    <RouterLink
                                        :to="{ name: 'order', params: { id: order.id } }"
                                        :class="[active ? 'bg-primary text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm']"
                                        class="flex gap-4">
                                        <i class="uil uil-eye"></i>
                                        Ver
                                    </RouterLink>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </transition>
                    </Menu>
                </li>
            </ul>

        </div>
    </section>
</template>



