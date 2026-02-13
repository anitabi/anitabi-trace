
<template>
  <div class="select-none">
    <!-- map -->
    <Map class="fixed top-0 left-0 w-screen h-screen"/>
    <!-- overlay -->

    <div :style="{ fontFamily: fontCss.family }" :class="`fixed w-screen h-screen p-0 left-0 top-0 z-10 text-white pointer-events-none ${isDeepOverlay ? 'overlay-bg-deep' : 'overlay-bg'}`">
      <component :is="views[viewStore.currentView]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { css as fontCss } from './assets/fonts/SmileySans-Oblique-2.ttf?subsets'
import { useViewStore, type ViewStatus } from './stores/view.ts'

import Welcome from './views/Welcome.vue'
import Counter from './views/Counter.vue'
import Map from './views/Map.vue'
import Game from './views/Game.vue'
import BangumiSelection from './views/BangumiSelection.vue'
import Statistics from './views/Statistics.vue'
import { computed, type Component } from 'vue'

const viewStore = useViewStore();

const views: Record<ViewStatus, Component> = {
  WELCOME: Welcome,
  COUNTER: Counter,
  GAME: Game,
  BANGUMI_SELECTION: BangumiSelection,
  STATISTICS: Statistics
};

const isDeepOverlay = computed(() => viewStore.deepOverlay);
</script>
<style scoped>
.overlay-bg{
  background: linear-gradient(180deg, #102A51 2%, rgba(11, 60, 134, 0.4724) 44%, rgba(11, 60, 134, 0.153) 71%, rgba(0, 70, 175, 0) 100%);
}
.overlay-bg-deep{
  background: linear-gradient(180deg, #102A51 2%, rgba(11, 60, 134, 0.4724) 44%);
}
</style>