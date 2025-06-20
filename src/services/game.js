// import { ArcBetweenPoints } from "../helpers/canvas";
import { useMapStore } from "../stores/map";
import { useViewStore, VIEW_STATUS } from "../stores/view";

let gameInstance = null;


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

export class Game{
    static MODE = {
        SINGLE: Symbol('SINGLE'),
        MULTI: Symbol('MULTI')
    }
    constructor(viewStore, mapStore){
        this.viewStore = viewStore;
        this.mapStore = mapStore;
        this.state = new GameStateIdle(this);
        this.mode = null;
    }
    setState(newState) {
        if(!(newState instanceof GameState)) {
            throw new Error('Invalid game state');
        }
        this.state = newState;
    }
    showNextPoint() {

    }

    submitAnswer() {
        if(!this.state instanceof GameStateWorking) {
            throw new Error('Cannot submit answer in current game state');
        }
    }
}

class GameState{
    constructor(game){
        this.game = game;
    }
    start(mode) {
        throw new Error('Method "start" must be implemented in derived class');
    }
    showGame() {
        throw new Error('Method "showGame" must be implemented in derived class');
    }
}
export class GameStateIdle extends GameState{
    constructor(game){
        super(game);
    }
    start(mode) {
        if(!Object.values(Game.MODE).includes(mode)) {
            throw new Error('Invalid game mode');
        }   
        this.game.mode = mode;
        this.game.viewStore.changeView(VIEW_STATUS.COUNTER);
        this.game.mapStore.stopAnimationAndJump();
        this.game.setState(new GameStateTMinus(this.game));
    }
}

export class GameStateTMinus extends GameState{
    constructor(game){
        super(game);
    }
    showGame(){
        this.game.viewStore.changeView(VIEW_STATUS.GAME);
        this.game.mapStore.enableInteraction();
        this.game.setState(new GameStateWorking(this.game));
    }
}
export class GameStateWorking extends GameState{
    constructor(game){
        super(game);
    }
}