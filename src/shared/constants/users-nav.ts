export const UsersNavOptions = [
    {
        name: 'Clientes',
        description: 'Gestionas tus clientes',
        subOptions: [
            {
                path: '',
                name: 'Clientes',
                description: 'Lista de productos',
                icon: 'uil uil-users-alt',
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
        name: 'Usuarios',
        description: 'Gestiona los usuarios del sistema',
        subOptions: [
            {
                path: 'users',
                name: 'Tus usuarios',
                description: 'Lista los detaller de usuarios',
                icon: "uil uil-chat-bubble-user",
                
            },
            {
                path: 'new-user',
                name: 'Agregar usuario',
                description: 'Agrega usuarios al sistema',
                icon: 'uil uil-plus',
            },
        ]
    }
]