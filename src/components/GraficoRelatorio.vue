<template>
    <canvas id="grafico" ref="grafico"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps<{
    dados: Array<{ dataVenda: string; total: number }>;
}>();

const grafico = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    if (grafico.value) {
        new Chart(grafico.value, {
            type: 'line',
            data: {
                labels: props.dados.map((item) => item.dataVenda),
                datasets: [
                    {
                        label: 'Vendas',
                        data: props.dados.map((item) => item.total),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        tension: 0.4,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                },
            },
        });
    }
});
</script>