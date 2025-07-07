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
}
export const useViewStore = defineStore('view', {
    state: () => ({
        currentView: 'WELCOME' as ViewStatus,
    }),
    actions: {
        changeView(newView: keyof typeof VIEW_STATUS) {
            // const oldView = this.currentView;
            this.currentView = newView;
        }
    },
    getters: {
        // hideOverlay: (state) => state.currentView === VIEW_STATUS.GAME
    }
});