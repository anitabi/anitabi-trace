<template>
    <button class="absolute top-10 left-10 text-white flex flex-col underline-text pointer-events-auto" @click="handleBack">
        <span class="text-medium">返回</span>
    </button>
    <div class="absolute top-[72px] flex flex-col w-full">
        <div class="w-full text-center text-white">
            <h1 class="text-huge">单人计时</h1>
            <h2 class="text-normal mt-[22px]">选择进行游戏的作品</h2>
        </div>
        <div class="mt-[10vh] w-full flex flex-col">
            <div class="w-[848px] max-w-full mx-auto flex flex-col items-center">
                <input v-model="searchQuery" type="search" name="bangumi-search"
                    class="search-input pointer-events-auto w-1/2 max-w-[500px] mb-[31px] normal-font-family"
                    placeholder="搜索番剧"
                    :style="{ '--placeholder-font-family': ssoFontCss.family }" />
                <div class="bangumi-list-shell relative w-full h-[330px]"
                    :class="{ 'bangumi-list-shell--overflow': filteredCatalog.length > 4 }">
                    <div ref="bangumiList" class="bangumi-list grid grid-cols-[repeat(4,212px)] w-full h-full overflow-y-auto overflow-x-hidden justify-start"
                        @scroll.passive="loadVisibleCovers">
                        <div v-for="item in filteredCatalog" :key="item.id" class="text-center pointer-events-auto">
                            <img :src="loadedCoverIds.has(item.id) ? `${item.cover}?plan=h360` : undefined"
                                class="w-[180px] h-[225px] object-cover m-4 rounded-lg bg-gray-200 shadow-lg border-[4px] hover:scale-110 hover:opacity-100"
                                :class="{ 'scale-110': bangumiId === item.id, 'opacity-40': bangumiId !== null && bangumiId !== item.id }"
                                :style="{ borderColor: item.color || '#0070e0' }"
                                @click="bangumiId = item.id"
                                />
                            <span class="normal-font-family text-tiny"
                                :class="{ 'opacity-40': bangumiId !== null && bangumiId !== item.id }">{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="gameStore.catalogStatus === 'loading' || gameStore.catalogStatus === 'idle'" class="m-auto text-2xl">加载中...</div>
            <RequestError v-if="gameStore.catalogStatus === 'error'" :event-id="gameStore.catalogErrorEventId" class="m-auto text-2xl" />
            <div class="flex flex-row mt-20 m-auto">
                <button :class="'w-[180px] h-[76px] text-white rounded-lg shadow-xl text-medium pointer-events-auto '  +
                (!buttonDisabled ? 'bg-gradient-to-r from-[#0073DE] to-[#00A5F1] hover:translate-y-1' : 'bg-slate-500') " @click="handleStart" :disabled="buttonDisabled">立即开始</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { css as ssoFontCss } from '../assets/fonts/SmileySans-Oblique-2.ttf?subsets';
import RequestError from '../components/RequestError.vue';
import { useGameStore } from '../stores/game.ts';

const gameStore = useGameStore();
const bangumiId = ref<number | null>(null);
const searchQuery = ref('');
const bangumiList = ref<HTMLElement | null>(null);
const loadedCoverIds = ref(new Set<number>());
const filteredCatalog = computed(() => {
    const query = searchQuery.value.trim().toLocaleLowerCase();
    if (query === '') return gameStore.catalog;
    return gameStore.catalog.filter(item => item.name && item.name.toLocaleLowerCase().includes(query));
});

const loadFirstRow = () => {
    filteredCatalog.value.slice(0, 4).forEach(item => loadedCoverIds.value.add(item.id));
};

const loadVisibleCovers = () => {
    const list = bangumiList.value;
    if (list === null) return;

    const viewport = list.getBoundingClientRect();
    const visibleIndexes = Array.from(list.children).flatMap((element, index) => {
        const child = element.getBoundingClientRect();
        const isVisible = child.top < viewport.bottom && child.bottom > viewport.top;
        return isVisible ? [index] : [];
    });
    if (visibleIndexes.length === 0) return;

    const lastVisibleRow = Math.floor(visibleIndexes.at(-1)! / 4);
    const nextRowStart = (lastVisibleRow + 1) * 4;
    const indexesToLoad = [
        ...visibleIndexes,
        ...Array.from({ length: 4 }, (_, offset) => nextRowStart + offset)
    ];
    indexesToLoad.forEach(index => {
        const item = filteredCatalog.value[index];
        if (item !== undefined) loadedCoverIds.value.add(item.id);
    });
};

watch(() => gameStore.catalog, loadFirstRow, { immediate: true });
watch(searchQuery, async () => {
    await nextTick();
    if (bangumiList.value !== null) bangumiList.value.scrollTop = 0;
    loadFirstRow();
});

const buttonDisabled = computed(() => {
    return gameStore.catalogStatus !== 'ready' || bangumiId.value === null;
});
const handleBack = () => {
    gameStore.back();
};
const handleStart = () => {
    if (bangumiId.value === null) {
        return;
    }
    gameStore.selectBangumi(bangumiId.value);
};
</script>
<style scoped>
.underline-text::after{
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 3px;
    width: 0;
    background-color: white;
}

.underline-text:hover::after{
    width: 100%;
    transition: width 0.3s ease;
}

.bangumi-list-shell--overflow .bangumi-list{
    -webkit-mask-image: linear-gradient(to bottom, black calc(100% - 64px), transparent 100%);
    mask-image: linear-gradient(to bottom, black calc(100% - 64px), transparent 100%);
}

.search-input{
    /* background:
    linear-gradient(#FFF 0 0) padding-box,
    linear-gradient(to right, #00A3F0, #0077E0) border-box;
    border-radius: 10px;
    border: 4px solid #0077E0; */
    border-width: 0 0 3px 0;
    border-color: #FFFFFF;
    padding: 18px 20px;
    outline: none;
    font-size: 28px;
    text-align: center;
    height: 64px;
    color: #FFFFFF;
}

.search-input::placeholder{
    color: #999999;
    font-family: var(--placeholder-font-family);
}
</style>
