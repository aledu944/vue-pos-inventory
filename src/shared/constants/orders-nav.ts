export const OrdersNavOptions = [
    {
        name: 'Carrito',
        description: 'Realiza una nueva venta',
        subOptions: [
            {
                path: 'products',
                name: 'Productos',
                description: 'Lista de productos',
                icon: 'uil uil-shopping-cart',
            },
        ]
    },
    {
        name: 'Ventas',
        description: 'Gestiona las ventas del negocio',
        subOptions: [
            {
                path: 'orders',
                name: 'Ingresos',
                description: 'Listado de ventas',
                icon: 'uil uil-arrow-down',
            }
        ]
    }
]