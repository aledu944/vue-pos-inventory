<script lang="ts" setup>
import { ref } from 'vue';
import { useCartStore } from '../../cart/store/cart';
import { storeToRefs } from 'pinia';
import { formatCurrency } from '../../shared/helpers/format-currency';
import ClientsModal from '../components/ClientsModal.vue';
import { useOrderStore } from '../store/order';
import type { IUser } from '../../auth/interfaces/user';

const cartStore = useCartStore();
const orderStore = useOrderStore();

const user = JSON.parse(localStorage.getItem('AUTH_INVENTORY_USER')!) as IUser;
console.log(user)

const { cart, total } = storeToRefs(cartStore);

const sale = ref<{
    total: number;
    type: string;
    clientId: string;
    userId: string | undefined;
}>({
    total: total.value,
    type: '',
    clientId: '',
    userId: user?.id,
});


const handleSubmit = () => {
    orderStore.createNewOrder(sale.value);
}

</script>

<template>
    <main class="container pt-8 grid md:grid-cols-2 gap-8">
        <section>
            <h1>Confirma la venta</h1>
            <div class="p-8 bg-white">
                <h2 class="mb-6">Carrito</h2>
                <ul class="space-y-4">
                    <li class="flex justify-between" v-for="{ product, quantity } in cart" :key="product.id">
                        <div class="flex items-center gap-4">
                            <div class="bg-slate-200 p-2 rounded-xl">
                                <img :src="product.image" class="max-w-[60px]" />
                            </div>
                            <div>
                                <p class="font-bold">{{ product.name }}</p>
                                <p class="text-slate-600">Precio: {{ formatCurrency(product.price) }}</p>
                                <p class="text-slate-600">SubTotal: {{ formatCurrency(product.price * quantity) }}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-4 border border-slate-300 p-2 rounded-lg">
                                <i @click="cartStore.decrementProductQuantity(product)" class="uil uil-minus cursor-pointer"></i>
                                <p>{{ quantity }}</p>
                                <i @click="cartStore.addProductCart(product, 1)" class="uil uil-plus cursor-pointer"></i>
                            </div>
                            <div class="text-xl text-red-500 cursor-pointer"
                                @click="cartStore.removeProductFromCart(product.id)">
                                <i class="uil uil-trash-alt"></i>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <section>
            <form @submit.prevent="handleSubmit" class="bg-white p-4 rounded-sm shadow-sm space-y-4">
                <h2>Detalles de la venta</h2>
                <div>
                    <label for="">Tipo de entrega: </label>
                    <select v-model="sale.type"
                        class="border-2 border-gray-300 rounded-md px-3 py-2 w-full focus:border-primary outline-none"
                        id="">
                        <option disabled value="">Seleccione tipo de entrga</option>
                        <option value="delivery">
                            Delivery
                        </option>
                        <option value="retiro">
                            Retiro
                        </option>
                    </select>
                </div>
                <ClientsModal :sale="sale" />
                <p class="text-xl font-bold">Total: {{ formatCurrency(cartStore.total) }}</p>
                <button class="btn-primary">Confirmar venta</button>

            </form>
        </section>
    </main>
</template>
