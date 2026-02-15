<template>
    <div class="w-full relative text-center py-[44px]">
        <h1 class="text-huge">排行榜</h1>
        <button class="absolute left-[65px] top-[78px] text-medium underline-text pointer-events-auto" @click="handleBack">
            返回
        </button>
    </div>
    <div v-if="loadingStatus === 'LOADING'" class="text-normal text-center">
        <span>加载中...</span>
    </div>
    <div v-if="loadingStatus === 'ERROR'" class="text-normal text-center">
        <span>加载失败qwq</span>
    </div>
    <div class="flex px-22" v-if="loadingStatus === 'SUCCESS'">
        <div class="w-1/3">
            <ul class="pointer-events-auto">
                <li v-for="item in rankData" 
                    :key="item.id" 
                    class="normal-font-family text-normal mb-2 hover:opacity-100"
                    :class="{ 'opacity-50': selectedBangumiId !== item.id }"
                    @click="selectedBangumiId = item.id">{{ item.name }}</li>
            </ul>
        </div>
        <div class="w-2/3 overflow-hidden">
            <table>
                <thead>
                    <tr>
                        <th class="text-normal pr-2">排名</th>
                        <th class="text-normal w-100 text-left">昵称</th>
                        <th class="text-normal">分数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rank of rankData.find(item => item.id === selectedBangumiId)?.ranks || []" 
                        :key="rank.user" 
                        class="text-medium *:pb-3">
                        <td>{{ rank.rank }}.</td>
                        <td class="normal-font-family flex items-center gap-2">
                            {{ rank.user }}
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
import { onMounted, ref } from 'vue';
import { getRank, type RankItem } from '../apis/rank';
import { useGameStore } from '../stores/game.ts';
const gameStore = useGameStore();
const loadingStatus = ref('LOADING' as 'LOADING' | 'ERROR' | 'SUCCESS');
const rankData = ref<RankItem[]>([]);
const selectedBangumiId = ref<number | null>(null);

const handleLoadData = async () => {
    loadingStatus.value = 'LOADING';
    getRank().then((data) => {
        rankData.value = data;
        if (rankData.value.length > 0) {
            selectedBangumiId.value = rankData.value[0].id;
        }
        loadingStatus.value = 'SUCCESS';
    }).catch(() => {
        loadingStatus.value = 'ERROR';
    });
};
const handleBack = () => {
    gameStore.game.state.back();
};
onMounted(() => {
    handleLoadData();
});
</script>