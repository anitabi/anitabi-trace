<template>
    <div class="w-full relative text-center py-[44px]">
        <h1 class="text-huge">排行榜</h1>
        <button class="absolute left-[65px] top-[78px] text-medium underline-text pointer-events-auto" @click="handleBack">
            返回
        </button>
    </div>
    <div v-if="gameStore.catalogStatus === 'loading' || gameStore.catalogStatus === 'idle'" class="text-normal text-center">
        <span>加载中...</span>
    </div>
    <div v-if="gameStore.catalogStatus === 'error'" class="text-normal text-center">
        <span>作品列表加载失败</span>
    </div>
    <div v-if="gameStore.catalogStatus === 'ready'" class="flex px-22">
        <div class="w-1/3">
            <input v-model="searchQuery" type="search" name="rank-bangumi-search"
                class="rank-search-input pointer-events-auto normal-font-family w-4/5 max-w-[320px] mb-5"
                placeholder="搜索番剧"
                :style="{ '--placeholder-font-family': ssoFontCss.family }" />
            <ul class="pointer-events-auto max-h-[calc(100vh-180px)] overflow-y-auto">
                <li v-for="item in catalog"
                    :key="item.id"
                    class="normal-font-family text-normal mb-2 hover:opacity-100 cursor-pointer"
                    :class="{ 'opacity-50': selectedBangumiId !== item.id }"
                    @click="selectedBangumiId = item.id">{{ item.name }}</li>
            </ul>
        </div>
        <div class="w-2/3 overflow-hidden">
            <div v-if="leaderboardStatus === 'LOADING'" class="text-normal text-center">
                加载中...
            </div>
            <div v-else-if="leaderboardStatus === 'ERROR'" class="text-normal text-center">
                排行榜加载失败
            </div>
            <div v-else-if="leaderboard.length === 0" class="text-normal text-center">
                暂无排行数据
            </div>
            <table v-else>
                <thead>
                    <tr>
                        <th class="text-normal pr-2">排名</th>
                        <th class="text-normal w-100 text-left">昵称</th>
                        <th class="text-normal">分数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(rank, index) of leaderboard"
                        :key="`${rank.fingerprint}:${rank.nickname}`"
                        class="text-medium *:pb-3">
                        <td>{{ index + 1 }}.</td>
                        <td class="normal-font-family flex items-center gap-2">
                            {{ rank.nickname }}
                            <span
                                v-if="rank.rank_delta !== 0"
                                class="text-normal font-bold"
                                style="paint-order: stroke fill;-webkit-text-stroke-width: 2px;"
                                :class="{
                                    'text-[#4CFF6F]': rank.rank_delta > 0,
                                    'text-[#FF2D2D]': rank.rank_delta < 0,
                                }"
                                :style="{
                                    '-webkit-text-stroke-color': rank.rank_delta > 0 ?
                                    '#00A259' : rank.rank_delta < 0 ? '#CB0000' : ''
                                }">
                                {{ rank.rank_delta > 0 ? '+' : '' }}{{ rank.rank_delta }}
                            </span>
                        </td>
                        <td>{{ rank.score }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script setup lang="ts">
import { css as ssoFontCss } from '../assets/fonts/SmileySans-Oblique-2.ttf?subsets';
import { computed, onUnmounted, ref, watch } from 'vue';
import { getLeaderboard, type LeaderboardEntry } from '../apis/rank';
import { useGameStore } from '../stores/game.ts';

const gameStore = useGameStore();
const searchQuery = ref('');
const catalog = computed(() => {
    const query = searchQuery.value.trim().toLocaleLowerCase();
    return gameStore.catalog.filter(item => (
        item.name !== null && (query === '' || item.name.toLocaleLowerCase().includes(query))
    ));
});
const selectedBangumiId = ref<string | number | null>(null);
const leaderboard = ref<LeaderboardEntry[]>([]);
const leaderboardStatus = ref<'IDLE' | 'LOADING' | 'ERROR' | 'SUCCESS'>('IDLE');
let requestEpoch = 0;

watch([() => gameStore.catalogStatus, catalog], ([catalogStatus, items]) => {
    if (catalogStatus === 'ready' && selectedBangumiId.value === null && items.length > 0) {
        selectedBangumiId.value = items[0].id;
    }
}, { immediate: true });

watch(selectedBangumiId, async projectId => {
    if (projectId === null) return;

    const epoch = ++requestEpoch;
    leaderboardStatus.value = 'LOADING';
    try {
        const response = await getLeaderboard(projectId);
        if (epoch !== requestEpoch) return;
        leaderboard.value = response.leaderboard;
        leaderboardStatus.value = 'SUCCESS';
    } catch {
        if (epoch !== requestEpoch) return;
        leaderboard.value = [];
        leaderboardStatus.value = 'ERROR';
    }
}, { immediate: true });

const handleBack = () => {
    gameStore.back();
};

onUnmounted(() => {
    requestEpoch++;
});
</script>

<style scoped>
.rank-search-input{
    /* background:
    linear-gradient(#FFF 0 0) padding-box,
    linear-gradient(to right, #00A3F0, #0077E0) border-box;
    border-radius: 8px;
    border: 3px solid transparent; */
    border-width: 0 0 3px 0;
    border-color: #FFFFFF;
    padding: 10px 14px;
    outline: none;
    font-size: 20px;
    text-align: center;
    height: 48px;
    color: #FFFFFF;
}

.rank-search-input::placeholder{
    color: #999999;
    font-family: var(--placeholder-font-family);
}
</style>