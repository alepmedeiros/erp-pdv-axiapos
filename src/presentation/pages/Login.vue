<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="login-header">
        <h2>Entrar</h2>
        <p>Entre com sua conta ou use suas redes sociais</p>
        <div class="social-icons">
          <i class="pi pi-facebook" @click="handleSocialLogin('facebook')"></i>
          <i class="pi pi-github" @click="handleSocialLogin('github')"></i>
          <i class="pi pi-google" @click="handleSocialLogin('google')"></i>
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
        class="p-button-raised p-button-primary w-full"
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
import apiClient, { setAuthToken } from '@/infrastructure/api/api';
import { initiateSocialAuth, handleSocialAuthCallback, isAuthenticating } from '@/infrastructure/auth/socialAuth';

const router = useRouter();
const login = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);
const authMessage = ref<string | null>(null);

onMounted(() => {
  const authMessage = localStorage.getItem('authMessage');
  if (authMessage) {
    errorMessage.value = authMessage;
    localStorage.removeItem('authMessage');
  }
});

const handleSocialLogin = (provider: 'google' | 'facebook' | 'github') => {
  initiateSocialAuth(provider);
};

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const provider = localStorage.getItem('socialAuthProvider');

  if (code && provider) {
    try {
      isLoading.value = true;
      const { access_token, refresh_token, expires_in } = await handleSocialAuthCallback(provider, code);
      const expirationTime = Date.now() + expires_in * 1000;
      setAuthToken(access_token, expirationTime);
      localStorage.setItem('refreshToken', refresh_token);
      localStorage.removeItem('socialAuthProvider');
      const redirectTo = localStorage.getItem('redirectTo') || '/main';
      router.push(redirectTo);
    } catch (error: any) {
      console.error('Erro na autenticação social:', error);
      errorMessage.value = 'Erro na autenticação social. Tente novamente.';
    } finally {
      isLoading.value = false;
    }
  }
});

const handleLogin = async () => {
  if (!login.value || !password.value) {
    errorMessage.value = 'Por favor, preencha todos os campos.';
    return;
  }

  try {
    isLoading.value = true;
    const payload = { email: login.value, senha: password.value };
    console.log('Enviando dados:', payload);
    const response = await apiClient.post('/auth/login', payload);
    console.log(response.data);
    if (response.data){
      const { access_token, refresh_token, expires_in } = response.data;
      const expirationTime = Date.now() + expires_in * 1000;
      setAuthToken(access_token, expirationTime);
      localStorage.setItem('refreshToken', refresh_token);
      const redirectTo = localStorage.getItem('redirectTo') || '/main';
      router.push(redirectTo);
    } 
  } catch (error: any) {
    console.log(error);
    errorMessage.value =
      error.response?.data?.message || 'Erro ao fazer login. Tente novamente.';
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
  padding: 20px;
}

.login-form {
  width: 100%;
  max-width: 600px;
  padding: 30px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  text-align: center;
}

.login-header {
  margin-bottom: 20px;
}

.login-header h2 {
  margin-bottom: 10px;
  font-size: 1.8rem;
  color: #333;
}

.login-header p {
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

.input-group {
  margin-bottom: 20px;
  position: relative;
  width: 100%;
}

.floating-label {
  display: flex;
  flex-direction: column;
  width: 100%;
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

.checkbox-group {
  margin-bottom: 20px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox-group input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #1e90ff;
}

.checkbox-group label {
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
}

.error-message {
  color: #ff4d4f;
  margin-top: 10px;
  font-size: 0.9rem;
}

.login-footer {
  margin-top: 15px;
}

.login-footer p {
  font-size: 0.9rem;
  color: #666;
}

.login-footer a {
  color: #1e90ff;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.login-footer a:hover {
  color: #0066cc;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-container {
    padding: 15px;
  }
  
  .login-form {
    padding: 15px;
  }
  
  .login-header h2 {
    font-size: 1.5rem;
  }
  
  .floating-label input {
    font-size: 16px;
  }
}
</style>
