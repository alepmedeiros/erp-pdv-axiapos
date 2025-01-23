<template>
  <div class="input-group">
    <input 
      :value="displayedValue" 
      @input="updateValue" 
      :type="inputType" 
      :id="id" 
      :placeholder="label" 
      :readonly="disabled"
      :class="{ 'no-interaction': disabled, 'text-right': alignRight }"
      ref="inputElement"
    />
    <label :for="id" class="fixed-label">{{ label }}</label>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed, ref, watch  } from 'vue';
import { formatCurrency, formatDecimal } from '@/utils/utils';

const props = defineProps<{
  modelValue?: string | number;
  label: string;
  type?: string;
  id: string;
  disabled?: boolean; 
  isCurrency?: boolean;
  isDecimal?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

// Computed property to handle the display of the formatted value
const displayedValue = computed(() => {
  if (props.isCurrency) {
    return formatCurrency(Number(props.modelValue || 0));
  } else if (props.isDecimal) {
    return formatDecimal(Number(props.modelValue || 0));
  }
  return props.modelValue;
});

// Dynamic input type based on currency/decimal
const inputType = computed(() => {
  // Define o tipo como "text" apenas para campos monetários
  if (props.isCurrency) {
    return 'text';
  }
  // Para quantidades e outros valores decimais, mantém "number"
  return props.type || 'number';
});
// (props.isCurrency || props.isDecimal ? 'text' : props.type || 'text'));

// Align text to the right if it's a currency or decimal field
const alignRight = computed(() => props.isCurrency || props.isDecimal);

// Handle input event for different types of values
const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;

  let value: string | number = target.value;

  if (props.isCurrency || props.isDecimal) {
    // Remove any non-numeric characters except "." and "-" for numbers
    value = value.replace(/[^0-9.-]+/g, '');
    value = Number(value); // Convert to number for currency/decimal values
  }
  
  emit('update:modelValue', value);
};


</script>

<style scoped>
.input-group {
  position: relative;
  margin-bottom: 20px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  padding-top: 30px;
  padding-left: 30px;
  font-size: 16px;
  border: 2px solid #3366cc;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
}

.input-group input.text-right {
  text-align: right;
}

.input-group input::placeholder {
  color: #ccc;
}

.fixed-label {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 13px;
  color: #666666;
  background: white;
  padding: 0 5px;
}

/* Style to disable interaction visually without changing appearance */
.no-interaction {
  pointer-events: none;
}
</style>
