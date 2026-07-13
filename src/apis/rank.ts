import { api } from './api';

export const getLeaderboard = (projectId: string | number) => api.get<LeaderboardResponse>(
    `/leaderboard?id=${encodeURIComponent(projectId)}`,
    { force: true }
);

export interface LeaderboardResponse {
    id: number;
    leaderboard: LeaderboardEntry[];
}

export interface LeaderboardEntry {
    fingerprint: string;
    nickname: string;
    score: number;
    rank_delta: number;
}