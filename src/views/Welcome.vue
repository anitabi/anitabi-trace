<template>
    <div class="absolute top-10 left-10 text-white flex flex-col" v-if="userStore.nickname">
        <span class="text-medium">欢迎</span>
        <span class="text-large normal-font-family">{{ userStore.nickname }}</span>
    </div>
    <button class="absolute top-10 left-10 underline-text text-medium pointer-events-auto" v-else>登录</button>
    <button class="absolute top-10 right-10 text-white text-medium underline-text pointer-events-auto" @click="handleGoRank">
        排行榜
    </button>
    <div class="flex flex-col text-center">
        <div class="mt-[30vh] text-white">
            <h2 class="text-large">anitabi</h2>
            <h1 class="text-hugeplus -m-8 text-shadow-xl" :style="{ fontFamily: titleFontCss.family }">巡礼对决</h1>    
        </div>
        <div class="flex flex-row mt-20 m-auto">
            <button class="w-[180px] h-[76px]
                bg-gradient-to-r from-[#0073DE] to-[#00A5F1] text-white 
                rounded-lg shadow-xl mr-[34px] text-medium
                hover:translate-y-1 pointer-events-auto" @click="handleStartSinglePlayerGame">单人计时</button>
            <button class="w-[180px] h-[76px]
                bg-gradient-to-r from-[#F14400] to-[#DEAA00] text-white 
                rounded-lg shadow-xl text-medium pointer-events-auto">线上对战</button>
        </div>
        <div class="absolute bottom-0 text-white text-normal mt-10 flex gap-5 w-full justify-center">
            anitabi&copy;2024 
            <a href="https://github.com/anitabi/anitabi-trace">Github</a>
            <a :href="QQ_GROUP_LINK">交流群</a>
        </div>
    </div>
</template>
<script setup lang="ts">
import { css as titleFontCss } from '@/assets/fonts/YouSheBiaoTiHei.ttf?subsets'
const QQ_GROUP_LINK = import.meta.env.VITE_ANITABI_QQ_GROUP_LINK;
import { useGameStore } from '../stores/game';
import { useUserStore } from '../stores/user';
const gameStore = useGameStore();
const userStore = useUserStore();
const handleStartSinglePlayerGame = () => {
    gameStore.game.state.init('SINGLE');
}
const handleGoRank = () => {
    gameStore.game.state.goRank();
}
</script>
<style scoped>
</style>