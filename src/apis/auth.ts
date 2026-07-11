import { api } from './api';

const AUTH_STORAGE_KEY = 'anitabi_trace_auth';

export interface AuthResult {
    token: string;
    expires_at: number;
    nickname: string;
}


export interface AuthIdentity {
    nickname: string;
    expiresAt: number;
}

let refreshPromise: Promise<void> | null = null;

const isAuthResult = (value: unknown): value is AuthResult => {
    if (typeof value !== 'object' || value === null) return false;
    const result = value as Partial<AuthResult>;
    return typeof result.token === 'string'
        && typeof result.expires_at === 'number'
        && typeof result.nickname === 'string';
};

const clearStoredAuth = (): void => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
};

const getStoredAuth = (): AuthResult | null => {
    const serialized = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!serialized) return null;
    try {
        const result: unknown = JSON.parse(serialized);
        if (isAuthResult(result)) return result;
    } catch {
        // Invalid persisted authentication is discarded below.
    }
    clearStoredAuth();
    return null;
};

const getStoredToken = (): string | null => getStoredAuth()?.token ?? null;

const storeAuthResult = (result: AuthResult): void => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(result));
};

export const registerNickname = async (nickname: string, turnstileToken?: string): Promise<AuthResult> => {
    const body = turnstileToken ? { nickname, turnstile_token: turnstileToken } : { nickname };
    const result = await api.post<AuthResult>('/nickname/register', body, { force: true });
    storeAuthResult(result);
    return result;
};

export const refreshAuthToken = (): Promise<void> => {
    if (refreshPromise) return refreshPromise;
    const refreshingToken = getStoredToken();

    refreshPromise = api.post<AuthResult>('/token/refresh', undefined, {
        authenticated: true,
        retryUnauthorized: false,
        force: true,
        methodKey: 'token-refresh',
    }).then(result => {
        if (getStoredToken() === refreshingToken) storeAuthResult(result);
    }).catch(error => {
        if (getStoredToken() === refreshingToken) clearStoredAuth();
        throw error;
    }).finally(() => {
        refreshPromise = null;
    });
    return refreshPromise;
};

const toIdentity = (auth: AuthResult): AuthIdentity => ({
    nickname: auth.nickname,
    expiresAt: auth.expires_at,
});

export const restoreAuthentication = (): AuthIdentity | null => {
    const storedAuth = getStoredAuth();
    if (!storedAuth || storedAuth.expires_at < Date.now()) return null;
    return toIdentity(storedAuth);
};

export const initializeAuthentication = async (): Promise<AuthIdentity | null> => {
    const storedAuth = getStoredAuth();
    if (!storedAuth) return null;

    if (storedAuth.expires_at < Date.now()) {
        try {
            await refreshAuthToken();
        } catch {
            return null;
        }
        const refreshedAuth = getStoredAuth();
        return refreshedAuth ? toIdentity(refreshedAuth) : null;
    }
    return toIdentity(storedAuth);
};

api.setAuthProvider({
    getToken: getStoredToken,
    refreshToken: refreshAuthToken,
});
