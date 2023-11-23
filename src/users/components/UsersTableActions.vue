<script setup lang='ts'>
import EditModal from './EditModal.vue';


</script>

<template>
    <div class="flex mx-auto justify-center relative text-lg gap-3">
        <div class="bg-blue-500/20 flex text-blue-500 text-lg  items-center justify-center p-2 rounded-full">
            <i class="flex uil uil-eye "></i>
        </div>
        <EditModal />
        <div class="bg-red-500/20 cursor-pointer  flex text-red-500 text-lg  items-center justify-center p-2 rounded-full">
            <i class="flex uil uil-trash-alt"></i>
        </div>
    </div>
</template>


