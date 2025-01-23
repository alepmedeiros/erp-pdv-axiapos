<template>
  <div class="form-row">
    <slot></slot>
  </div>
</template>

<style scoped>
.form-row {
  display: flex;
  justify-content: space-between; /* Ajusta para espaço uniforme */
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}

.form-row > * {
  flex: 1; /* Cada item ocupará espaço igual */
  min-width: 150px; /* Para evitar que eles fiquem muito pequenos */
}

</style>
