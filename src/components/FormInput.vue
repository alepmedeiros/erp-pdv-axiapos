<template>
  <div :class="['form-group', sizeClass]">
    <label
      :for="id"
      :class="{ 'float-label': modelValue || isFocused }"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :value="modelValue"
      :type="type"
      :placeholder="isFocused ? '' : placeholder"
      :required="required"
      :readonly="readonly"
      :disabled="readonly"
      :class="{ 'readonly-input': readonly }"
      @input="handleInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
      v-money="isMoney ? moneyConfig : null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  label: { type: String, required: true },
  id: { type: String, required: true },
  modelValue: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: 'Digite aqui...' },
  required: { type: Boolean, default: false },
  sizeClass: { type: String, default: 'input-full' },
  isMoney: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  moneyConfig: {
    type: Object,
    default: () => ({
      decimal: ',',
      thousands: '.',
      prefix: 'R$ ',
      precision: 2,
    }),
  },
});

const emit = defineEmits(['update:modelValue']);
const isFocused = ref(false);

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit('update:modelValue', input.value);
};
</script>

<style scoped>
.form-group {
  position: relative;
  margin-bottom: 20px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus {
  border-color: #a049b8;
  box-shadow: 0 0 8px rgba(160, 73, 184, 0.2);
  outline: none;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}


.readonly-input {
  background-color: #f8f8f8;
  cursor: not-allowed;
}
</style>
