export const padLeft = (str, len = 3, pad = '0') => {
    return (new Array(len + 1).join(pad) + str).slice(-len);
}
