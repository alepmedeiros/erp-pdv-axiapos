<template>
  <p v-if="authMessage" class="alert">{{ authMessage }}</p>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <h2>Login</h2>
      <div class="input-group">
        <label for="username">Usuário</label>
        <input
          v-model="login"
          id="username"
          type="text"
          placeholder="Digite seu usuário"
          required
          aria-label="Usuário"
        />
      </div>
      <div class="input-group">
        <label for="password">Senha</label>
        <input
          v-model="password"
          id="password"
          type="password"
          placeholder="Digite sua senha"
          required
          aria-label="Senha"
        />
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Entrando...' : 'Entrar' }}
      </button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import apiClient, { setAuthToken } from '@/service/api';
import router from '@/router';

const login = ref(''); // Pode ser e-mail ou client_id
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const authMessage = ref<string | null>(null);

onMounted(() => {
  authMessage.value = localStorage.getItem('authMessage');
  if (authMessage.value) {
    localStorage.removeItem('authMessage'); // Limpa a mensagem após exibir
  }
});

// Regex para validar se o login é um e-mail
const isEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

const handleLogin = async () => {
  if (!login.value || !password.value) {
    errorMessage.value = 'Por favor, preencha todos os campos.';
    return;
  }

  // Define os campos de acordo com o tipo de entrada
  const payload = isEmail(login.value)
    ? { email: login.value, senha: password.value }
    : { client_id: login.value, client_secret: password.value };

  isLoading.value = true;
  try {    
    // Realizar a chamada para a API de login
    const response = await apiClient.post('/auth/login', payload);

    if (response.data){
      // Extrair os tokens da resposta
      const { access_token, refresh_token } = response.data;

      // Salvar o token de autenticação e refresh token
      setAuthToken(access_token);
      localStorage.setItem('refreshToken', refresh_token);

      // Redirecionar para a tela principal
      const redirectTo = localStorage.getItem('redirectTo') || '/main';
      router.push(redirectTo);

    } 
    
    // localStorage.removeItem('redirectTo');
  } catch (error: any) {
    errorMessage.value =
      error.response?.data?.message || 'Erro ao fazer login. Tente novamente.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.alert {
  color: red;
  margin-bottom: 1em;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

form {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

.input-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
