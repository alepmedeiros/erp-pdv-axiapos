import { api } from '@/infrastructure/api';

export interface DashboardMetrics {
  totalVendas: number;
  notasEmitidas: number;
  notasContingencia: number;
  indiceVendas: number;
  produtosStatus: {
    novos: number;
    danificados: number;
  };
  produtosMaisVendidos: Array<{
    nome: string;
    quantidade: number;
  }>;
}

export class DashboardService {
  static async getMetrics(): Promise<DashboardMetrics> {
    try {
      const response = await api.get('/dashboard/metrics');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar métricas do dashboard:', error);
      return {
        totalVendas: 0,
        notasEmitidas: 0,
        notasContingencia: 0,
        indiceVendas: 0,
        produtosStatus: {
          novos: 0,
          danificados: 0
        },
        produtosMaisVendidos: []
      };
    }
  }
}