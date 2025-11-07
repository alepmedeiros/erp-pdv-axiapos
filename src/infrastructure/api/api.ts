import axios from 'axios';
import router from '@/presentation/router';

const apiClient = axios.create({  
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const isTokenExpired = (): boolean => {
  try {
    const expirationTime = localStorage.getItem('tokenExpiration');
    if (!expirationTime) return true;
    return parseInt(expirationTime) < Date.now();
  } catch {
    return true;
  }
};

const refreshAuthToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return null;

    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {
      refresh_token: refreshToken
    });

    const { access_token, refresh_token } = response.data;
    localStorage.setItem('refreshToken', refresh_token);
    return access_token;
  } catch (error) {
    console.error('Erro ao renovar o token:', error);
    return null;
  }
};

const loadAuthToken = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    delete apiClient.defaults.headers.common['Authorization'];
    return;
  }

  if (isTokenExpired(token)) {
    const newToken = await refreshAuthToken();
    if (newToken) {
      setAuthToken(newToken);
    } else {
      setAuthToken(null);
      router.push('/login');
    }
  } else {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

// Executa a configuração do token automaticamente ao iniciar
loadAuthToken();

// Função para salvar o token e sua expiração no localStorage e configurá-lo no axios
export const setAuthToken = (token: string | null, expirationTime?: number) => {
  if (token) {
    localStorage.setItem('authToken', token);
    if (expirationTime) {
      localStorage.setItem('tokenExpiration', expirationTime.toString());
    }
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiration');
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// Interceptor de requisições para ignorar o token em rotas específicas
apiClient.interceptors.request.use((config) => {
  if (config.url && config.url.includes('/login')) {
    delete config.headers.Authorization; // Remove o cabeçalho Authorization
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => apiClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAuthToken();
        if (newToken) {
          setAuthToken(newToken);
          processQueue();
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError);
      } finally {
        isRefreshing = false;
      }

      setAuthToken(null);
      localStorage.setItem('authMessage', 'Sessão expirada. Por favor, faça login novamente.');
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
