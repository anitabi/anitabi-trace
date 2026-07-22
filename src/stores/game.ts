import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { HTTPError, api } from '../apis/api';
import { getDefaultBangumi, type DefaultBangumi, type PointDetail } from '../apis/bangumi';
import { clearAuthentication } from '../apis/auth';
import { startGame, uploadGrade as submitGrade, type GradeUploadResult, type GameStartResult } from '../apis/game';
import { preloadImage } from '../helpers/preload';
import { reverseCoordinate } from '../helpers/map';
import { Game, type Finished, type UpdateGameData, type UpdatePointData } from '../services/game';
import { reportException } from '../services/sentry';
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

type PreparationCredentials = {
    startTime: number;
    startKey: string;
};

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

const isUnauthorized = (error: unknown): boolean => {
    return error instanceof HTTPError && error.status === 401;
};

const clearCompletedPointProgress = (game: Game): void => {
    game.points.forEach(point => {
        delete point.extend;
    });
};

export const useGameStore = defineStore('game', () => {
    const mapStore = useMapStore();
    const userStore = useUserStore();

    const phase = ref<GamePhase>({ kind: 'WELCOME' });
    const game = reactive(new Game());
    const catalog = ref<DefaultBangumi[]>([]);
    const catalogStatus = ref<LoadingStatus>('idle');
    const catalogErrorEventId = ref<string | null>(null);
    const gameStartStatus = ref<LoadingStatus>('idle');
    const gameStartErrorEventId = ref<string | null>(null);
    const pointsStatus = ref<LoadingStatus>('idle');
    const pointsErrorEventId = ref<string | null>(null);
    const gradeUploadStatus = ref<LoadingStatus>('idle');
    const gradeUploadErrorEventId = ref<string | null>(null);
    const scorePercentile = ref<string | null>(null);
    const rank = ref<string | null>(null);
    const preparationCredentials = ref<PreparationCredentials | null>(null);

    let startEpoch = 0;
    let pointsEpoch = 0;
    let uploadEpoch = 0;
    let finishingEpoch = 0;
    let uploadPromise: Promise<void> | null = null;
    let resultsTimeout: ReturnType<typeof setTimeout> | null = null;

    const presentation = computed(() => PRESENTATION[phase.value.kind]);

    const canUploadGrade = computed(() => {
        if (phase.value.kind !== 'RESULTS') return false;
        if (!userStore.nickname) return false;
        if (gameStartStatus.value !== 'ready' || pointsStatus.value !== 'ready') return false;
        if (gradeUploadStatus.value === 'loading' || gradeUploadStatus.value === 'ready') return false;

        const completedPoints = game.completedPoints();
        const statistics = game.statistics;
        return completedPoints.length > 0 && statistics !== undefined && statistics.point > 0;
    });

    const requirePhase = (...allowed: GamePhase['kind'][]): void => {
        if (!allowed.includes(phase.value.kind)) {
            throw new Error(`Action is not valid during phase ${phase.value.kind}`);
        }
    };

    const clearResultsDelay = (): void => {
        finishingEpoch++;
        if (resultsTimeout !== null) {
            clearTimeout(resultsTimeout);
            resultsTimeout = null;
        }
    };

    const invalidateRequests = (): void => {
        startEpoch++;
        pointsEpoch++;
        uploadEpoch++;
        uploadPromise = null;
        clearResultsDelay();
    };


    const resetTransientState = (): void => {
        gameStartStatus.value = 'idle';
        gameStartErrorEventId.value = null;
        pointsStatus.value = 'idle';
        pointsErrorEventId.value = null;
        gradeUploadStatus.value = 'idle';
        gradeUploadErrorEventId.value = null;
        scorePercentile.value = null;
        rank.value = null;
        uploadPromise = null;
    };

    const enterPlayingWhenReady = (): void => {
        if (
            phase.value.kind !== 'COUNTDOWN'
            || !phase.value.countdownElapsed
            || gameStartStatus.value !== 'ready'
            || pointsStatus.value !== 'ready'
        ) {
            return;
        }
        mapStore.enableGameInteraction();
        phase.value = { kind: 'PLAYING' };
    };

    const reportAndMaybeClearAuthentication = (error: unknown): void => {
        if (!isUnauthorized(error)) return;
        clearAuthentication();
        userStore.clearNickname();
    };

    const startGameRequest = (projectId: number): void => {
        const requestEpoch = ++startEpoch;
        gameStartStatus.value = 'loading';
        gameStartErrorEventId.value = null;

        void startGame(projectId).then((response: GameStartResult) => {
            if (requestEpoch !== startEpoch) return;
            preparationCredentials.value = {
                startTime: response.start_time,
                startKey: response.start_key
            };
            gameStartStatus.value = 'ready';
            enterPlayingWhenReady();
        }).catch(error => {
            if (requestEpoch !== startEpoch) return;
            preparationCredentials.value = null;
            reportAndMaybeClearAuthentication(error);
            const normalizedError = toError(error);
            gameStartErrorEventId.value = reportException(normalizedError) ?? null;
            gameStartStatus.value = 'error';
        });
    };

    const loadPoints = (projectId: number, pointsApiUrl: string): void => {
        const requestEpoch = ++pointsEpoch;
        pointsStatus.value = 'loading';
        pointsErrorEventId.value = null;
        game.setPoints([]);

        api.get<PointDetail[]>(pointsApiUrl)
            .then(response => {
                if (requestEpoch !== pointsEpoch) return;
                if (Number.isNaN(projectId)) {
                    throw new Error('Cannot load points for an invalid project id');
                }
                game.setPoints(response);
                response.forEach(point => {
                    if (point.image) preloadImage(point.image);
                });
                pointsStatus.value = 'ready';
                enterPlayingWhenReady();
            })
            .catch(error => {
                if (requestEpoch !== pointsEpoch) return;
                const normalizedError = toError(error);
                pointsErrorEventId.value = reportException(normalizedError) ?? null;
                pointsStatus.value = 'error';
            });
    };

    const initialize = async (): Promise<void> => {
        if (catalogStatus.value !== 'idle') return;

        catalogStatus.value = 'loading';
        catalogErrorEventId.value = null;
        try {
            const response = await getDefaultBangumi();
            catalog.value = response;
            catalogStatus.value = 'ready';
            response.slice(0, 4).forEach(item => {
                if (item.cover) preloadImage(item.cover);
            });
        } catch (error) {
            const normalizedError = toError(error);
            catalogErrorEventId.value = reportException(normalizedError) ?? null;
            catalogStatus.value = 'error';
        }
    };

    const startSinglePlayerGame = (): void => {
        requirePhase('WELCOME');
        invalidateRequests();
        resetTransientState();
        game.reset();
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
        invalidateRequests();
        resetTransientState();
        if (resetMap) mapStore.reset();
        game.reset();
        phase.value = { kind: 'WELCOME' };
    };

    const selectBangumi = (id: number): void => {
        requirePhase('SELECTING');
        const bangumi = catalog.value.find(item => item.id === id);
        if (!bangumi) {
            throw new Error(`Bangumi with id ${id} not found`);
        }

        invalidateRequests();
        resetTransientState();
        preparationCredentials.value = null;
        mapStore.stopAnimationAndJump(reverseCoordinate(bangumi.geo), bangumi.zoom);
        game.selectBangumi(bangumi);
        phase.value = { kind: 'COUNTDOWN', countdownElapsed: false };
        const projectId = bangumi.id;
        startGameRequest(projectId);
        loadPoints(projectId, bangumi.points_api_url);
    };

    const countdownElapsed = (): void => {
        requirePhase('COUNTDOWN');
        phase.value = { kind: 'COUNTDOWN', countdownElapsed: true };
        enterPlayingWhenReady();
    };

    const retryPreparation = (): void => {
        requirePhase('COUNTDOWN');
        if (gameStartStatus.value === 'loading' || pointsStatus.value === 'loading') {
            throw new Error('Preparation can only be retried after requests settle');
        }
        if (gameStartStatus.value !== 'error' && pointsStatus.value !== 'error') {
            throw new Error('Preparation can only be retried after a start or point failure');
        }

        invalidateRequests();

        if (gameStartStatus.value === 'error') preparationCredentials.value = null;
        if (gameStartStatus.value === 'error') {
            gameStartStatus.value = 'loading';
            gameStartErrorEventId.value = null;
            if (game.bangumiId === null) {
                throw new Error('Cannot retry preparation without a valid project id');
            }
            startGameRequest(game.bangumiId);
        }

        if (pointsStatus.value === 'error') {
            pointsStatus.value = 'loading';
            pointsErrorEventId.value = null;
            const bangumi = game.bangumi;
            if (!bangumi) {
                throw new Error('Cannot retry preparation without a selected bangumi');
            }
            loadPoints(bangumi.id, bangumi.points_api_url);
        }
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

        invalidateRequests();
        gradeUploadStatus.value = 'idle';
        gradeUploadErrorEventId.value = null;
        scorePercentile.value = null;
        rank.value = null;
        preparationCredentials.value = null;
        mapStore.clearMarkers();
        mapStore.stopAnimationAndJump(reverseCoordinate(bangumi.geo), bangumi.zoom);
        clearCompletedPointProgress(game);
        game.resetResult();
        pointsStatus.value = 'ready';
        pointsErrorEventId.value = null;
        gameStartStatus.value = 'loading';
        gameStartErrorEventId.value = null;
        phase.value = { kind: 'COUNTDOWN', countdownElapsed: false };
        startGameRequest(bangumi.id);
    };

    const reset = (): void => {
        invalidateRequests();
        resetTransientState();
        preparationCredentials.value = null;
        mapStore.reset();
        game.reset();
        phase.value = { kind: 'WELCOME' };
    };

    const uploadGrade = (turnstileToken: string): Promise<void> => {
        requirePhase('RESULTS');
        if (gradeUploadStatus.value === 'loading') {
            return uploadPromise ?? Promise.resolve();
        }
        if (!canUploadGrade.value) {
            throw new Error('Cannot upload grade during the current game state');
        }

        const bangumi = game.bangumi;
        const statistics = game.statistics;
        if (!bangumi || !statistics) {
            throw new Error('Cannot upload grade without a finished game');
        }
        const credentials = preparationCredentials.value;
        if (!credentials) {
            throw new Error('Cannot upload grade without start credentials');
        }

        const requestEpoch = ++uploadEpoch;
        gradeUploadStatus.value = 'loading';
        gradeUploadErrorEventId.value = null;

        uploadPromise = submitGrade({
            start_time: credentials.startTime,
            start_key: credentials.startKey,
            id: bangumi.id,
            point_num: game.completedPoints().length,
            score: statistics.point,
            turnstile_token: turnstileToken
        }).then((result: GradeUploadResult) => {
            if (requestEpoch !== uploadEpoch) return;
            gradeUploadStatus.value = 'ready';
            scorePercentile.value = result.score_percentile;
            rank.value = result.rank;
        }).catch(error => {
            if (requestEpoch !== uploadEpoch) return;
            reportAndMaybeClearAuthentication(error);
            const normalizedError = toError(error);
            gradeUploadErrorEventId.value = reportException(normalizedError) ?? null;
            gradeUploadStatus.value = 'error';
            throw error;
        }).finally(() => {
            if (requestEpoch === uploadEpoch) {
                uploadPromise = null;
            }
        });

        return uploadPromise;
    };

    return {
        phase,
        game,
        catalog,
        catalogStatus,
        catalogErrorEventId,
        gameStartStatus,
        gameStartErrorEventId,
        pointsStatus,
        pointsErrorEventId,
        gradeUploadStatus,
        gradeUploadErrorEventId,
        scorePercentile,
        rank,
        canUploadGrade,
        presentation,
        initialize,
        startSinglePlayerGame,
        goRank,
        goAuth,
        authAccepted,
        back,
        selectBangumi,
        countdownElapsed,
        retryPreparation,
        retryPointLoading: retryPreparation,
        nextPoint,
        submitAnswer,
        gameOver,
        retry,
        reset,
        uploadGrade,
    };
});
