import { defineStore } from 'pinia';
import { markRaw } from 'vue';
import { buildArcLine, sourceConnectionDef, sourcePointsDef, spinGlobeFunc, sourceTextLabelsDef, layerConnectionDef, layerPointsDef, layerTextLabelsDef, sourcePointsGenerate, numberDistanceToString } from '../helpers/map';
import { loadSvg } from '../helpers/svg';
import pinIcon from '../assets/images/pin.svg';
import mapboxgl, { Marker } from 'mapbox-gl';
import type { GeoJSONSource, Map, MapboxOptions, MapMouseEvent } from 'mapbox-gl';

const checkMap: (map: Map | null) => asserts map is Map = (map) => {
    if (map === null) {
        throw new Error('Map is not initialized. Call setupMap() first.');
    }
};
type StatMarker = {
    marker: Marker;
    distance: number;
    pointDelta: number;
};
export interface MapStore {
    hasMarker: boolean;
    setupMap(map: Map): void;
    initalize(windowHeight: number): void;
    initialzeLayer(): void;
    stopAnimationAndJump(center: [number, number], zoom: number): void;
    adjustPadding(top: number): void;
    drawConnectionAndPoints(target: [number, number]): number;
    enableGameInteraction(): void;
    clearDraw(): void;
    disableGameInteraction(): void;
    addPoints(points: [ [number, number], string ][]): void;
    showPointsAsMarkerWithText(points: [ [number, number], number, number ][]): void;
    clearMarkers(): void;
    drawCanvas(): HTMLCanvasElement;
    drawMarkers(canvas: HTMLCanvasElement): Promise<void>;
    reset(): void;
}
interface MapWindow extends Window {
    map?: Map;
}
export const useMapStore = defineStore('map', {
    state: () => ({
        _map: null as Map | null,
        marker: null as Marker | null,
        displayMarkers: [] as StatMarker[],
        spinGlobeFunc: null as (() => void) | null,
        clickEvent: null as ((e: MapMouseEvent) => void) | null,
        inAnimation: true,
        initParameters: {
            style: 'mapbox://styles/mapbox/streets-v9',
            projection: 'globe',
            zoom: 2.5,
            center: [0, 0],
            preserveDrawingBuffer: true
        } as MapboxOptions
    }),
    getters: {
        hasMarker(): boolean {
            return !!this.marker;
        }
    },
    actions: {
        setupMap(map: Map) {
            this._map = markRaw(map);            
            if(import.meta.env.DEV) (window as MapWindow).map = this._map; // for debugging
        },
        initalize(windowHeight: number){
            checkMap(this._map);
            this._map.scrollZoom.disable(); 
            this._map.dragPan.disable();
            this._map.on('style.load', () => {
                this._map!.setFog({
                    'horizon-blend': 0.02,
                    'star-intensity': 0.1
                }); // set atmosphere
            });
            loadSvg(pinIcon, 24, 34).then(img => {
                if(!this._map) return;
                this._map.addImage('pin', img);
            });
            this._map.on('load', () => {
                this.adjustPadding(windowHeight);
                this.initialzeLayer();
                spinGlobeFunc(this._map!)();
                this.spinGlobeFunc = spinGlobeFunc(this._map!);
                this._map!.on('moveend', this.spinGlobeFunc!);
            });
        },
        initialzeLayer(){
            checkMap(this._map);
            this._map.addSource('points', sourcePointsDef);
            this._map.addSource('connection', sourceConnectionDef);
            this._map.addSource('text-labels', sourceTextLabelsDef);
            this._map.addLayer(layerConnectionDef);
            this._map.addLayer(layerPointsDef);
            // this._map.addLayer(layerPinIconsDef);
            this._map.addLayer(layerTextLabelsDef);
        },
        stopAnimationAndJump(center: [number, number], zoom: number){
            checkMap(this._map);
            if(this.inAnimation){
                if(this.spinGlobeFunc) this._map.off('moveend', this.spinGlobeFunc);
                this._map.stop();
                this.inAnimation = false;
            }
            const flyToPoint = () => {
                if(!this._map) return;
                this._map.flyTo({
                    center,
                    // zoom,
                    duration: 1000,
                    padding: { top: 0, left: 0, bottom: 0, right: 0 },
                    essential: true
                });
            }
            this._map.once('idle', () => {
                flyToPoint();
            });
            flyToPoint();

        },
        // enableInteraction(){
        //     this._map.scrollZoom.enable();
        //     this._map.dragPan.enable();
        // },
        adjustPadding(top: number){
            if(!this._map) {
                throw new Error('Map is not initialized. Call setupMap() first.');
            }
            if(this.inAnimation){
                this._map.jumpTo({
                    center: [0,0],
                    padding: { top, left: 0, bottom: 0, right: 0 },
                });
            }
        },

        /**
         * Draws a connection (arc line) and a point label between two coordinates on the map.
         *
         * @param {[number, number]} target - The target coordinate as [lng, lat].
         */
        drawConnectionAndPoints(target: [number, number]): number{
            checkMap(this._map);
            if (!this.marker) {
                throw new Error('Marker has not been drawn');
            }
            const user: [number, number] = [this.marker.getLngLat().lng, this.marker.getLngLat().lat];
            (this._map.getSource('points') as GeoJSONSource).setData(sourcePointsGenerate([[target, 'target'], [user, 'user']]).data);
            const [arcLine, textLabel, dis] = buildArcLine(target, user);
            (this._map.getSource('connection') as GeoJSONSource).setData(arcLine);
            (this._map.getSource('text-labels') as GeoJSONSource).setData(textLabel);

            return dis;
        },
        enableGameInteraction() {
            checkMap(this._map);
            this._map.scrollZoom.enable();
            this._map.dragPan.enable();
            this.clickEvent = (e: MapMouseEvent) => {
                const marker = new mapboxgl.Marker({
                    color: "#FF428E"
                }).setLngLat(e.lngLat);
                if(this.marker) this.marker.remove();
                this.marker = marker.addTo(this._map!);
            }
            this._map.on('click', this.clickEvent)
        },
        clearDraw(){
            checkMap(this._map);
            if(this.marker) {
                this.marker.remove();
                this.marker = null;
            }
            
            (this._map.getSource('points') as GeoJSONSource).setData(sourcePointsDef.data);
            (this._map.getSource('connection') as GeoJSONSource).setData(sourceConnectionDef.data);
            (this._map.getSource('text-labels') as GeoJSONSource).setData(sourceTextLabelsDef.data);
        },
        disableGameInteraction() {
            checkMap(this._map);
            this._map.scrollZoom.disable();
            this._map.dragPan.disable();
            if (this.clickEvent) this._map.off('click', this.clickEvent);
        },
        addPoints(points: [ [number, number], string ][]) {
            checkMap(this._map);
            (this._map.getSource('points') as GeoJSONSource).setData(sourcePointsGenerate(points).data);
        },
        showPointsAsMarkerWithText(points: [ [number, number], number, number ][]) {
            checkMap(this._map);
            points.forEach(([coord, distance, pointDelta]) => {
                const pointColor = pointDelta > 0 ? '#4CFF6F' : '#FF3A3A';
                const pointStroke = pointDelta > 0 ? '#00A259' : '#BB2727';
                const pointText = pointDelta > 0 ? `+${pointDelta}` : `${pointDelta}`;

                const el = document.createElement('div');
                el.className = 'flex flex-col items-center gap-1';
                el.style.zIndex = '2';
                el.innerHTML = `
                    <span
                        class="text-normal font-bold"
                        style="
                            color: ${pointColor};
                            -webkit-text-stroke: 3px ${pointStroke};
                            paint-order: stroke fill;
                            text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
                        "
                    >${pointText}</span>
                    <img width="24" height="34" src="${pinIcon}" />
                    <span
                        class="text-tiny text-[#FF428E] font-bold"
                        style="
                            -webkit-text-stroke: 3px white;
                            paint-order: stroke fill;
                        "
                    >${numberDistanceToString(distance)}</span>
                `;

                const marker = new mapboxgl.Marker(el).setLngLat(coord);
                this.displayMarkers.push({
                    marker,
                    distance,
                    pointDelta
                });
                marker.addTo(this._map!);
            });
            const bound = new mapboxgl.LngLatBounds();

            points.forEach(([coord]) => {
                bound.extend(coord);
            });
            if (points.length > 1) {
                this._map.fitBounds(bound, {});
            } else if (points.length === 1) { 
                // It seems that when there is only one point, fitBounds may freeze the entire page,
                // so it's safer to just flyTo the point.
                this._map.flyTo({
                    center: [points[0][0][0], points[0][0][1]],
                });
            }
        },
        clearMarkers() {
            this.displayMarkers.forEach(sm => sm.marker.remove());
            this.displayMarkers = [];
        },
        drawCanvas(): HTMLCanvasElement {
            const canvas = document.createElement('canvas');
            if (!this._map) return canvas;
            const mapCanvas = this._map.getCanvas();
            canvas.width = mapCanvas.width;
            canvas.height = mapCanvas.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return canvas;
            ctx.drawImage(mapCanvas, 0, 0);
            return canvas;
        },
        async drawMarkers(canvas: HTMLCanvasElement): Promise<void> {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const pinImg = await loadSvg(pinIcon, 24, 34); 
            const dpr = window.devicePixelRatio || 1;
            this.displayMarkers.forEach(sm => {
                const markerElement = sm.marker.getElement();
                const transformMatrix = new DOMMatrix(window.getComputedStyle(markerElement).transform);
                const translatedX = transformMatrix.m41;
                const translatedY = transformMatrix.m42;
                ctx.drawImage(pinImg, translatedX * dpr, translatedY * dpr, 24 * dpr, 34 * dpr);
                const pointColor = sm.pointDelta > 0 ? '#4CFF6F' : '#FF3A3A';
                const pointStroke = sm.pointDelta > 0 ? '#00A259' : '#BB2727';
                const pointText = sm.pointDelta > 0 ? `+${sm.pointDelta}` : `${sm.pointDelta}`;
                ctx.font = `${26 * dpr}px Arial`;
                ctx.fillStyle = pointColor;
                ctx.strokeStyle = pointStroke;
                ctx.lineWidth = 3;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.strokeText(pointText, (translatedX + 12) * dpr, (translatedY - 20) * dpr);
                ctx.fillText(pointText, (translatedX + 12) * dpr, (translatedY - 20) * dpr);
                ctx.font = `${18 * dpr}px Arial`;
                ctx.fillStyle = '#FF428E';
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 3;
                ctx.strokeText(numberDistanceToString(sm.distance), (translatedX + 12) * dpr, (translatedY + 50) * dpr);
                ctx.fillText(numberDistanceToString(sm.distance), (translatedX + 12) * dpr, (translatedY + 50) * dpr);
            });
            return;
        },
        reset() {
            this.clearDraw();
            this.clearMarkers();
            this._map?.jumpTo({
                center: [0, 0],
                padding: { top: window.innerHeight, left: 0, bottom: 0, right: 0 },
                zoom: this.initParameters.zoom,
            });
        }
    }
});
