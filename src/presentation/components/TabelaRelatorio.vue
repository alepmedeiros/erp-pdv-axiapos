<template>
    <DataTable :value="dados" paginator rows="10">
        <Column field="id" header="ID"></Column>
        <Column field="cliente" header="Cliente"></Column>
        <Column field="total" header="Total" :body="formataMoeda"></Column>
        <Column field="dataVenda" header="Data da Venda"></Column>
    </DataTable>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const props = defineProps<{
    dados: Array<{ id: string; cliente: string; total: number; dataVenda: string }>;
}>();

const formataMoeda = (rowData: any) => `R$ ${rowData.total.toFixed(2)}`;
</script>