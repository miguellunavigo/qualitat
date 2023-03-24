
export const HOME_ROUTE = 'home';
export const LOGIN_ROUTE = 'login';
export const MAINTENANCE_ROUTE = 'maintenance';

export const MENU_OPTIONS = 'MENU_OPTIONS';

export const SINIESTROS_ROUTE_BASELESS = 'listsiniestros';

export const COMISARIAS_ROUTE_BASELESS = 'listcomisarias';

export const addPrefix = (route: string = '') => `${HOME_ROUTE}/${route}`;

export const SINIESTROS_ROUTE = addPrefix(SINIESTROS_ROUTE_BASELESS);

export const COMISARIAS_ROUTE = addPrefix(COMISARIAS_ROUTE_BASELESS);

export const HOME_MENU_BUTTON = {
  title: 'Inicio',
  subtitle: '',
  route: `/${HOME_ROUTE}`,
  icon: 'i-menu-home',
  class: '',
  activationCode: '0',
  show:true
};

export const SINIESTROS_MENU_BUTTON = {
    title: 'Siniestros',
    subtitle: 'Accidentes automovilísticos',
    route: `/${SINIESTROS_ROUTE}`,
    icon: 'i-menu-siniestro',
    class: '',
    activationCode: '0',
    show:true
  };
  
  // export const INSPECCION_MENU_BUTTON = {
  //   title: 'Inspección',
  //   subtitle: 'Supervisión constante',
  //   route: `/${SINIESTROS_ROUTE}`,
  //   icon: 'i-menu-inspeccion',
  //   class: '',
  //   activationCode: '0',
  //   show:true
  // };
  
  // export const POLIZAS_MENU_BUTTON = {
  //   title: 'Pólizas',
  //   subtitle: 'Siniestros',
  //   route: `/${SINIESTROS_ROUTE}`,
  //   icon: 'i-menu-poliza',
  //   class: '',
  //   activationCode: '0',
  //   show:true
  // };
  
  export const TABLAS_MENU_BUTTON = {
    title: 'Tablas',
    subtitle: 'Administra tus tablas',
    route: `/${COMISARIAS_ROUTE}`,
    icon: 'i-menu-tablas',
    class: '',
    activationCode: '0',
    show:true
  };
  

export const MOBILE_HOME_BUTTONS = [
    SINIESTROS_MENU_BUTTON,
    // INSPECCION_MENU_BUTTON,
    // POLIZAS_MENU_BUTTON,
    TABLAS_MENU_BUTTON
  ];
  
  export const MOBILE_MENU_HOME_BUTTONS = [
    HOME_MENU_BUTTON,
    SINIESTROS_MENU_BUTTON,
    // INSPECCION_MENU_BUTTON,
    // POLIZAS_MENU_BUTTON,
    TABLAS_MENU_BUTTON
  ];