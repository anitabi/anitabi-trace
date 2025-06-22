import { defineStore } from "pinia";
import { markRaw } from "vue";
import { buildArcLine, sourceConnectionDef, loadSvg, sourcePointsDef, spinGlobeFunc, sourceTextLabelsDef, layerConnectionDef, layerPointsDef, layerPinIconsDef, layerTextLabelsDef, sourcePointsGenerate } from "../helpers/map";
import pinIcon from '../assets/images/pin.svg';
import * as turf from "@turf/turf";
export const useMapStore = defineStore('map', {
    state: () => ({
        _map: null,
        spinGlobeFunc: null,
        inAnimation: true,
        initParameters: {
            style: 'mapbox://styles/mapbox/streets-v9',
            projection: 'globe',
            zoom: 2.5,
            center: [0, 0]
        },
        points: []
    }),

    actions: {
        setupMap(map) {
            this._map = markRaw(map);            
        },
        initalize(windowHeight){
            this._map.scrollZoom.disable(); 
            // TODO: find the reason why the earth still can be dragged
            this._map.dragRotate.disable();
            this._map.touchZoomRotate.disableRotation();
            this._map.on('style.load', () => {
                this._map.setFog({
                    'horizon-blend': 0.02,
                    'star-intensity': 0.1
                }); // set atmosphere
            });
            this.adjustPadding(windowHeight);
            loadSvg(this._map, 'pin', pinIcon, 48);
            this._map.on('load', () => {
                spinGlobeFunc(this._map)();
            });
            this._map.on('load', this.initialzeLayer);
            this.spinGlobeFunc = spinGlobeFunc(this._map);
            this._map.on('moveend', this.spinGlobeFunc);
        },
        initialzeLayer(){
            this._map.addSource('points', sourcePointsDef);
            this._map.addSource('connection', sourceConnectionDef);
            this._map.addSource('text-labels', sourceTextLabelsDef);
            this._map.addLayer(layerConnectionDef);
            this._map.addLayer(layerPointsDef);
            this._map.addLayer(layerPinIconsDef);
            this._map.addLayer(layerTextLabelsDef);
        },
        stopAnimationAndJump(center, zoom){
            if(!this.inAnimation){
                return;
            }
            this._map.off('moveend', this.spinGlobeFunc);
            this._map.stop();
            this._map.easeTo({
                padding: { top: 0,},
                duration: 1000
            });
            this.inAnimation = false;
            this._map.flyTo({
                center,
                zoom
            });

        },
        enableInteraction(){
            this._map.scrollZoom.enable();
        },
        adjustPadding(top){
            if(this.inAnimation){
                this._map.flyTo({
                    padding: { top },
                    animate: false
                });
            }
        },

        /**
         * Draws a connection (arc line) and a point label between two coordinates on the map.
         *
         * @param {[number, number]} target - The target coordinate as [lng, lat].
         * @param {[number, number]} user - The user coordinate as [lng, lat].
         */
        drawConnectionAndPoints(target, user){
            this._map.getSource('points').setData(sourcePointsGenerate([[target, 'target'], [user, 'user']]));
            const [arcLine, textLabel] = buildArcLine(target, user);
            this._map.getSource('connection').setData(arcLine);
            this._map.getSource('text-labels').setData(textLabel);
        }
    }
});