import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

interface UiProps {
    isMenuOpen: Ref<boolean>;
    
    handleMenuState: () => void;
} 

export const useUiStore = defineStore('ui', (): UiProps => {
    const isMenuOpen = ref(false);

    const handleMenuState = () => {
        isMenuOpen.value = !isMenuOpen.value;
    }
    
    return {
        isMenuOpen,

        // METHODS
        handleMenuState
    }
    
});