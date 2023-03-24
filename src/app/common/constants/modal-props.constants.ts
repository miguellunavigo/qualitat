import { IDLE_EXIT_AFTER_WARNING_TIMEOUT } from './misc.constants';

export const SIGNOUT_WARNING_MODAL_PROPS = {
    title: 'Estás a punto de cerrar sesión',
    message: '¿Estás seguro?',
    primaryButtonText: 'Sí',
    secondaryButtonText: 'No',
    icon: 'i-alert-purple'
  };
  export const IDLE_SESSION_WARNING_MODAL_PROPS = {
    title: 'Tu sesión está a punto de expirar',
    message: `Se cerrará la sesión en ${IDLE_EXIT_AFTER_WARNING_TIMEOUT} segundos`,
    primaryButtonText: 'Quedarme',
    secondaryButtonText: 'Salir',
    icon: 'i-alert-purple'
  };
  
export const TAMPERED_DEVICE_PROPS = {
  title: 'Lo sentimos',
  message: 'Tu dispositivo se encuentra inhabilitado para hacer uso de esta aplicación, debido a que ha sido alterado' +
    ' para obtener privilegios de administrador',
};
