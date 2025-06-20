// function computeArcAngle(center, point) {
//     const dx = point[0] - center[0];
//     const dy = point[1] - center[1];
    
//     const angle = Math.atan2(dy, dx);
    
//     return angle >= 0 ? angle : angle + 2 * Math.PI;
// }
// export const ArcBetweenPoints = (canvasId, p1, p2, d, color, width) => {
//     if(p1[0] > p2[0]){
//         [p1, p2] = [p2, p1];
//     }
//     const _x = p1[0];
//     p2[0] -= p1[0]; p1[0] = 0;
//     const _y = Math.min(p1[1], p2[1]);
//     p1[1] -= _y; p2[1] -= _y;
//     const xMin = 0, xMax = p2[0];
//     const yMin = 0, yMax = Math.max(p1[1], p2[1]);
    
//     const xDiff = p2[0] - p1[0];
//     const FACTOR = 1000 / xDiff;
//     const yDiff = p2[1] - p1[1];
    
//     const D = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
//     const radius = d / 2 + Math.pow(D, 2) / (8 * d);
//     const center = [(p1[0] + p2[0]) / 2 - yDiff * (radius - d), (p1[1] + p2[1]) / 2 + xDiff * (radius - d)];
//     if(center[0] <= xMax && center[0] >= xMin) yMax = Math.max(yMax, center[1] + radius);
//     const canvasWidth = xMax - xMin;
//     const canvasHeight = yMax - yMin;
    
//     const coords = [
//         [_x, _y + canvasHeight],
//         [_x + canvasWidth, _y + canvasHeight],
//         [_x + canvasWidth, _y],
//         [_x, _y]
//     ];
//     const canvas = document.createElement('canvas');
//     canvas.id = canvasId;
//     canvas.width = canvasWidth * FACTOR;
//     canvas.height = canvasHeight * FACTOR;
//     const ctx = canvas.getContext('2d');
//     ctx.beginPath();
//     ctx.arc(center[0] * FACTOR, center[1] * FACTOR, 
//         radius * FACTOR,
//         computeArcAngle(center, p1),
//         computeArcAngle(center, p2));
//         console.log(center[0] * FACTOR, center[1] * FACTOR, radius * FACTOR, computeArcAngle(center, p1), computeArcAngle(center, p2));
//     ctx.lineWidth = width;
//     ctx.strokeStyle = color;
//     ctx.stroke();
//     ctx.closePath();
    
//     document.body.appendChild(canvas);
//     return coords;
// };