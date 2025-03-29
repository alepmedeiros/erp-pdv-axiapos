<template>
    <div class="page-container">
        <div class="header">
            <h1>Relatórios de Vendas</h1>
        </div>
        
        <div class="grid-container">
            <section class="card">
                <FiltroRelatorio @filtro-aplicado="gerarRelatorio" />
            </section>

            <div v-if="dadosRelatorio.length > 0" class="relatorio-content">
                <section class="card table-responsive">
                    <TabelaRelatorio :dados="dadosRelatorio" />
                </section>
                
                <section class="card">
                    <GraficoRelatorio :dados="dadosRelatorio" />
                </section>
            </div>

            <div v-else class="card empty-state">
                <p>Selecione os filtros e gere o relatório para visualizar os dados.</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FiltroRelatorio from '@/components/FiltroRelatorio.vue';
import TabelaRelatorio from '@/components/TabelaRelatorio.vue';
import GraficoRelatorio from '@/components/GraficoRelatorio.vue';

interface DadosVenda {
    id: string;
    cliente: string;
    total: number;
    dataVenda: string;
}

const dadosRelatorio = ref<DadosVenda[]>([]);

const gerarRelatorio = (filtro: { dataInicial: string; dataFinal: string }) => {
    console.log('Filtro aplicado:', filtro);
    dadosRelatorio.value = [
        { id: '1', cliente: 'Cliente A', total: 500, dataVenda: '2024-01-01' },
        { id: '2', cliente: 'Cliente B', total: 200, dataVenda: '2024-01-02' },
    ];
};
</script>

<style scoped>
.page-container {
    padding: 20px;
}

.header {
    margin-bottom: 20px;
}

.grid-container {
    display: grid;
    gap: 20px;
}

.card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.relatorio-content {
    display: grid;
    gap: 20px;
}

.table-responsive {
    overflow-x: auto;
}

.empty-state {
    text-align: center;
    padding: 40px;
    color: #666;
}
</style>