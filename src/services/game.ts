export type UpdateGameData = {
    type: 'update';
    leftSeconds?: number;
    point_delta?: number;
    time_delta?: number;
    message: string;
};

export type UpdatePointData = {
    type: 'updatePoint';
    image: string;
};

export type Finished = {
    type: 'finished';
};

export const GAME_MODE = {
    SINGLE: Symbol('SINGLE'),
    MULTI: Symbol('MULTI')
};

export type GameMode = keyof typeof GAME_MODE;

export interface GameBangumi {
    id: string;
    name: string | null;
    cover: string;
    color: string | 0;
    points_api_url: string;
    geo: [number, number];
    zoom: number;
}

export interface GamePoint {
    id: string;
    name: string;
    image?: string;
    ep: string | null;
    s: number | null;
    geo: [number, number];
    origin: string | null;
    originURL: string | null;
}

export interface PointResult {
    distance: number;
    point_delta: number;
}

export interface PointExtended extends GamePoint {
    extend?: PointResult;
}

export interface GameStatistics {
    duration: number;
    point: number;
}

const numberDistanceToString = (distance: number): string => {
    if (distance < 1) return `${(distance * 1000).toFixed(0)}m`;
    return `${distance.toFixed(1)}km`;
};

type MessageGenerator = (data: { t: number; s: number; distance: string }) => string;
type RewardAndPunishment = {
    time_delta?: number;
    point_delta?: number;
    message: MessageGenerator;
};

type Judgement = Omit<RewardAndPunishment, 'message'> & {
    message: string;
};

export class Game {
    static readonly GAME_POINT_WAIT_MS = 2000;
    static readonly GAME_TIME_SECONDS = 25;
    static readonly REWARD_AND_PUNISHMENT: Record<
        'TIME_DEDUCTION' | 'POINT_ADDITION' | 'POINT_ADDITION_TIME_ADDITION' | 'POINT_ADDITION_TIME_ADDITION_PLUS',
        RewardAndPunishment
    > = {
        TIME_DEDUCTION: { time_delta: -3, message: ({ t }) => `超过十公里！扣 ${Math.abs(t)} 秒` },
        POINT_ADDITION: { point_delta: 10, message: ({ s, distance }) => `${distance}！加 ${s} 分` },
        POINT_ADDITION_TIME_ADDITION: {
            time_delta: 2,
            point_delta: 17,
            message: ({ t, s, distance }) => `${distance}！加 ${s} 分，额外加 ${t} 秒`
        },
        POINT_ADDITION_TIME_ADDITION_PLUS: {
            time_delta: 3,
            point_delta: 24,
            message: ({ distance }) => `${distance}！简直是巡礼的神`
        }
    };

    bangumiId: string | null = null;
    points: PointExtended[] = [];
    currentIndex = 0;
    mode: GameMode = 'SINGLE';
    point = 0;
    bangumi: GameBangumi | null = null;
    statistics?: GameStatistics;

    start(mode: GameMode): void {
        this.mode = mode;
    }

    selectBangumi(bangumi: GameBangumi): void {
        this.bangumiId = bangumi.id;
        this.bangumi = bangumi;
    }

    setPoints(points: GamePoint[]): void {
        this.points = points.map(point => ({ ...point }));
    }

    currentPoint(): PointExtended | undefined {
        return this.points[this.currentIndex];
    }

    nextPoint(): Finished | UpdatePointData {
        if (this.currentIndex >= this.points.length - 1) {
            return { type: 'finished' };
        }
        this.currentIndex++;
        return {
            type: 'updatePoint',
            image: this.points[this.currentIndex].image || ''
        };
    }

    judgeDistance(distance: number): Judgement {
        let judgement: RewardAndPunishment;
        if (distance > 10) judgement = Game.REWARD_AND_PUNISHMENT.TIME_DEDUCTION;
        else if (distance > 1) judgement = Game.REWARD_AND_PUNISHMENT.POINT_ADDITION;
        else if (distance > 0.1) judgement = Game.REWARD_AND_PUNISHMENT.POINT_ADDITION_TIME_ADDITION;
        else judgement = Game.REWARD_AND_PUNISHMENT.POINT_ADDITION_TIME_ADDITION_PLUS;

        return {
            ...judgement,
            message: judgement.message({
                t: judgement.time_delta || 0,
                s: judgement.point_delta || 0,
                distance: numberDistanceToString(distance)
            })
        };
    }

    submitAnswer(distance: number): UpdateGameData {
        const currentPoint = this.currentPoint();
        if (!currentPoint) {
            throw new Error('Cannot submit an answer without a current point');
        }
        const judgement = this.judgeDistance(distance);
        if (judgement.point_delta) this.point += judgement.point_delta;
        currentPoint.extend = {
            distance,
            point_delta: judgement.point_delta || 0
        };
        return { type: 'update', ...judgement };
    }

    complete(duration: number): GameStatistics {
        this.statistics = {
            duration,
            point: this.point
        };
        return this.statistics;
    }

    completedPoints(): Array<PointExtended & { extend: PointResult }> {
        return this.points.filter(
            (point): point is PointExtended & { extend: PointResult } => point.extend !== undefined
        );
    }

    resetResult(): void {
        this.point = 0;
        this.currentIndex = 0;
        this.statistics = undefined;
    }

    reset(): void {
        this.bangumiId = null;
        this.points = [];
        this.currentIndex = 0;
        this.point = 0;
        this.bangumi = null;
        this.statistics = undefined;
    }
}
