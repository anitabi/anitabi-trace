<template>
    <img v-if="inSelection && pointImage.image" :src="pointImage.image" :class="`pointer-events-auto cursor-pointer fixed border-[4px] border-white rounded-lg shadow-md left-1/2 -translate-x-1/2
        ${pointImage.state === 'full' ? 'w-[432px] top-[179px]' : 'w-[184px] top-[43px]'}`"
        @click="pointImage.state = pointImage.state === 'full' ? 'minimal' : 'full'" />
    <h1 class="text-normal mt-[48px] text-center">{{ gameStore.game.mode === 'SINGLE' ? '单人模式' : '线上对战' }}</h1>
    <h1 class="text-tiny mt-[5px] text-center">{{ gameStore.game.bangumi?.name }}</h1>
    <div class="absolute top-[34px] left-[34px] flex flex-col items-start">
        <div class="flex flex-row justify-start items-center">
            <span class="text-huge mr-[15px]">{{ point }}</span>
            <transition name="number-delta">
                <span class="text-large" :style="{ color: pointDeltaStyle.text, textShadow: pointDeltaStyle.textShadow }" v-if="pointDelta">{{ pointDelta }}</span>
            </transition>
        </div>
        <span class="text-medium -mt-5">Score</span>
    </div>
    <div class="absolute top-[34px] right-[34px] flex flex-col items-end">
        <div class="flex flex-row justify-end items-center">
            <transition name="number-delta">
                <span class="text-large" :style="{ color: timeDeltaStyle.text, textShadow: timeDeltaStyle.textShadow }" v-if="timeDelta">{{ timeDelta }}</span>
            </transition>
            <span class="text-huge ml-[15px]">{{ leftSeconds }}</span>
        </div>
        <span class="text-medium -mt-5">Second</span>
    </div>
    <div class="absolute w-screen bottom-[10vh] h-auto text-center">
        <button class="confirm-point-button pointer-events-auto" @click="handleConfirmPoint" v-if="inSelection && mapStore.hasMarker">确认标点</button>
    </div>
    <div class="absolute bottom-[10vh] w-full flex justify-center">
        <div class="relative before:bg-black/50 before:w-full before:h-full before:absolute before:inset-0
        px-[29px] py-[18px] rounded-[10px] before:blur-[12px] max-w-[336px]" v-if="message !== ''">
            <span class="text-normal z-[calc(var(--index)+1)] relative">{{ message }}</span>
        </div>
    </div>
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        v-if="showOver">
        <p class="text-giant">Over.</p>
    </div>
        
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { Game } from '../services/game';
import { useMapStore } from '../stores/map';
import { TMinusTimer } from '../helpers/timer';
import type { UpdatePointData, Finished } from '../services/game';
import { useGameStore } from '../stores/game';
const gameStore = useGameStore();
const message = ref('');
const inSelection = ref(true);
const point = ref(0);
const leftSeconds = ref(Game.GAME_TIME_SECONDS);
const pointDelta = ref('');
const timeDelta = ref('');
const pointImage = ref({
    state: 'full' as 'minimal' | 'full',
    image: ''
});
const showOver = ref(false);
let pointWaitTimeout = null as number | null;
const onGameFinish = () => {
    if(pointWaitTimeout) clearTimeout(pointWaitTimeout);
    inSelection.value = false;
    showOver.value = true;
    gameStore.game.state.gameOver(timer.duration);
};
const timer = new TMinusTimer().setFinishCallback(onGameFinish).setUpdateCallback((seconds) => {
    leftSeconds.value = seconds;
});
const mapStore = useMapStore();
const nextPoint = (next: UpdatePointData | Finished) => {
    switch(next.type) {
        case 'updatePoint':
            pointImage.value = { state: 'full', image: next.image };
            timer.continue();
            break;
        case 'finished':
            onGameFinish();
            break;
    }
};
onMounted(() => {
    timer.setLeft(Game.GAME_TIME_SECONDS);
    nextPoint(gameStore.game.nextPoint());
});
const handleConfirmPoint = async () => {
    inSelection.value = false;
    timer.pause();
    const result = gameStore.game.submitAnswer();
    message.value = result.message;
    if(result.point_delta) pointDelta.value = result.point_delta  > 0 ? `+${result.point_delta}` : `${result.point_delta}`;
    if(result.time_delta) timeDelta.value = result.time_delta > 0 ? `+${result.time_delta}` : `${result.time_delta}`;
    timer.change(result.time_delta || 0);
    if (timer.isFinished()) return;
    if(result.point_delta) point.value += result.point_delta;
    pointWaitTimeout = setTimeout(() => {
        inSelection.value = true;
        message.value = pointDelta.value = timeDelta.value = '';
        nextPoint(gameStore.game.nextPoint());
    }, Game.GAME_POINT_WAIT_MS);
};
const textStyleGenerate = (textColor: string, shadowColor: string) => ({
    text: textColor,
    textShadow: `
    0 1px 4px ${shadowColor},
    0 -1px 4px ${shadowColor},
    1px 0 4px ${shadowColor},
    -1px 0 4px ${shadowColor}
`});
const pointDeltaStyle = computed(() => {
    return pointDelta.value.startsWith('+') ? textStyleGenerate('#4CFF6F', '#00A259') : textStyleGenerate('#FF3A3A', '#BB2727');
});
const timeDeltaStyle = computed(() => {
    return timeDelta.value.startsWith('+') ? textStyleGenerate('#4CFF6F', '#00A259') : textStyleGenerate('#FF3A3A', '#BB2727');
});
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