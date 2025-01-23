<template>
    <div class="modal-overlay" v-if="isVisible">
      <div class="modal-content">
        <h3>Cadastrar Unidade</h3>
        <form @submit.prevent="handleSubmit">
          <label for="unitName">Nome da Unidade</label>
          <input type="text" id="unitName" v-model="unitName" required />
  
          <div class="modal-actions">
            <button type="button" @click="closeModal">Cancelar</button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  // Props para controlar visibilidade do modal
  const props = defineProps({
    isVisible: {
      type: Boolean,
      required: true,
    },
  });
  
  // Emit para fechar modal e enviar dados
  const emit = defineEmits(['close', 'unitAdded']);
  
  const unitName = ref('');
  
  // Função para fechar o modal
  const closeModal = () => {
    emit('close');
  };
  
  // Função para enviar o novo dado cadastrado
  const handleSubmit = () => {
    emit('unitAdded', unitName.value);
    unitName.value = '';
    closeModal();
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  }
  
  .modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  </style>
  