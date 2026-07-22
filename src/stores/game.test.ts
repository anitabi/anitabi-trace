import { createPinia, setActivePinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
    const mapStore = {
        stopAnimationAndJump: vi.fn(),
        enableGameInteraction: vi.fn(),
        clearDraw: vi.fn(),
        disableGameInteraction: vi.fn(),
        addPoints: vi.fn(),
        drawConnectionAndPoints: vi.fn(),
        showPointsAsMarkerWithText: vi.fn(),
        clearMarkers: vi.fn(),
        reset: vi.fn()
    };
    const userStore = { nickname: null as string | null, clearNickname: vi.fn() };

    return {
        apiGet: vi.fn(),
        getDefaultBangumi: vi.fn(),
        startGame: vi.fn(),
        uploadGrade: vi.fn(),
        clearAuthentication: vi.fn(),
        preloadImage: vi.fn(),
        reportException: vi.fn(),
        mapStore,
        userStore
    };
});

vi.mock('../apis/api', () => ({
    api: { get: mocks.apiGet },
    HTTPError: class HTTPError extends Error {
        status: number;
        data: unknown;

        constructor(status: number, message: string, data?: unknown) {
            super(message);
            this.status = status;
            this.data = data;
        }
    }
}));
vi.mock('../apis/bangumi', () => ({
    getDefaultBangumi: mocks.getDefaultBangumi
}));
vi.mock('../apis/auth', () => ({
    clearAuthentication: mocks.clearAuthentication
}));
vi.mock('../apis/game', () => ({
    startGame: mocks.startGame,
    uploadGrade: mocks.uploadGrade
}));
vi.mock('../helpers/preload', () => ({
    preloadImage: mocks.preloadImage
}));
vi.mock('../services/sentry', () => ({
    reportException: mocks.reportException
}));
vi.mock('./map', () => ({
    useMapStore: () => mocks.mapStore
}));
vi.mock('./user', () => ({
    useUserStore: () => mocks.userStore
}));

import type { DefaultBangumi, PointDetail } from '../apis/bangumi';
import { useGameStore } from './game';

const BANGUMI_A: DefaultBangumi = {
    id: 101,
    name: 'Show A',
    cover: 'cover-a.jpg',
    color: '#111',
    points_api_url: '/points-a',
    geo: [35, 139],
    zoom: 12
};

const BANGUMI_B: DefaultBangumi = {
    id: 102,
    name: 'Show B',
    cover: 'cover-b.jpg',
    color: '#222',
    points_api_url: '/points-b',
    geo: [36, 140],
    zoom: 13
};

const gamePoint = (id: string): PointDetail => ({
    id,
    // name: `point-${id}`,
    image: `${id}.jpg`,
    // ep: null,
    // s: null,
    geo: [35.5, 139.5],
    // origin: null,
    // originURL: null
});

const deferred = <T>() => {
    let resolve!: (value: T) => void;
    let reject!: (reason?: unknown) => void;
    const promise = new Promise<T>((promiseResolve, promiseReject) => {
        resolve = promiseResolve;
        reject = promiseReject;
    });
    return { promise, resolve, reject };
};

const settleAsyncActions = async (): Promise<void> => {
    await Promise.resolve();
    await Promise.resolve();
};

const storeWithCatalog = async () => {
    const store = useGameStore();
    await store.initialize();
    return store;
};

beforeEach(() => {
    setActivePinia(createPinia());
    vi.resetAllMocks();
    mocks.userStore.nickname = null;
    mocks.getDefaultBangumi.mockResolvedValue([BANGUMI_A, BANGUMI_B]);
    mocks.startGame.mockResolvedValue({ start_time: 1_000, start_key: 'start-key' });
    mocks.uploadGrade.mockResolvedValue({ message: 'Ok', score_percentile: '75%', rank: '42' });
    mocks.reportException.mockReturnValue('event-id');
});

afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
});

describe('game flow transitions', () => {
    it('projects one phase into presentation and validates authentication before leaving AUTH', () => {
        const store = useGameStore();

        expect(store.phase).toEqual({ kind: 'WELCOME' });
        expect(store.presentation).toEqual({ screen: 'WELCOME', overlay: 'FULL' });

        store.startSinglePlayerGame();
        expect(store.phase).toEqual({ kind: 'AUTH' });
        expect(store.presentation).toEqual({ screen: 'AUTH', overlay: 'FULL' });

        expect(() => store.authAccepted()).toThrow('without a nickname');
        expect(store.phase).toEqual({ kind: 'AUTH' });
        expect(store.presentation).toEqual({ screen: 'AUTH', overlay: 'FULL' });

        mocks.userStore.nickname = 'player';
        store.authAccepted();
        expect(store.phase).toEqual({ kind: 'SELECTING' });
        expect(store.presentation).toEqual({ screen: 'BANGUMI_SELECTION', overlay: 'FULL' });

        store.back();
        expect(store.phase).toEqual({ kind: 'WELCOME' });
        expect(store.presentation).toEqual({ screen: 'WELCOME', overlay: 'FULL' });
    });

    it('preloads only the first catalog row', async () => {
        const catalog = Array.from({ length: 5 }, (_, index) => ({
            ...BANGUMI_A,
            id: `show-${index}`,
            cover: `cover-${index}.jpg`
        }));
        mocks.getDefaultBangumi.mockResolvedValue(catalog);

        await storeWithCatalog();

        expect(mocks.preloadImage.mock.calls).toEqual([
            ['cover-0.jpg'],
            ['cover-1.jpg'],
            ['cover-2.jpg'],
            ['cover-3.jpg']
        ]);
    });

    it('returns from rank without retaining a second navigation state', () => {
        const store = useGameStore();

        store.goRank();
        expect(store.phase).toEqual({ kind: 'RANK' });
        expect(store.presentation).toEqual({ screen: 'RANK', overlay: 'FULL' });

        store.back();
        expect(store.phase).toEqual({ kind: 'WELCOME' });
        expect(store.presentation).toEqual({ screen: 'WELCOME', overlay: 'FULL' });
    });

    it('rejects an unknown show without leaving a partial countdown state', async () => {
        mocks.userStore.nickname = 'player';
        const store = await storeWithCatalog();
        store.startSinglePlayerGame();

        expect(() => store.selectBangumi(999)).toThrow('not found');

        expect(store.phase).toEqual({ kind: 'SELECTING' });
        expect(store.presentation).toEqual({ screen: 'BANGUMI_SELECTION', overlay: 'FULL' });
        expect(store.game.bangumi).toBeNull();
        expect(store.pointsStatus).toBe('idle');
        expect(mocks.mapStore.stopAnimationAndJump).not.toHaveBeenCalled();
        expect(mocks.apiGet).not.toHaveBeenCalled();
    });
});

describe('request error reporting', () => {
    it('reports a normalized catalog failure and stores its event ID', async () => {
        mocks.getDefaultBangumi.mockRejectedValue('catalog unavailable');
        const store = useGameStore();

        await store.initialize();

        expect(mocks.reportException).toHaveBeenCalledTimes(1);
        const reportedError = mocks.reportException.mock.calls[0][0] as Error;
        expect(reportedError).toBeInstanceOf(Error);
        expect(reportedError.message).toBe('catalog unavailable');
        expect(store.catalogStatus).toBe('error');
        expect(store.catalogErrorEventId).toBe('event-id');
    });

    it('reports the current point failure, clears its ID, and retries', async () => {
        const failedRequest = deferred<PointDetail[]>();
        mocks.apiGet
            .mockReturnValueOnce(failedRequest.promise)
            .mockResolvedValueOnce([gamePoint('retry')]);
        mocks.userStore.nickname = 'player';
        const store = await storeWithCatalog();
        store.startSinglePlayerGame();
        store.selectBangumi(BANGUMI_A.id);

        const failure = new Error('points unavailable');
        failedRequest.reject(failure);
        await settleAsyncActions();

        expect(mocks.reportException).toHaveBeenCalledWith(failure);
        expect(store.pointsStatus).toBe('error');
        expect(store.pointsErrorEventId).toBe('event-id');

        store.retryPointLoading();
        expect(store.pointsStatus).toBe('loading');
        expect(store.pointsErrorEventId).toBeNull();
        await settleAsyncActions();

        expect(store.pointsStatus).toBe('ready');
        expect(store.game.points.map(point => point.id)).toEqual(['retry']);
        expect(mocks.reportException).toHaveBeenCalledTimes(1);
    });

    it('drops a stale point failure before reporting and preserves the current event ID', async () => {
        const staleRequest = deferred<PointDetail[]>();
        const currentRequest = deferred<PointDetail[]>();
        mocks.apiGet
            .mockReturnValueOnce(staleRequest.promise)
            .mockReturnValueOnce(currentRequest.promise);
        mocks.userStore.nickname = 'player';
        const store = await storeWithCatalog();

        store.startSinglePlayerGame();
        store.selectBangumi(BANGUMI_A.id);
        store.reset();
        store.startSinglePlayerGame();
        store.selectBangumi(BANGUMI_B.id);

        currentRequest.reject(new Error('current failure'));
        await settleAsyncActions();
        expect(store.pointsErrorEventId).toBe('event-id');
        expect(mocks.reportException).toHaveBeenCalledTimes(1);

        staleRequest.reject(new Error('stale failure'));
        await settleAsyncActions();

        expect(mocks.reportException).toHaveBeenCalledTimes(1);
        expect(store.pointsErrorEventId).toBe('event-id');
        expect(store.pointsStatus).toBe('error');
    });

    it('stores null when reporting produces no event ID', async () => {
        mocks.reportException.mockReturnValueOnce(undefined);
        mocks.getDefaultBangumi.mockRejectedValueOnce(new Error('catalog unavailable'));
        const store = useGameStore();

        await store.initialize();

        expect(mocks.reportException).toHaveBeenCalledTimes(1);
        expect(store.catalogStatus).toBe('error');
        expect(store.catalogErrorEventId).toBeNull();
    });
});

describe('point loading gates and epochs', () => {
    it.each(['countdown first', 'points first'] as const)(
        'enters PLAYING only after both gates are ready: %s',
        async order => {
            const request = deferred<PointDetail[]>();
            mocks.apiGet.mockReturnValue(request.promise);
            mocks.userStore.nickname = 'player';
            const store = await storeWithCatalog();
            store.startSinglePlayerGame();
            store.selectBangumi(BANGUMI_A.id);

            expect(store.phase).toEqual({ kind: 'COUNTDOWN', countdownElapsed: false });
            expect(store.presentation).toEqual({ screen: 'COUNTER', overlay: 'FULL' });
            expect(store.pointsStatus).toBe('loading');

            if (order === 'countdown first') {
                store.countdownElapsed();
                expect(store.phase).toEqual({ kind: 'COUNTDOWN', countdownElapsed: true });
                expect(mocks.mapStore.enableGameInteraction).not.toHaveBeenCalled();

                request.resolve([gamePoint('ready')]);
                await settleAsyncActions();
            } else {
                request.resolve([gamePoint('ready')]);
                await settleAsyncActions();
                expect(store.pointsStatus).toBe('ready');
                expect(store.phase).toEqual({ kind: 'COUNTDOWN', countdownElapsed: false });
                expect(mocks.mapStore.enableGameInteraction).not.toHaveBeenCalled();

                store.countdownElapsed();
            }

            expect(store.phase).toEqual({ kind: 'PLAYING' });
            expect(store.presentation).toEqual({ screen: 'GAME', overlay: 'HEAD_ONLY' });
            expect(mocks.mapStore.enableGameInteraction).toHaveBeenCalledTimes(1);
        }
    );

    it('starts with the first loaded point before advancing to the second', async () => {
        mocks.apiGet.mockResolvedValue([gamePoint('first'), gamePoint('second')]);
        mocks.mapStore.drawConnectionAndPoints.mockReturnValue(1);
        mocks.userStore.nickname = 'player';
        const store = await storeWithCatalog();

        store.startSinglePlayerGame();
        store.selectBangumi(BANGUMI_A.id);
        await settleAsyncActions();
        store.countdownElapsed();

        expect(store.beginPointSequence()).toEqual({ type: 'updatePoint', image: 'first.jpg' });
        expect(store.game.currentIndex).toBe(0);
        store.submitAnswer();

        expect(store.nextPoint()).toEqual({ type: 'updatePoint', image: 'second.jpg' });
        expect(store.game.currentIndex).toBe(1);
        store.submitAnswer();

        expect(store.nextPoint()).toEqual({ type: 'finished' });
        expect(store.game.completedPoints().map(point => point.id)).toEqual(['first', 'second']);
    });

    it('ignores a slow point response from an invalidated epoch', async () => {
        const staleRequest = deferred<PointDetail[]>();
        const currentRequest = deferred<PointDetail[]>();
        mocks.apiGet
            .mockReturnValueOnce(staleRequest.promise)
            .mockReturnValueOnce(currentRequest.promise);
        mocks.userStore.nickname = 'player';
        const store = await storeWithCatalog();
        mocks.preloadImage.mockClear();

        store.startSinglePlayerGame();
        store.selectBangumi(BANGUMI_A.id);
        store.reset();
        store.startSinglePlayerGame();
        store.selectBangumi(BANGUMI_B.id);

        currentRequest.resolve([gamePoint('current')]);
        await settleAsyncActions();
        expect(store.pointsStatus).toBe('ready');
        expect(store.game.points.map(point => point.id)).toEqual(['current']);

        staleRequest.resolve([gamePoint('stale')]);
        await settleAsyncActions();

        expect(store.pointsStatus).toBe('ready');
        expect(store.game.bangumiId).toBe(BANGUMI_B.id);
        expect(store.game.points.map(point => point.id)).toEqual(['current']);
        expect(mocks.preloadImage).not.toHaveBeenCalledWith('stale.jpg');
    });
});

describe('finishing transition', () => {
    it('delays RESULTS and publishes completed markers exactly once', async () => {
        vi.useFakeTimers();
        mocks.apiGet.mockResolvedValue([gamePoint('answer')]);
        mocks.userStore.nickname = 'player';
        const store = await storeWithCatalog();
        store.startSinglePlayerGame();
        store.selectBangumi(BANGUMI_A.id);
        await settleAsyncActions();
        store.countdownElapsed();

        store.gameOver(25);
        expect(store.phase).toEqual({ kind: 'FINISHING' });
        expect(store.presentation).toEqual({ screen: 'GAME', overlay: 'OREO' });
        expect(store.game.statistics).toEqual({ duration: 25, point: 0 });

        vi.advanceTimersByTime(999);
        expect(store.phase).toEqual({ kind: 'FINISHING' });
        expect(mocks.mapStore.showPointsAsMarkerWithText).not.toHaveBeenCalled();

        vi.advanceTimersByTime(1);
        expect(store.phase).toEqual({ kind: 'RESULTS' });
        expect(store.presentation).toEqual({ screen: 'STATISTICS', overlay: 'OREO' });
        expect(mocks.mapStore.showPointsAsMarkerWithText).toHaveBeenCalledTimes(1);

        vi.advanceTimersByTime(10_000);
        expect(store.phase).toEqual({ kind: 'RESULTS' });
        expect(mocks.mapStore.showPointsAsMarkerWithText).toHaveBeenCalledTimes(1);
    });
});

describe('game start and grade upload', () => {
    it('waits for the signed game start after countdown and points are ready', async () => {
        const startRequest = deferred<{ start_time: number; start_key: string }>();
        mocks.startGame.mockReturnValue(startRequest.promise);
        mocks.apiGet.mockResolvedValue([gamePoint('first'), gamePoint('second')]);
        mocks.userStore.nickname = 'player';
        const store = await storeWithCatalog();

        store.startSinglePlayerGame();
        store.selectBangumi(BANGUMI_A.id);
        await settleAsyncActions();
        store.countdownElapsed();

        expect(mocks.startGame).toHaveBeenCalledWith(BANGUMI_A.id);
        expect(store.pointsStatus).toBe('ready');
        expect(store.gameStartStatus).toBe('loading');
        expect(store.phase).toEqual({ kind: 'COUNTDOWN', countdownElapsed: true });
        expect(mocks.mapStore.enableGameInteraction).not.toHaveBeenCalled();

        startRequest.resolve({ start_time: 2_000, start_key: 'signed-start' });
        await settleAsyncActions();

        expect(store.gameStartStatus).toBe('ready');
        expect(store.phase).toEqual({ kind: 'PLAYING' });
        expect(mocks.mapStore.enableGameInteraction).toHaveBeenCalledOnce();
    });

    it('retries a failed game start with a new request', async () => {
        mocks.startGame
            .mockRejectedValueOnce(new Error('start unavailable'))
            .mockResolvedValueOnce({ start_time: 3_000, start_key: 'retry-start' });
        mocks.apiGet.mockResolvedValue([gamePoint('first'), gamePoint('second')]);
        mocks.userStore.nickname = 'player';
        const store = await storeWithCatalog();

        store.startSinglePlayerGame();
        store.selectBangumi(BANGUMI_A.id);
        await settleAsyncActions();

        expect(store.gameStartStatus).toBe('error');
        expect(store.gameStartErrorEventId).toBe('event-id');

        store.retryPreparation();
        expect(store.gameStartStatus).toBe('loading');
        expect(store.gameStartErrorEventId).toBeNull();
        await settleAsyncActions();

        expect(mocks.startGame).toHaveBeenCalledTimes(2);
        expect(store.gameStartStatus).toBe('ready');
    });

    it('uploads one finished grade with signed credentials and publishes its percentile', async () => {
        vi.useFakeTimers();
        const uploadRequest = deferred<{ message: string; score_percentile: string; rank: string }>();
        mocks.startGame.mockResolvedValue({ start_time: 4_000, start_key: 'upload-start' });
        mocks.uploadGrade.mockReturnValue(uploadRequest.promise);
        mocks.apiGet.mockResolvedValue([gamePoint('first'), gamePoint('second')]);
        mocks.mapStore.drawConnectionAndPoints.mockReturnValue(2);
        mocks.userStore.nickname = 'player';
        const store = await storeWithCatalog();

        store.startSinglePlayerGame();
        store.selectBangumi(BANGUMI_A.id);
        await settleAsyncActions();
        store.countdownElapsed();
        store.nextPoint();
        store.submitAnswer();
        store.gameOver(20);
        vi.advanceTimersByTime(1_000);

        expect(store.phase).toEqual({ kind: 'RESULTS' });
        expect(store.canUploadGrade).toBe(true);

        const firstUpload = store.uploadGrade('turnstile-token');
        const duplicateUpload = store.uploadGrade('ignored-token');

        expect(mocks.uploadGrade).toHaveBeenCalledOnce();
        expect(mocks.uploadGrade).toHaveBeenCalledWith({
            start_time: 4_000,
            start_key: 'upload-start',
            id: BANGUMI_A.id,
            point_num: 1,
            score: 10,
            turnstile_token: 'turnstile-token'
        });

        uploadRequest.resolve({ message: 'Ok', score_percentile: '12%', rank: '88' });
        await Promise.all([firstUpload, duplicateUpload]);

        expect(store.gradeUploadStatus).toBe('ready');
        expect(store.scorePercentile).toBe('12%');
        expect(store.rank).toBe('88');
        expect(store.canUploadGrade).toBe(false);
    });

    it('reports an upload failure and permits a fresh Turnstile retry', async () => {
        vi.useFakeTimers();
        mocks.startGame.mockResolvedValue({ start_time: 5_000, start_key: 'retry-upload-start' });
        mocks.uploadGrade
            .mockRejectedValueOnce(new Error('upload unavailable'))
            .mockResolvedValueOnce({ message: 'Ok', score_percentile: '100%', rank: '1' });
        mocks.apiGet.mockResolvedValue([gamePoint('first'), gamePoint('second')]);
        mocks.mapStore.drawConnectionAndPoints.mockReturnValue(2);
        mocks.userStore.nickname = 'player';
        const store = await storeWithCatalog();

        store.startSinglePlayerGame();
        store.selectBangumi(BANGUMI_A.id);
        await settleAsyncActions();
        store.countdownElapsed();
        store.nextPoint();
        store.submitAnswer();
        store.gameOver(20);
        vi.advanceTimersByTime(1_000);

        await expect(store.uploadGrade('failed-token')).rejects.toThrow('upload unavailable');
        expect(store.gradeUploadStatus).toBe('error');
        expect(store.gradeUploadErrorEventId).toBe('event-id');
        expect(store.canUploadGrade).toBe(true);

        await expect(store.uploadGrade('retry-token')).resolves.toBeUndefined();
        expect(mocks.uploadGrade).toHaveBeenCalledTimes(2);
        expect(store.gradeUploadStatus).toBe('ready');
        expect(store.scorePercentile).toBe('100%');
        expect(store.rank).toBe('1');
    });
});
