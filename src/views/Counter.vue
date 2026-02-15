<template>
    <h1 class="text-normal mt-[48px] text-center">{{ gameStore.game.mode === 'SINGLE' ? '单人模式' : '线上对战' }}</h1>
    <h1 class="text-tiny mt-[5px] text-center">{{ gameStore.game.bangumi?.name }}</h1>

    <div class="absolute inset-0 flex items-center justify-center">
        <transition name="countdown">

            <span :key="count" class="text-giant absolute">{{ count > 0 ? count : "Start!" }}</span>
        </transition>
        <p class="absolute pt-70 text-normal">{{ messages[count] || "" }}</p>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGameStore } from '../stores/game';

const gameStore = useGameStore();
const count = ref(3)

const messages: Record<number, string> = {
    1: "慢一点多想想！偏差过远会扣时",
    2: "标记一公里内有奖励时间！",
    3: "60秒内标尽可能标准更多点！"
};

onMounted(() => {
    setTimeout(() => {
        // wait map to flyto padding 0
        const timer = setInterval(() => {
            if (count.value > 0) {
                count.value--;
            } else {
                clearInterval(timer);
                gameStore.game.state.start();

            }
        }, 1000)
    }, 1000);
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