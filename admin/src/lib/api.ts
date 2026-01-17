import axios from 'axios';

interface ServicePayload {
  name: string;
  description: string;
  price: number;
  type: string;
  features: string[];
  isActive?: boolean;
}

interface ApplicationAnalysisPayload {
  dsrPercentage: number;
  creditScore: number;
  approvalChance: string;
  maxLoanAmount: number;
  recommendations: string[];
  issues?: string[];
  adminNotes?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getProfile: () => api.get('/auth/me'),
};

// Users API
export const usersAPI = {
  getAll: (params?: { search?: string; role?: string; status?: string; page?: number; pageSize?: number }) =>
    api.get('/users', { params }),
  getOne: (id: string) => api.get(`/users/${id}`),
  updateRole: (id: string, role: string) => api.put(`/users/${id}/role`, { role }),
  toggleActive: (id: string) => api.put(`/users/${id}/toggle-active`),
  getStats: () => api.get('/users/stats'),
  create: (data: { name: string; email: string; password: string; role?: string; phone?: string }) =>
    api.post('/users', data),
};

// Services API
export const servicesAPI = {
  getAll: (params?: { search?: string; type?: string; status?: string; page?: number; pageSize?: number }) =>
    api.get('/services/admin', { params }),
  getOne: (id: string) => api.get(`/services/${id}`),
  create: (data: ServicePayload) => api.post('/services', data),
  update: (id: string, data: Partial<ServicePayload>) => api.put(`/services/${id}`, data),
  delete: (id: string) => api.delete(`/services/${id}`),
  seed: () => api.post('/services/seed'),
  getStats: () => api.get('/services/stats'),
};

// Applications API
interface ApplicationFilters {
  status?: string;
  search?: string;
  serviceArea?: string;
  page?: number;
  pageSize?: number;
}

export const applicationsAPI = {
  getAll: (filters?: ApplicationFilters) =>
    api.get('/applications/admin', { params: filters }),
  getOne: (id: string) => api.get(`/applications/${id}`),
  updateStatus: (id: string, data: { status: string; adminNotes?: string }) =>
    api.put(`/applications/${id}/status`, data),
  submitAnalysis: (id: string, data: ApplicationAnalysisPayload) =>
    api.put(`/applications/${id}/analysis`, data),
  updateFollowUp: (id: string, data: { followUpAt?: string; followUpNotes?: string; followUpStatus?: string }) =>
    api.put(`/applications/${id}/follow-up`, data),
  logContact: (id: string, data: { channel: string; outcome: string; notes?: string }) =>
    api.post(`/applications/${id}/contact-log`, data),
  getStats: () => api.get('/applications/stats'),
};

// Contact Messages API
export const contactAPI = {
  getAll: (params?: { status?: string; serviceArea?: string; search?: string; page?: number; pageSize?: number }) =>
    api.get('/contact', { params }),
  getOne: (id: string) => api.get(`/contact/${id}`),
  updateStatus: (id: string, data: { status: string; adminNote?: string }) =>
    api.put(`/contact/${id}/status`, data),
  delete: (id: string) => api.delete(`/contact/${id}`),
  getStats: () => api.get('/contact/stats'),
};

// Newsletter API
export const newsletterAPI = {
  getAll: (params?: { activeOnly?: string; search?: string; page?: number; pageSize?: number }) =>
    api.get('/newsletter', { params }),
  getStats: () => api.get('/newsletter/stats'),
};

// Leads API
export const leadsAPI = {
  getAll: (params?: { status?: string; source?: string; serviceArea?: string; search?: string; page?: number; pageSize?: number }) =>
    api.get('/leads', { params }),
  getOne: (id: string) => api.get(`/leads/${id}`),
  updateStatus: (id: string, data: { status: string; notes?: string }) =>
    api.put(`/leads/${id}/status`, data),
  distribute: (id: string, data: { teamMemberId: string; note?: string }) =>
    api.post(`/leads/${id}/distribute`, data),
  delete: (id: string) => api.delete(`/leads/${id}`),
  getStats: () => api.get('/leads/stats'),
};

export const auditLogsAPI = {
  getAll: (filters?: { action?: string; targetType?: string; actorId?: string; targetId?: string; search?: string; page?: number; pageSize?: number }) =>
    api.get('/audit-logs', { params: filters }),
};

export const teamMembersAPI = {
  getAll: (params?: { activeOnly?: string; page?: number; pageSize?: number }) =>
    api.get('/team-members', { params }),
  create: (data: { name: string; phone: string; role?: string }) =>
    api.post('/team-members', data),
  update: (id: string, data: { name?: string; phone?: string; role?: string }) =>
    api.put(`/team-members/${id}`, data),
  toggleActive: (id: string) => api.put(`/team-members/${id}/toggle-active`),
  delete: (id: string) => api.delete(`/team-members/${id}`),
};
