import * as turf from "@turf/turf";

export const spinGlobeFunc = (map, secondsPerRevolution = 240, maxSpinZoom = 5, slowSpinZoom = 3) => {
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
            map.easeTo({ center, duration: 1000, easing: (n) => n });
        }
    }
};
export const loadSvg = (map, name, src, size) => {
    return new Promise((resolve, reject) => {
        const img = new Image(size, size);
        img.onload = () => {
            map.addImage(name, img);
            resolve();
        };
        img.onerror = (err) => {
            reject(err);
        };
        img.src = src;
    });
};
export const buildArcLine = (
  [startLng, startLat],
  [endLng, endLat]
) => {
    /*
               \  /       Draw a arc between two points with some curvature
                \/
                /
    */

    const midPoint = turf.center(turf.featureCollection([p1, p2]));
    const mainBearing = turf.rhumbBearing(p1, p2);

    const perpendicularBearing = mainBearing - 90;

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
    ), sourceTextLabelsGenerate([pointOnPerpendicular.geometry.coordinates, `${pointDistance.toFixed(1)}km`, perpendicularBearing])];
};
export const sourcePointsDef = {
    type: 'geojson',
    data: {
        type: 'FeatureCollection',
        features: []
    }
};

/**
 * Generates source points from a list of points with categories.
 *
 * @param {Array.<[[number, number], string]>} points - An array where each element is a tuple:
 *   - The first item is an array containing longitude and latitude as numbers: [lng, lat].
 *   - The second item is a string representing the category.
 * @returns {Object} The generated geojson source for points.
 */
export const sourcePointsGenerate = (points) => {
    let geojson = sourcePointsDef;
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
    'type': 'geojson',
    'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
            'type': 'LineString',
            'coordinates': []
        }
    }
};
export const sourceTextLabelsDef = {
    type: 'geojson',
    data: {
        type: 'FeatureCollection',
        features: []
    }
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
export const sourceTextLabelsGenerate = (points) => {
    let geojson = sourceTextLabelsDef;
    geojson.data.features = points.map(([coords, text, rotate]) => {
        return {
            type: 'Feature',
            properties: {
                text,
                rotate
            },
            geometry: {
                type: 'Point',
                coordinates: coords
            }
        }
    });
    return geojson;
};
export const layerConnectionDef = {
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
export const layerPointsDef = {
    id: 'points-layer',
    source: 'points',
    type: 'circle',
    paint: {
        'circle-color': '#FF428E',
        'circle-stroke-width': 1.5,
        'circle-stroke-color': '#FFFFFF'
    }
};
export const layerPinIconsDef = {
    id: 'pin-icons-layer',
    source: 'points',
    type: 'symbol',
    filter: ['==', 'category', 'user'],
    layout: {
        'icon-image': 'pin',
        'icon-anchor': 'bottom'
    }
};
export const layerTextLabelsDef = {
    id: 'text-labels-layer',
    type: 'symbol',
    source: 'text-labels',
    layout: {
        'text-field': ['get', 'text'],
        'text-size': 16,
        'text-anchor': 'bottom',
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