<template>
    
    <h1 class="text-[24px] mt-[48px] text-center">单人计时</h1>
    <h1 class="text-[18px] mt-[5px] text-center">孤独摇滚！</h1>
    <div class="absolute top-[34px] left-[34px] flex flex-col items-start">
        <span class="text-[72px]">0</span>
        <span class="text-[36px] -mt-5">Score</span>
    </div>
    <div class="absolute top-[34px] right-[34px] flex flex-col items-end">
        <span class="text-[72px]">0</span>
        <span class="text-[36px] -mt-5">Second</span>
    </div>
    <div class="absolute w-screen bottom-[10vh] h-auto text-center">
        <button class="confirm-point-button pointer-events-auto" @click="handleConfirmPoint">确认标点</button>
    </div>
        
</template>
<script setup>
import { getGameInstance } from '../services/game';

const handleConfirmPoint = () => {
    getGameInstance().submitAnswer();
};
</script>
<style scoped>
.confirm-point-button{
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
.confirm-point-button:hover{
    transform: translateY(5px);
}
</style>