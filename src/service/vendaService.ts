import apiClient from './api';
import type { Venda } from '@/types/Venda';

export const finalizarVenda = async (venda: Venda) => {
  try {
    const response = await apiClient.post('/vendas/finalizar', venda, {
      responseType: 'arraybuffer',
    });
    return response.data;
  } catch (error) {
    console.error('Erro na emissão fiscal:', error);
    throw error;
  }
};
