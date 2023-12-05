import type { IProductsResponse } from "@/products/interfaces/products-response";
import { useToastStore } from "@/shared/stores/toast";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { ICart } from "../interface/cart";

export const useCartStore = defineStore('cart', () => {

    const total = ref(0);
    const cart = ref<ICart[]>([]);

    const client = ref('');

    const toastStore = useToastStore();


    function addProductCart(product: IProductsResponse, quantity: number) {
        const productInCart = cart.value.find(item => item.product.id === product.id);

        if (productInCart && +productInCart.quantity < +productInCart.product.stock) {
            productInCart.quantity += quantity;    
            calculateTotal();
            return;
        }
        if( !productInCart ){

            cart.value.push({ product, quantity });
            calculateTotal();
        }

        calculateTotal();

    }

    function decrementProductQuantity( product: IProductsResponse ) {

        const productInCart = cart.value.find(item => item.product.id === product.id);
        productInCart!.quantity -= 1;

        if( productInCart?.quantity === 0 ){
            const updateCart = cart.value.filter(item => item.product.id !== productInCart.product.id);
            cart.value = updateCart;
        }

        calculateTotal();
    }

    function calculateTotal() {
        let subTotal = 0

        cart.value.forEach(({ product, quantity }) => {
            subTotal += product.price * quantity
        });

        total.value = subTotal;

    }

    function removeProductFromCart(id: string) {
        const product = cart.value.findIndex(item => item.product.id === id);


        if (product !== -1) {
            cart.value.splice(product, 1);
            calculateTotal();
        }
    }


    return {
        addProductCart,
        removeProductFromCart,
        decrementProductQuantity,
        cart,
        total
    }
})