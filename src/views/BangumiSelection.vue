
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
                
                <div v-if="data" v-for="item in data" :key="item.id" class="text-center pointer-events-auto">
                    <img :src="item.cover" 
                        class="w-[180px] h-[225px] m-4 rounded-lg shadow-lg border-[4px] hover:scale-110 hover:opacity-100" 
                            :class="{ 'scale-110': bangumiId === item.id, 'opacity-40': bangumiId !== null && bangumiId !== item.id }"
                            :style="{ borderColor: item.color }" 
                        @click="bangumiId = item.id"
                        />
                    <span class="normal-font-family text-normal"
                        :class="{ 'opacity-40': bangumiId !== null && bangumiId !== item.id }">{{ item.name }}</span>
                </div>
            </div>
            <div v-if="loading" class="m-auto text-2xl">加载中...</div>
            <div v-if="error" class="m-auto text-2xl">出错了 qaq</div>
            <div class="flex flex-row mt-20 m-auto">
                <button :class="'w-[180px] h-[76px] text-white rounded-lg shadow-xl text-medium pointer-events-auto '  +
                (!buttonDisabled ? 'bg-gradient-to-r from-[#0073DE] to-[#00A5F1] hover:translate-y-1' : 'bg-slate-500') " @click="handleStart" :disabled="buttonDisabled">立即开始</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRequest } from '../apis/api.ts';
import { getDefaultBangumi } from '../apis/bangumi.ts';
import { useGameStore } from '../stores/game.ts';

const gameStore = useGameStore();
const { data, error, loading } = useRequest(getDefaultBangumi());

const buttonDisabled = computed(() => {
    return !data.value || !bangumiId.value;
});
const bangumiId = ref(null as string | null);
const handleBack = () => {
    gameStore.game.state.back();
};
const handleStart = () => {
    if(!bangumiId.value) {
        return;
    }
    gameStore.game.state.select(bangumiId.value);
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