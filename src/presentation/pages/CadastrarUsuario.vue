<template>
    <div class="signup-container">
        <form @submit.prevent="handleSignup" class="signup-form">
            <div class="signup-header">
                <h2>Cadastrar-se</h2>
                <p>Crie sua conta ou use suas redes sociais</p>
                <div class="social-icons">
                    <i class="pi pi-facebook"></i>
                    <i class="pi pi-github"></i>
                    <i class="pi pi-google"></i>
                </div>
            </div>

            <div class="input-row">
                <div class="input-group">
                    <span class="floating-label">
                        <InputText v-model="primeronome" id="primeironome" class="p-inputtext" placeholder=" "
                            required />
                        <label for="primeironome">Primeiro Nome</label>
                    </span>
                </div>
                <div class="input-group">
                    <span class="floating-label">
                        <InputText v-model="ultimonome" id="ultimonome" class="p-inputtext" placeholder=" " required />
                        <label for="ultimonome">Último Nome</label>
                    </span>
                </div>
            </div>

            <div class="input-row">
                <div class="input-group">
                    <span class="floating-label">
                        <InputText v-model="email" id="email" class="p-inputtext" placeholder=" " required />
                        <label for="email">E-mail</label>
                    </span>
                </div>
            </div>

            <div class="input-row">
                <div class="input-group">
                    <span class="floating-label">
                        <InputText v-model="password" id="password" type="password" placeholder=" " required />
                        <label for="password">Senha</label>
                    </span>
                </div>
            </div>

            <Button label="Cadastrar" icon="pi pi-user-plus" class="p-button-raised p-button-success"
                :loading="isLoading" type="submit" />

            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

            <div class="signup-footer">
                <p>Já tem uma conta? <a href="/">Entrar</a></p>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const primeronome = ref('');
const ultimonome = ref('');
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);

const handleSignup = async () => {
  if (!primeronome.value || !ultimonome.value || !email.value || !password.value) {
    errorMessage.value = 'Por favor, preencha todos os campos.';
    return;
  }

  try {
    isLoading.value = true;
    // Simulação de chamada à API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Cadastro realizado com sucesso!');
  } catch (error) {
    errorMessage.value = 'Erro ao cadastrar. Tente novamente.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.signup-form {
  width: 100%;
  max-width: 450px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.signup-header {
  margin-bottom: 20px;
}

.signup-header h2 {
  margin-bottom: 10px;
  font-size: 1.8rem;
  color: #333;
}

.signup-header p {
  font-size: 0.9rem;
  color: #666;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.social-icons i {
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;
}

.social-icons i:hover {
  color: #1e90ff;
}

.input-row {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.input-group {
  flex: 1;
  position: relative;
}

.floating-label input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.floating-label input:focus {
  border-color: #1e90ff;
  box-shadow: 0px 0px 6px rgba(30, 144, 255, 0.5);
}

.floating-label input:focus + label,
.floating-label input:not(:placeholder-shown) + label {
  transform: translateY(-18px);
  font-size: 0.8rem;
  color: #1e90ff;
  background-color: white;
}

.floating-label label {
  position: absolute;
  top: 12px;
  left: 10px;
  font-size: 1rem;
  color: #aaa;
  transition: all 0.2s ease;
}

button {
  width: 100%;
}

.signup-footer {
  margin-top: 15px;
}

.signup-footer p {
  font-size: 0.9rem;
  color: #666;
}

.signup-footer a {
  color: #007bff;
  text-decoration: none;
}

.signup-footer a:hover {
  text-decoration: underline;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
