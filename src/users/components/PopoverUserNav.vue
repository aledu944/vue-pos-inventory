<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

defineProps<{
    option: {
        name: string,
        description: string,
        subOptions?: {
            name: string,
            description: string,
            icon: string,
            path: string,
        }[]
    }
}>()
</script>

<template>
    <Popover v-slot="{ open }" class="relative text-start w-full">
        <PopoverButton :class="open ? '' : 'text-opacity-90'"
            class="text-start focus:outline-none focus-visible:ring-2 focus:text-primary focus-visible:ring-white focus-visible:ring-opacity-75">
            <p class="font-bold cursor-pointer hover:text-primary">{{ option.name }}</p>
            <p class="text-gray-400 font-semibold">{{ option.description }}</p>
        </PopoverButton>

        <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
            <PopoverPanel
                class="absolute z-10 mt-[1rem] border-gray-200 rounded-md border max-w-md w-full transform px-4 sm:px-0">
                <div class="overflow-hidden rounded-lg shadow-lg ring-1 bg-white cursor-pointer ring-white ring-opacity-5">
                    <div class=" space-y-2 p-3 w-full">
                        <RouterLink v-for="subOption in option.subOptions" :key="subOption.name"
                            class="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 w-full"
                            :to="{ name: subOption.path }">
                            <div
                                class="flex text-xl bg-primary/20 rounded-md items-center justify-center text-primary sm:h-12 sm:w-12 ">
                                <i :class="subOption.icon"></i>
                            </div>
                            <div class="ml-4">
                                <p class="font-semibold text-gray-900">
                                    {{ subOption.name }}
                                </p>
                                <p class="text-sm text-gray-500">
                                    {{ subOption.description }}
                                </p>
                            </div>
                        </RouterLink>
                    </div>
                </div>
            </PopoverPanel>
        </transition>
    </Popover>
</template>
