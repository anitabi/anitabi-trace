<template>
    <div class="w-full relative flex flex-col items-center">
        <button class="absolute left-[65px] top-[78px] text-medium underline-text pointer-events-auto" @click="handleBack">
            返回
        </button>
        <h1 class="mt-[138px] text-huge">昵称</h1>
        <span class="text-normal">无需注册就能玩~</span>
        <span v-if="modeLoading" class="text-normal mt-[31px] mb-[31px]">正在获取昵称设置...</span>
        <template v-else-if="nicknameMode !== null">
            <input v-if="nicknameMode.mode === 'free'" v-model="nickname" type="text" name="nickname" maxlength="50"
                class="nickname-input pointer-events-auto mt-[15px] mb-[31px] normal-font-family"
                placeholder="请输入昵称（最多50字）"
                :style="{ '--placeholder-font-family': ssoFontCss.family }" />
            <div v-else ref="nicknameSelect" class="nickname-select pointer-events-auto mt-[15px] mb-[31px]">
                <button type="button" class="nickname-select-trigger normal-font-family"
                    :class="{ 'nickname-select-placeholder': nickname === '' }"
                    :aria-expanded="nicknameMenuOpen" aria-haspopup="listbox"
                    @click="nicknameMenuOpen = !nicknameMenuOpen" @keydown.esc="nicknameMenuOpen = false">
                    <span>{{ nickname || '请选择昵称' }}</span>
                    <span class="nickname-select-arrow" :class="{ 'nickname-select-arrow-open': nicknameMenuOpen }" aria-hidden="true"></span>
                </button>
                <div v-if="nicknameMenuOpen" class="nickname-select-menu" role="listbox" aria-label="昵称选项">
                    <button v-for="option in nicknameMode.nicknames" :key="option" type="button" role="option"
                        class="nickname-select-option normal-font-family" :class="{ 'nickname-select-option-active': nickname === option }"
                        :aria-selected="nickname === option" @click="selectNickname(option)">
                        {{ option }}
                    </button>
                </div>
            </div>
            <button class="submit-button pointer-events-auto hover:translate-y-1" @click="handleSubmit">确认</button>
        </template>
        <template v-else>
            <span class="text-normal mt-[31px] mb-[15px]">昵称设置获取失败</span>
            <button class="text-medium pointer-events-auto mb-[31px]" @click="loadNicknameMode">
                <span class="underline-text relative">重试</span>
            </button>
        </template>
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
import { onMounted, onUnmounted, ref } from 'vue';
import { getNicknameMode, type NicknameMode } from '../apis/nickname.ts';
import { useGameStore } from '../stores/game.ts';
import { useUserStore } from '../stores/user.ts';
import { css as ssoFontCss } from '../assets/fonts/SmileySans-Oblique-2.ttf?subsets';

const gameStore = useGameStore();
const userStore = useUserStore();
const nickname = ref('');
const nicknameMode = ref<NicknameMode | null>(null);
const modeLoading = ref(true);
const message = ref('');
const nicknameMenuOpen = ref(false);
const nicknameSelect = ref<HTMLElement | null>(null);
let disposed = false;
let messageTimeout: ReturnType<typeof setTimeout> | undefined;

const showMsg = (msg: string) => {
    message.value = msg;
    if (messageTimeout !== undefined) clearTimeout(messageTimeout);
    messageTimeout = setTimeout(() => {
        message.value = '';
        messageTimeout = undefined;
    }, 3000);
};

const loadNicknameMode = async () => {
    modeLoading.value = true;
    nicknameMode.value = null;
    nickname.value = '';
    try {
        const response = await getNicknameMode();
        if (!disposed) nicknameMode.value = response;
    } catch {
        if (!disposed) showMsg('无法获取昵称设置，请稍后重试');
    } finally {
        if (!disposed) modeLoading.value = false;
    }
};

const selectNickname = (option: string) => {
    nickname.value = option;
    nicknameMenuOpen.value = false;
};

const handleDocumentClick = (event: MouseEvent) => {
    if (nicknameSelect.value?.contains(event.target as Node)) return;
    nicknameMenuOpen.value = false;
};

const handleSubmit = () => {
    if (nicknameMode.value === null) return;

    const selectedNickname = nickname.value.trim();
    if (nicknameMode.value.mode === 'free') {
        if (selectedNickname.length === 0 || selectedNickname.length > 50) {
            showMsg('昵称长度应为1-50字');
            return;
        }
    } else if (!nicknameMode.value.nicknames.includes(selectedNickname)) {
        showMsg('请选择一个昵称');
        return;
    }

    userStore.setNickname(selectedNickname);
    gameStore.authAccepted();
};

const handleBack = () => {
    gameStore.back();
};

onMounted(() => {
    void loadNicknameMode();
    document.addEventListener('click', handleDocumentClick);
});
onUnmounted(() => {
    disposed = true;
    document.removeEventListener('click', handleDocumentClick);
    if (messageTimeout !== undefined) clearTimeout(messageTimeout);
});
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
.nickname-select{
    position: relative;
    width: 328px;
}
.nickname-select-trigger{
    position: relative;
    width: 100%;
    height: 64px;
    padding: 0 52px 0 20px;
    border: 4px solid #0077E0;
    border-radius: 10px;
    background: #FFF;
    color: #111111;
    font-size: 28px;
    line-height: 1.2;
    text-align: center;
    outline: none;
}
.nickname-select-trigger:focus-visible{
    box-shadow: 0 0 0 3px rgba(0, 119, 224, 0.25);
}
.nickname-select-placeholder{
    color: #777777;
}
.nickname-select-arrow{
    position: absolute;
    top: 50%;
    right: 20px;
    width: 12px;
    height: 12px;
    border-right: 3px solid #0077E0;
    border-bottom: 3px solid #0077E0;
    transform: translateY(-70%) rotate(45deg);
    transition: transform 150ms ease;
}
.nickname-select-arrow-open{
    transform: translateY(-30%) rotate(225deg);
}
.nickname-select-menu{
    position: absolute;
    z-index: 10;
    top: calc(100% + 8px);
    left: 0;
    width: 100%;
    max-height: 288px;
    padding: 8px;
    overflow-y: auto;
    border: 3px solid #0077E0;
    border-radius: 10px;
    background: #FFF;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}
.nickname-select-option{
    display: block;
    width: 100%;
    padding: 9px 12px;
    border-radius: 7px;
    color: #111111;
    font-size: 26px;
    line-height: 1.2;
    text-align: center;
}
.nickname-select-option:hover,
.nickname-select-option:focus-visible{
    background: #E5F4FF;
    color: #006BCB;
    outline: none;
}
.nickname-select-option-active{
    background: #0077E0;
    color: #FFF;
}
.nickname-input::placeholder{
    color: #999999;
    font-family: var(--placeholder-font-family);
}
</style>