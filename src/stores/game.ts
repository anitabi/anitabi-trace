import { Game } from '../services/game';
import { defineStore } from 'pinia';
import { useViewStore } from './view';
import { useMapStore } from './map';
import { markRaw } from 'vue';
const _initializeNewGame = () => {
    const viewStore = useViewStore();
    const mapStore = useMapStore();
    return markRaw(new Game(viewStore, mapStore));

}
export const useGameStore = defineStore('game', {
    state: () => ({
        game: _initializeNewGame()
    }),
    actions: {
        initializeNewGame() {
            this.game = _initializeNewGame();
        }
    }
});