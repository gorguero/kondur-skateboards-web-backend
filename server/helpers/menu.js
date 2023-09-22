const getMenu = (rol = 'USER_ROLE') => {

    const menu = [
        {
          titulo: 'Mi Perfil',
          icono: 'bi bi-person me-2',
          url: '/sesion/MiPerfil'
        },
        {
          titulo: 'Mis compras',
          icono: 'bi bi-person me-2',
          url: '/sesion/MiPerfil'
        }
    ];

    if( rol === 'ADMIN_ROLE' ){
        menu.pop();
        menu.unshift({titulo: 'Administrador', icono: 'bi bi-archive me-2', url: '/administrador/productos'})
    }

    return menu;
}

export default getMenu;