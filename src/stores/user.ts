import { defineStore } from 'pinia';

export interface UserStore {
    nickname: string | null;
}

export const useUserStore = defineStore('user', {
    state: () => ({
        nickname: null as string | null,
        isLoggedIn: false,
        userId: null as number | null
    }),
    actions: {
        setNickname(nickname: string) {
            if (this.userId !== null) return;
            this.nickname = nickname;
            this.isLoggedIn = true;
        },
        clearNickname() {
            this.nickname = null;
            this.userId = null;
            this.isLoggedIn = false;
        },
    }
});
