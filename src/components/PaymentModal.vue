<template>
  <div class="background" v-if="open"  @click.self="closeModal">
    <div class="card">
      <MercadoPagoPagamento 
        @payment-success="handleSuccess" 
        @payment-error="handleError"
      />

      <!-- Botão para fechar o modal -->
      <button class="close-btn" @click="closeModal">Fechar</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import MercadoPagoPagamento from '@/components/MercadoPagoPagamento.vue';

// Define as propriedades recebidas pelo componente
const props = defineProps<{
  open: boolean;
}>();

// Define os eventos emitidos pelo componente
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'payment-success'): void;
  (e: 'payment-error', error: any): void;
}>();

const handleSuccess = () => {
  console.log('Pagamento concluído com sucesso no modal.');
  emit('payment-success');
};

const handleError = (error: any) => {
  console.error('Erro no pagamento no modal:', error);
  emit('payment-error', error);
};

// Função para fechar o modal
const closeModal = () => {
  emit('close');
};

</script>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(20, 20, 20, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: black;
  width: 90%;
  max-width: 600px; /* Define o tamanho máximo para telas grandes */
  height: 80%;
  max-height: 700px; /* Define a altura máxima para telas grandes */
  padding: 1rem;
  border-radius: 1rem;
  justify-content: space-between;
  overflow-y: auto; /* Permite rolar se o conteúdo exceder a altura */
}

.close-btn {
  background-color: transparent;
  border: none;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 1rem;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #007bff;
}
</style>
