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
    const userStore = { nickname: null as string | null };

    return {
        apiGet: vi.fn(),
        getDefaultBangumi: vi.fn(),
        preloadImage: vi.fn(),
        reportException: vi.fn(),
        mapStore,
        userStore
    };
});

vi.mock('../apis/api', () => ({
    api: { get: mocks.apiGet }
}));
vi.mock('../apis/bangumi', () => ({
    getDefaultBangumi: mocks.getDefaultBangumi
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
    id: 'show-a',
    name: 'Show A',
    cover: 'cover-a.jpg',
    color: '#111',
    points_api_url: '/points-a',
    geo: [35, 139],
    zoom: 12
};

const BANGUMI_B: DefaultBangumi = {
    id: 'show-b',
    name: 'Show B',
    cover: 'cover-b.jpg',
    color: '#222',
    points_api_url: '/points-b',
    geo: [36, 140],
    zoom: 13
};

const gamePoint = (id: string): PointDetail => ({
    id,
    name: `point-${id}`,
    image: `${id}.jpg`,
    ep: null,
    s: null,
    geo: [35.5, 139.5],
    origin: null,
    originURL: null
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

        expect(() => store.selectBangumi('missing')).toThrow('not found');

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
