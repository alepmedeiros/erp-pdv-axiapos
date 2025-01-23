<template>
  <button :class="['base-button', buttonClass]" @click="onClick">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  buttonClass: { type: String, default: '' },
  onClick: { type: Function, default: () => {} },
});
</script>

<style scoped>
.base-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
  flex: 1;
}

.cancel {
  background-color: #ff4d4d;
  color: #fff;
}

.clear {
  background-color: #ffc107;
  color: #fff;
}

.print {
  background-color: #8e44ad;
  color: #fff;
}

.pay {
  background-color: #28a745;
  color: #fff;
}
</style>
