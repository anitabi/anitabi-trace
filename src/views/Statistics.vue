<template>
    <div class="px-[34px] pt-[34px] pb-[41px] flex flex-col justify-between h-screen">
        <div class="grid grid-cols-3 justify-between">

            <div class="flex flex-col items-start">
                <div class="flex flex-row justify-start items-center">
                    <span class="text-enormous mr-[15px]">{{ gameStore.game.statistics?.point ?? 0 }}</span>
                </div>
                <span class="text-huge -mt-15">score</span>
                <span class="text-medium -mt-2">获得分数</span>
            </div>
            <div>
                <h1 class="text-large mt-[48px] text-center">单人计时</h1>
                <h1 class="text-medium mt-[5px] text-center normal-font-family">{{ gameStore.game.bangumi?.name || '' }}</h1>
            </div>
            <div class="flex flex-col items-end">
                <div class="flex flex-row justify-end items-center">
                    <span class="text-enormous ml-[15px]">{{ gameStore.game.statistics?.duration ?? 0 }}</span>
                </div>
                <span class="text-huge -mt-15">second</span>
                <span class="text-medium -mt-2">经过时间</span>
            </div>
        </div>
        <div class="grid grid-cols-2 items-end">
            <div class="flex flex-col">
                <span class="text-medium">{{ gameStore.rank ?? '暂无' }}</span>
                <span class="text-normal -mt-1">单人计时模式排名</span>
                <span class="text-medium mt-1" 
                    :style="{ visibility: gameStore.scorePercentile !== null ? 'visible' : 'hidden' }">
                    超越了 {{ gameStore.scorePercentile }} 的网友！</span>
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

    <div v-if="showUploadOverlay" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70">
        <div class="relative z-[1] flex flex-col items-center gap-4 rounded-2xl bg-white/10 px-8 py-7 text-white shadow-2xl backdrop-blur-sm">
            <p class="text-medium text-center">{{ uploadOverlayMessage }}</p>
            <Turnstile
                v-if="uploadOverlayPhase !== 'component-error'"
                :key="turnstileWidgetKey"
                :sitekey="turnstileSiteKey"
                class="pointer-events-auto"
                @verified="handleTurnstileVerified"
                @expired="handleTurnstileExpired"
                @error="handleTurnstileError"
            />
            <button
                v-if="uploadOverlayActionLabel"
                class="text-medium underline-text pointer-events-auto"
                @click="handleRetryUpload"
            >
                {{ uploadOverlayActionLabel }}
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import Turnstile from '../components/Turnstile.vue';
import { css as ssoFontCss } from '../assets/fonts/SmileySans-Oblique-2.ttf?subsets';
import { css as ysbFontCss } from '../assets/fonts/YouSheBiaoTiHei.ttf?subsets';
import { useGameStore } from '../stores/game';
import { useMapStore } from '../stores/map';
import { useUserStore } from '../stores/user';


type UploadOverlayPhase = 'verifying' | 'uploading' | 'failed' | 'component-error';

const gameStore = useGameStore();
const mapStore = useMapStore();
const userStore = useUserStore();
const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const turnstileWidgetKey = ref(0);

const initialUploadOverlayPhase = (): UploadOverlayPhase => {
    if (gameStore.gradeUploadStatus === 'loading') return 'uploading';
    if (gameStore.gradeUploadStatus === 'error') return 'failed';
    return 'verifying';
};

const uploadOverlayPhase = ref<UploadOverlayPhase>(initialUploadOverlayPhase());

const isGradeUploadReady = computed(() => gameStore.gradeUploadStatus === 'ready');

const showUploadOverlay = computed(() => Boolean(gameStore.canUploadGrade) && !isGradeUploadReady.value);

const uploadOverlayMessage = computed(() => {
    if (uploadOverlayPhase.value === 'component-error') return '验证组件加载失败，请重试';
    if (uploadOverlayPhase.value === 'failed') return '上传失败，请重试';
    if (uploadOverlayPhase.value === 'uploading' || gameStore.gradeUploadStatus === 'loading') return '成绩上传中...';
    return '请完成人机验证';
});

const uploadOverlayActionLabel = computed(() => {
    if (uploadOverlayPhase.value === 'component-error') return '重新加载验证组件';
    if (uploadOverlayPhase.value === 'failed') return '重新生成验证';
    return '';
});


const handleRetry = () => {
    gameStore.retry();
};

const handleGoHome = () => {
    gameStore.back();
};

const handleRetryUpload = () => {
    if (!showUploadOverlay.value) return;
    uploadOverlayPhase.value = 'verifying';
    turnstileWidgetKey.value += 1;
};

const handleTurnstileVerified = async (turnstileToken: string) => {
    if (!showUploadOverlay.value || uploadOverlayPhase.value !== 'verifying') return;

    uploadOverlayPhase.value = 'uploading';
    try {
        await gameStore.uploadGrade(turnstileToken);
    } catch {
        uploadOverlayPhase.value = 'failed';
    }
};

const handleTurnstileExpired = () => {
    if (!showUploadOverlay.value) return;
    uploadOverlayPhase.value = 'failed';
};

const handleTurnstileError = () => {
    if (!showUploadOverlay.value) return;
    uploadOverlayPhase.value = 'component-error';
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
    const topGradient = ctx.createLinearGradient(0, canvas.height / 2, 0, canvas.height);
    topGradient.addColorStop(0, 'rgba(53, 91, 149, 0)');
    topGradient.addColorStop(1, '#355B95');
    ctx.fillStyle = topGradient;
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'white';
    ctx.font = `${48 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText('单人计时', canvas.width / 2, 60 * dpr);
    ctx.font = `${48 * dpr}px "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif`; 
    ctx.fillText(gameStore.game.bangumi?.name || '', canvas.width / 2, (60 + 64) * dpr);
    ctx.textAlign = 'left';
    ctx.font = `${144 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText(`${gameStore.game.statistics?.point ?? 0}`, 34 * dpr, 74 * dpr);

    ctx.font = `${72 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText('score', 34 * dpr, (74 + 124) * dpr);
    ctx.font = `${36 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText('获得分数', 34 * dpr, (74 + 210) * dpr);

    ctx.textAlign = 'right';
    ctx.font = `${144 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText(`${gameStore.game.statistics?.duration ?? 0}`, canvas.width - 34 * dpr, 74 * dpr);
    ctx.font = `${72 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText('second', canvas.width - 34 * dpr, (74 + 124) * dpr);
    ctx.font = `${36 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText('经过时间', canvas.width - 34 * dpr, (74 + 210) * dpr);

    ctx.textBaseline = 'bottom';
    ctx.textAlign = 'left';
    ctx.font = `${24 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText('单人计时模式排名', 34 * dpr, canvas.height - 155 * dpr);
    ctx.font = `${36 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText(gameStore.rank ?? '暂无', 34 * dpr, canvas.height - 100 * dpr);

    ctx.font = `${36 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText(gameStore.scorePercentile !== null ? `超越了 ${gameStore.scorePercentile} 的网友` : '暂无百分位', 34 * dpr, canvas.height - 41 * dpr);


    ctx.textAlign = 'right';
    ctx.font = `${36 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText(generateDateString(), canvas.width - 34 * dpr, canvas.height - 41 * dpr);

    ctx.font = `${48 * dpr}px "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif`;
    ctx.fillText(`${userStore.nickname}`, canvas.width - 34 * dpr, canvas.height - 103 * dpr);

    ctx.font = `${24 * dpr}px ${ssoFontCss.family}`;
    ctx.fillText('duel.anitabi.cn', canvas.width - 34 * dpr, canvas.height - 185 * dpr);

    ctx.font = `${36 * dpr}px ${ysbFontCss.family}`;
    ctx.fillText('巡礼对决', canvas.width - 34 * dpr, canvas.height - 207 * dpr);
    const link = document.createElement('a');
    link.download = `${gameStore.game.bangumi?.name || 'result'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
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