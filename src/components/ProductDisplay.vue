<template>
    <div class="product-display-container">
      <div class="product-name-display border border-primary rounded bg-light">
        <div class="product-label">NOME DO PRODUTO</div>
        <div class="product-name">{{ productName }}</div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  const props = defineProps<{
    productName: string;
  }>();
  </script>
  
  <style scoped>
  .product-display-container {
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: center;
  }
  
  .product-name-display {
    width: 100%;
    padding: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #3366cc;
    position: relative;
  }
  
  .product-label {
    font-size: 14px;
    color: #666666;
    position: absolute;
    top: 10px;
    left: 20px;
  }
  
  .product-name {
    margin-top: 20px;
    color: #3366cc;
  }
  </style>
  