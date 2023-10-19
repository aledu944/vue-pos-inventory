<script setup lang='ts'>

import { reactive } from 'vue';
import { useProvidersStore } from '../store/providersStore';
const { createNewProvider } = useProvidersStore();

const emits = defineEmits<{
    ( event: 'closeModal'): void 
}>()

const newProvider = reactive({
    name: '',
    email: '',
    phone: '',
    direction: '',
})

const handleSubmit = () => {
    createNewProvider(newProvider)
    emits('closeModal');
}

</script>

<template>
    <form @submit.prevent="handleSubmit" class="md:px-8 space-y-6 pb-8">
        <div>
            <label for="new-provider-name">Nombre: <span class="text-red-400">*</span> </label>
            <input placeholder="Agrega un nombre" type="text" v-model="newProvider.name">
        </div>

        <div>
            <label for="new-provider-name">Correo: </label>
            <input placeholder="correo@example.com" name="email" type="email" v-model="newProvider.email">
        </div>

        <div>
            <label for="new-provider-name">Telefono: </label>
            <input placeholder="+11100000000" type="text" v-model="newProvider.phone">
        </div>

        <div>
            <label for="new-provider-name">Direccion: <span class="text-red-400">*</span></label>
            <input placeholder="Av. Callle #2" type="text" v-model="newProvider.direction">
        </div>
        <div class="flex gap-4">
            <div @click="emits('closeModal')"  class="btn-danger max-w-max">Cancelar</div>
            <button type="submit" class="btn-secondary max-w-max">Guardar</button>
        </div>
    </form>
</template>

<style></style>