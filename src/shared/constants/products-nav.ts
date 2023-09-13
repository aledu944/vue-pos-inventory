export const ProductsNavOptions = [
    {
        name: 'Inventario',
        description: 'Gestion de productos',
        subOptions: [
            {
                path: '/',
                name: 'Productos',
                description: 'Lista de productos',
                icon: 'uil uil-clipboard-notes',
            },
            {
                path: '/',
                name: 'Crear un producto',
                description: 'Crear un producto',
                icon: 'uil uil-plus',
            },
        ]
    },
    {
        name: 'Categorias',
        description: 'Gestion de categorias',
        subOptions: [
            {
                path: '/',
                name: 'Categorias',
                description: 'Categorias registradas',
                icon: 'uil uil-clipboard-notes',
            },
            {
                path: '/',
                name: 'Nueva categoria',
                description: 'Crea un nueva categoria',
                icon: 'uil uil-plus',
            },
        ]
    }
]