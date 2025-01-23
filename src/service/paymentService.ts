import apiClient from './api';
import type { Payments } from '@/types/Payments';

// Função para processar pagamento com cartão de crédito
export const processPayment = async (paymentData: Payments) => {
  try {
    const response = await apiClient.post('/v1/payments', paymentData);
    return response.data; // Retorna o resultado da API
  } catch (error) {
    console.error('Erro ao processar o pagamento:', error);
    throw error;
  }
};

// Função para processar pagamento via boleto
export const processBoletoPayment = async (paymentData: Payments) => {
  try {
    const response = await apiClient.post('/v1/payments', paymentData);
    return response.data; // Retorna o resultado da API
  } catch (error) {
    console.error('Erro ao processar pagamento via boleto:', error);
    throw error;
  }
};
