export const rand100 = [75,86,13,47,90,40,18,8,23,50,67,12,56,48,13,27,47,34,8,31,11,44,23,1,58,45,54,92,10,48,44,24,37,63,92,75,32,23,57,60,85,58,76,87,8,28,39,95,30,49,35,1,46,5,3,6,23,32,19,35,51,41,54,10,99,56,68,35,7,11,91,5,42,48,93,94,2,41,11,27,20,8,94,25,29,14,35,57,59,21,87,32,45,85,96,51,74,74,21,90]


export const rand100v2 = rand100.sort((a, b) => a - b);

export const randArrayByNumberRand100 = (arr,seed,size) => {
    const len = arr.length;
    let i = 0;
    return arr.slice().sort((a, b) => {
        const ri = rand100[(i++)%100];
        const rii = rand100v2[i%100];
        const v = Math.ceil(seed * ri / rii) % 2 === 1 ? 1 : -1;
        return v;
    }).slice(0, size);
}
