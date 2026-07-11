import { api } from './api';

export type NicknameMode =
    | { mode: 'free' }
    | { mode: 'preset'; nicknames: string[] };

export const getNicknameMode = () => api.get<NicknameMode>('/nickname/mode', { force: true });
