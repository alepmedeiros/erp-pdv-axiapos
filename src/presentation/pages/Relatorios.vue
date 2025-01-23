<template>
    <div>
        <h1>Relatórios de Vendas</h1>
        <FiltroRelatorio @filtro-aplicado="gerarRelatorio" />
        <div v-if="dadosRelatorio.length > 0">
            <TabelaRelatorio :dados="dadosRelatorio" />
            <GraficoRelatorio :dados="dadosRelatorio" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FiltroRelatorio from '@/components/FiltroRelatorio.vue';
import TabelaRelatorio from '@/components/TabelaRelatorio.vue';
import GraficoRelatorio from '@/components/GraficoRelatorio.vue';

const dadosRelatorio = ref([]);

const gerarRelatorio = (filtro: any) => {
    console.log('Filtro aplicado:', filtro);
    dadosRelatorio.value = [
        { id: '1', cliente: 'Cliente A', total: 500, dataVenda: '2024-01-01' },
        { id: '2', cliente: 'Cliente B', total: 200, dataVenda: '2024-01-02' },
    ];
};
</script>