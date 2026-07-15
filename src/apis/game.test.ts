import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
    const get = vi.fn().mockResolvedValue({ visitorId: 'fingerprintjs-visitor-id' });
    return {
        post: vi.fn(),
        get,
        load: vi.fn(() => Promise.resolve({ get }))
    };
});

vi.mock('@fingerprintjs/fingerprintjs', () => ({
    default: { load: mocks.load }
}));
vi.mock('./api', () => ({
    api: { post: mocks.post }
}));

import { startGame, uploadGrade, type GradeUploadInput } from './game';

beforeEach(() => {
    vi.clearAllMocks();
});

describe('game API', () => {
    it('starts an authenticated game with the documented project ID body', () => {
        startGame(405785);

        expect(mocks.post).toHaveBeenCalledWith(
            '/game/start',
            { id: 405785 },
            {
                authenticated: true,
                force: true
            }
        );
    });

    it('uploads the documented grade body with the FingerprintJS visitor ID', async () => {
        const grade: GradeUploadInput = {
            start_time: 1_784_098_792_934,
            start_key: 'signed-start-key',
            id: 405785,
            point_num: 3,
            score: 30,
            turnstile_token: 'turnstile-token'
        };

        await Promise.all([
            uploadGrade(grade),
            uploadGrade({ ...grade, score: 40 })
        ]);

        expect(mocks.get).toHaveBeenCalledOnce();
        expect(mocks.post).toHaveBeenNthCalledWith(
            1,
            '/game/uploadGrade',
            {
                ...grade,
                fingerprint: 'fingerprintjs-visitor-id'
            },
            {
                authenticated: true,
                force: true,
                retryUnauthorized: false
            }
        );
        expect(mocks.post).toHaveBeenNthCalledWith(
            2,
            '/game/uploadGrade',
            {
                ...grade,
                score: 40,
                fingerprint: 'fingerprintjs-visitor-id'
            },
            {
                authenticated: true,
                force: true,
                retryUnauthorized: false
            }
        );
    });
});
