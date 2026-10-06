import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * True once the client has taken over after hydration, false on the server
 * and during React's hydration pass.
 *
 * `useSyncExternalStore` serves the *server* snapshot (`false`) while React
 * is reconciling the hydration pass, then switches to the *client* snapshot
 * (`true`) on the very next render — no `setState` inside a `useEffect`
 * required, so there is no extra render/flicker beyond the one hydration
 * already causes.
 *
 * Use this to gate any logic that must not run until the client snapshot has
 * actually landed (e.g. redirects based on client-only state such as
 * zustand's `persist` store, which rehydrates synchronously from
 * localStorage and so can report "hydrated" before React's own hydration
 * pass has delivered the client snapshot).
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
