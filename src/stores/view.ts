import { defineStore } from "pinia";

const VIEW_STATUS = {
     WELCOME: 'Welcome',
     COUNTER: 'Counter',
     GAME: 'Game',
     BANGUMI_SELECTION: 'BangumiSelection',
     STATISTICS: 'Statistics'
}
export type ViewStatus = keyof typeof VIEW_STATUS;
export interface ViewStore{
    changeView(newView: keyof typeof VIEW_STATUS): void;
    setDeepOverlay(value: boolean): void;
}
export const useViewStore = defineStore('view', {
    state: () => ({
        currentView: 'WELCOME' as ViewStatus,
        deepOverlay: false as boolean
    }),
    actions: {
        changeView(newView: keyof typeof VIEW_STATUS) {
            // const oldView = this.currentView;
            this.currentView = newView;
        },
        setDeepOverlay(value: boolean) {
            this.deepOverlay = value;
        }
    },
    getters: {
        // hideOverlay: (state) => state.currentView === VIEW_STATUS.GAME
    }
});