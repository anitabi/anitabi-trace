<template>
    <div class="absolute top-10 left-10 text-white flex flex-col">
        <span class="text-[36px]">欢迎</span>
        <span class="text-[48px]">不可溶的碳酸氢盐</span>
    </div>
    <div class="absolute top-10 right-10 text-white text-[36px] underline-text pointer-events-auto">
        排行榜
    </div>
    <div class="flex flex-col text-center">
        <div class="mt-[30vh] text-white">
            <h2 class="text-[48px]">anitabi</h2>
            <h1 class="text-[86px] -m-8 text-shadow-xl" :style="{ fontFamily: titleFontCss.family }">巡礼对决</h1>    
        </div>
        <div class="flex flex-row mt-20 m-auto">
            <button class="w-[180px] h-[76px]
                bg-gradient-to-r from-[#0073DE] to-[#00A5F1] text-white 
                rounded-lg shadow-xl mr-[34px] text-[36px]
                hover:translate-y-1 pointer-events-auto" @click="handleStartSinglePlayerGame">单人计时</button>
            <button class="w-[180px] h-[76px]
                bg-gradient-to-r from-[#F14400] to-[#DEAA00] text-white 
                rounded-lg shadow-xl text-[36px] pointer-events-auto">线上对战</button>
        </div>
        <div class="absolute bottom-0 text-white text-[24px] mt-10 flex gap-5 w-full justify-center">
            anitabi&copy;2024 
            <a href="https://github.com/anitabi/anitabi-trace">Github</a>
            <a :href="QQ_GROUP_LINK">交流群</a>
        </div>
    </div>
</template>
<script setup>
import { css as titleFontCss } from '@/assets/fonts/YouSheBiaoTiHei.ttf?subsets'
const QQ_GROUP_LINK = import.meta.env.VITE_ANITABI_QQ_GROUP_LINK;
import { getGameInstance, Game } from '../services/game';
const handleStartSinglePlayerGame = () => {
    getGameInstance().state.start(Game.MODE.SINGLE);
}
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