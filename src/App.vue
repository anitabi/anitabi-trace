
<template>
  <div class="select-none relative w-screen h-screen overflow-hidden">
    <!-- map -->
    <Map class="absolute w-full h-full top-0 left-0 z-[inherit]"/>
    <!-- overlay -->

    <div class="absolute w-full h-full top-0 left-0 z-1 pointer-events-none" 
      style="background: linear-gradient(180deg, #102A51 2%, rgba(11, 60, 134, 0.4724) 44%, rgba(11, 60, 134, 0.153) 71%, rgba(0, 70, 175, 0) 100%)"
      v-if="deepOverlayStatus == 'FULL'"></div>
    <div class="pointer-events-none" v-if="deepOverlayStatus == 'OREO'">
      <div class="absolute top-0 left-0 w-full h-full pointer-events-none z-1"
          style="background: linear-gradient(180deg, #102A51 2%, rgba(11, 60, 134, 0.4724) 88%, rgba(11, 60, 134, 0.153) 142%);"></div>
      <div class="absolute top-1/2 left-0 w-full h-1/2 pointer-events-none z-3"
          style="background: linear-gradient(180deg, rgba(53, 91, 149, 0) 3%, #355B95 100%);"></div>     
    </div>
    <div class="absolute top-0 left-0 w-full h-[76%] pointer-events-none z-3"
        style="background: linear-gradient(180deg, #102A51 2%, rgba(11, 60, 134, 0.4724) 44%, rgba(11, 60, 134, 0.153) 71%, rgba(0, 70, 175, 0) 100%);"
        v-if="deepOverlayStatus == 'HEAD_ONLY'"></div>
    <div :style="{ fontFamily: fontCss.family }" class="absolute w-full h-full top-0 left-0 text-white pointer-events-none z-10">
      <component :is="views[viewStore.currentView]"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { css as fontCss } from './assets/fonts/SmileySans-Oblique-2.ttf?subsets'
import { useViewStore, type ViewStatus } from './stores/view.ts'
import { useGameStore } from './stores/game.ts'
import Welcome from './views/Welcome.vue'
import Counter from './views/Counter.vue'
import Map from './views/Map.vue'
import Game from './views/Game.vue'
import BangumiSelection from './views/BangumiSelection.vue'
import Statistics from './views/Statistics.vue'
import { computed, type Component, onUnmounted } from 'vue'
const gameStore = useGameStore();
const viewStore = useViewStore();

const views: Record<ViewStatus, Component> = {
  WELCOME: Welcome,
  COUNTER: Counter,
  GAME: Game,
  BANGUMI_SELECTION: BangumiSelection,
  STATISTICS: Statistics
};

onUnmounted(() => {
  gameStore.game.reset();
});
const deepOverlayStatus = computed(() => viewStore.deepOverlay);
</script>
<style scoped>
</style>