
<template>
    <div class="absolute top-10 left-10 text-white flex flex-col underline-text pointer-events-auto">
        <span class="text-[36px]" @click="handleBack">返回</span>
    </div>
    <div class="absolute top-[72px] w-full text-center text-white">
        <h1 class="text-[72px]">单人计时</h1>
        <h2 class="text-[24px] mt-[22px]">选择进行游戏的作品</h2>
    </div>
    <div class="absolute top-[30vh] w-full flex flex-col">
        <div class="flex flex-row justify-center">
            
            <div v-if="data" v-for="item in data" :key="item.id" class="text-center">
                <img :src="item.cover" class="w-[180px] h-[225px] m-4 rounded-lg shadow-lg border-[4px]" :style="{ borderColor: item.color }" />
                <span class="normal-font-family text-[24px]">{{ item.name }}</span>
            </div>
        </div>
        <div v-if="loading">加载中...</div>
        <div class="flex flex-row mt-20 m-auto">
            <button class="w-[180px] h-[76px]
                bg-gradient-to-r from-[#0073DE] to-[#00A5F1] text-white 
                rounded-lg shadow-xl text-[36px]
                hover:translate-y-1 pointer-events-auto" @click="handleStart">立即开始</button>
        </div>
    </div>
</template>
<script setup>
import { useRequest } from '../apis/api';
import { getDefaultBangumi } from '../apis/bangumi';
import { getGameInstance } from '../services/game';

const { data, error, loading } = useRequest(getDefaultBangumi());

const handleBack = () => {
    getGameInstance().state.back();
};
const handleStart = () => {
    getGameInstance().state.start();
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