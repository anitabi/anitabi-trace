import { api } from './api';

export const getRank = () => api.get<RankItem[]>('/rank.json');

export interface RankItem {
    id: number;
    name: string;
    ranks: Rank[]
}

export interface Rank {
    rank: number;
    user: string;
    rank_delta: number;
    score: number;
}