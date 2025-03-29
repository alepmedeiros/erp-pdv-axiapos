import { ref } from 'vue';
import apiClient from '../api/api';

interface SocialAuthResponse {
  access_token: string;
  refresh_token: string;
}

interface SocialUserData {
  email: string;
  name: string;
  provider: string;
  providerId: string;
  photoUrl?: string;
}

const isAuthenticating = ref(false);
const errorMessage = ref<string | null>(null);

// Configurações do OAuth para cada provedor
const configs = {
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirectUri: `${window.location.origin}/auth/google/callback`,
    scope: 'email profile',
  },
  facebook: {
    clientId: import.meta.env.VITE_FACEBOOK_APP_ID,
    redirectUri: `${window.location.origin}/auth/facebook/callback`,
    scope: 'email,public_profile',
  },
  github: {
    clientId: import.meta.env.VITE_GITHUB_CLIENT_ID,
    redirectUri: `${window.location.origin}/auth/github/callback`,
    scope: 'user:email',
  },
};

// Função para iniciar o processo de autenticação social
export const initiateSocialAuth = (provider: 'google' | 'facebook' | 'github') => {
  const config = configs[provider];
  let authUrl = '';

  switch (provider) {
    case 'google':
      authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&response_type=code&scope=${config.scope}`;
      break;
    case 'facebook':
      authUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${config.scope}`;
      break;
    case 'github':
      authUrl = `https://github.com/login/oauth/authorize?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${config.scope}`;
      break;
  }

  window.location.href = authUrl;
};

// Função para processar o callback da autenticação social
export const handleSocialAuthCallback = async (provider: string, code: string): Promise<SocialAuthResponse> => {
  try {
    isAuthenticating.value = true;
    errorMessage.value = null;

    const response = await apiClient.post('/auth/social/callback', {
      provider,
      code,
      redirectUri: configs[provider as keyof typeof configs].redirectUri,
    });

    return response.data;
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Erro na autenticação social';
    throw error;
  } finally {
    isAuthenticating.value = false;
  }
};

// Função para obter dados do usuário após autenticação social
export const getSocialUserData = async (provider: string, accessToken: string): Promise<SocialUserData> => {
  try {
    const response = await apiClient.post('/auth/social/user-info', {
      provider,
      accessToken,
    });

    return response.data;
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Erro ao obter dados do usuário';
    throw error;
  }
};

export { isAuthenticating, errorMessage };