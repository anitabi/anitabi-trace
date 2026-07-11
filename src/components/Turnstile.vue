<template>
    <div ref="container" class="turnstile-container"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

interface TurnstileApi {
    render(container: HTMLElement, options: {
        sitekey: string;
        theme: 'light';
        size: 'flexible';
        callback: (token: string) => void;
        'error-callback': () => void;
        'expired-callback': () => void;
    }): string;
    remove(widgetId: string): void;
}

declare global {
    interface Window {
        turnstile?: TurnstileApi;
    }
}

const props = defineProps<{
    sitekey: string;
}>();
const emit = defineEmits<{
    verified: [token: string];
    error: [];
    expired: [];
}>();

const TURNSTILE_SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
let turnstileScriptPromise: Promise<TurnstileApi> | null = null;

const loadTurnstile = (): Promise<TurnstileApi> => {
    if (window.turnstile) return Promise.resolve(window.turnstile);
    if (turnstileScriptPromise) return turnstileScriptPromise;

    const { promise, resolve, reject } = Promise.withResolvers<TurnstileApi>();
    turnstileScriptPromise = promise;
    const script = document.createElement('script');
    script.src = TURNSTILE_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = () => {
        if (window.turnstile) resolve(window.turnstile);
        else reject(new Error('Turnstile API unavailable'));
    };
    script.onerror = () => reject(new Error('Failed to load Turnstile'));
    document.head.appendChild(script);
    return promise;
};

const container = ref<HTMLElement | null>(null);
let widgetId: string | null = null;
let disposed = false;

onMounted(async () => {
    if (!props.sitekey) {
        emit('error');
        return;
    }
    try {
        const turnstile = await loadTurnstile();
        if (disposed || !container.value) return;
        widgetId = turnstile.render(container.value, {
            sitekey: props.sitekey,
            theme: 'light',
            size: 'flexible',
            callback: token => emit('verified', token),
            'error-callback': () => emit('error'),
            'expired-callback': () => emit('expired'),
        });
    } catch {
        if (!disposed) emit('error');
    }
});

onUnmounted(() => {
    disposed = true;
    if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
});
</script>

<style scoped>
.turnstile-container{
    width: 328px;
    min-height: 65px;
}
</style>
