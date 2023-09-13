
<script setup lang="ts">
    import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
    
</script>
  

<template>
    <div class="w-56 text-right">
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="inline-flex w-full items-center gap-2 justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 font-semibold text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Opciones
            <i class="uil uil-angle-down"></i>
          </MenuButton>
        </div>
  
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute  right-0 mt-2 w-56 origin-top-right divide-y text-white divide-gray-700 rounded-md bg-secondary shadow-2xl shadow-slate-500 ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active && 'bg-primary',
                    'group flex gap-2 w-full items-center rounded-md px-2 py-2',
                  ]"
                >
                  <i class="uil uil-user"></i>
                  Perfil
                </button>
              </MenuItem>

            </div>
  
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <button
                  :class="[
                    active && 'bg-red-500',
                    'group flex w-full gap-2 text-md items-center rounded-md px-2 py-2',
                  ]"
                >
                  <i class="uil uil-signin"></i>
                  Cerrar Sesion
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </template>
  