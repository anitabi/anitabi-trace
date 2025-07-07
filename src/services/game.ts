// import { ArcBetweenPoints } from "../helpers/canvas";
import { getDefaultBangumi } from "../apis/bangumi";
import type { DefaultBangumi, PointDetail } from "../apis/bangumi";
import { api, ApiClient } from "../apis/api";
import { useMapStore } from "../stores/map";
import type { MapStore } from '../stores/map';
import { useViewStore } from "../stores/view";
import type { ViewStore } from '../stores/view';
import { reverseCoordinate } from "../helpers/map";
import { preloadImage } from "../helpers/preload";
let gameInstance: Game | null = null;

/**
 * Initializes the game.
 * 
 * This method should be called after `app.use(pinia)`.
 *
 * @function
 * @returns {void}
 */
export const initializeGame = () => {
    if(gameInstance){
        throw new Error('Game is already initialized');
    }
    const viewStore = useViewStore();
    const mapStore = useMapStore();
    gameInstance = new Game(viewStore, mapStore);
};

export const getGameInstance = () => {
    if(!gameInstance){
        throw new Error('Game is not initialized. Call initializeGame() first.');
    }
    return gameInstance;
};
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
export class Game{
    static readonly GAME_POINT_WAIT_MS = 2000;
    static readonly GAME_TIME_SECONDS = 1200;
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
    points: PointDetail[] = [];
    viewStore: ViewStore;
    mapStore: MapStore;
    currentIndex: number = 0;
    mode: GameMode = "SINGLE";
    point: number = 0;
    state: GameState;
    constructor(viewStore: ViewStore, mapStore: MapStore){
        this.viewStore = viewStore
        this.mapStore = mapStore;
        this.state = new GameStateIdle(this);
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
        const url = this.bangumiData.find(b => b.id === id)?.points_api_url;
        if (url) ApiClient.prefetch<PointDetail[]>(api.get(url, { noBaseUrl: true }), (data, error) => {
            if(error){
                console.error(`Failed to prefetch bangumi detail for id ${id}:`, error);
            }else{
                this.points = data!;
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
                    distance: distance < 1 ? `${(distance * 1000).toFixed(0)} 米` : `${distance.toFixed(1)} 公里` 
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
        return { type: 'update', ... judgement }
    }
}

class GameState{
    game: Game;
    constructor(game: Game){
        this.game = game;
    }
    init(_mode: GameMode) {
        throw new Error('Method "start" must be implemented in derived class');
    }
    select(_bangumiId: string) {
        throw new Error('Method "select" must be implemented in derived class');
    }
    back() {
        throw new Error('Method "start" must be implemented in derived class');
    }
    start() {
        throw new Error('Method "showGame" must be implemented in derived class');
    }
    gameOver() {
        throw new Error('Method "gameOver" must be implemented in derived class');
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
        this.game.viewStore.changeView('GAME');
        this.game.setState(new GameStateWorking(this.game));
    }
}
export class GameStateWorking extends GameState{
    constructor(game: Game){
        super(game);
        this.game.mapStore.enableGameInteraction();
    }
    gameOver() {
        console.debug('Game over');
        this.game.mapStore.disableGameInteraction();
    }
}