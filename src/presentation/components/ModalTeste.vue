<template>
  <div class="modal fade" tabindex="-1" id="paymentModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Pagamento</h5>
          <button type="button" class="btn-close" @click="cancel" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <label for="paymentCode">Código de Pagamento</label>
          <input v-model="paymentCode" id="paymentCode" class="form-control" @keydown.enter="confirm" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="cancel">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="confirm">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose, onMounted } from 'vue';
// Importação explícita do Modal do Bootstrap
import * as bootstrap from 'bootstrap';

const paymentCode = ref('');
let modalInstance: bootstrap.Modal | null = null;

defineExpose({
  open,
  close,
});

function open() {
  modalInstance?.show();
}

function close() {
  modalInstance?.hide();
}

function confirm() {
  emit('confirm', paymentCode.value);
  close();
}

function cancel() {
  emit('cancel');
  close();
}

const emit = defineEmits(['confirm', 'cancel']);

onMounted(() => {
  const modalElement = document.getElementById('paymentModal');
  if (modalElement) {
    modalInstance = new bootstrap.Modal(modalElement);
  }
});
</script>

<style scoped>
/* CSS opcional para ajustar o modal */
</style>
