
export const loadSvg = (src: string, width: number, height?: number): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image(width, height || width);
        img.onload = () => {
            resolve(img);
        };
        img.onerror = (err) => {
            reject(err);
        };
        img.src = src;
    });
};