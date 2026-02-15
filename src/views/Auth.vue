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
    <div class="absolute bottom-[10vh] w-full flex justify-center">
        <div class="relative before:bg-black/50 before:w-full before:h-full before:absolute before:inset-0
        px-[29px] py-[18px] rounded-[10px] before:blur-[12px] max-w-[336px]" v-if="message !== ''">
            <span class="text-normal z-[calc(var(--index)+1)] relative">{{ message }}</span>
        </div>
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
const message = ref('');
const showMsg = (msg: string) => {
    message.value = msg;
    setTimeout(() => {
        message.value = '';
    }, 3000);
};
const isCJKorEnglish = (char: string) => {
  const code = char.codePointAt(0);
  if (!code) return false;
  return (
    // English A-Z a-z
    (code >= 0x41 && code <= 0x5A) ||
    (code >= 0x61 && code <= 0x7A) ||

    // Hiragana
    (code >= 0x3040 && code <= 0x309F) ||

    // Katakana
    (code >= 0x30A0 && code <= 0x30FF) ||
    (code >= 0xFF65 && code <= 0xFF9F) ||

    // CJK Unified Ideographs (常用汉字范围)
    (code >= 0x4E00 && code <= 0x9FFF) ||
    (code >= 0x3400 && code <= 0x4DBF)
  );
}
const handleSubmit = () => {
    if (nickname.value.length < 2 || nickname.value.length > 10) {
        showMsg('昵称长度应为2-10位');
        return;
    }
    for (const char of nickname.value) {
        if (!isCJKorEnglish(char)) {
            showMsg('昵称只能包含中文、英文字符');
            return;
        }
    }
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