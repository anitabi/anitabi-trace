
<template>
    <div class="px-[34px] pt-[34px] pb-[41px] flex flex-col justify-between h-screen">
        <div class="grid grid-cols-3 justify-between">

            <div class="flex flex-col items-start">
                <div class="flex flex-row justify-start items-center">
                    <span class="text-enormous mr-[15px]">{{ gameStore.game.statistics?.point || 0 }}</span>
                </div>
                <span class="text-huge -mt-15">score</span>
                <span class="text-medium -mt-2">获得分数</span>
            </div>
            <div>
                <h1 class="text-large mt-[48px] text-center">单人计时</h1>
                <h1 class="text-medium mt-[5px] text-center">{{ gameStore.game.bangumi?.name || '' }}</h1>
            </div>
            <div class="flex flex-col items-end">
                <div class="flex flex-row justify-end items-center">
                    <span class="text-enormous ml-[15px]">{{ gameStore.game.statistics?.duration || 0 }}</span>
                </div>
                <span class="text-huge -mt-15">second</span>
                <span class="text-medium -mt-2">经过时间</span>
            </div>
        </div>
        <div class="grid grid-cols-2 items-end">
            <div class="flex flex-col">
                <span class="text-medium">700+</span>
                <span class="text-normal -mt-1">单人计时模式排名</span>
                <span class="text-medium mt-1">超越了 75 % 的网友！</span>
            </div>
            <div class="h-auto place-self-end">
                <div class="flex flex-col items-end gap-4">
                    <button class="text-medium underline-text relative pointer-events-auto" @click="handleGoHome">回首页</button>
                    <div>
                        <button class="again-button pointer-events-auto mr-5" @click="handleRetry">再来一局</button>
                        <button class="share-button pointer-events-auto" @click="handleGenerateImg">分享战绩</button>
                    </div>
                </div>
            </div>
        </div>
    </div>    
        
</template>
<script setup lang="ts">
import { css as ssoFontCss } from '../assets/fonts/SmileySans-Oblique-2.ttf?subsets'
import { css as ysbFontCss } from '../assets/fonts/YouSheBiaoTiHei.ttf?subsets'
import { useGameStore } from '../stores/game';
import { useMapStore } from '../stores/map';
const gameStore = useGameStore();
const mapStore = useMapStore();

const handleRetry = () => {
    gameStore.game.state.retry();
};
const handleGoHome = () => {
    gameStore.game.state.back();
};
const generateDateString = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}年${month}月${day}日 ${hours}时${minutes}分`;
};
const handleGenerateImg = async () => {
    const canvas = mapStore.drawCanvas();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const bottomGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bottomGradient.addColorStop(0, '#102A51');
    bottomGradient.addColorStop(0.88, 'rgba(11, 60, 134, 0.4724)');
    bottomGradient.addColorStop(1, 'rgba(11, 60, 134, 0.4014)');

    ctx.fillStyle = bottomGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await mapStore.drawMarkers(canvas);
    const topGradient = ctx.createLinearGradient(0, canvas.height/2, 0, canvas.height);
    topGradient.addColorStop(0, 'rgba(53, 91, 149, 0)');
    topGradient.addColorStop(1, '#355B95');
    ctx.fillStyle = topGradient;
    ctx.fillRect(0, canvas.height/2, canvas.width, canvas.height/2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'white';
    ctx.font = `${48 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText('单人计时', canvas.width / 2, 60 * dpr);
    
    ctx.textAlign = 'left';
    ctx.font = `${144 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText(`${gameStore.game.statistics?.point || 0}`, 34 * dpr, 74 * dpr);
    
    ctx.font = `${72 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText('score', 34 * dpr, (74 + 124) * dpr);
    ctx.font = `${36 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText('获得分数', 34 * dpr, (74 + 210) * dpr);

    ctx.textAlign = 'right';
    ctx.font = `${144 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText(`${gameStore.game.statistics?.duration || 0}`, canvas.width - 34 * dpr, 74 * dpr);
    ctx.font = `${72 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText("second", canvas.width - 34 * dpr, (74 + 124) * dpr);
    ctx.font = `${36 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText('经过时间', canvas.width - 34 * dpr, (74 + 210) * dpr);

    ctx.textBaseline = 'bottom';
    ctx.textAlign = 'left';
    ctx.font = `${36 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText(`超越了 75 % 的网友！`, 34 * dpr, canvas.height - 41 * dpr);

    ctx.font = `${24 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText(`单人计时模式排名`, 34 * dpr, canvas.height - 97 * dpr);

    ctx.font = `${36 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText(`700+`, 36 * dpr, canvas.height - 129 * dpr);

    ctx.textAlign = 'right';
    ctx.font = `${36 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText(generateDateString(), canvas.width - 34 * dpr, canvas.height - 41 * dpr);

    ctx.font = `${48 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText(`用户昵称`, canvas.width - 34 * dpr, canvas.height - 103 * dpr);

    ctx.font = `${24 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText('duel.anitabi.cn', canvas.width - 34 * dpr, canvas.height - 185 * dpr);

    ctx.font = `${36 * dpr}px ${ysbFontCss.family}`;
    ctx.fillText('巡礼对决', canvas.width - 34 * dpr, canvas.height - 207 * dpr);
    const link = document.createElement('a');
    link.download = `${gameStore.game.bangumi?.name || 'result'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
};
</script>
<style scoped>
.again-button{
    background: linear-gradient(to right, #00A3F0, #0077E0) ;
    color: #FFF;
    border-radius: 10px;
    width: 180px;
    height: 76px;
    font-size: 36px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
.share-button{
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
.again-button:hover, .share-button:hover{
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