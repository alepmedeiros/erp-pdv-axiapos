<template>
  <div :class="['select-async', sizeClass]">
    <label :for="selectId" class="form-label">{{ label }}</label>
    <select 
      :id="selectId" 
      v-model="selectedOption" 
      @change="onChange"
      class="form-select custom-select">
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue';
import apiClient from '@/service/api';

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
  sizeClass: { type: String, default: 'col-12' } // Classe de tamanho usando Bootstrap
});

const emit = defineEmits(['update:modelValue']);
const options = ref<Option[]>(props.staticOptions || []);
const selectedOption = ref<string | null>(null);

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

const onChange = () => {
  emit('update:modelValue', selectedOption.value);
};

onMounted(() => {
  if (!props.useStatic) {
    fetchOptions();
  }
});

watch(() => props.modelValue, (newVal) => {
  selectedOption.value = newVal;
});
</script>

<style scoped>
.custom-select {
  padding: 10px;
  border-radius: 4px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #ccc;
}

.custom-select:focus {
  border-color: #a049b8;
  box-shadow: 0 0 8px rgba(160, 73, 184, 0.2);
  outline: none;
}

.select-async label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
</style>
