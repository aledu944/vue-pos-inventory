import { defineStore } from "pinia";
import { onMounted } from "vue";



export const useUsersStore = defineStore('users', () => {
        
    
    async function getAllUsers() {
        
    }


    onMounted(() => {
        getAllUsers();
    })
    
    return {

    }
})