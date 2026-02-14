
<template>
    
    <h1 class="text-[48px] mt-[48px] text-center">单人计时</h1>
    <h1 class="text-[36px] mt-[5px] text-center">{{ gameStore.game.bangumi?.name || '' }}</h1>
    <div class="absolute top-[34px] left-[34px] flex flex-col items-start">
        <div class="flex flex-row justify-start items-center">
            <span class="text-[144px] mr-[15px]">{{ gameStore.game.statistics?.point || 0 }}</span>
        </div>
        <span class="text-[72px] -mt-15">score</span>
        <span class="text-[36px] -mt-2">获得分数</span>
    </div>
    <div class="absolute top-[34px] right-[34px] flex flex-col items-end">
        <div class="flex flex-row justify-end items-center">
            <span class="text-[144px] ml-[15px]">{{ gameStore.game.statistics?.duration || 0 }}</span>
        </div>
        <span class="text-[72px] -mt-15">second</span>
        <span class="text-[36px] -mt-2">经过时间</span>
    </div>
    <div class="absolute w-screen bottom-[10vh] right-[20px] h-auto text-center">
        <button class="again-button pointer-events-auto mr-5">再来一局</button>
        <button class="share-button pointer-events-auto">分享战绩</button>
    </div>
        
</template>
<script setup lang="ts">
import { useGameStore } from '../stores/game';
import { Game } from '../services/game';
const gameStore = useGameStore();

</script>
<style scoped>
.again-button{
    background: linear-gradient(to right, #00A3F0, #0077E0) ;
    color: #FFF;
    border-radius: 10px;
    width: 180px;
    height: 76px;
    font-size: 36px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
.share-button{
    background: 
    linear-gradient(#FFF 0 0) padding-box,
    linear-gradient(to right, #00A3F0, #0077E0) border-box;
    color: #0083E4;
    border: 4px solid transparent;
    border-radius: 10px;
    width: 180px;
    height: 76px;
    font-size: 36px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
.again-button:hover, .share-button:hover{
    transform: translateY(5px);
}
.number-delta-enter-active, .number-delta-leave-active {
    transition: all 0.5s ease;
}
.number-delta-enter-from{
    transform: translateY(-5px);
    opacity: 0;
}
.number-delta-leave-to{
    transform: translateY(5px);
    opacity: 0;
}

</style>