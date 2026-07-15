import { api } from './api';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const fingerprintAgentPromise = FingerprintJS.load();
let fingerprintPromise: Promise<string> | null = null;

export interface GameStartResult {
    start_time: number;
    start_key: string;
}

export interface GradeUploadInput {
    start_time: number;
    start_key: string;
    id: number;
    point_num: number;
    score: number;
    turnstile_token: string;
}

export interface GradeUploadResult {
    message: string;
    score_percentile: string;
    rank: string;
}


export const startGame = (projectId: number) => api.post<GameStartResult>(
    '/game/start',
    { id: projectId },
    {
        authenticated: true,
        force: true
    }
);

export const uploadGrade = async (input: GradeUploadInput): Promise<GradeUploadResult> => {
    if (fingerprintPromise === null) {
        fingerprintPromise = fingerprintAgentPromise
            .then(agent => agent.get())
            .then(result => result.visitorId)
            .catch(error => {
                fingerprintPromise = null;
                throw error;
            });
    }
    const fingerprint = await fingerprintPromise;
    return api.post<GradeUploadResult>(
        '/game/uploadGrade',
        {
            ...input,
            fingerprint
        },
        {
            authenticated: true,
            force: true,
            retryUnauthorized: false
        }
    );
};
