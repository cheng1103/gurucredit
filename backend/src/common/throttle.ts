import { minutes } from '@nestjs/throttler';

/**
 * The single rate-limit window used by every bucket in this app.
 *
 * `@nestjs/throttler` v6 takes `ttl` in **milliseconds**, not seconds. Every
 * `@Throttle` in this repo used to pass a bare `60`, i.e. a 60 *millisecond*
 * window, which meant `POST /auth/login` allowed roughly 50 attempts a second
 * and the public analytics beacon was effectively unlimited.
 *
 * Every limit in this codebase is "N requests per minute", so the window is
 * defined once here and imported everywhere. `minutes()` is the library's own
 * helper, so the value tracks the library's units rather than restating them.
 */
export const THROTTLE_WINDOW_MS = minutes(1);

/** Default bucket applied to every route without its own `@Throttle`. */
export const GLOBAL_THROTTLE_LIMIT = 60;
