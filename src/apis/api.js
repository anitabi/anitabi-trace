
export class HTTPError extends Error {
    constructor(status, message){
        super(message);
        this.status = status;
    }
    toString(){
        return `HTTPError: ${this.status} - ${this.message}`;
    }
}
/**
 * HTTP api client, packaged based on fetch.
 */
export class HTTPPromise extends Promise {
    constructor(promise, instance, method, url, options = {}){
        super(promise);
        this.instance = instance;
        this.method = method;
        this.url = url;
        this.options = options;
    }

}
export class ApiClient{
    constructor(config){
        this.baseURL = config.baseURL || '';
        this.headers = config.headers || {};
        /*
           Storage the resolve method of promises that shared with other requests. 
         */
        this.requests = {};        
        this.dataCache = new Map();
    }
    #request(method, url, options = {}){
        const fullUrl = this.baseURL + url;

        const methodKey = options["methodKey"] || fullUrl.split('#')[0];
        return new HTTPPromise((resolve, reject) => {
            if (!options.force && this.dataCache.has(methodKey)){
                console.debug(`Using cached data for ${methodKey}`);
                return resolve(this.dataCache.get(methodKey));
            }
            if (this.requests[methodKey] instanceof Array){
                console.debug(`Sharing request for ${methodKey}`);
                this.requests[methodKey].push({resolve, reject});
                return;
            }
            const headers = {
                ...this.headers,
                ...options.headers,
            };
            console.debug(`Making real request for ${methodKey}`);
            fetch(fullUrl, {
                    method,
                    headers,
                    body: options.body ? JSON.stringify(options.body) : null,
                }).then(response => {
                    if (!response.ok) {
                        throw new HTTPError(response.status, response.statusText);
                    }
                    return response.json();
                }).then((data) => resolve(data))
                .catch((error) => reject(error))
        }, this, method, fullUrl, options);
           

    }
    get(url, options = {}){
        return this.#request('GET', url, options);
    }

    static prefetch(httpPromise, callback = null){
        // As normal request may be executed along with prefetch, we should share the request, therefore auto management is required.
        const { instance, url, options } = httpPromise;
        const methodKey = options["methodKey"] || url.split('#')[0];
        if (instance.requests[methodKey] instanceof Array){
            return new Promise((resolve, reject) => {
                instance.requests[methodKey].push({resolve, reject});
            });
        }else{
            instance.requests[methodKey] = [];
        }
        const requestFunc = () => {
            return httpPromise.then(data => {
                instance.dataCache.set(methodKey, data);
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
                let callbackData = null, callbackErr = null;
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

export const useRequest = (httpPromise) => {
    const data = ref(null);
    const error = ref(null);
    const loading = ref(true);

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