
<template>
    <button class="absolute top-10 left-10 text-white flex flex-col underline-text pointer-events-auto" @click="handleBack">
        <span class="text-medium">返回</span>
    </button>
    <div class="absolute top-[72px] flex flex-col w-full">
        <div class="w-full text-center text-white">
            <h1 class="text-huge">单人计时</h1>
            <h2 class="text-normal mt-[22px]">选择进行游戏的作品</h2>
        </div>
        <div class="mt-[10vh] w-full flex flex-col">
            <div class="flex flex-row justify-center">
                
                <div v-for="item in gameStore.catalog" :key="item.id" class="text-center pointer-events-auto">
                    <img :src="item.cover"
                        class="w-[180px] h-[225px] m-4 rounded-lg shadow-lg border-[4px] hover:scale-110 hover:opacity-100"
                        :class="{ 'scale-110': bangumiId === item.id, 'opacity-40': bangumiId !== null && bangumiId !== item.id }"
                        :style="{ borderColor: item.color }"
                        @click="bangumiId = item.id"
                        />
                    <span class="normal-font-family text-tiny"
                        :class="{ 'opacity-40': bangumiId !== null && bangumiId !== item.id }">{{ item.name }}</span>
                </div>
            </div>
            <div v-if="gameStore.catalogStatus === 'loading' || gameStore.catalogStatus === 'idle'" class="m-auto text-2xl">加载中...</div>
            <RequestError v-if="gameStore.catalogStatus === 'error'" :event-id="gameStore.catalogErrorEventId" class="m-auto text-2xl" />
            <div class="flex flex-row mt-20 m-auto">
                <button :class="'w-[180px] h-[76px] text-white rounded-lg shadow-xl text-medium pointer-events-auto '  +
                (!buttonDisabled ? 'bg-gradient-to-r from-[#0073DE] to-[#00A5F1] hover:translate-y-1' : 'bg-slate-500') " @click="handleStart" :disabled="buttonDisabled">立即开始</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import RequestError from '../components/RequestError.vue';
import { useGameStore } from '../stores/game.ts';

const gameStore = useGameStore();
const bangumiId = ref<string | null>(null);

const buttonDisabled = computed(() => {
    return gameStore.catalogStatus !== 'ready' || bangumiId.value === null;
});
const handleBack = () => {
    gameStore.back();
};
const handleStart = () => {
    if (bangumiId.value === null) {
        return;
    }
    gameStore.selectBangumi(bangumiId.value);
};
</script>
<style scoped>
.underline-text::after{
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 3px;
    width: 0;
    background-color: white;
}

.underline-text:hover::after{
    width: 100%;
    transition: width 0.3s ease;
}
</style>