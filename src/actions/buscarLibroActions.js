import { BUSCAR_LIBRITO } from './types1';

export const buscarLibrito = librito => {
    return {
        type: BUSCAR_LIBRITO,
        librito
    }
} 