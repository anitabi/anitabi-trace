import { api } from './api';

interface BangumiResponse {
    fields: string[];
    rows: unknown[][];
}

export const getDefaultBangumi = () => api.get<BangumiResponse>('/bangumi').then(res => {
    if (!Array.isArray(res.rows) || !Array.isArray(res.fields)) {
        throw new Error('Invalid response format');
    }

    return res.rows.map(row => {
        const bangumi: Record<string, unknown> = {};
        res.fields.forEach((field, index) => {
            bangumi[field] = row[index];
        });

        const id = typeof bangumi.id === 'number' ? bangumi.id : Number(bangumi.id);
        if (!Number.isInteger(id)) {
            throw new Error('Invalid bangumi id');
        }

        bangumi.id = id;
        bangumi.points_api_url = `/bangumi/${id}/lite`;
        return bangumi as unknown as DefaultBangumi;
    });
});

//   "fields": [
//     "id",
//     "name",
//     "cover",
//     "color",
//     "points_api_url",
//     "geo",
//     "zoom"
//   ],
//   "rows": [
//     [
//       88290,
//       "请问您今天要来点兔子吗？",
//       "https://img-tc.anitabi.cn/bangumi/88290_uh69pso63.jpg",
//       "#d17c60",
//       "https://api.anitabi.cn/bangumi/88290/points/detail",
//       [
//         48.077821,
//         7.352337
//       ],
//       8.2
//     ],
export interface DefaultBangumi {
    id: number;
    name: string | null;
    cover: string;
    color: string | 0;
    points_api_url: string;
    geo: [number, number];
    zoom: number;
}

// {
//     "id": "5fdjx5dtf",
//     "name": "神明社",
//     "image": "https://image.anitabi.cn/points/299202/5fdjx5dtf_1673538561201.jpg?plan=h160",
//     "ep": null,
//     "s": 154,
//     "geo": [
//         34.8854,
//         136.8398
//     ],
//     "origin": "Google Maps",
//     "originURL": "https://www.google.com/maps/d/viewer?mid=1VrYBsUvFfF3bQKP2rrAJ5WzVHzse86k4&ll=34.885423%2C136.839803&z=17"
// }
export interface PointDetail {
    id: string;
    // name: string;
    image?: string;
    // ep: string | null;
    // s: number | null;
    geo: [number, number];
    // origin: string | null;
    // originURL: string | null;
}
