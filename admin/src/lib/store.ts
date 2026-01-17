import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: AdminUser, token: string) => void;
  logout: () => void;
}

const resolveStorage = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return undefined;
  }
  return window.localStorage;
};

const memoryStorage: Storage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
  clear: () => undefined,
  key: () => null,
  get length() {
    return 0;
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        const storage = resolveStorage();
        storage?.setItem('admin_token', token);
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        const storage = resolveStorage();
        storage?.removeItem('admin_token');
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'admin-auth-storage',
      storage: createJSONStorage(() => resolveStorage() ?? memoryStorage),
    }
  )
);
