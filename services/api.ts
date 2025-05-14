import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Créer une instance axios avec la configuration de base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Services d'authentification
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  },
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/users/register', { name, email, password });
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
};

// Services pour les dossiers
export const dossierService = {
  getAllDossiers: async () => {
    const response = await api.get('/dossiers');
    return response.data;
  },
  getDossierById: async (id: string) => {
    const response = await api.get(`/dossiers/${id}`);
    return response.data;
  },
  createDossier: async (dossierData: any) => {
    const response = await api.post('/dossiers', dossierData);
    return response.data;
  },
  updateDossier: async (id: string, dossierData: any) => {
    const response = await api.put(`/dossiers/${id}`, dossierData);
    return response.data;
  },
  deleteDossier: async (id: string) => {
    const response = await api.delete(`/dossiers/${id}`);
    return response.data;
  },
};

export default api;