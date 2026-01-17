import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockUser = {
  id: 'user-123',
  email: 'admin@example.com',
  name: 'Admin Tester',
  role: 'ADMIN',
};

let useAuthStore: typeof import('../store').useAuthStore;

describe('useAuthStore', () => {
  beforeEach(async () => {
    await vi.resetModules();
    const storeModule = await import('../store');
    useAuthStore = storeModule.useAuthStore;
    if (typeof localStorage !== 'undefined' && typeof localStorage.clear === 'function') {
      localStorage.clear();
    }
  });

  it('stores auth data and token via setAuth', () => {
    const { setAuth } = useAuthStore.getState();

    setAuth(mockUser, 'token-abc');

    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.token).toBe('token-abc');
    expect(state.isAuthenticated).toBe(true);
    expect(localStorage.getItem('admin_token')).toBe('token-abc');
  });

  it('clears auth state on logout', () => {
    const { setAuth, logout } = useAuthStore.getState();

    setAuth(mockUser, 'token-keep');
    logout();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(localStorage.getItem('admin_token')).toBeNull();
  });
});
