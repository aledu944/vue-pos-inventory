<script setup lang="ts">
import { ref, onMounted, defineProps, type Ref } from 'vue';
import {
    TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle, RadioGroup, RadioGroupLabel, RadioGroupDescription, RadioGroupOption,
} from '@headlessui/vue'
import type { IClientsResponse } from '../../auth/interfaces/clients-response';
import authService from '@/auth/services/auth.service';


defineProps<{
    sale: {
        total: number;
        type: string;
        clientId: string;
        userId: string | undefined;
    }
}>()

const isOpen = ref(false)

function closeModal() {
    isOpen.value = false
}

function openModal() {
    isOpen.value = true
}

const clients = ref<IClientsResponse[]>([]);
onMounted(async () => {
    clients.value = await authService.getAllClients() as IClientsResponse[];
})

</script>


<template>
    <div class="flex items-center">
        <button type="button" @click="openModal"
            class="btn-secondary w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            Seleccionar cliente
        </button>
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/25"></div>
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                Busca un cliente
                            </DialogTitle>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                    Selecciona el cliente para la venta
                                </p>
                            </div>
                            <ul>
                                <RadioGroup v-model="sale.clientId">
                                    <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
                                    <div class="space-y-2">
                                        <RadioGroupOption as="template" v-for="client in clients" :key="client.id"
                                            :value="client.id" v-slot="{ active, checked }">
                                            <div :class="[
                                                active
                                                    ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
                                                    : '',
                                                checked ? 'bg-sky-900/75 text-white ' : 'bg-white ',
                                            ]"
                                                class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none">
                                                <div class="flex w-full items-center justify-between">
                                                    <div class="flex items-center">
                                                        <div class="text-sm">
                                                            <RadioGroupLabel as="p"
                                                                :class="checked ? 'text-white' : 'text-gray-900'"
                                                                class="font-medium">
                                                                {{ client.name }}
                                                            </RadioGroupLabel>
                                                            <RadioGroupDescription as="span"
                                                                :class="checked ? 'text-sky-100' : 'text-gray-500'"
                                                                class="inline">
                                                                <span> {{ client.email }}</span>
                                                            </RadioGroupDescription>
                                                        </div>
                                                    </div>
                                                    <div v-show="checked" class="shrink-0 text-white">
                                                        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                                                            <circle cx="12" cy="12" r="12" fill="#fff" fill-opacity="0.2" />
                                                            <path d="M7 13l3 3 7-7" stroke="#fff" stroke-width="1.5"
                                                                stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </RadioGroupOption>
                                    </div>
                                </RadioGroup>
                            </ul>
                            <div class="mt-4">
                                <button type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="closeModal">
                                    Seleccionar cliente
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>