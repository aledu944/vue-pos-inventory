export const ProductsNavOptions = [
    {
        name: 'Inventario',
        description: 'Gestion de productos',
        subOptions: [
            {
                path: 'products',
                name: 'Productos',
                description: 'Lista de productos',
                icon: 'uil uil-clipboard-notes',
            },
            {
                path: 'new-product',
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
                path: 'categories',
                name: 'Categorias',
                description: 'Categorias registradas',
                icon: 'uil uil-clipboard-notes',
            },
            {
                path: 'new-category',
                name: 'Nueva categoria',
                description: 'Crea un nueva categoria',
                icon: 'uil uil-plus',
            },
        ]
    }
]