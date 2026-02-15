<template>
    <div class="w-full relative flex flex-col items-center">
        <button class="absolute left-[65px] top-[78px] text-medium underline-text pointer-events-auto" @click="handleBack">
            返回
        </button>
        <h1 class="mt-[138px] text-huge">昵称</h1>
        <span class="text-normal">无需注册就能玩~</span>
        <input type="text" name="nickname" v-model="nickname" 
            class="nickname-input pointer-events-auto mt-[15px] mb-[31px] normal-font-family"
            placeholder="中英日2-10位"
            :style="{ '--placeholder-font-family': ssoFontCss.family }"/>
        <button class="submit-button pointer-events-auto hover:translate-y-1" @click="handleSubmit">确认</button>
        <button class="text-medium pointer-events-auto mt-[42px]">
            <span class="underline-text relative">已注册？直接登录</span>
        </button>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useGameStore } from '../stores/game.ts';
import { useUserStore } from '../stores/user.ts';
import { css as ssoFontCss } from '../assets/fonts/SmileySans-Oblique-2.ttf?subsets';

const gameStore = useGameStore();
const userStore = useUserStore();
const nickname = ref('');

const handleSubmit = () => {
    userStore.setNickname(nickname.value);
    gameStore.game.state.next();
};
const handleBack = () => {
    gameStore.game.state.back();
};
</script>
<style scoped>
.submit-button{
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
.nickname-input{
    background: 
    linear-gradient(#FFF 0 0) padding-box,
    linear-gradient(to right, #00A3F0, #0077E0) border-box;
    border-radius: 10px;
    border: 4px solid #0077E0;
    padding: 18px 20px;
    outline: none;
    font-size: 28px;
    text-align: center;
    width: 328px;
    height: 64px;
    color: #111111;
}
.nickname-input::placeholder{
    color: #999999;
    font-family: var(--placeholder-font-family);
}
</style>