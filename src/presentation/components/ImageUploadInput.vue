<template>
  <div class="image-upload-group">
    <label :for="id" class="fixed-label">{{ label }}</label>
    <div class="image-placeholder">
      <!-- <div v-if="!imageUrl" class="placeholder-text">{{ placeholder }}</div> -->
      <!-- <img v-else :src="imageUrl || defaultImagePath" alt="Product Image" class="uploaded-image" /> -->
      <img 
        :src="imageUrl || defaultImagePath" 
        alt="Product Image" 
        class="uploaded-image" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import defaultImagePath from '@/assets/semproduto.jpeg';

const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  id: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'SEM IMAGEM',
  },
  imageUrl: {
    type: String,
    default: '', // URL da imagem recebida da API
  },
});
</script>

<style scoped>
.image-upload-group {
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-label {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 14px;
  color: #666666;
  background: white;
  padding: 0 5px;
}

.image-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* Ocupa a altura total do container */
  border: 2px solid #3366cc;
  border-radius: 5px;
  background-color: #fff;
}

.placeholder-text {
  color: #ccc;
  /* Cor do texto do placeholder */
  font-size: 14px;
}

.uploaded-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  /* Garante que a imagem se ajuste ao container */
}
</style>