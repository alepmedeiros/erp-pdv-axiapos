<template>
  <div class="dashboard">
    <div class="dashboard-grid">
      <!-- Cards de Métricas -->
      <div class="metric-card">
        <i class="pi pi-shopping-cart"></i>
        <h3>Total de Vendas</h3>
        <p class="metric-value">{{ formatarMoeda(metrics.totalVendas) }}</p>
      </div>

      <div class="metric-card">
        <i class="pi pi-file"></i>
        <h3>Notas Emitidas</h3>
        <p class="metric-value">{{ metrics.notasEmitidas }}</p>
      </div>

      <div class="metric-card warning">
        <i class="pi pi-exclamation-triangle"></i>
        <h3>Notas em Contingência</h3>
        <p class="metric-value">{{ metrics.notasContingencia }}</p>
      </div>

      <div class="metric-card">
        <i class="pi pi-chart-line"></i>
        <h3>Índice de Vendas</h3>
        <p class="metric-value">{{ formatarPorcentagem(metrics.indiceVendas) }}</p>
      </div>
    </div>

    <div class="charts-grid">
      <!-- Gráfico de Produtos -->
      <div class="chart-card">
        <h3>Status dos Produtos</h3>
        <div class="chart-container">
          <GraficoRelatorio
            type="pie"
            :data="{
              labels: ['Novos', 'Danificados'],
              datasets: [{
                data: [metrics.produtosStatus.novos, metrics.produtosStatus.danificados],
                backgroundColor: ['#4CAF50', '#f44336']
              }]
            }"
          />
        </div>
      </div>

      <!-- Gráfico de Produtos Mais Vendidos -->
      <div class="chart-card">
        <h3>Produtos Mais Vendidos</h3>
        <div class="chart-container">
          <GraficoRelatorio
            type="bar"
            :data="{
              labels: metrics.produtosMaisVendidos.map(p => p.nome),
              datasets: [{
                label: 'Quantidade Vendida',
                data: metrics.produtosMaisVendidos.map(p => p.quantidade),
                backgroundColor: '#2196F3'
              }]
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import GraficoRelatorio from '../components/GraficoRelatorio.vue';
import { DashboardService, type DashboardMetrics } from '@/application/services/DashboardService';

const metrics = ref<DashboardMetrics>({
  totalVendas: 0,
  notasEmitidas: 0,
  notasContingencia: 0,
  indiceVendas: 0,
  produtosStatus: {
    novos: 0,
    danificados: 0
  },
  produtosMaisVendidos: []
});

const formatarMoeda = (valor: number): string => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const formatarPorcentagem = (valor: number): string => {
  return `${valor.toFixed(1)}%`;
};

const carregarMetricas = async () => {
  const data = await DashboardService.getMetrics();
  metrics.value = data;
};

onMounted(() => {
  carregarMetricas();
});
</script>

<style scoped>
.dashboard {
  padding: var(--spacing-4);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);
}

.metric-card {
  background-color: var(--surface-card);
  border-radius: var(--border-radius);
  padding: var(--spacing-4);
  text-align: center;
  box-shadow: var(--card-shadow);
}

.metric-card i {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-2);
}

.metric-card.warning i {
  color: var(--orange-500);
}

.metric-card h3 {
  margin: var(--spacing-2) 0;
  font-size: 1.1rem;
  color: var(--text-color);
}

.metric-value {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  color: var(--text-color-secondary);
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-4);
}

.chart-card {
  background-color: var(--surface-card);
  border-radius: var(--border-radius);
  padding: var(--spacing-4);
  box-shadow: var(--card-shadow);
}

.chart-card h3 {
  margin: 0 0 var(--spacing-4) 0;
  color: var(--text-color);
}

.chart-container {
  height: 300px;
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }

  .chart-container {
    height: 250px;
  }
}
</style>