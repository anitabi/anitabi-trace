import { defineStore } from "pinia";

const VIEW_WELCOME = 'Welcome';

export const useViewStore = defineStore('view', {
    state: () => ({
        currentView: VIEW_WELCOME,
        currentViewData: {}
    }),
    actions: {

    }
});