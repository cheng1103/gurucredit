import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const push = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

// Dummy chrome: Sidebar/TopBar pull in usePathname/next-themes/etc. that are
// irrelevant to the hydration-gating behaviour under test here.
vi.mock('@/components/Sidebar', () => ({
  Sidebar: () => <div data-testid="sidebar" />,
}));
vi.mock('@/components/TopBar', () => ({
  TopBar: () => <div data-testid="topbar" />,
}));

const useAuthStoreMock = vi.fn();
const hasHydratedMock = vi.fn();
const onFinishHydrationMock = vi.fn();
(useAuthStoreMock as unknown as { persist: unknown }).persist = {
  hasHydrated: hasHydratedMock,
  onFinishHydration: onFinishHydrationMock,
};

vi.mock('@/lib/store', () => ({
  useAuthStore: useAuthStoreMock,
}));

const useIsHydratedMock = vi.fn();
vi.mock('@/lib/use-is-hydrated', () => ({
  useIsHydrated: useIsHydratedMock,
}));

// Imported after the mocks above so AdminLayout picks them up.
const { AdminLayout } = await import('@/components/AdminLayout');

const adminUser = { id: 'u1', email: 'admin@example.com', name: 'Admin', role: 'ADMIN' };

describe('AdminLayout', () => {
  beforeEach(() => {
    push.mockReset();
    useAuthStoreMock.mockReset();
    hasHydratedMock.mockReset();
    onFinishHydrationMock.mockReset();
    useIsHydratedMock.mockReset();
    onFinishHydrationMock.mockReturnValue(() => {});
  });

  it('renders children once both the persist store and the client are hydrated and the user is an authenticated admin', async () => {
    hasHydratedMock.mockReturnValue(true);
    useIsHydratedMock.mockReturnValue(true);
    useAuthStoreMock.mockReturnValue({ isAuthenticated: true, user: adminUser });

    render(
      <AdminLayout>
        <div>Analytics content</div>
      </AdminLayout>,
    );

    expect(await screen.findByText('Analytics content')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('topbar')).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });

  it('redirects to /login once hydrated when the visitor is not authenticated', async () => {
    hasHydratedMock.mockReturnValue(true);
    useIsHydratedMock.mockReturnValue(true);
    useAuthStoreMock.mockReturnValue({ isAuthenticated: false, user: null });

    render(
      <AdminLayout>
        <div>Analytics content</div>
      </AdminLayout>,
    );

    await waitFor(() => expect(push).toHaveBeenCalledWith('/login'));
    expect(screen.queryByText('Analytics content')).not.toBeInTheDocument();
  });

  it('redirects to /login once hydrated when the authenticated user is not an admin', async () => {
    hasHydratedMock.mockReturnValue(true);
    useIsHydratedMock.mockReturnValue(true);
    useAuthStoreMock.mockReturnValue({
      isAuthenticated: true,
      user: { ...adminUser, role: 'CUSTOMER' },
    });

    render(
      <AdminLayout>
        <div>Analytics content</div>
      </AdminLayout>,
    );

    await waitFor(() => expect(push).toHaveBeenCalledWith('/login'));
  });

  it('regression: does not redirect before the client snapshot has hydrated, even though isAuthenticated reads false and the persist store already says it is hydrated', async () => {
    // This reproduces the hard-load bug: zustand's persist middleware
    // rehydrates synchronously from localStorage (hasHydrated() === true),
    // but useSyncExternalStore still serves the server snapshot
    // (isAuthenticated === false) during React's hydration pass. The old
    // code gated the redirect on persist-hydration alone and fired a
    // redirect before the real, authenticated client snapshot ever landed.
    hasHydratedMock.mockReturnValue(true);
    useIsHydratedMock.mockReturnValue(false);
    useAuthStoreMock.mockReturnValue({ isAuthenticated: false, user: null });

    render(
      <AdminLayout>
        <div>Analytics content</div>
      </AdminLayout>,
    );

    // Still showing the loading spinner, not bouncing to /login.
    expect(screen.queryByText('Analytics content')).not.toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();

    // Give any stray effects a chance to run; the redirect must still not fire.
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(push).not.toHaveBeenCalled();
  });
});
