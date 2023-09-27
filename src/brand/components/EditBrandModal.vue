<script setup lang="ts">

import { useBrands } from '../composables/useBrand';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

const { id } = defineProps<{ id: string }>()
const { brand, closeModal, handleClick, handleEditSubmit, isOpen } = useBrands();

</script>


<template>
    <div @click="handleClick(id)" class="bg-primary/30 rounded-full cursor-pointer max-w-max p-2 hover:scale-[1.025] active:saturate-100 transition-all">
        <i class="flex text-primary uil uil-pen"></i>
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="space-y-6 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3">
                                Editar marca
                            </DialogTitle>

                            <div>
                                <label for="name-brand">Nombre de la marca:</label>
                                <input id="name-brand" class="border-2 border-gray-300" type="text"
                                    placeholder="Samsung, Lg, Mercado pago..." v-model="brand.name">
                            </div>

                            <div class="flex items-center gap-4">
                                <button type="button" class="btn-danger" @click="closeModal">
                                    Cerrar modal
                                </button>
                                <button type="button" class="btn-secondary" @click="handleEditSubmit">
                                    Guardar
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>


