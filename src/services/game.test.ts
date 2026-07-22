import { describe, expect, it } from 'vitest';

import { Game, type GamePoint } from './game';

const point = (id: string): GamePoint => ({
    id,
    // name: `point-${id}`,
    image: `${id}.jpg`,
    // ep: null,
    // s: null,
    geo: [35, 139],
    // origin: null,
    // originURL: null
});

describe('Game scoring', () => {
    it.each([
        { distance: 10.1, pointDelta: undefined, timeDelta: -3, message: '扣 3 秒' },
        { distance: 5, pointDelta: 10, timeDelta: undefined, message: '5.0km' },
        { distance: 0.5, pointDelta: 17, timeDelta: 2, message: '500m' },
        { distance: 0.1, pointDelta: 24, timeDelta: 3, message: '100m' }
    ])('judges a representative distance of $distance km', ({ distance, pointDelta, timeDelta, message }) => {
        const judgement = new Game().judgeDistance(distance);

        expect(judgement.point_delta).toBe(pointDelta);
        expect(judgement.time_delta).toBe(timeDelta);
        expect(judgement.message).toContain(message);
    });

    it('accumulates answered-point results and completes statistics', () => {
        const game = new Game();
        game.setPoints([point('first'), point('last')]);

        expect(game.submitAnswer(0.05).point_delta).toBe(24);
        expect(game.nextPoint()).toEqual({ type: 'updatePoint', image: 'last.jpg' });
        expect(game.submitAnswer(2).point_delta).toBe(10);

        expect(game.point).toBe(34);
        expect(game.completedPoints()).toEqual([
            expect.objectContaining({ id: 'first', extend: { distance: 0.05, point_delta: 24 } }),
            expect.objectContaining({ id: 'last', extend: { distance: 2, point_delta: 10 } })
        ]);
        expect(game.complete(41)).toEqual({ duration: 41, point: 34 });
        expect(game.statistics).toEqual({ duration: 41, point: 34 });
    });

    it('resets run results while preserving the selected game and loaded point answers', () => {
        const game = new Game();
        game.selectBangumi({
            id: 101,
            name: 'Show',
            cover: 'cover.jpg',
            color: '#fff',
            points_api_url: '/points',
            geo: [35, 139],
            zoom: 12
        });
        game.setPoints([point('first'), point('last')]);
        game.submitAnswer(0.05);
        game.nextPoint();
        game.complete(12);

        game.resetResult();

        expect(game.point).toBe(0);
        expect(game.currentIndex).toBe(0);
        expect(game.statistics).toBeUndefined();
        expect(game.bangumiId).toBe(101);
        expect(game.points).toHaveLength(2);
        expect(game.completedPoints()).toHaveLength(1);
    });
});

describe('Game current-point progression', () => {
    it('starts on index zero, increments before exposing the next point, and finishes on the last point', () => {
        const game = new Game();
        game.setPoints([point('first'), point('middle'), point('last')]);

        expect(game.currentIndex).toBe(0);
        expect(game.currentPoint()?.id).toBe('first');

        expect(game.nextPoint()).toEqual({ type: 'updatePoint', image: 'middle.jpg' });
        expect(game.currentIndex).toBe(1);
        expect(game.currentPoint()?.id).toBe('middle');

        expect(game.nextPoint()).toEqual({ type: 'updatePoint', image: 'last.jpg' });
        expect(game.currentIndex).toBe(2);
        expect(game.currentPoint()?.id).toBe('last');

        expect(game.nextPoint()).toEqual({ type: 'finished' });
        expect(game.currentIndex).toBe(2);
        expect(game.currentPoint()?.id).toBe('last');
    });
});
