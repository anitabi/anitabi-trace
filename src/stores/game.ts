import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from '../apis/api';
import { getDefaultBangumi, type DefaultBangumi, type PointDetail } from '../apis/bangumi';
import { preloadImage } from '../helpers/preload';
import { reverseCoordinate } from '../helpers/map';
import { Game, type Finished, type UpdateGameData, type UpdatePointData } from '../services/game';
import { useMapStore } from './map';
import { useUserStore } from './user';

export type GamePhase =
    | { kind: 'WELCOME' }
    | { kind: 'AUTH' }
    | { kind: 'RANK' }
    | { kind: 'SELECTING' }
    | { kind: 'COUNTDOWN'; countdownElapsed: boolean }
    | { kind: 'PLAYING' }
    | { kind: 'FINISHING' }
    | { kind: 'RESULTS' };

export type Screen =
    | 'WELCOME'
    | 'AUTH'
    | 'RANK'
    | 'BANGUMI_SELECTION'
    | 'COUNTER'
    | 'GAME'
    | 'STATISTICS';

export type Overlay = 'FULL' | 'HEAD_ONLY' | 'OREO';
export type LoadingStatus = 'idle' | 'loading' | 'ready' | 'error';

const PRESENTATION = {
    WELCOME: { screen: 'WELCOME', overlay: 'FULL' },
    AUTH: { screen: 'AUTH', overlay: 'FULL' },
    RANK: { screen: 'RANK', overlay: 'FULL' },
    SELECTING: { screen: 'BANGUMI_SELECTION', overlay: 'FULL' },
    COUNTDOWN: { screen: 'COUNTER', overlay: 'FULL' },
    PLAYING: { screen: 'GAME', overlay: 'HEAD_ONLY' },
    FINISHING: { screen: 'GAME', overlay: 'OREO' },
    RESULTS: { screen: 'STATISTICS', overlay: 'OREO' }
} satisfies Record<GamePhase['kind'], { screen: Screen; overlay: Overlay }>;

interface GameWindow extends Window {
    cheating?: boolean;
}

const toError = (error: unknown): Error => {
    return error instanceof Error ? error : new Error(String(error));
};

export const useGameStore = defineStore('game', () => {
    const mapStore = useMapStore();
    const userStore = useUserStore();

    // 唯一可写的流程状态；当前界面和遮罩均由 phase 投影，避免多份导航状态失配。
    const phase = ref<GamePhase>({ kind: 'WELCOME' });
    // 响应式领域会话，保存作品、点位、进度、分数和统计结果。
    const game = reactive(new Game());
    // 作品目录只在协调器中加载一次；状态与错误供选择页直接展示。
    const catalog = ref<DefaultBangumi[]>([]);
    const catalogStatus = ref<LoadingStatus>('idle');
    const catalogError = ref<Error | null>(null);
    // 点位数据由 game 持有；这里仅记录异步加载生命周期，控制何时允许进入 PLAYING。
    const pointsStatus = ref<LoadingStatus>('idle');
    const pointsError = ref<Error | null>(null);

    // Epoch 用于废弃旧请求和旧结束回调，防止返回、重试后被过期异步结果覆盖。
    let pointsEpoch = 0;
    let finishingEpoch = 0;
    // 保存 FINISHING 到 RESULTS 的延迟句柄，以便 reset、back 或 retry 时取消。
    let resultsTimeout: ReturnType<typeof setTimeout> | null = null;

    const presentation = computed(() => PRESENTATION[phase.value.kind]);

    const requirePhase = (...allowed: GamePhase['kind'][]): void => {
        if (!allowed.includes(phase.value.kind)) {
            throw new Error(`Action is not valid during phase ${phase.value.kind}`);
        }
    };

    const cancelResultsDelay = (): void => {
        finishingEpoch++;
        if (resultsTimeout !== null) {
            clearTimeout(resultsTimeout);
            resultsTimeout = null;
        }
    };

    const invalidateAsync = (): void => {
        pointsEpoch++;
        cancelResultsDelay();
    };

    const initialize = async (): Promise<void> => {
        if (catalogStatus.value !== 'idle') return;

        catalogStatus.value = 'loading';
        catalogError.value = null;
        try {
            const response = await getDefaultBangumi();
            catalog.value = response;
            catalogStatus.value = 'ready';
            response.forEach(item => {
                if (item.cover) preloadImage(item.cover);
            });
        } catch (error) {
            catalogError.value = toError(error);
            catalogStatus.value = 'error';
        }
    };

    const enterPlayingWhenReady = (): void => {
        if (
            phase.value.kind !== 'COUNTDOWN'
            || !phase.value.countdownElapsed
            || pointsStatus.value !== 'ready'
        ) {
            return;
        }
        mapStore.enableGameInteraction();
        phase.value = { kind: 'PLAYING' };
    };

    const loadPoints = (): void => {
        const bangumi = game.bangumi;
        if (!bangumi) {
            throw new Error('Cannot load points without a selected bangumi');
        }

        const requestEpoch = ++pointsEpoch;
        pointsStatus.value = 'loading';
        pointsError.value = null;
        game.setPoints([]);

        api.get<PointDetail[]>(bangumi.points_api_url, { noBaseUrl: true })
            .then(response => {
                if (requestEpoch !== pointsEpoch) return;
                game.setPoints(response);
                response.forEach(point => {
                    if (point.image) preloadImage(point.image);
                });
                pointsStatus.value = 'ready';
                enterPlayingWhenReady();
            })
            .catch(error => {
                if (requestEpoch !== pointsEpoch) return;
                pointsError.value = toError(error);
                pointsStatus.value = 'error';
            });
    };

    const startSinglePlayerGame = (): void => {
        requirePhase('WELCOME');
        game.start('SINGLE');
        phase.value = userStore.nickname ? { kind: 'SELECTING' } : { kind: 'AUTH' };
    };

    const goRank = (): void => {
        requirePhase('WELCOME');
        phase.value = { kind: 'RANK' };
    };

    const goAuth = (): void => {
        requirePhase('WELCOME');
        phase.value = { kind: 'AUTH' };
    };

    const authAccepted = (): void => {
        requirePhase('AUTH');
        if (!userStore.nickname) {
            throw new Error('Cannot accept authentication without a nickname');
        }
        phase.value = { kind: 'SELECTING' };
    };

    const back = (): void => {
        requirePhase('AUTH', 'RANK', 'SELECTING', 'FINISHING', 'RESULTS');
        const resetMap = phase.value.kind === 'FINISHING' || phase.value.kind === 'RESULTS';
        invalidateAsync();
        if (resetMap) mapStore.reset();
        game.reset();
        pointsStatus.value = 'idle';
        pointsError.value = null;
        phase.value = { kind: 'WELCOME' };
    };

    const selectBangumi = (id: string): void => {
        requirePhase('SELECTING');
        const bangumi = catalog.value.find(item => item.id === id);
        if (!bangumi) {
            throw new Error(`Bangumi with id ${id} not found`);
        }

        mapStore.stopAnimationAndJump(reverseCoordinate(bangumi.geo), bangumi.zoom);
        game.selectBangumi(bangumi);
        phase.value = { kind: 'COUNTDOWN', countdownElapsed: false };
        loadPoints();
    };

    const countdownElapsed = (): void => {
        requirePhase('COUNTDOWN');
        phase.value = { kind: 'COUNTDOWN', countdownElapsed: true };
        enterPlayingWhenReady();
    };

    const retryPointLoading = (): void => {
        requirePhase('COUNTDOWN');
        if (pointsStatus.value !== 'error') {
            throw new Error('Point loading can only be retried after an error');
        }
        loadPoints();
    };

    const revealCheatTarget = (): void => {
        if (!import.meta.env.DEV || typeof window === 'undefined' || !(window as GameWindow).cheating) return;
        const point = game.currentPoint();
        if (point) {
            mapStore.addPoints([[reverseCoordinate(point.geo), 'target']]);
        }
    };

    const nextPoint = (): Finished | UpdatePointData => {
        requirePhase('PLAYING');
        const next = game.nextPoint();
        if (next.type === 'updatePoint') {
            mapStore.clearDraw();
            revealCheatTarget();
        }
        return next;
    };

    const submitAnswer = (): UpdateGameData => {
        requirePhase('PLAYING');
        const point = game.currentPoint();
        if (!point) {
            throw new Error('Cannot submit an answer without a current point');
        }
        const distance = mapStore.drawConnectionAndPoints(reverseCoordinate(point.geo));
        return game.submitAnswer(distance);
    };

    const gameOver = (duration: number): void => {
        requirePhase('PLAYING');
        mapStore.clearDraw();
        mapStore.disableGameInteraction();
        game.complete(duration);
        phase.value = { kind: 'FINISHING' };

        const epoch = ++finishingEpoch;
        resultsTimeout = setTimeout(() => {
            resultsTimeout = null;
            if (epoch !== finishingEpoch || phase.value.kind !== 'FINISHING') return;
            phase.value = { kind: 'RESULTS' };
            mapStore.showPointsAsMarkerWithText(
                game.completedPoints().map(point => [
                    reverseCoordinate(point.geo),
                    point.extend.distance,
                    point.extend.point_delta
                ])
            );
        }, 1000);
    };

    const retry = (): void => {
        requirePhase('FINISHING', 'RESULTS');
        const bangumi = game.bangumi;
        if (!bangumi) {
            throw new Error('Cannot retry without a selected bangumi');
        }

        invalidateAsync();
        mapStore.clearMarkers();
        mapStore.stopAnimationAndJump(reverseCoordinate(bangumi.geo), bangumi.zoom);
        game.resetResult();
        pointsStatus.value = 'ready';
        pointsError.value = null;
        phase.value = { kind: 'COUNTDOWN', countdownElapsed: false };
    };

    const reset = (): void => {
        invalidateAsync();
        mapStore.reset();
        game.reset();
        pointsStatus.value = 'idle';
        pointsError.value = null;
        phase.value = { kind: 'WELCOME' };
    };

    return {
        phase,
        game,
        catalog,
        catalogStatus,
        catalogError,
        pointsStatus,
        pointsError,
        presentation,
        initialize,
        startSinglePlayerGame,
        goRank,
        goAuth,
        authAccepted,
        back,
        selectBangumi,
        countdownElapsed,
        retryPointLoading,
        nextPoint,
        submitAnswer,
        gameOver,
        retry,
        reset
    };
});
