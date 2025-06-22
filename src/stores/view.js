import { defineStore } from "pinia";

export class VIEW_STATUS{
    static WELCOME = 'Welcome';
    static COUNTER = 'Counter';
    static GAME = 'Game';
    static BANGUMI_SELECTION = 'BangumiSelection';
}
export const useViewStore = defineStore('view', {
    state: () => ({
        currentView: VIEW_STATUS.WELCOME,
        viewData: {} // { KEY: }
    }),
    actions: {
        changeView(newView) {
            const oldView = this.currentView;
            this.currentView = newView;
            delete this.viewData[oldView];
        }
    },
    getters: {
        // hideOverlay: (state) => state.currentView === VIEW_STATUS.GAME
    }
});