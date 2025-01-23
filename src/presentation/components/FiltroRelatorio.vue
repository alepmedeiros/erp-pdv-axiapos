<template>
    <form @submit.prevent="aplicarFiltro">
        <label>Data Inicial:</label>
        <input type="date" v-model="dataInicial" />
        <label>Data Final:</label>
        <input type="date" v-model="dataFinal" />
        <button type="submit">Aplicar Filtro</button>
    </form>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits<{
    (e: 'filtro-aplicado', filtro: { dataInicial: string; dataFinal: string }): void;
}>();

const dataInicial = ref('');
const dataFinal = ref('');

const aplicarFiltro = () => {
    emit('filtro-aplicado', { dataInicial: dataInicial.value, dataFinal: dataFinal.value });
};
</script>