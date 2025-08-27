// Exportação dos serviços
export { contratosService } from './contratosService';
export { parcelasService } from './parcelasService';
export { produtosService } from './produtosService';
export { simulacoesService } from './simulacoesService';
export { usuariosService } from './usuariosService';

// Exportação da API
export { getApiInstance } from './api/config';

// Exportação dos tipos (re-export para facilitar imports)
export * from '../types';
