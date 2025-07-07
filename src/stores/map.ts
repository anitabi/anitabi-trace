import { defineStore } from "pinia";
import { markRaw } from "vue";
import { buildArcLine, sourceConnectionDef, loadSvg, sourcePointsDef, spinGlobeFunc, sourceTextLabelsDef, layerConnectionDef, layerPointsDef, layerTextLabelsDef, sourcePointsGenerate } from "../helpers/map";
import pinIcon from '../assets/images/pin.svg';
import mapboxgl from 'mapbox-gl';
import type { GeoJSONSource, Map, MapboxOptions, MapMouseEvent, Marker } from "mapbox-gl";

const checkMap: (map: Map | null) => asserts map is Map = (map) => {
    if (map === null) {
        throw new Error('Map is not initialized. Call setupMap() first.');
    }
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
}
export const useMapStore = defineStore('map', {
    state: () => ({
        _map: null as Map | null,
        marker: null as Marker | null,
        spinGlobeFunc: null as (() => void) | null,
        clickEvent: null as ((e: MapMouseEvent) => void) | null,
        inAnimation: true,
        initParameters: {
            style: 'mapbox://styles/mapbox/streets-v9',
            projection: 'globe',
            zoom: 2.5,
            center: [0, 0]
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
            this.adjustPadding(windowHeight);
            loadSvg(this._map, 'pin', pinIcon, 48);
            this._map.on('load', () => {
                spinGlobeFunc(this._map!)();
            });
            this._map.on('load', this.initialzeLayer);
            this.spinGlobeFunc = spinGlobeFunc(this._map);
            this._map.on('moveend', this.spinGlobeFunc!);
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
            if(!this.inAnimation){
                return;
            }
            if(this.spinGlobeFunc) this._map.off('moveend', this.spinGlobeFunc);
            this._map.stop();
            this._map.easeTo({
                padding: { top: 0, left: 0, bottom: 0, right: 0 },
                duration: 1000
            });
            this.inAnimation = false;
            this._map.flyTo({
                center,
                zoom
            });

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
                this._map.flyTo({
                    padding: { top, left: 0, bottom: 0, right: 0 },
                    animate: false
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
        }
    }
});