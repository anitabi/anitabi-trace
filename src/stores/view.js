import { defineStore } from "pinia";

export class VIEW_STATUS{
    static WELCOME = 'Welcome';
    static COUNTER = 'Counter';
    static GAME = 'Game';
}
export const useViewStore = defineStore('view', {
    state: () => ({
        currentView: VIEW_STATUS.WELCOME,
        currentViewData: {}
    }),
    actions: {
        changeView(newView) {
            this.currentView = newView;
        }
    },
    getters: {
        // hideOverlay: (state) => state.currentView === VIEW_STATUS.GAME
    }
});