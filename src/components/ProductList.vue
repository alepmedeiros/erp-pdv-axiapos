<template>
<div class="product-list">
  <div class="itens-list">
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Total</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ formatCurrency(item.value) }}</td>
          <td>{{ formatCurrency(item.total) }}</td>
          <td>
            <button @click="$emit('remove', index)">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <TotalDisplay 
    :itemsCount="items.length"
    :grandTotal="grandTotal"
    :tax="tax"
    :totalWithTax="totalWithTax"
  />
</div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { formatCurrency } from '@/utils/utils.ts';
import TotalDisplay from './TotalDisplay.vue';



interface Item {
description: string;
quantity: number;
value: number;
total: number;
}

const props = defineProps<{ items: Item[] }>();

// Computed properties for totals
const grandTotal = computed(() => props.items.reduce((acc, item) => acc + item.total, 0));
const tax = computed(() => grandTotal.value * 0.1); // Exemplo de imposto 10%
const totalWithTax = computed(() => grandTotal.value + tax.value);
</script>
  
<style scoped>
.product-list {
  display: flex;
  flex-direction: column;
  width: 48%;
  background-color: #3366cc;
  padding: 20px;
  border-radius: 10px;
  margin-right: 10px;
}

.itens-list {
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  flex-grow: 2; /* Expande mais a área dos itens */
  height: 100%; /* Aumenta a altura máxima para mais itens */
  overflow-y: auto;
}

.itens-list table {
  width: 100%;
  border-collapse: collapse;
}

.itens-list th, .itens-list td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.itens-list th {
  background-color: #3366cc;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1; /* Garante que o cabeçalho fique acima das linhas da tabela */
}

.item-col {
  width: 10%;
}

.description-col {
  width: 40%;
}

.quantity-col {
  width: 10%;
}

.price-col {
  width: 15%;
}

.total-col {
  width: 20%;
}

.delete-col {
  width: 2%;
}

</style>
