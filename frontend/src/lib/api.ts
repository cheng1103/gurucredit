import axios from 'axios';
import type { ServiceAreaCode } from '@/lib/constants';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Services API
export const servicesAPI = {
  getAll: () => api.get('/services'),
  getOne: (id: string) => api.get(`/services/${id}`),
};

// Application data interface
interface ApplicationData {
  serviceId: string;
  name: string;
  email: string;
  phone: string;
  serviceArea: ServiceAreaCode;
  employmentType: string;
  employerName?: string;
  jobTitle?: string;
  monthlyIncome: number;
  houseLoan?: number;
  carLoan?: number;
  personalLoan?: number;
  creditCard?: number;
  otherDebts?: number;
  loanPurpose?: string;
  loanAmount?: number;
  additionalNotes?: string;
  referralSource?: string;
  contactPreference?: string;
}

interface ApplicationResponse {
  id: string;
  serviceId: string;
  status: string;
  applicantName: string;
  applicantEmail: string;
  createdAt: string;
}

// Applications API
export const applicationsAPI = {
  createPublic: (data: ApplicationData) =>
    api.post<ApplicationResponse>('/applications/public', data),
  getStatusByReference: (payload: { referenceId: string; email: string }) =>
    api.post<{
      id: string;
      applicantName: string;
      status: string;
      createdAt: string;
      contactPreference?: string | null;
      referralSource?: string | null;
      serviceName?: string | null;
      loanAmount?: number | null;
    }>('/applications/reference/status', payload),
};

// Credit Analysis API
export const creditAnalysisAPI = {
  calculateDSR: (data: { monthlyIncome: number; totalMonthlyDebts: number }) =>
    api.post('/credit-analysis/dsr', data),
  assessEligibility: (data: {
    monthlyIncome: number;
    totalMonthlyDebts: number;
    requestedLoanAmount: number;
    loanTenureYears: number;
    creditScore?: number;
    employmentYears?: number;
  }) => api.post('/credit-analysis/eligibility', data),
};

// Contact API
export const contactAPI = {
  submit: (data: {
    name: string;
    email: string;
    phone?: string;
    serviceArea: ServiceAreaCode;
    subject: string;
    message: string;
  }) => api.post('/contact', data),
};

// Newsletter API
export const newsletterAPI = {
  subscribe: (email: string) => api.post('/newsletter/subscribe', { email }),
  unsubscribe: (email: string) => api.post('/newsletter/unsubscribe', { email }),
};

// Leads API (for exit intent popup)
export const leadsAPI = {
  capture: (data: {
    phone: string;
    serviceArea: ServiceAreaCode;
    source?: string;
    pageUrl?: string;
    language?: string;
  }) => api.post('/leads', data),
};
