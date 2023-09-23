<script setup lang='ts'>

import { computed } from "vue";
import { storeToRefs } from 'pinia';
import { useToastStore } from '../stores/toast';

const toastStore = useToastStore();

const { message, right, type } = storeToRefs( toastStore );
const toastColor = computed( () => type.value === 'error' ? '#DC2626' : '#17b39c' );
    
</script>

<template>
    <div class="toast" :style="{'background-color': toastColor, right}">
        <p class="text-white">{{ message }}</p>
    </div>
</template>

<style>
    .toast {
        border-radius: 7px;
        padding: .75rem 1rem;
        color: white;
        font-weight: 600;
        position:absolute;
        width: max-content;
        z-index: 4;
        top:1rem;
        text-align: center; 
        transition: all .5s ease-in-out;
    }
</style>