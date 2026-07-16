<template>
    <h1 class="text-normal mt-[48px] text-center">{{ gameStore.game.mode === 'SINGLE' ? '单人模式' : '线上对战' }}</h1>
    <h1 class="text-tiny mt-[5px] text-center normal-font-family">{{ gameStore.game.bangumi?.name }}</h1>

    <div class="absolute inset-0 flex items-center justify-center">
        <transition name="countdown">
            <span v-if="!countdownFinished" :key="count" class="text-giant absolute">{{ count > 0 ? count : 'Start!' }}</span>
        </transition>
        <p v-if="!countdownFinished" class="absolute pt-70 text-normal">{{ messages[count] || '' }}</p>
        <RequestError v-else-if="preparationHasError" :event-id="preparationErrorEventId" class="flex flex-col items-center gap-5">
            <button class="text-medium underline-text pointer-events-auto" @click="handleRetryPreparation">重试</button>
        </RequestError>
        <p v-else class="text-normal">题目加载中...</p>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import RequestError from '../components/RequestError.vue';
import { useGameStore } from '../stores/game';

type GameStoreView = ReturnType<typeof useGameStore> & {
    gameStartStatus?: 'idle' | 'loading' | 'ready' | 'error';
    gameStartErrorEventId?: string | null;
    pointsStatus?: 'idle' | 'loading' | 'ready' | 'error';
    pointsErrorEventId?: string | null;
    retryPreparation?: () => void;
    retryPointLoading?: () => void;
};

const gameStore = useGameStore() as GameStoreView;
const count = ref(3);
const countdownFinished = ref(false);
let countdownDelay: ReturnType<typeof setTimeout> | undefined;
let countdownInterval: ReturnType<typeof setInterval> | undefined;

const messages: Record<number, string> = {
    1: '慢一点多想想！偏差过远会扣时',
    2: '标记一公里内有奖励时间！',
    3: '60秒内标尽可能标准更多点！'
};

const preparationHasError = computed(() => gameStore.gameStartStatus === 'error' || gameStore.pointsStatus === 'error');

const preparationErrorEventId = computed(() => {
    return gameStore.gameStartStatus === 'error'
        ? gameStore.gameStartErrorEventId ?? gameStore.pointsErrorEventId ?? null
        : gameStore.pointsErrorEventId ?? null;
});

const handleRetryPreparation = () => {
    if (typeof gameStore.retryPreparation === 'function') {
        gameStore.retryPreparation();
        return;
    }
    gameStore.retryPointLoading?.();
};

onMounted(() => {
    countdownDelay = setTimeout(() => {
        countdownDelay = undefined;
        countdownInterval = setInterval(() => {
            if (count.value > 0) {
                count.value--;
                return;
            }
            if (countdownInterval !== undefined) clearInterval(countdownInterval);
            countdownInterval = undefined;
            countdownFinished.value = true;
            gameStore.countdownElapsed();
        }, 1000);
    }, 1000);
});

onUnmounted(() => {
    if (countdownDelay !== undefined) clearTimeout(countdownDelay);
    if (countdownInterval !== undefined) clearInterval(countdownInterval);
});
</script>
<style scoped>
.countdown-enter-active, .countdown-leave-active {
    transition: all 0.5s ease;
}
.countdown-enter-from{
    opacity: 0;
    transform: scale(1.5);
}
.countdown-leave-to {
    opacity: 0;
}
.countdown-enter-to, .countdown-leave-from {
    transform: scale(1);
    opacity: 1;
}
</style>