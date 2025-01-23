<!-- src/components/TotalDisplay.vue -->
<template>
    <div class="itens-totais">
      <div class="totals-line">
        <span class="totals-label">Sub Total ({{ itemsCount }} Items)</span>
        <span class="totals-value">{{ formatCurrency(grandTotal) }}</span>
      </div>
      <div class="totals-line">
        <span class="totals-label">Imposto</span>
        <span class="totals-value">{{ formatCurrency(tax) }}</span>
      </div>
      <hr class="totals-divider" />
      <div class="total-container">
        <span class="total-highlight">Total</span>
        <span class="total-highlight">{{ formatCurrency(totalWithTax) }}</span>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps } from 'vue';
  import { formatCurrency } from '@/utils/utils'; // Importe a função formatCurrency
  
  const props = defineProps<{
    itemsCount: number;
    grandTotal: number;
    tax: number;
    totalWithTax: number;
  }>();
  </script>
  
  <style scoped>
  .itens-totais {
    width: 100%;
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-sizing: border-box;
    margin-top: 20px;
    flex-grow: 1; /* Reduz a área dos totalizadores */
    max-height: 150px; /* Define uma altura menor para os totalizadores */
  }
  
  .totals-line {
    display: flex;
    justify-content: space-between;
  }
  
  .totals-label {
    font-size: 16px;
    color: #666666; 
  }
  
  .totals-value {
    font-size: 16px;
    color: #3366cc;
  }
  
  .totals-divider {
    color: #666666;
  }
  
  .total-container {
    display: flex;
    justify-content: space-between;
    padding: 8px; /* Reduzido para ocupar menos espaço */
    background-color: #3366cc;
    color: white;
    border-radius: 5px; /* Reduzido o arredondamento */
    box-sizing: border-box;
  }
  
  .total-highlight {
    font-size: 18px;
    font-weight: bold;
  }
  </style>
  