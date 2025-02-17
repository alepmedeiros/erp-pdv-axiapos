<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="login-header">
        <h2>Entrar</h2>
        <div class="social-icons">
          <i class="pi pi-facebook"></i>
          <i class="pi pi-github"></i>
          <i class="pi pi-google"></i>
        </div>
      </div>

      <div class="input-group">
        <span class="floating-label">
          <InputText
            v-model="login"
            id="email"
            class="p-inputtext"
            placeholder=" "
            required
          />
          <label for="email">E-mail</label>
        </span>
      </div>

      <div class="input-group">
        <span class="floating-label">
          <InputText
            v-model="password"
            id="password"
            type="password"
            placeholder=" "
            required
          />
          <label for="password">Senha</label>
        </span>
      </div>

      <div class="checkbox-group">
        <input type="checkbox" id="remember" />
        <label for="remember">Lembrar-me</label>
      </div>

      <Button
        label="Entrar"
        icon="pi pi-sign-in"
        class="p-button-raised p-button-dark"
        :loading="isLoading"
        type="submit"
      />

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <div class="login-footer">
        <p>Não tem uma conta? <a href="/signup">Cadastre-se</a></p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const router = useRouter();
const login = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);

onMounted(() => {
  const authMessage = localStorage.getItem('authMessage');
  if (authMessage) {
    errorMessage.value = authMessage;
    localStorage.removeItem('authMessage');
  }
});

const handleLogin = async () => {
  if (!login.value || !password.value) {
    errorMessage.value = 'Por favor, preencha todos os campos.';
    return;
  }

  try {
    isLoading.value = true;
    // Simulação de chamada API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push('/main');
  } catch (error) {
    errorMessage.value = 'Erro ao fazer login. Tente novamente.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-header {
  margin-bottom: 20px;
}

.login-header h2 {
  margin: 0 0 10px 0;
  font-size: 1.8em;
  color: #333;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.social-icons i {
  font-size: 1.5em;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;
}

.social-icons i:hover {
  color: #1e90ff;
}

.input-group {
  margin-bottom: 20px;
  position: relative;
}

.floating-label {
  display: flex;
  flex-direction: column;
}

.floating-label input {
  width: 100%;
  padding: 10px;
  font-size: 1em;
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
  font-size: 0.8em;
  color: #1e90ff;
  background-color: white;
}

.floating-label label {
  position: absolute;
  top: 12px;
  left: 10px;
  pointer-events: none;
  font-size: 1em;
  color: #aaa;
  transition: all 0.2s ease;
}

.checkbox-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.checkbox-group input {
  margin-right: 10px;
}

button {
  width: 100%;
}

.login-footer {
  margin-top: 15px;
}

.login-footer p {
  font-size: 0.9em;
  color: #666;
}

.login-footer a {
  color: #007bff;
  text-decoration: none;
}

.login-footer a:hover {
  text-decoration: underline;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
