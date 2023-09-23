import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'


interface ToastStore {
    right:      Ref<string>
    message:    Ref<string>    
    type:       Ref<string>

    showToast: (typeToast: 'success' | 'error', toastMessage: string) => void
}

export const useToastStore = defineStore('toast', (): ToastStore => {
    
    const right = ref('-100rem');
    const message = ref('');
    const type = ref<'success'|'error'>('error');

    const showToast = ( typeToast: 'success'|'error', toastMessage: string ) => {
        message.value =  toastMessage;
        type.value =  typeToast;
        right.value = '1rem';

        setTimeout(() => {
            right.value = '-100rem'
        },5000)
    }


    return {
        right,
        message,
        type,
        showToast,
    }

});