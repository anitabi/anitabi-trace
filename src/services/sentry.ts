import * as Sentry from '@sentry/vue';
import type { App } from 'vue';

export const initializeSentry = (app: App): void => {
    const dsn = import.meta.env.VITE_SENTRY_DSN?.trim();
    if (!dsn) return;

    Sentry.init({ app, dsn, environment: import.meta.env.MODE });
};

export const reportException = (error: Error): string | undefined => {
    if (!Sentry.isEnabled()) return undefined;

    return Sentry.captureException(error);
};
