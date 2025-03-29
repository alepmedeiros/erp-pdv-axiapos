<template>
  <div :class="['form-group', sizeClass]">
    <label
      :for="selectId"
      :class="{ 'float-label': selectedOption || isFocused }"
    >
      {{ label }}
    </label>
    <Dropdown
      :id="selectId"
      v-model="selectedOption"
      :options="options"
      optionLabel="label"
      optionValue="id"
      :placeholder="isFocused ? '' : 'Selecione uma opção'"
      class="w-full"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :pt="{
        root: { class: 'custom-dropdown' },
        panel: { class: 'custom-dropdown-panel' },
        item: { class: 'custom-dropdown-item' }
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue';
import Dropdown from 'primevue/dropdown';
import apiClient from '@/infrastructure/api/api';

interface Option {
  id: string;
  label: string;
}

const props = defineProps({
  label: String,
  apiEndpoint: String,
  selectId: String,
  modelValue: String,
  staticOptions: Array as () => Option[],
  useStatic: { type: Boolean, default: false },
  sizeClass: { type: String, default: 'col-12' }
});

const emit = defineEmits(['update:modelValue']);
const options = ref<Option[]>(props.staticOptions || []);
const selectedOption = ref<string | null>(null);
const isFocused = ref(false);

const fetchOptions = async () => {
  if (!props.useStatic && props.apiEndpoint) {
    try {
      const response = await apiClient.get(props.apiEndpoint);
      options.value = response.data.map((item: any) => ({
        id: item.id,
        label: item.descricao,
      }));
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }
};

watch(() => props.modelValue, (newVal) => {
  selectedOption.value = newVal;
});

watch(() => selectedOption.value, (newVal) => {
  emit('update:modelValue', newVal);
});

onMounted(() => {
  if (!props.useStatic) {
    fetchOptions();
  }
});
</script>

<style scoped>
.form-group {
  position: relative;
  margin-bottom: 20px;
}

:deep(.p-dropdown) {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

:deep(.p-dropdown:hover),
:deep(.p-dropdown.p-focus) {
  border-color: #a049b8;
  box-shadow: 0 0 8px rgba(160, 73, 184, 0.2);
  outline: none;
}

:deep(.p-dropdown-panel) {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

:deep(.p-dropdown-item) {
  padding: 10px;
  transition: background-color 0.2s;
}

:deep(.p-dropdown-item:hover) {
  background-color: rgba(160, 73, 184, 0.1);
}

:deep(.p-dropdown-label) {
  padding: 0;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #6c757d;
  font-weight: bold;
  transition: all 0.3s ease;
}

.float-label {
  transform: translateY(-20px);
  font-size: 0.85em;
  color: #a049b8;
}

:deep(.p-dropdown-label.p-placeholder) {
  color: #6c757d;
}
</style>
