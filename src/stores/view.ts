import { defineStore } from "pinia";

const VIEW_STATUS = {
     WELCOME: 'Welcome',
     COUNTER: 'Counter',
     GAME: 'Game',
     BANGUMI_SELECTION: 'BangumiSelection',
     STATISTICS: 'Statistics',
     RANK: 'Rank',
     AUTH: 'Auth'
}
export type ViewStatus = keyof typeof VIEW_STATUS;
export type DeepOverlayStatus = 'FULL' | 'HEAD_ONLY' | 'OREO';
export interface ViewStore{
    changeView(newView: keyof typeof VIEW_STATUS): void;
    setDeepOverlay(value: DeepOverlayStatus): void;
}
export const useViewStore = defineStore('view', {
    state: () => ({
        currentView: 'WELCOME' as ViewStatus,
        deepOverlay: 'FULL' as DeepOverlayStatus
    }),
    actions: {
        changeView(newView: keyof typeof VIEW_STATUS) {
            // const oldView = this.currentView;
            this.currentView = newView;
        },
        setDeepOverlay(value: DeepOverlayStatus) {
            this.deepOverlay = value;
        }
    },
    getters: {
        // hideOverlay: (state) => state.currentView === VIEW_STATUS.GAME
    }
});