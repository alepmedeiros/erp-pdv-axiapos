import apiClient from './api'; // Axios configurado
import type { MercadoPagoBrickSettings } from '@/types/MercadoPagoBrickSettings';

const PUBLIC_KEY = 'TEST-7bcb7f4f-011b-40b8-94db-885fae8aee96';

export const initializeMercadoPagoBrick = async (containerId: string, settings: MercadoPagoBrickSettings) => {
  try {
    const mp = new MercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });
    const bricksBuilder = mp.bricks();
    const brickController = await bricksBuilder.create('payment', containerId, settings);
    return brickController;
  } catch (error) {
    console.error('Erro ao inicializar o Brick do MercadoPago:', error);
    throw error;
  }
};

export const processPayment = async (formData: any) => {
  try {
    const response = await apiClient.post('/pagamentos', formData);
    return response.data;
  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    throw error;
  }
};
