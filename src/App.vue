
<template>
    <div class="select-none relative w-screen h-screen overflow-hidden">
        <!-- map -->
        <Map class="absolute w-full h-full top-0 left-0 z-[inherit]"/>
        <!-- overlay -->

        <div class="absolute w-full h-full top-0 left-0 z-1 pointer-events-none"
            style="background: linear-gradient(180deg, #102A51 2%, rgba(11, 60, 134, 0.4724) 44%, rgba(11, 60, 134, 0.153) 71%, rgba(0, 70, 175, 0) 100%)"
            v-if="presentation.overlay === 'FULL'"></div>
        <div class="pointer-events-none" v-if="presentation.overlay === 'OREO'">
            <div class="absolute top-0 left-0 w-full h-full pointer-events-none z-1"
                style="background: linear-gradient(180deg, #102A51 2%, rgba(11, 60, 134, 0.4724) 88%, rgba(11, 60, 134, 0.153) 142%);"></div>
            <div class="absolute top-1/2 left-0 w-full h-1/2 pointer-events-none z-3"
                style="background: linear-gradient(180deg, rgba(53, 91, 149, 0) 3%, #355B95 100%);"></div>
        </div>
        <div class="absolute top-0 left-0 w-full h-[76%] pointer-events-none z-3"
            style="background: linear-gradient(180deg, #102A51 2%, rgba(11, 60, 134, 0.4724) 44%, rgba(11, 60, 134, 0.153) 71%, rgba(0, 70, 175, 0) 100%);"
            v-if="presentation.overlay === 'HEAD_ONLY'"></div>
        <div :style="{ fontFamily: fontCss.family }" class="absolute w-full h-full top-0 left-0 text-white pointer-events-none z-10">
            <component :is="views[presentation.screen]"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, type Component, onUnmounted } from 'vue';
import { css as fontCss } from './assets/fonts/SmileySans-Oblique-2.ttf?subsets';
import { useGameStore, type Screen } from './stores/game.ts';
import Welcome from './views/Welcome.vue';
import Counter from './views/Counter.vue';
import Map from './views/Map.vue';
import Game from './views/Game.vue';
import BangumiSelection from './views/BangumiSelection.vue';
import Statistics from './views/Statistics.vue';
import Rank from './views/Rank.vue';
import Auth from './views/Auth.vue';

const gameStore = useGameStore();
const views: Record<Screen, Component> = {
    WELCOME: Welcome,
    COUNTER: Counter,
    GAME: Game,
    BANGUMI_SELECTION: BangumiSelection,
    STATISTICS: Statistics,
    RANK: Rank,
    AUTH: Auth
};
const presentation = computed(() => gameStore.presentation);

void gameStore.initialize();

onUnmounted(() => {
    gameStore.reset();
});
</script>
<style scoped>
</style>