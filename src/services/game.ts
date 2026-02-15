// import { ArcBetweenPoints } from "../helpers/canvas";
import { getDefaultBangumi } from "../apis/bangumi";
import type { DefaultBangumi, PointDetail } from "../apis/bangumi";
import { api, ApiClient } from "../apis/api";
import type { MapStore } from '../stores/map';
import type { ViewStore } from '../stores/view';
import { numberDistanceToString, reverseCoordinate } from "../helpers/map";
import { preloadImage } from "../helpers/preload";
interface GameWindow extends Window {
    cheating?: boolean;
}
type UpdateGameData  = {
    type: 'update';
    leftSeconds?: number;
    point_delta?: number;
    time_delta?: number;
    message: string;
};
export type UpdatePointData = {
    type: 'updatePoint';
    image: string
}
export type Finished = {
    type: 'finished';
}
// type GameSubmitResult = UpdateGameData | Finished;
export const GAME_MODE = {
    SINGLE: Symbol('SINGLE'),
    MULTI: Symbol('MULTI')
};
export type GameMode = keyof typeof GAME_MODE;

type MessageGenerator = (data: {t: number, s: number, distance: string}) => string;
type RewardAndPunishment = {
    time_delta?: number;
    point_delta?: number;
    message: MessageGenerator;
};
interface PointExtended extends PointDetail {
    extend?: {
        distance: number;
        point_delta: number;
    }
}
export class Game{
    static readonly GAME_POINT_WAIT_MS = 2000;
    static readonly GAME_TIME_SECONDS = 5;
    static readonly REWARD_AND_PUNISHMENT: Record<
        'TIME_DEDUCTION' | 'POINT_ADDITION' | 'POINT_ADDITION_TIME_ADDITION' | 'POINT_ADDITION_TIME_ADDITION_PLUS', 
        RewardAndPunishment> = {
        TIME_DEDUCTION: { time_delta: -3, message: ({ t }) => `超过十公里！扣 ${Math.abs(t)} 秒` },
        POINT_ADDITION: { point_delta: 10, message: ({s, distance}) => `${distance}！加 ${s} 分` },
        POINT_ADDITION_TIME_ADDITION: { time_delta: 2, point_delta: 17, 
            message: ({t, s, distance}) => `${distance}！加 ${s} 分，额外加 ${t} 秒` },
        POINT_ADDITION_TIME_ADDITION_PLUS: { time_delta: 3, point_delta: 24,
            message: ({distance}) => `${distance}！简直是巡礼的神` }
    };
    bangumiData: DefaultBangumi[] = [];
    bangumiId: string | null = null;
    points: PointExtended[] = [];
    viewStore: ViewStore;
    mapStore: MapStore;
    currentIndex: number = 0;
    mode: GameMode = "SINGLE";
    point: number = 0;
    state: GameState;
    bangumi: DefaultBangumi | null = null;
    statistics?: {
        duration: number;
        point: number;
    }
    constructor(viewStore: ViewStore, mapStore: MapStore){
        this.viewStore = viewStore
        this.mapStore = mapStore;
        this.state = new GameStateIdle(this);
        this.viewStore.setDeepOverlay('FULL');
    }
    reset() {
        this.bangumiId = null;
        this.points = [];
        this.currentIndex = 0;
        this.point = 0;
        this.bangumi = null;
        this.statistics = undefined;
    }
    resetResult() {
        this.point = 0;
        this.currentIndex = 0;
        this.statistics = undefined;
    }
    setState(newState: GameState) {
        this.state = newState;
    }
    prefetchBangumi(){
        ApiClient.prefetch(getDefaultBangumi(), (data, error) => {
            if(error){
                console.error('Failed to prefetch bangumi:', error);
            }else{
                this.bangumiData = data!;
                data!.forEach(item => item.cover && preloadImage(item.cover)); 
                console.debug('Bangumi data prefetched successfully');
            }
        });
    }
    prefetchBangumiDetail(id: string){
        if(!this.bangumiData) {
            throw new Error('Bangumi data is not loaded yet');
        }
        const url = this.bangumi?.points_api_url;
        if (url) ApiClient.prefetch<PointDetail[]>(api.get(url, { noBaseUrl: true }), (data, error) => {
            if(error){
                console.error(`Failed to prefetch bangumi detail for id ${id}:`, error);
            }else{
                this.points = data!.map(point => ({ distance: 0, point_delta: 0, ...point }));
                this.points.forEach(point => {
                    if(point.image) preloadImage(point.image);
                });
                console.debug(`Bangumi detail for id ${id} prefetched successfully`);
            }
        });
    }
    beforeNextPoint(this: Game & { points: PointDetail[] } ) {
        if(import.meta.env.DEV && (window as GameWindow).cheating){
            this.mapStore.addPoints([ 
                [reverseCoordinate(this.points[this.currentIndex].geo), 'target']
            ]);
        }
    }
    nextPoint(): Finished | UpdatePointData {
        if(!(this.state instanceof GameStateWorking)) {
            throw new Error('Cannot go to next point in current game state');
        }
        if(this.currentIndex >= this.points.length - 1) {
            return { type: 'finished' };
        }
        this.currentIndex++;
        this.mapStore.clearDraw();
        this.beforeNextPoint();
        return { type: 'updatePoint', image: this.points[this.currentIndex].image || '' };

    }
    judgeDistance(distance: number) {
        let s: RewardAndPunishment;
        if(distance > 10) s = Game.REWARD_AND_PUNISHMENT.TIME_DEDUCTION;
        else if(distance > 1) s = Game.REWARD_AND_PUNISHMENT.POINT_ADDITION;
        else if(distance > 0.1) s = Game.REWARD_AND_PUNISHMENT.POINT_ADDITION_TIME_ADDITION;
        else s = Game.REWARD_AND_PUNISHMENT.POINT_ADDITION_TIME_ADDITION_PLUS;

        return Object.assign({}, s, 
            { 
                message: s.message({ 
                    t: s.time_delta || 0, 
                    s: s.point_delta || 0, 
                    distance: numberDistanceToString(distance)
                }) 
            });
    }
    submitAnswer(): UpdateGameData {

        if(!(this.state instanceof GameStateWorking)) {
            throw new Error('Cannot submit answer in current game state');
        }
        const distance = this.mapStore.drawConnectionAndPoints(reverseCoordinate(this.points[this.currentIndex].geo));
        const judgement = this.judgeDistance(distance);
        
        if(judgement.point_delta) this.point += judgement.point_delta;
        this.points[this.currentIndex].extend = {
            distance,
            point_delta: judgement.point_delta || 0
        };
        return { type: 'update', ... judgement }
    }
}

class GameState{
    game: Game;
    constructor(game: Game){
        this.game = game;
    }
    init(_mode: GameMode) {
        throw new Error('Method "init" must be implemented in derived class');
    }
    goRank() {
        throw new Error('Method "goRank" must be implemented in derived class');
    }
    select(_bangumiId: string) {
        throw new Error('Method "select" must be implemented in derived class');
    }
    back() {
        throw new Error('Method "back" must be implemented in derived class');
    }
    start() {
        throw new Error('Method "start" must be implemented in derived class');
    }
    gameOver(_leftSeconds: number) {
        throw new Error('Method "gameOver" must be implemented in derived class');
    }
    retry() {
        throw new Error('Method "retry" must be implemented in derived class');
    }
}
export class GameStateIdle extends GameState{
    constructor(game: Game){
        super(game);
        // User may stop at the idle state for a while, which can be used for loading resources
        this.game.prefetchBangumi();
    }
    init(mode: GameMode) {
        this.game.mode = mode;
        this.game.viewStore.changeView('BANGUMI_SELECTION');
        this.game.setState(new GameStateSelectBangumi(this.game));
    }
    goRank() {
        this.game.viewStore.changeView('RANK');
        this.game.setState(new GameStateRank(this.game));
    }
}
export class GameStateFinish extends GameState{
    constructor(game: Game){
        super(game);
    }
    retry() {
        this.game.viewStore.setDeepOverlay('FULL');
        this.game.mapStore.clearMarkers();
        this.game.viewStore.changeView('COUNTER');
        this.game.resetResult();
        this.game.mapStore.stopAnimationAndJump(reverseCoordinate(this.game.bangumi!.geo), this.game.bangumi!.zoom);
        this.game.setState(new GameStateTMinus(this.game));
    }
}
export class GameStateSelectBangumi extends GameState{
    constructor(game: Game){
        super(game);
    }
    select(bangumiId: string) {
        this.game.bangumiId = bangumiId;
        this.game.viewStore.changeView('COUNTER');
        const currentBangumi = this.game.bangumiData.find(b => b.id === bangumiId);
        if(!currentBangumi) {
            throw new Error(`Bangumi with id ${bangumiId} not found`);
        }
        this.game.bangumi = currentBangumi;
        this.game.mapStore.stopAnimationAndJump(reverseCoordinate(currentBangumi.geo), currentBangumi.zoom);
        this.game.setState(new GameStateTMinus(this.game));
    }

    back() {
        this.game.viewStore.changeView('WELCOME');
        this.game.setState(new GameStateIdle(this.game));
    }
}

export class GameStateTMinus extends GameState{
    constructor(game: Game){
        super(game);
        if(!this.game.bangumiId) {
            throw new Error('Bangumi ID is not set');
        }
        this.game.prefetchBangumiDetail(this.game.bangumiId);
    }
    start(){
        this.game.viewStore.setDeepOverlay('HEAD_ONLY');
        this.game.viewStore.changeView('GAME');
        this.game.setState(new GameStateWorking(this.game));
    }
}
export class GameStateRank extends GameState{
    constructor(game: Game){
        super(game);
    }
    back() {
        this.game.viewStore.changeView('WELCOME');
        this.game.setState(new GameStateIdle(this.game));
    }
}
export class GameStateWorking extends GameState{
    constructor(game: Game){
        super(game);
        this.game.mapStore.enableGameInteraction();
    }
    gameOver(duration: number) {
        console.debug('Game over');
        this.game.statistics = {
            duration: duration,
            point: this.game.point
        };
        this.game.mapStore.clearDraw();
        this.game.mapStore.disableGameInteraction();
        this.game.viewStore.setDeepOverlay('OREO');

        setTimeout(() => {
            this.game.viewStore.changeView('STATISTICS');
            this.game.setState(new GameStateFinish(this.game));
            this.game.mapStore.showPointsAsMarkerWithText(
                this.game.points
                    .filter((p): p is Omit<PointExtended, 'extend'> & { extend: { distance: number, point_delta: number } } => !!p.extend)
                    .map(p => [reverseCoordinate(p.geo), p.extend.distance, p.extend.point_delta]));
            
        }, 1000);
    }
}