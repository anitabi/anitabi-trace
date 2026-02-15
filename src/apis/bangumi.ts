import { api } from "./api";

export const getDefaultBangumi = () => api.get<DefaultBangumi[]>("/bangumi.json");
// {
//     "id": "nakineko",
//     "name":"想哭的我戴上了猫的面具",
//     "cover":"https://image.anitabi.cn/bangumi/299202.jpg?plan=h360",
//     "color":"#714739",
//     "points_api_url":"https://api.anitabi.cn/bangumi/299202/points/detail",
//     "geo":[34.33669,136.84051],
//     "zoom": 14
// }
export interface DefaultBangumi {
    id: string;
    name: string;
    cover: string;
    color: string;
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
export interface PointDetail{
    id: string;
    name: string;
    image?: string;
    ep: string | null;
    s: number | null;
    geo: [number, number];
    origin: string | null;
    originURL: string | null;
}