
export class HTTPError extends Error {
    status: number
    data: unknown
    constructor(status: number, message: string, data?: unknown){
        super(message);
        this.status = status;
        this.data = data;
    }
    toString(){
        return `HTTPError: ${this.status} - ${this.message}`;
    }
}
/**
 * HTTP api client, packaged based on fetch.
 */
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export class HTTPPromise<T = object> extends Promise<T> {
    instance: ApiClient
    method: HTTPMethod
    url: string
    options: RequestOptions
    constructor(promise: (resolve: (value: T) => void, reject: (reason: Error | null) => void ) => unknown, instance: ApiClient, method: HTTPMethod, url: string, options = {}){
        super(promise);
        this.instance = instance;
        this.method = method;
        this.url = url;
        this.options = options;
    }

}
type ApiClientConfig = {
    baseURL?: string,
    headers?: Record<string, string>
}
export type RequestOptions = Omit<RequestInit, 'body'> & {
    noBaseUrl?: boolean,
    methodKey?: string, // Used to identify the request, if not provided, the full URL will be used.
    force?: boolean, // If true, the request will not use cache.
    block?: boolean, // If true, the request will be blocked until the data is fetched.
    authenticated?: boolean,
    retryUnauthorized?: boolean,
    body?: unknown,
}
type AuthProvider = {
    getToken: () => string | null,
    refreshToken: () => Promise<void>,
}
export class ApiClient{
    baseURL: string
    headers: Record<string, string>
    requests: Record<string, Array<{resolve: Function, reject: Function}>>
    dataCache: Map<string, object>
    authProvider: AuthProvider | null
    constructor(config: ApiClientConfig = {}){
        this.baseURL = config.baseURL || '';
        this.headers = config.headers || {};
        /*
           Storage the resolve method of promises that shared with other requests.
         */
        this.requests = {};
        this.dataCache = new Map();
        this.authProvider = null;
    }

    setAuthProvider(authProvider: AuthProvider): void {
        this.authProvider = authProvider;
    }

    async #fetch<T>(method: HTTPMethod, fullUrl: string, options: RequestOptions, canRefresh: boolean): Promise<T> {
        const {
            authenticated,
            retryUnauthorized,
            noBaseUrl: _noBaseUrl,
            methodKey: _methodKey,
            force: _force,
            block: _block,
            body,
            headers: optionHeaders,
            ...requestInit
        } = options;
        const headers = new Headers(this.headers);
        new Headers(optionHeaders).forEach((value, key) => headers.set(key, value));
        if (authenticated) {
            const token = this.authProvider?.getToken();
            if (token) headers.set('Authorization', `Bearer ${token}`);
        }
        if (body !== undefined && !headers.has('Content-Type')) {
            headers.set('Content-Type', 'application/json');
        }

        const response = await fetch(fullUrl, {
            ...requestInit,
            method,
            headers,
            body: body === undefined ? null : JSON.stringify(body),
        });
        if (
            response.status === 401
            && authenticated
            && retryUnauthorized !== false
            && canRefresh
            && this.authProvider
        ) {
            await this.authProvider.refreshToken();
            return this.#fetch<T>(method, fullUrl, options, false);
        }
        if (!response.ok) {
            const data = await response.json().catch(() => null) as { message?: unknown } | null;
            const message = typeof data?.message === 'string' ? data.message : response.statusText;
            throw new HTTPError(response.status, message, data);
        }
        return response.json() as Promise<T>;
    }

    #request<T>(method: HTTPMethod, url: string, options: RequestOptions = {}): HTTPPromise<T>{
        const fullUrl = options.noBaseUrl === true ? url : this.baseURL + url;
        const methodKey = options.methodKey || fullUrl.split('#')[0];
        return new HTTPPromise((resolve, reject) => {
            if (!options.force && this.dataCache.has(methodKey)){
                console.debug(`Using cached data for ${methodKey}`);
                // Avoid modification to returned data affects the cache,
                resolve(deepCopy(this.dataCache.get(methodKey)!) as T);
                return;
            }
            if (this.requests[methodKey] instanceof Array){
                console.debug(`Sharing request for ${methodKey}`);
                this.requests[methodKey].push({resolve, reject});
                return;
            }
            console.debug(`Making real request for ${methodKey}`);
            this.#fetch<T>(method, fullUrl, options, true).then(resolve).catch(reject);
        }, this, method, fullUrl, options);
    }

    get<T>(url: string, options: RequestOptions = {}){
        return this.#request<T>('GET', url, options);
    }

    post<T>(url: string, body?: unknown, options: RequestOptions = {}){
        return this.#request<T>('POST', url, { ...options, body });
    }

    static prefetch<T>(httpPromise: HTTPPromise<T>, callback?: (data: T | null, error: Error | null) => void): Promise<T> | void {
        // As normal request may be executed along with prefetch, we should share the request, therefore auto management is required.
        const { instance, url, options } = httpPromise;
        const methodKey = options.methodKey || url.split('#')[0];
        if (instance.requests[methodKey] instanceof Array){
            const { promise, resolve, reject } = Promise.withResolvers<T>();
            instance.requests[methodKey].push({resolve, reject});
            return promise;
        }else{
            instance.requests[methodKey] = [];
        }
        const requestFunc = () => {
            return httpPromise.then(data => {
                instance.dataCache.set(methodKey, data as object);
                instance.requests[methodKey].forEach(req => req.resolve(data));
                return data;
            }).catch(err => {
                instance.requests[methodKey].forEach(req => req.reject(err));
                throw err;
            })
            .finally(() => {
                delete instance.requests[methodKey];
            });
        };
        if (options.block === true){
            return requestFunc();
        }else{
            setTimeout(() => {
                // Caller is responsible for handling the exception in callback.
                let callbackData: T | null = null, callbackErr: Error | null = null;
                requestFunc().then(data => {
                    callbackData = data;
                }).catch(err => {
                    callbackErr = err;
                }).finally(() => {
                    if (callback) {
                        callback(callbackData, callbackErr);
                    }
                });
            }, 0);
        }
    }
}

import { ref } from 'vue';
import { onMounted } from 'vue';
import { deepCopy } from '../helpers/common';

export const useRequest = <T>(httpPromise: HTTPPromise<T>) => {
    const data = ref(null as T | null);
    const error = ref(null as Error | null);
    const loading = ref(true as boolean);

    onMounted(() => {
        httpPromise.then(response => {
            data.value = response;
        }).catch(err => {
            error.value = err;
        }).finally(() => {
            loading.value = false;
        });
    });
    return { data, error, loading };
};
export const api = new ApiClient({
    baseURL: import.meta.env.VITE_API_BASE_URL
});