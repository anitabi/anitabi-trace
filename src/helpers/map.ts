import * as turf from "@turf/turf";
import { deepCopy } from "./common";
import type { AnyLayer, Map } from "mapbox-gl";
import type { Feature, FeatureCollection } from "geojson";
export const untilIdle = (map: Map): Promise<void> => {
    return new Promise((resolve) => {
        map.once('idle', () => {
            resolve();
        });
    });
};
export const spinGlobeFunc = (map: Map, secondsPerRevolution = 240, maxSpinZoom = 5, slowSpinZoom = 3) => {
    return () => {
        const zoom = map.getZoom();
        if (zoom < maxSpinZoom) {
            let distancePerSecond = 360 / secondsPerRevolution;
            if (zoom > slowSpinZoom) {
                // Slow spinning at higher zooms
                const zoomDif =
                (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                distancePerSecond *= zoomDif;
            }
            const center = map.getCenter();
            center.lng -= distancePerSecond;
            // Smoothly animate the map over one second.
            // When this animation is complete, it calls a 'moveend' event.
            setTimeout(() => map.easeTo({ center, duration: 800, easing: (n) => n, essential: true }), 0);
        }
    }
};
export const buildArcLine = (
  [startLng, startLat]: [number, number],
  [endLng, endLat]: [number, number]
) => {
    /*
               \  /       Draw a arc between two points with some curvature
                \/
                /
    */
    const p1 = turf.point([startLng, startLat]);
    const p2 = turf.point([endLng, endLat]);
    const midPoint = turf.center(turf.featureCollection([p1, p2]));
    const mainBearing = turf.rhumbBearing(p1, p2);

    let perpendicularBearing = mainBearing - 90;
    if (!(perpendicularBearing >= -90 && perpendicularBearing <=90)) perpendicularBearing += perpendicularBearing > 0 ? -180 : 180;
    const pointDistance = turf.distance(p1, p2, {units: 'kilometers'});
    const offsetDistance = pointDistance * 0.1;
    const pointOnPerpendicular = turf.rhumbDestination(
        midPoint,
        offsetDistance,
        perpendicularBearing
    );
    return [turf.bezierSpline(
        {
        type: "Feature",
        properties: {},
        geometry: {
            type: "LineString",
            coordinates: [
            [startLng, startLat],
            pointOnPerpendicular.geometry.coordinates,
            [endLng, endLat],
            ],
        },
        },
        { resolution: 2500 }
    ), sourceTextLabelsGenerate([[pointOnPerpendicular.geometry.coordinates as [number, number], `${pointDistance.toFixed(1)}km`, perpendicularBearing]]).data, pointDistance];
};
export const sourcePointsDef = {
    type: 'geojson' as const,
    data: {
        type: 'FeatureCollection',
        features: []
    } as FeatureCollection<GeoJSON.Geometry, { category: string }>
};

type PointWithCategory = [[number, number], string];
/**
 * Generates source points from a list of points with categories.
 *
 * @param {Array.<[[number, number], string]>} points - An array where each element is a tuple:
 *   - The first item is an array containing longitude and latitude as numbers: [lng, lat].
 *   - The second item is a string representing the category.
 * @returns {Object} The generated geojson source for points.
 */
export const sourcePointsGenerate = (points: PointWithCategory[]) => {
    let geojson = deepCopy(sourcePointsDef);
    geojson.data.features = points.map(([coords, category]) => {
        return {
            type: 'Feature',
            properties: {
                category
            },
            geometry: {
                type: 'Point',
                coordinates: coords
            }
        }
    });
    return geojson;
};
export const sourceConnectionDef = {
    'type': 'geojson' as const,
    'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
            'type': 'LineString',
            'coordinates': []
        }
    } as Feature
};
export const sourceTextLabelsDef = {
    type: 'geojson' as const,
    data: {
        type: 'FeatureCollection',
        features: []
    } as FeatureCollection
};

/**
 * Generates a GeoJSON object for source text labels from an array of points.
 *
 * @param {Array.<[number[], string, number]>} points - An array where each element is a tuple containing:
 *   - coords {number[]} - The coordinates of the point [longitude, latitude].
 *   - text {string} - The label text for the point.
 *   - rotate {number} - The rotation angle for the label.
 * @returns {Object} A GeoJSON object with features representing the provided points and their associated text and rotation.
 */
type TextLabel = [[number, number], string, number];
export const sourceTextLabelsGenerate = (points: TextLabel[], anchor = 'bottom') => {
    let geojson = deepCopy(sourceTextLabelsDef);
    geojson.data.features = points.map(([coords, text, rotate]) => {
        return {
            type: 'Feature',
            properties: {
                text,
                rotate,
                anchor
            },
            geometry: {
                type: 'Point',
                coordinates: coords
            }
        }
    });
    return geojson;
};
export const layerConnectionDef: AnyLayer = {
    id: 'connection-layer',
    type: 'line',
    source: 'connection',
    layout: {
        'line-cap': 'round',
        'line-join': 'round'
    },
    paint: {
        'line-color': '#FF428E',
        'line-width': 2,
        'line-dasharray': [1, 2],
    }
};
export const layerPointsDef: AnyLayer = {
    id: 'points-layer',
    source: 'points',
    type: 'circle',
    paint: {
        'circle-color': '#FF428E',
        'circle-stroke-width': 1.5,
        'circle-stroke-color': '#FFFFFF'
    }
};
export const layerPinIconsDef: AnyLayer = {
    id: 'pin-icons-layer',
    source: 'points',
    type: 'symbol',
    filter: ['==', 'category', 'user'],
    layout: {
        'icon-image': 'pin',
        'icon-anchor': 'bottom'
    }
};
export const layerTextLabelsDef: AnyLayer = {
    id: 'text-labels-layer',
    type: 'symbol',
    source: 'text-labels',
    layout: {
        'text-field': ['get', 'text'],
        'text-size': 16,
        'text-anchor': ['get', 'anchor'],
        'text-radial-offset': 0.5,
        'text-justify': 'center',
        'text-rotate': ['get', 'rotate'],
        'text-font': ['Open Sans Regular']
    },
    paint: {
        'text-color': '#FF428E', 
        'text-halo-color': '#FFFFFF',
        'text-halo-width': 2
    }
};
export const reverseCoordinate = ([lat, lng]: [number, number]): [number, number] => [lng, lat];
export const numberDistanceToString = (distance: number): string => {
    if (distance < 1) {
        return `${(distance * 1000).toFixed(0)}m`;
    } else {
        return `${(distance).toFixed(1)}km`;
    }
}