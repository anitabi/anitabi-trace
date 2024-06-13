export const streetsStyle = {
    "version": 8,
    "name": "Mapbox Streets Japan",
    "metadata": {
        "mapbox:type": "default",
        "mapbox:origin": "streets-v11",
        "mapbox:sdk-support": {
            "android": "9.3.0",
            "ios": "5.10.0",
            "js": "2.0.0"
        },
        "mapbox:autocomposite": true,
        "mapbox:groups": {
            "Transit, transit-labels": {
                "name": "Transit, transit-labels",
                "collapsed": true
            },
            "Administrative boundaries, admin": {
                "name": "Administrative boundaries, admin",
                "collapsed": true
            },
            "Transit, bridges": {
                "name": "Transit, bridges",
                "collapsed": true
            },
            "Buildings, building-labels": {
                "name": "Buildings, building-labels",
                "collapsed": true
            },
            "Transit, surface": {
                "name": "Transit, surface",
                "collapsed": true
            },
            "6e4f8d057eb83efc54d4bf211ab4ac9d": {
                "name": "Buildings, built low zoom",
                "collapsed": true
            },
            "Road network, bridges": {
                "name": "Road network, bridges",
                "collapsed": true
            },
            "Land, water, & sky, water": {
                "name": "Land, water, & sky, water",
                "collapsed": true
            },
            "Road network, tunnels": {
                "name": "Road network, tunnels",
                "collapsed": true
            },
            "Road network, road-labels": {
                "name": "Road network, road-labels",
                "collapsed": true
            },
            "Buildings, built": {
                "name": "Buildings, built",
                "collapsed": true
            },
            "Natural features, natural-labels": {
                "name": "Natural features, natural-labels",
                "collapsed": true
            },
            "Road network, surface": {
                "name": "Road network, surface",
                "collapsed": true
            },
            "Land, water, & sky, built": {
                "name": "Land, water, & sky, built",
                "collapsed": true
            },
            "Walking, cycling, etc., barriers-bridges": {
                "name": "Walking, cycling, etc., barriers-bridges",
                "collapsed": true
            },
            "Place labels, place-labels": {
                "name": "Place labels, place-labels",
                "collapsed": false
            },
            "Transit, ferries": {
                "name": "Transit, ferries",
                "collapsed": true
            },
            "Transit, elevated": {
                "name": "Transit, elevated",
                "collapsed": true
            },
            "Point of interest labels, poi-labels": {
                "name": "Point of interest labels, poi-labels",
                "collapsed": true
            },
            "Walking, cycling, etc., tunnels": {
                "name": "Walking, cycling, etc., tunnels",
                "collapsed": true
            },
            "Terrain, land": {
                "name": "Terrain, land",
                "collapsed": true
            },
            "Road network, tunnels-case": {
                "name": "Road network, tunnels-case",
                "collapsed": true
            },
            "Walking, cycling, etc., walking-cycling-labels": {
                "name": "Walking, cycling, etc., walking-cycling-labels",
                "collapsed": true
            },
            "Walking, cycling, etc., surface": {
                "name": "Walking, cycling, etc., surface",
                "collapsed": true
            },
            "Transit, built": {
                "name": "Transit, built",
                "collapsed": true
            },
            "50faffaf67651041277862f8a4b9b8d0": {
                "name": "Transit, rail detail labels",
                "collapsed": true
            },
            "Road network, surface-icons": {
                "name": "Road network, surface-icons",
                "collapsed": true
            },
            "Land, water, & sky, land": {
                "name": "Land, water, & sky, land",
                "collapsed": true
            },
            "9a677cfc288a11230b5a41cebfc20602": {
                "name": "Road network, traffic signals",
                "collapsed": true
            },
            "Transit, ferry-aerialway-labels": {
                "name": "Transit, ferry-aerialway-labels",
                "collapsed": true
            },
            "e96c76ab47296d7cdab48ab9d0d9515c": {
                "name": "Transit, rail detail",
                "collapsed": true
            }
        }
    },
    "center": [
        95.18167725116223,
        27.773612788324712
    ],
    "zoom": 7.088623592576586,
    "bearing": 0,
    "pitch": 0,
    "sources": {
        "composite": {
            "url": "mapbox://mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v8,mapbox.transit-v2",
            "type": "vector",
            'maxzoom': 8
        }
    },
    "sprite": "mapbox://sprites/itorr/cltlpf5d2015g01oidhgl1mzm/8mfn2ajurmwsxwl78vzq0kccj",
    "glyphs": "mapbox://fonts/itorr/{fontstack}/{range}.pbf",
    "layers": [
        {
            "id": "land",
            "type": "background",
            "layout": {},
            "paint": {
                "background-color": "hsl(30, 18%, 92%)"
            },
            "metadata": {
                "mapbox:featureComponent": "land-and-water",
                "mapbox:group": "Land, water, & sky, land"
            }
        },
        {
            "id": "landcover",
            "type": "fill",
            "source": "composite",
            "source-layer": "landcover",
            "maxzoom": 7,
            "layout": {},
            "paint": {
                "fill-color": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "snow",
                    "hsl(30, 20%, 100%)",
                    "hsl(81, 43%, 85%)"
                ],
                "fill-opacity": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    2,
                    0.3,
                    7,
                    0
                ],
                "fill-antialias": false
            },
            "metadata": {
                "mapbox:featureComponent": "land-and-water",
                "mapbox:group": "Land, water, & sky, land"
            }
        },
        {
            "minzoom": 5,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "land-and-water",
                "mapbox:group": "Land, water, & sky, land"
            },
            "filter": [
                "==",
                [
                    "get",
                    "class"
                ],
                "national_park"
            ],
            "type": "fill",
            "source": "composite",
            "id": "national-park",
            "paint": {
                "fill-color": "hsl(99, 61%, 80%)",
                "fill-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    5,
                    0,
                    6,
                    0.5,
                    10,
                    0.5
                ]
            },
            "source-layer": "landuse_overlay"
        },
        {
            "minzoom": 5,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "land-and-water",
                "mapbox:group": "Land, water, & sky, land"
            },
            "filter": [
                "match",
                [
                    "get",
                    "class"
                ],
                [
                    "park",
                    "airport",
                    "glacier",
                    "pitch",
                    "sand",
                    "facility"
                ],
                true,
                "cemetery",
                true,
                "school",
                true,
                "hospital",
                true,
                false
            ],
            "type": "fill",
            "source": "composite",
            "id": "landuse",
            "paint": {
                "fill-color": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "park",
                        "hsl(99, 61%, 80%)",
                        "airport",
                        "rgb(236, 237, 242)",
                        "cemetery",
                        "hsl(81, 33%, 86%)",
                        "glacier",
                        "rgb(209, 233, 242)",
                        "hospital",
                        "rgb(238, 220, 226)",
                        "pitch",
                        "hsl(99, 62%, 75%)",
                        "sand",
                        "hsl(50, 51%, 91%)",
                        "school",
                        "hsl(51, 20%, 84%)",
                        "hsl(30, 22%, 88%)"
                    ],
                    16,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "park",
                        "hsl(99, 61%, 80%)",
                        "airport",
                        "rgb(227, 229, 241)",
                        "cemetery",
                        "hsl(81, 33%, 86%)",
                        "glacier",
                        "rgb(209, 233, 242)",
                        "hospital",
                        "rgb(245, 223, 230)",
                        "pitch",
                        "hsl(99, 62%, 75%)",
                        "sand",
                        "hsl(50, 51%, 91%)",
                        "school",
                        "hsl(51, 20%, 84%)",
                        "hsl(30, 22%, 88%)"
                    ]
                ],
                "fill-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    5,
                    0,
                    6,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "glacier",
                        0.5,
                        1
                    ]
                ]
            },
            "source-layer": "landuse"
        },
        {
            "minzoom": 15,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "land-and-water",
                "mapbox:group": "Land, water, & sky, land"
            },
            "filter": [
                "==",
                [
                    "get",
                    "class"
                ],
                "pitch"
            ],
            "type": "line",
            "source": "composite",
            "id": "pitch-outline",
            "paint": {
                "line-color": "hsl(81, 35%, 88%)"
            },
            "source-layer": "landuse"
        },
        {
            "id": "waterway-shadow",
            "type": "line",
            "source": "composite",
            "source-layer": "waterway",
            "minzoom": 8,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    11,
                    "round"
                ],
                "line-join": "round"
            },
            "paint": {
                "line-color": "rgb(150, 189, 242)",
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.3
                    ],
                    [
                        "zoom"
                    ],
                    9,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "canal",
                            "river"
                        ],
                        0.1,
                        0
                    ],
                    20,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "canal",
                            "river"
                        ],
                        8,
                        3
                    ]
                ],
                "line-translate": [
                    "interpolate",
                    [
                        "exponential",
                        1.2
                    ],
                    [
                        "zoom"
                    ],
                    7,
                    [
                        "literal",
                        [
                            0,
                            0
                        ]
                    ],
                    16,
                    [
                        "literal",
                        [
                            -1,
                            -1
                        ]
                    ]
                ],
                "line-translate-anchor": "viewport",
                "line-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    8,
                    0,
                    8.5,
                    1
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "land-and-water",
                "mapbox:group": "Land, water, & sky, water"
            }
        },
        {
            "id": "water-shadow",
            "type": "fill",
            "source": "composite",
            "source-layer": "water",
            "layout": {},
            "paint": {
                "fill-color": "rgb(150, 189, 242)",
                "fill-translate": [
                    "interpolate",
                    [
                        "exponential",
                        1.2
                    ],
                    [
                        "zoom"
                    ],
                    7,
                    [
                        "literal",
                        [
                            0,
                            0
                        ]
                    ],
                    16,
                    [
                        "literal",
                        [
                            -1,
                            -1
                        ]
                    ]
                ],
                "fill-translate-anchor": "viewport"
            },
            "metadata": {
                "mapbox:featureComponent": "land-and-water",
                "mapbox:group": "Land, water, & sky, water"
            }
        },
        {
            "id": "waterway",
            "type": "line",
            "source": "composite",
            "source-layer": "waterway",
            "minzoom": 8,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    11,
                    "round"
                ],
                "line-join": "round"
            },
            "paint": {
                "line-color": "#9ddbf1",
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.3
                    ],
                    [
                        "zoom"
                    ],
                    9,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "canal",
                            "river"
                        ],
                        0.1,
                        0
                    ],
                    20,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "canal",
                            "river"
                        ],
                        8,
                        3
                    ]
                ],
                "line-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    8,
                    0,
                    8.5,
                    1
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "land-and-water",
                "mapbox:group": "Land, water, & sky, water"
            }
        },
        {
            "id": "water",
            "type": "fill",
            "source": "composite",
            "source-layer": "water",
            "layout": {},
            "paint": {
                "fill-color": "#9ddbf1"
            },
            "metadata": {
                "mapbox:featureComponent": "land-and-water",
                "mapbox:group": "Land, water, & sky, water"
            }
        },
        {
            "id": "hillshade",
            "type": "fill",
            "source": "composite",
            "source-layer": "hillshade",
            "maxzoom": 16,
            "layout": {},
            "paint": {
                "fill-color": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "shadow",
                    "hsl(50, 41%, 22%)",
                    "hsl(30, 20%, 100%)"
                ],
                "fill-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    [
                        "match",
                        [
                            "get",
                            "level"
                        ],
                        [
                            67,
                            56
                        ],
                        0.06,
                        [
                            89,
                            78
                        ],
                        0.05,
                        0.12
                    ],
                    16,
                    0
                ],
                "fill-antialias": false
            },
            "metadata": {
                "mapbox:featureComponent": "terrain",
                "mapbox:group": "Terrain, land"
            }
        },
        {
            "minzoom": 13,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "land-and-water",
                "mapbox:group": "Land, water, & sky, built"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "Polygon"
                ],
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "land"
                ]
            ],
            "type": "fill",
            "source": "composite",
            "id": "land-structure-polygon",
            "paint": {
                "fill-color": "hsl(30, 18%, 92%)"
            },
            "source-layer": "structure"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-cap": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "land-and-water",
                "mapbox:group": "Land, water, & sky, built"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ],
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "land"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "land-structure-line",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.99
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    0.75,
                    20,
                    40
                ],
                "line-color": "hsl(30, 18%, 92%)"
            },
            "source-layer": "structure"
        },
        {
            "minzoom": 11,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "transit",
                "mapbox:group": "Transit, built"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "Polygon"
                ],
                [
                    "match",
                    [
                        "get",
                        "type"
                    ],
                    [
                        "runway",
                        "taxiway",
                        "helipad"
                    ],
                    true,
                    false
                ]
            ],
            "type": "fill",
            "source": "composite",
            "id": "aeroway-polygon",
            "paint": {
                "fill-color": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    "rgb(207, 210, 225)",
                    16,
                    "rgb(211, 215, 231)"
                ],
                "fill-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    11,
                    0,
                    11.5,
                    1
                ]
            },
            "source-layer": "aeroway"
        },
        {
            "minzoom": 9,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "transit",
                "mapbox:group": "Transit, built"
            },
            "filter": [
                "==",
                [
                    "geometry-type"
                ],
                "LineString"
            ],
            "type": "line",
            "source": "composite",
            "id": "aeroway-line",
            "paint": {
                "line-color": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    "rgb(207, 210, 225)",
                    16,
                    "rgb(211, 215, 231)"
                ],
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    9,
                    [
                        "match",
                        [
                            "get",
                            "type"
                        ],
                        "runway",
                        1,
                        0.5
                    ],
                    18,
                    [
                        "match",
                        [
                            "get",
                            "type"
                        ],
                        "runway",
                        80,
                        20
                    ]
                ]
            },
            "source-layer": "aeroway"
        },
        {
            "minzoom": 15,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "buildings",
                "mapbox:group": "Buildings, built"
            },
            "filter": [
                "all",
                [
                    "!=",
                    [
                        "get",
                        "type"
                    ],
                    "building:part"
                ],
                [
                    "==",
                    [
                        "get",
                        "underground"
                    ],
                    "false"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "building-outline",
            "paint": {
                "line-color": "hsl(30, 14%, 83%)",
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    0.75,
                    20,
                    3
                ],
                "line-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    0,
                    16,
                    1
                ]
            },
            "source-layer": "building"
        },
        {
            "minzoom": 15,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "buildings",
                "mapbox:group": "Buildings, built"
            },
            "filter": [
                "all",
                [
                    "!=",
                    [
                        "get",
                        "type"
                    ],
                    "building:part"
                ],
                [
                    "==",
                    [
                        "get",
                        "underground"
                    ],
                    "false"
                ]
            ],
            "type": "fill",
            "source": "composite",
            "id": "building",
            "paint": {
                "fill-color": [
                    "match",
                    [
                        "get",
                        "type"
                    ],
                    [
                        "train_station"
                    ],
                    "#ebc8c6",
                    "#e8e5de"
                ],
                "fill-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    0,
                    16,
                    1
                ],
                "fill-outline-color": "hsl(30, 14%, 83%)"
            },
            "source-layer": "building"
        },
        {
            "minzoom": 15,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "buildings",
                "mapbox:group": "Buildings, built"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "underground"
                    ],
                    "true"
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "Polygon"
                ]
            ],
            "type": "fill",
            "source": "composite",
            "id": "building-underground",
            "paint": {
                "fill-color": "#c1aaee",
                "fill-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    0,
                    16,
                    0.5
                ]
            },
            "source-layer": "building"
        },
        {
            "minzoom": 12,
            "layout": {},
            "metadata": {
                "mapbox:group": "6e4f8d057eb83efc54d4bf211ab4ac9d"
            },
            "maxzoom": 16,
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "type"
                    ],
                    [
                        "train_station"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "get",
                        "underground"
                    ],
                    "false"
                ]
            ],
            "type": "fill",
            "source": "composite",
            "id": "building low zoom",
            "paint": {
                "fill-color": "#ebc8c6",
                "fill-outline-color": "hsl(3, 48%, 75%)"
            },
            "source-layer": "building"
        },
        {
            "minzoom": 13,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, tunnels-case"
            },
            "maxzoom": 14,
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "tunnel"
                ],
                [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "primary_link",
                            "track"
                        ],
                        true,
                        false
                    ],
                    14,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "track",
                            "primary_link",
                            "secondary_link",
                            "tertiary_link",
                            "service"
                        ],
                        true,
                        false
                    ]
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "tunnel-street-minor-low",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.5,
                    14,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "primary_link"
                        ],
                        2,
                        "track",
                        1,
                        0.5
                    ],
                    18,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "primary_link"
                        ],
                        18,
                        12
                    ]
                ],
                "line-color": "hsl(0, 0%, 100%)"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, tunnels-case"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "tunnel"
                ],
                [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "primary_link",
                            "track"
                        ],
                        true,
                        false
                    ],
                    14,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "track",
                            "primary_link",
                            "secondary_link",
                            "tertiary_link",
                            "service"
                        ],
                        true,
                        false
                    ]
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "tunnel-street-minor-case",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.75,
                    20,
                    2
                ],
                "line-color": "rgb(178, 183, 203)",
                "line-gap-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.5,
                    14,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "primary_link"
                        ],
                        2,
                        "track",
                        1,
                        0.5
                    ],
                    18,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "primary_link"
                        ],
                        18,
                        12
                    ]
                ],
                "line-opacity": [
                    "step",
                    [
                        "zoom"
                    ],
                    0,
                    14,
                    1
                ],
                "line-dasharray": [
                    3,
                    3
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, tunnels-case"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "tunnel"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "primary",
                        "secondary",
                        "tertiary"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "tunnel-primary-secondary-tertiary-case",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    10,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "primary",
                        1,
                        0.75
                    ],
                    18,
                    2
                ],
                "line-color": "rgb(178, 183, 203)",
                "line-gap-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    5,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "primary",
                        0.75,
                        0.1
                    ],
                    18,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "primary",
                        32,
                        26
                    ]
                ],
                "line-dasharray": [
                    3,
                    3
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, tunnels-case"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "tunnel"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway_link",
                        "trunk_link"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "tunnel-major-link-case",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.75,
                    20,
                    2
                ],
                "line-color": "hsl(0, 0%, 100%)",
                "line-gap-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-dasharray": [
                    3,
                    3
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, tunnels-case"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "tunnel"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway",
                        "trunk"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "tunnel-motorway-trunk-case",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    10,
                    1,
                    18,
                    2
                ],
                "line-color": "rgb(254, 255, 255)",
                "line-gap-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    5,
                    0.75,
                    18,
                    32
                ],
                "line-dasharray": [
                    3,
                    3
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 14,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, tunnels-case"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "tunnel"
                ],
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "construction"
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "tunnel-construction",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    2,
                    18,
                    18
                ],
                "line-color": "#d8dbe8",
                "line-dasharray": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "literal",
                        [
                            0.4,
                            0.8
                        ]
                    ],
                    15,
                    [
                        "literal",
                        [
                            0.3,
                            0.6
                        ]
                    ],
                    16,
                    [
                        "literal",
                        [
                            0.2,
                            0.3
                        ]
                    ],
                    17,
                    [
                        "literal",
                        [
                            0.2,
                            0.25
                        ]
                    ],
                    18,
                    [
                        "literal",
                        [
                            0.15,
                            0.15
                        ]
                    ]
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 14,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., tunnels"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "tunnel"
                ],
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "path"
                ],
                [
                    "!=",
                    [
                        "get",
                        "type"
                    ],
                    "steps"
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "tunnel-path",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    1,
                    18,
                    4
                ],
                "line-color": "hsl(30, 32%, 95%)",
                "line-dasharray": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "literal",
                        [
                            1,
                            0
                        ]
                    ],
                    15,
                    [
                        "literal",
                        [
                            1.75,
                            1
                        ]
                    ],
                    16,
                    [
                        "literal",
                        [
                            1,
                            0.75
                        ]
                    ],
                    17,
                    [
                        "literal",
                        [
                            1,
                            0.5
                        ]
                    ]
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 14,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., tunnels"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "tunnel"
                ],
                [
                    "==",
                    [
                        "get",
                        "type"
                    ],
                    "steps"
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "tunnel-steps",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    1,
                    16,
                    1.6,
                    18,
                    6
                ],
                "line-color": "hsl(30, 32%, 95%)",
                "line-dasharray": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "literal",
                        [
                            1,
                            0
                        ]
                    ],
                    15,
                    [
                        "literal",
                        [
                            1.75,
                            1
                        ]
                    ],
                    16,
                    [
                        "literal",
                        [
                            1,
                            0.75
                        ]
                    ],
                    17,
                    [
                        "literal",
                        [
                            0.3,
                            0.3
                        ]
                    ]
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., tunnels"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "tunnel"
                ],
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "pedestrian"
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "tunnel-pedestrian",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    0.5,
                    18,
                    12
                ],
                "line-color": "hsl(0, 0%, 100%)",
                "line-dasharray": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "literal",
                        [
                            1,
                            0
                        ]
                    ],
                    15,
                    [
                        "literal",
                        [
                            1.5,
                            0.4
                        ]
                    ],
                    16,
                    [
                        "literal",
                        [
                            1,
                            0.2
                        ]
                    ]
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, tunnels"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "tunnel"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway_link",
                        "trunk_link"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "tunnel-major-link",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-color": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "motorway_link",
                    "rgb(255, 220, 193)",
                    "rgb(248, 237, 200)"
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, tunnels"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "tunnel"
                ],
                [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "primary_link",
                            "track"
                        ],
                        true,
                        false
                    ],
                    14,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "track",
                            "primary_link",
                            "secondary_link",
                            "tertiary_link",
                            "service"
                        ],
                        true,
                        false
                    ]
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "tunnel-street-minor",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.5,
                    14,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "primary_link"
                        ],
                        2,
                        "track",
                        1,
                        0.5
                    ],
                    18,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "primary_link"
                        ],
                        18,
                        12
                    ]
                ],
                "line-color": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "street_limited",
                    "hsl(30, 22%, 96%)",
                    "hsl(0, 0%, 100%)"
                ],
                "line-opacity": [
                    "step",
                    [
                        "zoom"
                    ],
                    0,
                    14,
                    1
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, tunnels"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "tunnel"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "primary",
                        "secondary",
                        "tertiary"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "tunnel-primary-secondary-tertiary",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    5,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "primary",
                        0.75,
                        0.1
                    ],
                    18,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "primary",
                        32,
                        26
                    ]
                ],
                "line-color": "hsl(0, 0%, 100%)"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 15,
            "layout": {
                "symbol-placement": "line",
                "icon-image": [
                    "step",
                    [
                        "zoom"
                    ],
                    "oneway-small",
                    18,
                    "oneway-large"
                ],
                "symbol-spacing": 200,
                "icon-rotation-alignment": "map"
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, tunnels"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "tunnel"
                ],
                [
                    "==",
                    [
                        "get",
                        "oneway"
                    ],
                    "true"
                ],
                [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "primary",
                            "secondary",
                            "street",
                            "street_limited",
                            "tertiary"
                        ],
                        true,
                        false
                    ],
                    16,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "primary",
                            "secondary",
                            "tertiary",
                            "street",
                            "street_limited",
                            "primary_link",
                            "secondary_link",
                            "tertiary_link",
                            "service",
                            "track"
                        ],
                        true,
                        false
                    ]
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "tunnel-oneway-arrow-blue",
            "paint": {},
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, tunnels"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "tunnel"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway",
                        "trunk"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "tunnel-motorway-trunk",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    5,
                    0.75,
                    18,
                    32
                ],
                "line-color": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "motorway",
                    "rgb(255, 220, 193)",
                    "rgb(248, 237, 200)"
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 16,
            "layout": {
                "symbol-placement": "line",
                "icon-image": [
                    "step",
                    [
                        "zoom"
                    ],
                    "oneway-white-small",
                    18,
                    "oneway-white-large"
                ],
                "symbol-spacing": 200
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, tunnels"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "tunnel"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway",
                        "motorway_link",
                        "trunk",
                        "trunk_link"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "get",
                        "oneway"
                    ],
                    "true"
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "tunnel-oneway-arrow-white",
            "paint": {},
            "source-layer": "road"
        },
        {
            "minzoom": 8,
            "layout": {
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "transit",
                "mapbox:group": "Transit, ferries"
            },
            "filter": [
                "==",
                [
                    "get",
                    "type"
                ],
                "ferry"
            ],
            "type": "line",
            "source": "composite",
            "id": "ferry",
            "paint": {
                "line-color": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    "rgb(131, 189, 231)",
                    17,
                    "rgb(131, 148, 231)"
                ],
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    0.5,
                    20,
                    1
                ],
                "line-dasharray": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "literal",
                        [
                            1,
                            0
                        ]
                    ],
                    13,
                    [
                        "literal",
                        [
                            12,
                            4
                        ]
                    ]
                ]
            },
            "source-layer": "road"
        },
        {
            "id": "ferry-auto",
            "type": "line",
            "source": "composite",
            "source-layer": "road",
            "filter": [
                "==",
                [
                    "get",
                    "type"
                ],
                "ferry_auto"
            ],
            "layout": {
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "paint": {
                "line-color": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    "rgb(131, 189, 231)",
                    17,
                    "rgb(131, 148, 231)"
                ],
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    0.5,
                    20,
                    1
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "transit",
                "mapbox:group": "Transit, ferries"
            }
        },
        {
            "minzoom": 12,
            "layout": {
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., surface"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "path"
                ],
                [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "!",
                        [
                            "match",
                            [
                                "get",
                                "type"
                            ],
                            [
                                "steps",
                                "sidewalk",
                                "crossing"
                            ],
                            true,
                            false
                        ]
                    ],
                    16,
                    [
                        "!=",
                        [
                            "get",
                            "type"
                        ],
                        "steps"
                    ]
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-path-bg",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    2,
                    18,
                    7
                ],
                "line-color": "rgb(201, 204, 216)"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 14,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., surface"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "type"
                    ],
                    "steps"
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-steps-bg",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    2,
                    17,
                    4.6,
                    18,
                    7
                ],
                "line-opacity": 0.75,
                "line-color": "rgb(201, 204, 216)"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 14,
            "layout": {
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., surface"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "pedestrian"
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-pedestrian-case",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    2,
                    18,
                    14.5
                ],
                "line-color": "#d8dbe8"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 12,
            "layout": {
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., surface"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "path"
                ],
                [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "!",
                        [
                            "match",
                            [
                                "get",
                                "type"
                            ],
                            [
                                "steps",
                                "sidewalk",
                                "crossing"
                            ],
                            true,
                            false
                        ]
                    ],
                    16,
                    [
                        "!=",
                        [
                            "get",
                            "type"
                        ],
                        "steps"
                    ]
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-path",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    13,
                    0.5,
                    14,
                    1,
                    15,
                    1,
                    18,
                    4
                ],
                "line-color": "hsl(0, 0%, 100%)",
                "line-dasharray": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "literal",
                        [
                            4,
                            0.3
                        ]
                    ],
                    15,
                    [
                        "literal",
                        [
                            1.75,
                            0.3
                        ]
                    ],
                    16,
                    [
                        "literal",
                        [
                            1,
                            0.3
                        ]
                    ],
                    17,
                    [
                        "literal",
                        [
                            1,
                            0.25
                        ]
                    ]
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 14,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., surface"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "type"
                    ],
                    "steps"
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-steps",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    1,
                    16,
                    1.6,
                    18,
                    6
                ],
                "line-color": "hsl(0, 0%, 100%)",
                "line-dasharray": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "literal",
                        [
                            1,
                            0
                        ]
                    ],
                    15,
                    [
                        "literal",
                        [
                            1.75,
                            1
                        ]
                    ],
                    16,
                    [
                        "literal",
                        [
                            1,
                            0.75
                        ]
                    ],
                    17,
                    [
                        "literal",
                        [
                            0.3,
                            0.3
                        ]
                    ]
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 12,
            "layout": {
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., surface"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "pedestrian"
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-pedestrian",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    0.5,
                    18,
                    12
                ],
                "line-color": "hsl(0, 0%, 100%)",
                "line-dasharray": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "literal",
                        [
                            1,
                            0
                        ]
                    ],
                    15,
                    [
                        "literal",
                        [
                            1.5,
                            0.4
                        ]
                    ],
                    16,
                    [
                        "literal",
                        [
                            1,
                            0.2
                        ]
                    ]
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 12,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., surface"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "Polygon"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "path",
                        "pedestrian"
                    ],
                    true,
                    false
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "case",
                    [
                        "has",
                        "layer"
                    ],
                    [
                        ">=",
                        [
                            "get",
                            "layer"
                        ],
                        0
                    ],
                    true
                ]
            ],
            "type": "fill",
            "source": "composite",
            "id": "road-pedestrian-polygon-fill",
            "paint": {
                "fill-color": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    16,
                    "rgb(237, 238, 242)",
                    16.25,
                    "rgb(247, 248, 252)"
                ],
                "fill-outline-color": "#d8dbe8"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 16,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., surface"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "Polygon"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "path",
                        "pedestrian"
                    ],
                    true,
                    false
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "case",
                    [
                        "has",
                        "layer"
                    ],
                    [
                        ">=",
                        [
                            "get",
                            "layer"
                        ],
                        0
                    ],
                    true
                ]
            ],
            "type": "fill",
            "source": "composite",
            "id": "road-pedestrian-polygon-pattern",
            "paint": {
                "fill-pattern": "pedestrian-polygon",
                "fill-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    16,
                    0,
                    16.25,
                    1
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 16,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., surface"
            },
            "filter": [
                "==",
                [
                    "get",
                    "class"
                ],
                "golf"
            ],
            "type": "line",
            "source": "composite",
            "id": "golf-hole-line",
            "paint": {
                "line-color": "hsl(99, 29%, 72%)"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 15,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "Point"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "turning_circle",
                        "turning_loop"
                    ],
                    true,
                    false
                ]
            ],
            "type": "circle",
            "source": "composite",
            "id": "turning-feature-outline",
            "paint": {
                "circle-radius": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    4.5,
                    16,
                    8,
                    18,
                    20
                ],
                "circle-color": "hsl(0, 0%, 100%)",
                "circle-stroke-width": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    0.8,
                    16,
                    1.2,
                    18,
                    2
                ],
                "circle-stroke-color": "#d8dbe8"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    14,
                    "round"
                ],
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface"
            },
            "maxzoom": 14,
            "filter": [
                "all",
                [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "track"
                    ],
                    14,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "track",
                            "secondary_link",
                            "tertiary_link",
                            "service"
                        ],
                        true,
                        false
                    ]
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-minor-low",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "track",
                        1,
                        0.5
                    ],
                    18,
                    12
                ],
                "line-color": "hsl(0, 0%, 100%)"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    14,
                    "round"
                ],
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface"
            },
            "filter": [
                "all",
                [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "track"
                    ],
                    14,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "track",
                            "secondary_link",
                            "tertiary_link",
                            "service"
                        ],
                        true,
                        false
                    ]
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-minor-case",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.75,
                    20,
                    2
                ],
                "line-color": "#d8dbe8",
                "line-gap-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "track",
                        1,
                        0.5
                    ],
                    18,
                    12
                ],
                "line-opacity": [
                    "step",
                    [
                        "zoom"
                    ],
                    0,
                    14,
                    1
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 11,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    14,
                    "round"
                ],
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface"
            },
            "maxzoom": 14,
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "street",
                        "street_limited",
                        "primary_link"
                    ],
                    true,
                    false
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-street-low",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-color": "hsl(0, 0%, 100%)"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    14,
                    "round"
                ],
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface"
            },
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "street",
                        "street_limited",
                        "primary_link"
                    ],
                    true,
                    false
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-street-case",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.75,
                    20,
                    2
                ],
                "line-color": "#d8dbe8",
                "line-gap-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-opacity": [
                    "step",
                    [
                        "zoom"
                    ],
                    0,
                    14,
                    1
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 10,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    14,
                    "round"
                ],
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface"
            },
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "secondary",
                        "tertiary"
                    ],
                    true,
                    false
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-secondary-tertiary-case",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    10,
                    0.75,
                    18,
                    2
                ],
                "line-color": "#d8dbe8",
                "line-gap-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    5,
                    0.1,
                    18,
                    26
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 10,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    14,
                    "round"
                ],
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "primary"
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-primary-case",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    10,
                    1,
                    18,
                    2
                ],
                "line-color": "#d8dbe8",
                "line-gap-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    5,
                    0.75,
                    18,
                    32
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 10,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    14,
                    "round"
                ],
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface"
            },
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway_link",
                        "trunk_link"
                    ],
                    true,
                    false
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-major-link-case",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.75,
                    20,
                    2
                ],
                "line-color": "rgb(254, 255, 255)",
                "line-gap-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-opacity": [
                    "step",
                    [
                        "zoom"
                    ],
                    0,
                    11,
                    1
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 5,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    14,
                    "round"
                ],
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface"
            },
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway",
                        "trunk"
                    ],
                    true,
                    false
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-motorway-trunk-case",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    10,
                    1,
                    18,
                    2
                ],
                "line-color": "rgb(254, 255, 255)",
                "line-gap-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    5,
                    0.75,
                    18,
                    32
                ],
                "line-opacity": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "motorway",
                        1,
                        0
                    ],
                    6,
                    1
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 14,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "construction"
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-construction",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    2,
                    18,
                    18
                ],
                "line-color": "hsl(0, 0%, 100%)",
                "line-dasharray": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "literal",
                        [
                            0.4,
                            0.8
                        ]
                    ],
                    15,
                    [
                        "literal",
                        [
                            0.3,
                            0.6
                        ]
                    ],
                    16,
                    [
                        "literal",
                        [
                            0.2,
                            0.3
                        ]
                    ],
                    17,
                    [
                        "literal",
                        [
                            0.2,
                            0.25
                        ]
                    ],
                    18,
                    [
                        "literal",
                        [
                            0.15,
                            0.15
                        ]
                    ]
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 10,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    13,
                    "round"
                ],
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    13,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface"
            },
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway_link",
                        "trunk_link"
                    ],
                    true,
                    false
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-major-link",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-color": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "motorway_link",
                    "rgb(255, 191, 142)",
                    "rgb(248, 226, 149)"
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 12,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "Polygon"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "primary",
                        "secondary",
                        "tertiary",
                        "primary_link",
                        "secondary_link",
                        "tertiary_link",
                        "trunk",
                        "trunk_link",
                        "street",
                        "street_limited",
                        "track",
                        "service"
                    ],
                    true,
                    false
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ]
            ],
            "type": "fill",
            "source": "composite",
            "id": "road-polygon",
            "paint": {
                "fill-color": "hsl(0, 0%, 100%)",
                "fill-outline-color": "#d8dbe8"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    14,
                    "round"
                ],
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface"
            },
            "filter": [
                "all",
                [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "==",
                        [
                            "get",
                            "class"
                        ],
                        "track"
                    ],
                    14,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "track",
                            "secondary_link",
                            "tertiary_link",
                            "service"
                        ],
                        true,
                        false
                    ]
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-minor",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "track",
                        1,
                        0.5
                    ],
                    18,
                    12
                ],
                "line-color": "hsl(0, 0%, 100%)",
                "line-opacity": [
                    "step",
                    [
                        "zoom"
                    ],
                    0,
                    14,
                    1
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    14,
                    "round"
                ],
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface"
            },
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "street",
                        "street_limited",
                        "primary_link"
                    ],
                    true,
                    false
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-street",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-color": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "street_limited",
                    "hsl(30, 22%, 96%)",
                    "hsl(0, 0%, 100%)"
                ],
                "line-opacity": [
                    "step",
                    [
                        "zoom"
                    ],
                    0,
                    14,
                    1
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 8,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    14,
                    "round"
                ],
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface"
            },
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "secondary",
                        "tertiary"
                    ],
                    true,
                    false
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-secondary-tertiary",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    5,
                    0.1,
                    18,
                    26
                ],
                "line-color": "hsl(0, 0%, 100%)"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 6,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    14,
                    "round"
                ],
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "primary"
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-primary",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    5,
                    0.75,
                    18,
                    32
                ],
                "line-color": "hsl(0, 0%, 100%)"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 15,
            "layout": {
                "symbol-placement": "line",
                "icon-image": [
                    "step",
                    [
                        "zoom"
                    ],
                    "oneway-small",
                    18,
                    "oneway-large"
                ],
                "symbol-spacing": 200,
                "icon-rotation-alignment": "map"
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "oneway"
                    ],
                    "true"
                ],
                [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "primary",
                            "secondary",
                            "tertiary",
                            "street",
                            "street_limited"
                        ],
                        true,
                        false
                    ],
                    16,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "primary",
                            "secondary",
                            "tertiary",
                            "street",
                            "street_limited",
                            "primary_link",
                            "secondary_link",
                            "tertiary_link",
                            "service",
                            "track"
                        ],
                        true,
                        false
                    ]
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "road-oneway-arrow-blue",
            "paint": {},
            "source-layer": "road"
        },
        {
            "id": "road-motorway-trunk",
            "type": "line",
            "source": "composite",
            "source-layer": "road",
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway",
                        "trunk"
                    ],
                    true,
                    false
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    13,
                    "round"
                ],
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    13,
                    "round"
                ]
            },
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    5,
                    0.75,
                    18,
                    32
                ],
                "line-color": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "motorway",
                        "rgb(246, 175, 120)",
                        "hsl(0, 0%, 100%)"
                    ],
                    6,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "motorway",
                        "rgb(246, 175, 120)",
                        "rgb(240, 211, 116)"
                    ],
                    9,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "motorway",
                        "rgb(255, 191, 142)",
                        "rgb(248, 226, 149)"
                    ]
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface"
            }
        },
        {
            "minzoom": 13,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "transit",
                "mapbox:group": "Transit, surface"
            },
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "major_rail",
                        "minor_rail"
                    ],
                    true,
                    false
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-rail",
            "paint": {
                "line-color": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    13,
                    "hsl(45, 25%, 84%)",
                    16,
                    "rgb(182, 184, 195)"
                ],
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    0.5,
                    20,
                    1
                ],
                "line-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    14.99,
                    0,
                    15,
                    1
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "transit",
                "mapbox:group": "Transit, surface"
            },
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "major_rail",
                        "minor_rail"
                    ],
                    true,
                    false
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "road-rail-tracks",
            "paint": {
                "line-color": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    13,
                    "hsl(45, 25%, 84%)",
                    16,
                    "rgb(182, 184, 195)"
                ],
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    4,
                    20,
                    8
                ],
                "line-dasharray": [
                    0.1,
                    15
                ],
                "line-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    14.99,
                    0,
                    15,
                    1
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 16,
            "layout": {
                "icon-image": "level-crossing",
                "icon-allow-overlap": true
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface-icons"
            },
            "filter": [
                "==",
                [
                    "get",
                    "class"
                ],
                "level_crossing"
            ],
            "type": "symbol",
            "source": "composite",
            "id": "level-crossing",
            "paint": {},
            "source-layer": "road"
        },
        {
            "minzoom": 16,
            "layout": {
                "symbol-placement": "line",
                "icon-image": [
                    "step",
                    [
                        "zoom"
                    ],
                    "oneway-white-small",
                    18,
                    "oneway-white-large"
                ],
                "symbol-spacing": 200
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface-icons"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "oneway"
                    ],
                    "true"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway",
                        "trunk",
                        "motorway_link",
                        "trunk_link"
                    ],
                    true,
                    false
                ],
                [
                    "match",
                    [
                        "get",
                        "structure"
                    ],
                    [
                        "none",
                        "ford"
                    ],
                    true,
                    false
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "road-oneway-arrow-white",
            "paint": {},
            "source-layer": "road"
        },
        {
            "minzoom": 15,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, surface-icons"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "Point"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "turning_circle",
                        "turning_loop"
                    ],
                    true,
                    false
                ]
            ],
            "type": "circle",
            "source": "composite",
            "id": "turning-feature",
            "paint": {
                "circle-radius": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    4.5,
                    16,
                    8,
                    18,
                    20
                ],
                "circle-color": "hsl(0, 0%, 100%)"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 14,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    14,
                    "round"
                ],
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., barriers-bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "path"
                ],
                [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "!",
                        [
                            "match",
                            [
                                "get",
                                "type"
                            ],
                            [
                                "steps",
                                "sidewalk",
                                "crossing"
                            ],
                            true,
                            false
                        ]
                    ],
                    16,
                    [
                        "!=",
                        [
                            "get",
                            "type"
                        ],
                        "steps"
                    ]
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-path-bg",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    2,
                    18,
                    7
                ],
                "line-color": "rgb(201, 204, 216)"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 14,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., barriers-bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "type"
                    ],
                    "steps"
                ],
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-steps-bg",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    2,
                    17,
                    4.6,
                    18,
                    7
                ],
                "line-opacity": 0.75,
                "line-color": "rgb(201, 204, 216)"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 14,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., barriers-bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "pedestrian"
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-pedestrian-case",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    2,
                    18,
                    14.5
                ],
                "line-color": "#d8dbe8"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 14,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., barriers-bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "path"
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ],
                [
                    "!=",
                    [
                        "get",
                        "type"
                    ],
                    "steps"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-path",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    1,
                    18,
                    4
                ],
                "line-color": "hsl(0, 0%, 100%)",
                "line-dasharray": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "literal",
                        [
                            4,
                            0.3
                        ]
                    ],
                    15,
                    [
                        "literal",
                        [
                            1.75,
                            0.3
                        ]
                    ],
                    16,
                    [
                        "literal",
                        [
                            1,
                            0.3
                        ]
                    ],
                    17,
                    [
                        "literal",
                        [
                            1,
                            0.25
                        ]
                    ]
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 14,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., barriers-bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "type"
                    ],
                    "steps"
                ],
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-steps",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    1,
                    16,
                    1.6,
                    18,
                    6
                ],
                "line-color": "hsl(0, 0%, 100%)",
                "line-dasharray": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "literal",
                        [
                            1,
                            0
                        ]
                    ],
                    15,
                    [
                        "literal",
                        [
                            1.75,
                            1
                        ]
                    ],
                    16,
                    [
                        "literal",
                        [
                            1,
                            0.75
                        ]
                    ],
                    17,
                    [
                        "literal",
                        [
                            0.3,
                            0.3
                        ]
                    ]
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., barriers-bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "pedestrian"
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-pedestrian",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    0.5,
                    18,
                    12
                ],
                "line-color": "hsl(0, 0%, 100%)",
                "line-dasharray": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "literal",
                        [
                            1,
                            0
                        ]
                    ],
                    15,
                    [
                        "literal",
                        [
                            1.5,
                            0.4
                        ]
                    ],
                    16,
                    [
                        "literal",
                        [
                            1,
                            0.2
                        ]
                    ]
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    14,
                    "round"
                ],
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, bridges"
            },
            "maxzoom": 14,
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "primary_link",
                            "track"
                        ],
                        true,
                        false
                    ],
                    14,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "track",
                            "primary_link",
                            "secondary_link",
                            "tertiary_link",
                            "service"
                        ],
                        true,
                        false
                    ]
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-street-minor-low",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.5,
                    14,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "primary_link"
                        ],
                        2,
                        "track",
                        1,
                        0.5
                    ],
                    18,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "primary_link"
                        ],
                        18,
                        12
                    ]
                ],
                "line-color": "hsl(0, 0%, 100%)"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "primary_link",
                            "track"
                        ],
                        true,
                        false
                    ],
                    14,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "track",
                            "primary_link",
                            "secondary_link",
                            "tertiary_link",
                            "service"
                        ],
                        true,
                        false
                    ]
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-street-minor-case",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.75,
                    20,
                    2
                ],
                "line-color": "#d8dbe8",
                "line-gap-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.5,
                    14,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "primary_link"
                        ],
                        2,
                        "track",
                        1,
                        0.5
                    ],
                    18,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "primary_link"
                        ],
                        18,
                        12
                    ]
                ],
                "line-opacity": [
                    "step",
                    [
                        "zoom"
                    ],
                    0,
                    14,
                    1
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "primary",
                        "secondary",
                        "tertiary"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-primary-secondary-tertiary-case",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    10,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "primary",
                        1,
                        0.75
                    ],
                    18,
                    2
                ],
                "line-color": "#d8dbe8",
                "line-gap-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    5,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "primary",
                        0.75,
                        0.1
                    ],
                    18,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "primary",
                        32,
                        26
                    ]
                ],
                "line-opacity": [
                    "step",
                    [
                        "zoom"
                    ],
                    0,
                    10,
                    1
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway_link",
                        "trunk_link"
                    ],
                    true,
                    false
                ],
                [
                    "<=",
                    [
                        "get",
                        "layer"
                    ],
                    1
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-major-link-case",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.75,
                    20,
                    2
                ],
                "line-color": "rgb(254, 255, 255)",
                "line-gap-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway",
                        "trunk"
                    ],
                    true,
                    false
                ],
                [
                    "<=",
                    [
                        "get",
                        "layer"
                    ],
                    1
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-motorway-trunk-case",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    10,
                    1,
                    18,
                    2
                ],
                "line-color": "rgb(254, 255, 255)",
                "line-gap-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    5,
                    0.75,
                    18,
                    32
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 14,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "construction"
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-construction",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    2,
                    18,
                    18
                ],
                "line-color": "#d8dbe8",
                "line-dasharray": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "literal",
                        [
                            0.4,
                            0.8
                        ]
                    ],
                    15,
                    [
                        "literal",
                        [
                            0.3,
                            0.6
                        ]
                    ],
                    16,
                    [
                        "literal",
                        [
                            0.2,
                            0.3
                        ]
                    ],
                    17,
                    [
                        "literal",
                        [
                            0.2,
                            0.25
                        ]
                    ],
                    18,
                    [
                        "literal",
                        [
                            0.15,
                            0.15
                        ]
                    ]
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway_link",
                        "trunk_link"
                    ],
                    true,
                    false
                ],
                [
                    "<=",
                    [
                        "get",
                        "layer"
                    ],
                    1
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-major-link",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-color": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "motorway_link",
                    "rgb(255, 191, 142)",
                    "rgb(248, 226, 149)"
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    14,
                    "round"
                ],
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "primary_link",
                            "track"
                        ],
                        true,
                        false
                    ],
                    14,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "track",
                            "primary_link",
                            "secondary_link",
                            "tertiary_link",
                            "service"
                        ],
                        true,
                        false
                    ]
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-street-minor",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.5,
                    14,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "primary_link"
                        ],
                        2,
                        "track",
                        1,
                        0.5
                    ],
                    18,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "street",
                            "street_limited",
                            "primary_link"
                        ],
                        18,
                        12
                    ]
                ],
                "line-color": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "street_limited",
                    "hsl(30, 22%, 96%)",
                    "hsl(0, 0%, 100%)"
                ],
                "line-opacity": [
                    "step",
                    [
                        "zoom"
                    ],
                    0,
                    14,
                    1
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    14,
                    "round"
                ],
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "primary",
                        "secondary",
                        "tertiary"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-primary-secondary-tertiary",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    5,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "primary",
                        0.75,
                        0.1
                    ],
                    18,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "primary",
                        32,
                        26
                    ]
                ],
                "line-color": "hsl(0, 0%, 100%)"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 15,
            "layout": {
                "symbol-placement": "line",
                "icon-image": [
                    "step",
                    [
                        "zoom"
                    ],
                    "oneway-small",
                    18,
                    "oneway-large"
                ],
                "symbol-spacing": 200,
                "icon-rotation-alignment": "map"
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "==",
                    [
                        "get",
                        "oneway"
                    ],
                    "true"
                ],
                [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "primary",
                            "secondary",
                            "tertiary",
                            "street",
                            "street_limited"
                        ],
                        true,
                        false
                    ],
                    16,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "primary",
                            "secondary",
                            "tertiary",
                            "street",
                            "street_limited",
                            "primary_link",
                            "secondary_link",
                            "tertiary_link",
                            "service",
                            "track"
                        ],
                        true,
                        false
                    ]
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "bridge-oneway-arrow-blue",
            "paint": {},
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway",
                        "trunk"
                    ],
                    true,
                    false
                ],
                [
                    "<=",
                    [
                        "get",
                        "layer"
                    ],
                    1
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-motorway-trunk",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    5,
                    0.75,
                    18,
                    32
                ],
                "line-color": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "motorway",
                    "rgb(255, 191, 142)",
                    "rgb(248, 226, 149)"
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    ">=",
                    [
                        "get",
                        "layer"
                    ],
                    2
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway_link",
                        "trunk_link"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-major-link-2-case",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.75,
                    20,
                    2
                ],
                "line-color": "rgb(254, 255, 255)",
                "line-gap-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    ">=",
                    [
                        "get",
                        "layer"
                    ],
                    2
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway",
                        "trunk"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-motorway-trunk-2-case",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    10,
                    1,
                    18,
                    2
                ],
                "line-color": "rgb(254, 255, 255)",
                "line-gap-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    5,
                    0.75,
                    18,
                    32
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-cap": "round",
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    ">=",
                    [
                        "get",
                        "layer"
                    ],
                    2
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway_link",
                        "trunk_link"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-major-link-2",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    0.5,
                    14,
                    2,
                    18,
                    18
                ],
                "line-color": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "motorway_link",
                    "rgb(255, 191, 142)",
                    "rgb(248, 226, 149)"
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-cap": [
                    "step",
                    [
                        "zoom"
                    ],
                    "butt",
                    14,
                    "round"
                ],
                "line-join": [
                    "step",
                    [
                        "zoom"
                    ],
                    "miter",
                    14,
                    "round"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    ">=",
                    [
                        "get",
                        "layer"
                    ],
                    2
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway",
                        "trunk"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-motorway-trunk-2",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    5,
                    0.75,
                    18,
                    32
                ],
                "line-color": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "motorway",
                    "rgb(255, 191, 142)",
                    "rgb(248, 226, 149)"
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 16,
            "layout": {
                "symbol-placement": "line",
                "icon-image": "oneway-white-small",
                "symbol-spacing": 200
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway",
                        "trunk",
                        "motorway_link",
                        "trunk_link"
                    ],
                    true,
                    false
                ],
                [
                    "==",
                    [
                        "get",
                        "oneway"
                    ],
                    "true"
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "bridge-oneway-arrow-white",
            "paint": {},
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "transit",
                "mapbox:group": "Transit, bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "major_rail",
                        "minor_rail"
                    ],
                    true,
                    false
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-rail",
            "paint": {
                "line-color": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    13,
                    "hsl(45, 25%, 84%)",
                    16,
                    "rgb(182, 184, 195)"
                ],
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    0.5,
                    20,
                    1
                ],
                "line-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    14.99,
                    0,
                    15,
                    1
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "transit",
                "mapbox:group": "Transit, bridges"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "structure"
                    ],
                    "bridge"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "major_rail",
                        "minor_rail"
                    ],
                    true,
                    false
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "bridge-rail-tracks",
            "paint": {
                "line-color": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    13,
                    "hsl(45, 25%, 84%)",
                    16,
                    "rgb(182, 184, 195)"
                ],
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    4,
                    20,
                    8
                ],
                "line-dasharray": [
                    0.1,
                    15
                ],
                "line-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    14.99,
                    0,
                    15,
                    1
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 12,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "transit",
                "mapbox:group": "Transit, elevated"
            },
            "filter": [
                "==",
                [
                    "get",
                    "class"
                ],
                "aerialway"
            ],
            "type": "line",
            "source": "composite",
            "id": "aerialway-bg",
            "paint": {
                "line-color": "hsl(0, 0%, 100%)",
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    2.5,
                    20,
                    3
                ],
                "line-blur": 0.5
            },
            "source-layer": "road"
        },
        {
            "minzoom": 12,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "transit",
                "mapbox:group": "Transit, elevated"
            },
            "filter": [
                "==",
                [
                    "get",
                    "class"
                ],
                "aerialway"
            ],
            "type": "line",
            "source": "composite",
            "id": "aerialway",
            "paint": {
                "line-color": "rgb(72, 72, 77)",
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    14,
                    0.5,
                    20,
                    1
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 11,
            "layout": {},
            "metadata": {
                "mapbox:group": "e96c76ab47296d7cdab48ab9d0d9515c"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "mode"
                    ],
                    "metro_rail"
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "subway",
            "paint": {
                "line-color": [
                    "match",
                    [
                        "get",
                        "line_color"
                    ],
                    [
                        "blue"
                    ],
                    "hsl(205, 100%, 40%)",
                    [
                        "brown"
                    ],
                    "hsl(19, 94%, 31%)",
                    [
                        "gray"
                    ],
                    "hsl(37, 14%, 64%)",
                    [
                        "green"
                    ],
                    "hsl(120, 100%, 30%)",
                    [
                        "lime"
                    ],
                    "hsl(82, 58%, 52%)",
                    [
                        "orange"
                    ],
                    "hsl(34, 100%, 52%)",
                    [
                        "pink"
                    ],
                    "hsl(330, 83%, 56%)",
                    [
                        "purple"
                    ],
                    "hsl(268, 31%, 53%)",
                    [
                        "red"
                    ],
                    "hsl(5, 100%, 48%)",
                    [
                        "tan"
                    ],
                    "hsl(37, 59%, 52%)",
                    [
                        "teal"
                    ],
                    "hsl(192, 91%, 40%)",
                    [
                        "turquoise"
                    ],
                    "hsl(178, 100%, 33%)",
                    [
                        "violet"
                    ],
                    "hsl(323, 82%, 37%)",
                    "#b6b8c3"
                ],
                "line-opacity": 0.75,
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    12,
                    2,
                    17,
                    5
                ]
            },
            "source-layer": "transit_line"
        },
        {
            "minzoom": 9,
            "layout": {},
            "metadata": {
                "mapbox:group": "e96c76ab47296d7cdab48ab9d0d9515c"
            },
            "maxzoom": 15,
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "mode"
                    ],
                    [
                        "inter_regional_rail",
                        "regional_rail"
                    ],
                    true,
                    false
                ],
                [
                    "has",
                    "name"
                ],
                [
                    "!=",
                    [
                        "get",
                        "operator"
                    ],
                    "private"
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "rail-low-case",
            "paint": {
                "line-color": "#adadad",
                "line-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    14.99,
                    1,
                    15,
                    0
                ],
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    9,
                    1,
                    14,
                    2
                ],
                "line-gap-width": 1
            },
            "source-layer": "transit_line"
        },
        {
            "minzoom": 5,
            "layout": {},
            "metadata": {
                "mapbox:group": "e96c76ab47296d7cdab48ab9d0d9515c"
            },
            "maxzoom": 15,
            "filter": [
                "all",
                [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "mode"
                        ],
                        [
                            "inter_regional_rail",
                            "regional_rail"
                        ],
                        true,
                        false
                    ],
                    12,
                    [
                        "match",
                        [
                            "get",
                            "mode"
                        ],
                        [
                            "inter_regional_rail",
                            "regional_rail",
                            "tram",
                            "freight"
                        ],
                        true,
                        false
                    ]
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "rail-low",
            "paint": {
                "line-color": "#adadad",
                "line-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    14.99,
                    1,
                    15,
                    0
                ],
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    9,
                    1,
                    14,
                    2
                ]
            },
            "source-layer": "transit_line"
        },
        {
            "minzoom": 9,
            "layout": {},
            "metadata": {
                "mapbox:group": "e96c76ab47296d7cdab48ab9d0d9515c"
            },
            "maxzoom": 15,
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "mode"
                    ],
                    [
                        "inter_regional_rail",
                        "regional_rail"
                    ],
                    true,
                    false
                ],
                [
                    "has",
                    "name"
                ],
                [
                    "!=",
                    [
                        "get",
                        "operator"
                    ],
                    "private"
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "rail-low-dash",
            "paint": {
                "line-color": "#ffffff",
                "line-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    14.99,
                    1,
                    15,
                    0
                ],
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    9,
                    1,
                    14,
                    2
                ],
                "line-dasharray": [
                    6,
                    8
                ]
            },
            "source-layer": "transit_line"
        },
        {
            "minzoom": 9,
            "layout": {},
            "metadata": {
                "mapbox:group": "e96c76ab47296d7cdab48ab9d0d9515c"
            },
            "maxzoom": 15,
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "mode"
                    ],
                    "high_speed_rail"
                ],
                [
                    "has",
                    "name"
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "rail-high-speed-low-case",
            "paint": {
                "line-color": "#6878ca",
                "line-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    14.99,
                    1,
                    15,
                    0
                ],
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.75
                    ],
                    [
                        "zoom"
                    ],
                    9,
                    1,
                    14,
                    2
                ],
                "line-gap-width": 1
            },
            "source-layer": "transit_line"
        },
        {
            "minzoom": 5,
            "layout": {},
            "metadata": {
                "mapbox:group": "e96c76ab47296d7cdab48ab9d0d9515c"
            },
            "maxzoom": 15,
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "mode"
                    ],
                    "high_speed_rail"
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "rail-high-speed-low",
            "paint": {
                "line-color": "#6878ca",
                "line-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    14.99,
                    1,
                    15,
                    0
                ],
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    9,
                    1,
                    14,
                    2
                ]
            },
            "source-layer": "transit_line"
        },
        {
            "minzoom": 9,
            "layout": {},
            "metadata": {
                "mapbox:group": "e96c76ab47296d7cdab48ab9d0d9515c"
            },
            "maxzoom": 15,
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "mode"
                    ],
                    "high_speed_rail"
                ],
                [
                    "has",
                    "name"
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "rail-high-speed-low-dash",
            "paint": {
                "line-color": "#ffffff",
                "line-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    14.99,
                    1,
                    15,
                    0
                ],
                "line-width": [
                    "interpolate",
                    [
                        "exponential",
                        1.5
                    ],
                    [
                        "zoom"
                    ],
                    9,
                    1,
                    14,
                    2
                ],
                "line-dasharray": [
                    6,
                    8
                ]
            },
            "source-layer": "transit_line"
        },
        {
            "minzoom": 7,
            "layout": {
                "line-join": "bevel"
            },
            "metadata": {
                "mapbox:featureComponent": "admin-boundaries",
                "mapbox:group": "Administrative boundaries, admin"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "admin_level"
                    ],
                    1
                ],
                [
                    "==",
                    [
                        "get",
                        "maritime"
                    ],
                    "false"
                ],
                [
                    "match",
                    [
                        "get",
                        "worldview"
                    ],
                    [
                        "all",
                        "CN"
                    ],
                    true,
                    false
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "admin-1-boundary-bg",
            "paint": {
                "line-color": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    8,
                    "hsl(30, 18%, 92%)",
                    16,
                    "rgb(236, 236, 236)"
                ],
                "line-width": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    7,
                    3.75,
                    12,
                    5.5
                ],
                "line-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    7,
                    0,
                    8,
                    0.75
                ],
                "line-dasharray": [
                    1,
                    0
                ],
                "line-blur": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    3,
                    0,
                    8,
                    3
                ]
            },
            "source-layer": "admin"
        },
        {
            "minzoom": 1,
            "layout": {},
            "metadata": {
                "mapbox:featureComponent": "admin-boundaries",
                "mapbox:group": "Administrative boundaries, admin"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "admin_level"
                    ],
                    0
                ],
                [
                    "==",
                    [
                        "get",
                        "maritime"
                    ],
                    "false"
                ],
                [
                    "match",
                    [
                        "get",
                        "worldview"
                    ],
                    [
                        "all",
                        "CN"
                    ],
                    true,
                    false
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "admin-0-boundary-bg",
            "paint": {
                "line-width": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    3,
                    3.5,
                    10,
                    8
                ],
                "line-color": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    6,
                    "hsl(30, 18%, 92%)",
                    8,
                    "rgb(236, 236, 236)"
                ],
                "line-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    3,
                    0,
                    4,
                    0.5
                ],
                "line-blur": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    3,
                    0,
                    10,
                    2
                ]
            },
            "source-layer": "admin"
        },
        {
            "minzoom": 2,
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "admin-boundaries",
                "mapbox:group": "Administrative boundaries, admin"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "admin_level"
                    ],
                    1
                ],
                [
                    "==",
                    [
                        "get",
                        "maritime"
                    ],
                    "false"
                ],
                [
                    "match",
                    [
                        "get",
                        "worldview"
                    ],
                    [
                        "all",
                        "CN"
                    ],
                    true,
                    false
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "admin-1-boundary",
            "paint": {
                "line-dasharray": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "literal",
                        [
                            2,
                            0
                        ]
                    ],
                    7,
                    [
                        "literal",
                        [
                            2,
                            2,
                            6,
                            2
                        ]
                    ]
                ],
                "line-width": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    7,
                    0.75,
                    12,
                    1.5
                ],
                "line-opacity": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    2,
                    0,
                    3,
                    1
                ],
                "line-color": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    3,
                    "rgb(196, 196, 196)",
                    7,
                    "rgb(158, 158, 158)"
                ]
            },
            "source-layer": "admin"
        },
        {
            "minzoom": 1,
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "admin-boundaries",
                "mapbox:group": "Administrative boundaries, admin"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "admin_level"
                    ],
                    0
                ],
                [
                    "==",
                    [
                        "get",
                        "disputed"
                    ],
                    "false"
                ],
                [
                    "==",
                    [
                        "get",
                        "maritime"
                    ],
                    "false"
                ],
                [
                    "match",
                    [
                        "get",
                        "worldview"
                    ],
                    [
                        "all",
                        "CN"
                    ],
                    true,
                    false
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "admin-0-boundary",
            "paint": {
                "line-color": "rgb(130, 130, 130)",
                "line-width": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    3,
                    0.5,
                    10,
                    2
                ],
                "line-dasharray": [
                    10,
                    0
                ]
            },
            "source-layer": "admin"
        },
        {
            "minzoom": 1,
            "layout": {
                "line-join": "round"
            },
            "metadata": {
                "mapbox:featureComponent": "admin-boundaries",
                "mapbox:group": "Administrative boundaries, admin"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "disputed"
                    ],
                    "true"
                ],
                [
                    "==",
                    [
                        "get",
                        "admin_level"
                    ],
                    0
                ],
                [
                    "==",
                    [
                        "get",
                        "maritime"
                    ],
                    "false"
                ],
                [
                    "match",
                    [
                        "get",
                        "worldview"
                    ],
                    [
                        "all",
                        "CN"
                    ],
                    true,
                    false
                ]
            ],
            "type": "line",
            "source": "composite",
            "id": "admin-0-boundary-disputed",
            "paint": {
                "line-color": "rgb(130, 130, 130)",
                "line-width": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    3,
                    0.5,
                    10,
                    2
                ],
                "line-dasharray": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "literal",
                        [
                            3.25,
                            3.25
                        ]
                    ],
                    6,
                    [
                        "literal",
                        [
                            2.5,
                            2.5
                        ]
                    ],
                    7,
                    [
                        "literal",
                        [
                            2,
                            2.25
                        ]
                    ],
                    8,
                    [
                        "literal",
                        [
                            1.75,
                            2
                        ]
                    ]
                ]
            },
            "source-layer": "admin"
        },
        {
            "id": "building-number-label",
            "type": "symbol",
            "source": "composite",
            "source-layer": "housenum_label",
            "minzoom": 17,
            "layout": {
                "text-field": [
                    "get",
                    "house_num"
                ],
                "text-font": [
                    "Noto Sans CJK JP Bold",
                    "Arial Unicode MS Regular"
                ],
                "text-padding": 4,
                "text-max-width": 7,
                "text-size": 12.35
            },
            "paint": {
                "text-color": "hsl(30, 8%, 72%)",
                "text-halo-color": "hsl(30, 13%, 94%)",
                "text-halo-width": 0.5
            },
            "metadata": {
                "mapbox:featureComponent": "buildings",
                "mapbox:group": "Buildings, building-labels"
            }
        },
        {
            "minzoom": 16,
            "layout": {
                "text-field": [
                    "get",
                    "name"
                ],
                "text-font": [
                    "Noto Sans CJK JP Bold",
                    "Arial Unicode MS Regular"
                ],
                "text-max-width": 7,
                "text-size": 14.3
            },
            "metadata": {
                "mapbox:featureComponent": "buildings",
                "mapbox:group": "Buildings, building-labels"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "settlement_subdivision"
                ],
                [
                    "==",
                    [
                        "get",
                        "type"
                    ],
                    "block"
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "block-number-label",
            "paint": {
                "text-color": "hsl(30, 18%, 58%)",
                "text-halo-color": "hsl(30, 17%, 100%)",
                "text-halo-width": 0.5,
                "text-halo-blur": 0.5
            },
            "source-layer": "place_label"
        },
        {
            "minzoom": 15,
            "layout": {
                "icon-image": "traffic-signal",
                "icon-offset": [
                    18,
                    0
                ],
                "icon-rotate": 90
            },
            "metadata": {
                "mapbox:group": "9a677cfc288a11230b5a41cebfc20602"
            },
            "filter": [
                "match",
                [
                    "get",
                    "class"
                ],
                [
                    "traffic_signals"
                ],
                true,
                false
            ],
            "type": "symbol",
            "source": "composite",
            "id": "traffic-signal",
            "paint": {},
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_ja"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ],
                "text-font": [
                    "Noto Sans CJK JP Bold",
                    "Arial Unicode MS Regular"
                ],
                "text-size": [
                    "interpolate",
                    [
                        "exponential",
                        1.2
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    9,
                    18,
                    12
                ],
                "icon-image": "jp-intersection",
                "icon-text-fit": "both",
                "icon-text-fit-padding": [
                    0.5,
                    2,
                    1,
                    2
                ]
            },
            "metadata": {
                "mapbox:group": "9a677cfc288a11230b5a41cebfc20602"
            },
            "maxzoom": 15,
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "intersection"
                ],
                [
                    "has",
                    "name"
                ],
                [
                    "match",
                    [
                        "get",
                        "type"
                    ],
                    [
                        "primary",
                        "secondary"
                    ],
                    true,
                    false
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "road-intersection-low-zooms",
            "paint": {
                "text-color": "#6894ca"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 10,
            "layout": {
                "text-size": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    10,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "motorway",
                            "trunk",
                            "primary",
                            "secondary",
                            "tertiary"
                        ],
                        10,
                        [
                            "motorway_link",
                            "trunk_link",
                            "primary_link",
                            "secondary_link",
                            "tertiary_link",
                            "street",
                            "street_limited"
                        ],
                        9,
                        6.5
                    ],
                    18,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "motorway",
                            "trunk",
                            "primary",
                            "secondary",
                            "tertiary"
                        ],
                        16,
                        [
                            "motorway_link",
                            "trunk_link",
                            "primary_link",
                            "secondary_link",
                            "tertiary_link",
                            "street",
                            "street_limited"
                        ],
                        14,
                        13
                    ]
                ],
                "text-max-angle": 30,
                "text-font": [
                    "Noto Sans CJK JP Regular",
                    "Arial Unicode MS Regular"
                ],
                "symbol-placement": "line",
                "text-padding": 1,
                "text-rotation-alignment": "map",
                "text-pitch-alignment": "viewport",
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_zh-Hans"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ],
                "text-letter-spacing": 0.01
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, road-labels"
            },
            "filter": [
                "step",
                [
                    "zoom"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway",
                        "trunk",
                        "primary",
                        "secondary",
                        "tertiary"
                    ],
                    true,
                    false
                ],
                12,
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway",
                        "trunk",
                        "primary",
                        "secondary",
                        "tertiary",
                        "street",
                        "street_limited"
                    ],
                    true,
                    false
                ],
                15,
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "path",
                        "pedestrian",
                        "golf",
                        "ferry",
                        "aerialway"
                    ],
                    false,
                    true
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "road-label",
            "paint": {
                "text-color": "#8b745d",
                "text-halo-color": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "motorway",
                        "trunk"
                    ],
                    "hsla(30, 25%, 100%, 0.75)",
                    "hsl(30, 25%, 100%)"
                ],
                "text-halo-width": 1,
                "text-halo-blur": 1
            },
            "source-layer": "road"
        },
        {
            "minzoom": 15,
            "layout": {
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_zh-Hans"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ],
                "icon-image": "jp-intersection",
                "icon-text-fit": "both",
                "icon-text-fit-padding": [
                    0.5,
                    2,
                    1,
                    2
                ],
                "text-size": [
                    "interpolate",
                    [
                        "exponential",
                        1.2
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    9,
                    18,
                    12
                ],
                "text-font": [
                    "Noto Sans CJK JP Bold",
                    "Arial Unicode MS Bold"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, road-labels"
            },
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "class"
                    ],
                    "intersection"
                ],
                [
                    "has",
                    "name"
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "road-intersection",
            "paint": {
                "text-color": "#6894ca"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 6,
            "layout": {
                "text-size": 9,
                "icon-image": [
                    "case",
                    [
                        "has",
                        "shield_beta"
                    ],
                    [
                        "coalesce",
                        [
                            "image",
                            [
                                "concat",
                                [
                                    "get",
                                    "shield_beta"
                                ],
                                "-",
                                [
                                    "to-string",
                                    [
                                        "get",
                                        "reflen"
                                    ]
                                ]
                            ]
                        ],
                        [
                            "image",
                            [
                                "concat",
                                "default-",
                                [
                                    "to-string",
                                    [
                                        "get",
                                        "reflen"
                                    ]
                                ]
                            ]
                        ]
                    ],
                    [
                        "concat",
                        [
                            "get",
                            "shield"
                        ],
                        "-",
                        [
                            "to-string",
                            [
                                "get",
                                "reflen"
                            ]
                        ]
                    ]
                ],
                "icon-rotation-alignment": "viewport",
                "text-max-angle": 38,
                "symbol-spacing": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    11,
                    400,
                    14,
                    600
                ],
                "text-font": [
                    "Noto Sans CJK JP Bold",
                    "Arial Unicode MS Bold"
                ],
                "symbol-placement": [
                    "step",
                    [
                        "zoom"
                    ],
                    "point",
                    11,
                    "line"
                ],
                "text-offset": [
                    0,
                    -0.1
                ],
                "text-rotation-alignment": "viewport",
                "text-field": [
                    "get",
                    "ref"
                ],
                "text-letter-spacing": 0.05
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, road-labels"
            },
            "filter": [
                "all",
                [
                    "has",
                    "reflen"
                ],
                [
                    "<=",
                    [
                        "get",
                        "reflen"
                    ],
                    6
                ],
                [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "==",
                        [
                            "geometry-type"
                        ],
                        "Point"
                    ],
                    11,
                    [
                        ">",
                        [
                            "get",
                            "len"
                        ],
                        5000
                    ],
                    12,
                    [
                        ">",
                        [
                            "get",
                            "len"
                        ],
                        2500
                    ],
                    13,
                    [
                        ">",
                        [
                            "get",
                            "len"
                        ],
                        1000
                    ],
                    14,
                    true
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "road-number-shield",
            "paint": {
                "text-color": [
                    "case",
                    [
                        "all",
                        [
                            "has",
                            "shield_text_color_beta"
                        ],
                        [
                            "match",
                            [
                                "get",
                                "iso_3166_1"
                            ],
                            "JP",
                            true,
                            false
                        ]
                    ],
                    [
                        "match",
                        [
                            "get",
                            "shield_text_color_beta"
                        ],
                        "black",
                        "hsl(0, 0%, 7%)",
                        "yellow",
                        "hsl(50, 100%, 70%)",
                        "orange",
                        "hsl(25, 100%, 75%)",
                        "blue",
                        "hsl(230, 48%, 34%)",
                        "hsl(0, 0%, 100%)"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "shield_text_color"
                        ],
                        "black",
                        "hsl(0, 0%, 7%)",
                        "yellow",
                        "hsl(50, 100%, 70%)",
                        "orange",
                        "hsl(25, 100%, 75%)",
                        "blue",
                        "hsl(230, 48%, 34%)",
                        "hsl(0, 0%, 100%)"
                    ]
                ],
                "text-opacity": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "motorway",
                            "trunk",
                            "motorway_link",
                            "trunk_link"
                        ],
                        1,
                        0
                    ],
                    12,
                    1
                ],
                "icon-opacity": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        [
                            "motorway",
                            "trunk",
                            "motorway_link",
                            "trunk_link"
                        ],
                        1,
                        0
                    ],
                    12,
                    1
                ]
            },
            "source-layer": "road"
        },
        {
            "minzoom": 14,
            "layout": {
                "text-field": [
                    "get",
                    "ref"
                ],
                "text-size": 9,
                "icon-image": [
                    "concat",
                    "motorway-exit-",
                    [
                        "to-string",
                        [
                            "get",
                            "reflen"
                        ]
                    ]
                ],
                "text-font": [
                    "Noto Sans CJK JP Bold",
                    "Arial Unicode MS Bold"
                ],
                "text-offset": [
                    0,
                    -0.1
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "road-network",
                "mapbox:group": "Road network, road-labels"
            },
            "filter": [
                "all",
                [
                    "has",
                    "reflen"
                ],
                [
                    "<=",
                    [
                        "get",
                        "reflen"
                    ],
                    9
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "road-exit-shield",
            "paint": {
                "text-color": "hsl(0, 0%, 100%)",
                "text-translate": [
                    0,
                    0
                ]
            },
            "source-layer": "motorway_junction"
        },
        {
            "minzoom": 12,
            "layout": {
                "text-size": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    10,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "pedestrian",
                        9,
                        6.5
                    ],
                    18,
                    [
                        "match",
                        [
                            "get",
                            "class"
                        ],
                        "pedestrian",
                        14,
                        13
                    ]
                ],
                "text-max-angle": 30,
                "text-font": [
                    "Noto Sans CJK JP Regular",
                    "Arial Unicode MS Regular"
                ],
                "symbol-placement": "line",
                "text-padding": 1,
                "text-rotation-alignment": "map",
                "text-pitch-alignment": "viewport",
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_zh-Hans"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ],
                "text-letter-spacing": 0.01
            },
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., walking-cycling-labels"
            },
            "filter": [
                "step",
                [
                    "zoom"
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "pedestrian"
                    ],
                    true,
                    false
                ],
                15,
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "path",
                        "pedestrian"
                    ],
                    true,
                    false
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "path-pedestrian-label",
            "paint": {
                "text-color": "#8b745d",
                "text-halo-color": "hsl(0, 0%, 100%)",
                "text-halo-width": 1,
                "text-halo-blur": 1
            },
            "source-layer": "road"
        },
        {
            "minzoom": 16,
            "layout": {
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_zh-Hans"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ],
                "text-font": [
                    "Noto Sans CJK JP Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-size": 12
            },
            "metadata": {
                "mapbox:featureComponent": "walking-cycling",
                "mapbox:group": "Walking, cycling, etc., walking-cycling-labels"
            },
            "filter": [
                "==",
                [
                    "get",
                    "class"
                ],
                "golf"
            ],
            "type": "symbol",
            "source": "composite",
            "id": "golf-hole-label",
            "paint": {
                "text-halo-color": "hsl(99, 66%, 100%)",
                "text-halo-width": 0.5,
                "text-halo-blur": 0.5,
                "text-color": "rgb(94, 158, 72)"
            },
            "source-layer": "road"
        },
        {
            "minzoom": 15,
            "layout": {
                "text-size": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    10,
                    6.5,
                    18,
                    13
                ],
                "text-max-angle": 30,
                "text-font": [
                    "Noto Sans CJK JP Regular",
                    "Arial Unicode MS Regular"
                ],
                "symbol-placement": "line",
                "text-padding": 1,
                "text-rotation-alignment": "map",
                "text-pitch-alignment": "viewport",
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_zh-Hans"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ],
                "text-letter-spacing": 0.01
            },
            "metadata": {
                "mapbox:featureComponent": "transit",
                "mapbox:group": "Transit, ferry-aerialway-labels"
            },
            "filter": [
                "match",
                [
                    "get",
                    "class"
                ],
                "aerialway",
                true,
                "ferry",
                true,
                false
            ],
            "type": "symbol",
            "source": "composite",
            "id": "ferry-aerialway-label",
            "paint": {
                "text-color": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "ferry",
                    "rgb(102, 169, 194)",
                    "#8b745d"
                ],
                "text-halo-color": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "ferry",
                    "#9ddbf1",
                    "hsl(30, 25%, 100%)"
                ],
                "text-halo-width": 1,
                "text-halo-blur": 1
            },
            "source-layer": "road"
        },
        {
            "minzoom": 13,
            "layout": {
                "text-font": [
                    "Noto Sans CJK JP Regular",
                    "Arial Unicode MS Regular"
                ],
                "text-max-angle": 30,
                "symbol-spacing": [
                    "interpolate",
                    [
                        "linear",
                        1
                    ],
                    [
                        "zoom"
                    ],
                    15,
                    250,
                    17,
                    400
                ],
                "text-size": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    13,
                    12,
                    18,
                    16
                ],
                "symbol-placement": "line",
                "text-pitch-alignment": "viewport",
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_zh-Hans"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "natural-features",
                "mapbox:group": "Natural features, natural-labels"
            },
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "canal",
                        "river",
                        "stream"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "worldview"
                        ],
                        [
                            "all",
                            "CN"
                        ],
                        true,
                        false
                    ],
                    [
                        "disputed_canal",
                        "disputed_river",
                        "disputed_stream"
                    ],
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "disputed"
                            ],
                            "true"
                        ],
                        [
                            "match",
                            [
                                "get",
                                "worldview"
                            ],
                            [
                                "all",
                                "CN"
                            ],
                            true,
                            false
                        ]
                    ],
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "waterway-label",
            "paint": {
                "text-color": "rgb(98, 167, 192)"
            },
            "source-layer": "natural_label"
        },
        {
            "minzoom": 4,
            "layout": {
                "text-size": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        18,
                        5,
                        12
                    ],
                    17,
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        18,
                        13,
                        12
                    ]
                ],
                "text-max-angle": 30,
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_zh-Hans"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ],
                "text-font": [
                    "Noto Sans CJK JP Medium",
                    "Arial Unicode MS Regular"
                ],
                "symbol-placement": "line-center",
                "text-pitch-alignment": "viewport"
            },
            "metadata": {
                "mapbox:featureComponent": "natural-features",
                "mapbox:group": "Natural features, natural-labels"
            },
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "glacier",
                        "landform"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "worldview"
                        ],
                        [
                            "all",
                            "CN"
                        ],
                        true,
                        false
                    ],
                    [
                        "disputed_glacier",
                        "disputed_landform"
                    ],
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "disputed"
                            ],
                            "true"
                        ],
                        [
                            "match",
                            [
                                "get",
                                "worldview"
                            ],
                            [
                                "all",
                                "CN"
                            ],
                            true,
                            false
                        ]
                    ],
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ],
                [
                    "<=",
                    [
                        "get",
                        "filterrank"
                    ],
                    2
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "natural-line-label",
            "paint": {
                "text-halo-width": 0.5,
                "text-halo-color": "hsl(30, 25%, 100%)",
                "text-halo-blur": 0.5,
                "text-color": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        "rgb(140, 134, 115)",
                        5,
                        "#756e57"
                    ],
                    17,
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        "rgb(140, 134, 115)",
                        13,
                        "#756e57"
                    ]
                ]
            },
            "source-layer": "natural_label"
        },
        {
            "minzoom": 4,
            "layout": {
                "text-size": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        18,
                        5,
                        12
                    ],
                    17,
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        18,
                        13,
                        12
                    ]
                ],
                "icon-image": [
                    "get",
                    "maki"
                ],
                "text-font": [
                    "Noto Sans CJK JP Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-offset": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        [
                            "literal",
                            [
                                0,
                                0
                            ]
                        ],
                        5,
                        [
                            "literal",
                            [
                                0,
                                0.75
                            ]
                        ]
                    ],
                    17,
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        [
                            "literal",
                            [
                                0,
                                0
                            ]
                        ],
                        13,
                        [
                            "literal",
                            [
                                0,
                                0.75
                            ]
                        ]
                    ]
                ],
                "text-anchor": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        "center",
                        5,
                        "top"
                    ],
                    17,
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        "center",
                        13,
                        "top"
                    ]
                ],
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_zh-Hans"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "natural-features",
                "mapbox:group": "Natural features, natural-labels"
            },
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "dock",
                        "glacier",
                        "landform",
                        "water_feature",
                        "wetland"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "worldview"
                        ],
                        [
                            "all",
                            "CN"
                        ],
                        true,
                        false
                    ],
                    [
                        "disputed_dock",
                        "disputed_glacier",
                        "disputed_landform",
                        "disputed_water_feature",
                        "disputed_wetland"
                    ],
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "disputed"
                            ],
                            "true"
                        ],
                        [
                            "match",
                            [
                                "get",
                                "worldview"
                            ],
                            [
                                "all",
                                "CN"
                            ],
                            true,
                            false
                        ]
                    ],
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "Point"
                ],
                [
                    "<=",
                    [
                        "get",
                        "filterrank"
                    ],
                    2
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "natural-point-label",
            "paint": {
                "icon-opacity": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        0,
                        5,
                        1
                    ],
                    17,
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        0,
                        13,
                        1
                    ]
                ],
                "text-halo-color": "hsl(30, 25%, 100%)",
                "text-halo-width": 0.5,
                "text-halo-blur": 0.5,
                "text-color": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        "rgb(140, 134, 115)",
                        5,
                        "#756e57"
                    ],
                    17,
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        "rgb(140, 134, 115)",
                        13,
                        "#756e57"
                    ]
                ]
            },
            "source-layer": "natural_label"
        },
        {
            "id": "water-line-label",
            "type": "symbol",
            "metadata": {
                "mapbox:featureComponent": "natural-features",
                "mapbox:group": "Natural features, natural-labels"
            },
            "source": "composite",
            "source-layer": "natural_label",
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "bay",
                        "ocean",
                        "reservoir",
                        "sea",
                        "water"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "worldview"
                        ],
                        [
                            "all",
                            "CN"
                        ],
                        true,
                        false
                    ],
                    [
                        "disputed_bay",
                        "disputed_ocean",
                        "disputed_reservoir",
                        "disputed_sea",
                        "disputed_water"
                    ],
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "disputed"
                            ],
                            "true"
                        ],
                        [
                            "match",
                            [
                                "get",
                                "worldview"
                            ],
                            [
                                "all",
                                "CN"
                            ],
                            true,
                            false
                        ]
                    ],
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "LineString"
                ]
            ],
            "layout": {
                "text-size": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    7,
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        20,
                        6,
                        18,
                        12,
                        12
                    ],
                    10,
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        15,
                        9,
                        12
                    ],
                    18,
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        15,
                        9,
                        14
                    ]
                ],
                "text-max-angle": 30,
                "text-letter-spacing": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "ocean",
                    0.25,
                    [
                        "sea",
                        "bay"
                    ],
                    0.15,
                    0
                ],
                "text-font": [
                    "Noto Sans CJK JP Regular",
                    "Arial Unicode MS Regular"
                ],
                "symbol-placement": "line-center",
                "text-pitch-alignment": "viewport",
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_zh-Hans"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ]
            },
            "paint": {
                "text-color": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "bay",
                        "ocean",
                        "sea"
                    ],
                    "rgb(72, 184, 224)",
                    "rgb(98, 167, 192)"
                ]
            }
        },
        {
            "id": "water-point-label",
            "type": "symbol",
            "source": "composite",
            "source-layer": "natural_label",
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "bay",
                        "ocean",
                        "reservoir",
                        "sea",
                        "water"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "worldview"
                        ],
                        [
                            "all",
                            "CN"
                        ],
                        true,
                        false
                    ],
                    [
                        "disputed_bay",
                        "disputed_ocean",
                        "disputed_reservoir",
                        "disputed_sea",
                        "disputed_water"
                    ],
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "disputed"
                            ],
                            "true"
                        ],
                        [
                            "match",
                            [
                                "get",
                                "worldview"
                            ],
                            [
                                "all",
                                "CN"
                            ],
                            true,
                            false
                        ]
                    ],
                    false
                ],
                [
                    "==",
                    [
                        "geometry-type"
                    ],
                    "Point"
                ]
            ],
            "layout": {
                "text-line-height": 1.3,
                "text-size": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    7,
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        20,
                        6,
                        15,
                        12,
                        12
                    ],
                    10,
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        15,
                        9,
                        12
                    ]
                ],
                "text-font": [
                    "Noto Sans CJK JP Regular",
                    "Arial Unicode MS Regular"
                ],
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_zh-Hans"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ],
                "text-letter-spacing": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "ocean",
                    0.25,
                    [
                        "bay",
                        "sea"
                    ],
                    0.15,
                    0.01
                ],
                "text-max-width": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "ocean",
                    4,
                    "sea",
                    5,
                    [
                        "bay",
                        "water"
                    ],
                    7,
                    10
                ]
            },
            "paint": {
                "text-color": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    [
                        "bay",
                        "ocean",
                        "sea"
                    ],
                    "rgb(72, 184, 224)",
                    "rgb(98, 167, 192)"
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "natural-features",
                "mapbox:group": "Natural features, natural-labels"
            }
        },
        {
            "minzoom": 6,
            "layout": {
                "text-size": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        18,
                        5,
                        12
                    ],
                    17,
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        18,
                        13,
                        12
                    ]
                ],
                "icon-image": [
                    "case",
                    [
                        "has",
                        "maki_modifier"
                    ],
                    [
                        "concat",
                        [
                            "get",
                            "maki"
                        ],
                        "-",
                        [
                            "get",
                            "maki_modifier"
                        ],
                        "-15"
                    ],
                    [
                        "get",
                        "maki"
                    ]
                ],
                "text-font": [
                    "Noto Sans CJK JP Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-offset": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        [
                            "literal",
                            [
                                0,
                                0
                            ]
                        ],
                        5,
                        [
                            "literal",
                            [
                                0,
                                0.75
                            ]
                        ]
                    ],
                    17,
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        [
                            "literal",
                            [
                                0,
                                0
                            ]
                        ],
                        13,
                        [
                            "literal",
                            [
                                0,
                                0.75
                            ]
                        ]
                    ]
                ],
                "text-anchor": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        "center",
                        5,
                        "top"
                    ],
                    17,
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        "center",
                        13,
                        "top"
                    ]
                ],
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_zh-Hans"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "point-of-interest-labels",
                "mapbox:group": "Point of interest labels, poi-labels"
            },
            "filter": [
                "<=",
                [
                    "get",
                    "filterrank"
                ],
                [
                    "+",
                    [
                        "step",
                        [
                            "zoom"
                        ],
                        0,
                        16,
                        1,
                        17,
                        2
                    ],
                    3
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "poi-label",
            "paint": {
                "icon-opacity": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "filterrank"
                        ],
                        [
                            0,
                            1,
                            2
                        ],
                        1,
                        0
                    ],
                    15,
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        0,
                        5,
                        1
                    ],
                    17,
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        0,
                        13,
                        1
                    ]
                ],
                "text-halo-color": [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "park_like",
                    "hsl(99, 66%, 100%)",
                    "education",
                    "hsl(51, 25%, 100%)",
                    "medical",
                    "rgb(255, 255, 255)",
                    "hsl(30, 25%, 100%)"
                ],
                "text-halo-width": 0.5,
                "text-halo-blur": 0.5,
                "text-color": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        [
                            "match",
                            [
                                "get",
                                "class"
                            ],
                            "food_and_drink",
                            "rgb(177, 166, 144)",
                            "park_like",
                            "rgb(122, 185, 101)",
                            "education",
                            "hsl(51, 8%, 62%)",
                            "medical",
                            "rgb(197, 160, 172)",
                            "rgb(140, 134, 115)"
                        ],
                        5,
                        [
                            "match",
                            [
                                "get",
                                "class"
                            ],
                            "food_and_drink",
                            "rgb(153, 129, 81)",
                            "park_like",
                            "rgb(94, 158, 72)",
                            "education",
                            "hsl(51, 20%, 42%)",
                            "medical",
                            "rgb(184, 122, 142)",
                            "#756e57"
                        ]
                    ],
                    17,
                    [
                        "step",
                        [
                            "get",
                            "sizerank"
                        ],
                        [
                            "match",
                            [
                                "get",
                                "class"
                            ],
                            "food_and_drink",
                            "rgb(177, 166, 144)",
                            "park_like",
                            "rgb(122, 185, 101)",
                            "education",
                            "hsl(51, 8%, 62%)",
                            "medical",
                            "rgb(197, 160, 172)",
                            "rgb(140, 134, 115)"
                        ],
                        13,
                        [
                            "match",
                            [
                                "get",
                                "class"
                            ],
                            "food_and_drink",
                            "rgb(153, 129, 81)",
                            "park_like",
                            "rgb(94, 158, 72)",
                            "education",
                            "hsl(51, 20%, 42%)",
                            "medical",
                            "rgb(184, 122, 142)",
                            "#756e57"
                        ]
                    ]
                ],
                "text-opacity": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "filterrank"
                        ],
                        [
                            0,
                            1,
                            2
                        ],
                        1,
                        0
                    ],
                    15,
                    1
                ]
            },
            "source-layer": "poi_label"
        },
        {
            "minzoom": 9,
            "layout": {
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_ja"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ],
                "text-font": [
                    "Noto Sans CJK JP Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-size": 12,
                "text-pitch-alignment": "viewport",
                "symbol-placement": "line",
                "symbol-spacing": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    16,
                    400,
                    19,
                    500
                ],
                "text-rotation-alignment": "map"
            },
            "metadata": {
                "mapbox:group": "50faffaf67651041277862f8a4b9b8d0"
            },
            "maxzoom": 13,
            "filter": [
                "step",
                [
                    "zoom"
                ],
                [
                    "match",
                    [
                        "get",
                        "mode"
                    ],
                    [
                        "high_speed_rail",
                        "inter_regional_rail",
                        "regional_rail"
                    ],
                    true,
                    false
                ],
                14,
                [
                    "match",
                    [
                        "get",
                        "mode"
                    ],
                    [
                        "freight"
                    ],
                    false,
                    true
                ],
                15,
                [
                    "match",
                    [
                        "get",
                        "mode"
                    ],
                    [
                        "metro_rail"
                    ],
                    true,
                    false
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "rail-label-line",
            "paint": {
                "text-color": "#4d4d4d",
                "text-halo-color": "#ffffff",
                "text-halo-width": 1.5,
                "text-halo-blur": 1
            },
            "source-layer": "transit_line"
        },
        {
            "minzoom": 13,
            "layout": {
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_ja"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ],
                "text-font": [
                    "Noto Sans CJK JP Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-size": 12,
                "text-pitch-alignment": "viewport",
                "symbol-placement": "line",
                "symbol-spacing": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    16,
                    400,
                    19,
                    500
                ],
                "text-rotation-alignment": "map"
            },
            "metadata": {
                "mapbox:group": "50faffaf67651041277862f8a4b9b8d0"
            },
            "filter": [
                "match",
                [
                    "get",
                    "mode"
                ],
                [
                    "metro_rail"
                ],
                true,
                false
            ],
            "type": "symbol",
            "source": "composite",
            "id": "subway-label-line",
            "paint": {
                "text-color": [
                    "match",
                    [
                        "get",
                        "line_color"
                    ],
                    [
                        "blue"
                    ],
                    "hsl(205, 90%, 30%)",
                    [
                        "brown"
                    ],
                    "hsl(19, 84%, 21%)",
                    [
                        "gray"
                    ],
                    "hsl(37, 14%, 48%)",
                    [
                        "green"
                    ],
                    "hsl(120, 90%, 20%)",
                    [
                        "lime"
                    ],
                    "hsl(82, 65%, 35%)",
                    [
                        "orange"
                    ],
                    "hsl(34, 100%, 33%)",
                    [
                        "pink"
                    ],
                    "hsl(330, 83%, 50%)",
                    [
                        "purple"
                    ],
                    "hsl(268, 35%, 46%)",
                    [
                        "red"
                    ],
                    "hsl(5, 90%, 38%)",
                    [
                        "tan"
                    ],
                    "hsl(37, 70%, 40%)",
                    [
                        "teal"
                    ],
                    "hsl(192, 91%, 30%)",
                    [
                        "turquoise"
                    ],
                    "hsl(178, 100%, 25%)",
                    [
                        "violet"
                    ],
                    "hsl(323, 100%, 35%)",
                    "hsl(231, 19%, 56%)"
                ],
                "text-halo-width": 1.5,
                "text-halo-blur": 1,
                "text-halo-color": "#ffffff"
            },
            "source-layer": "transit_line"
        },
        {
            "minzoom": 10,
            "layout": {
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_ja"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ],
                "text-font": [
                    "Noto Sans CJK JP Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-letter-spacing": 0.01,
                "text-max-width": [
                    "match",
                    [
                        "get",
                        "stop_type"
                    ],
                    "entrance",
                    15,
                    9
                ],
                "icon-image": [
                    "get",
                    "network"
                ],
                "text-anchor": "top",
                "text-offset": [
                    0,
                    0.5
                ]
            },
            "metadata": {
                "mapbox:group": "50faffaf67651041277862f8a4b9b8d0"
            },
            "maxzoom": 12,
            "filter": [
                "all",
                [
                    "==",
                    [
                        "get",
                        "mode"
                    ],
                    "rail"
                ],
                [
                    "match",
                    [
                        "get",
                        "filterrank"
                    ],
                    [
                        0,
                        1,
                        2,
                        3
                    ],
                    true,
                    false
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "transit-label-low-zoom",
            "paint": {
                "text-color": "#45435b",
                "text-halo-width": 1,
                "text-halo-blur": 0.5,
                "text-halo-color": "hsl(0, 0%, 100%)"
            },
            "source-layer": "transit_stop_label"
        },
        {
            "minzoom": 12,
            "layout": {
                "text-size": [
                    "match",
                    [
                        "get",
                        "mode"
                    ],
                    [
                        "rail"
                    ],
                    16,
                    14
                ],
                "icon-image": [
                    "get",
                    "network"
                ],
                "text-font": [
                    "Noto Sans CJK JP Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-justify": [
                    "match",
                    [
                        "get",
                        "stop_type"
                    ],
                    "entrance",
                    "left",
                    "center"
                ],
                "text-offset": [
                    "case",
                    [
                        "==",
                        [
                            "get",
                            "stop_type"
                        ],
                        "entrance"
                    ],
                    [
                        "literal",
                        [
                            1,
                            0
                        ]
                    ],
                    [
                        "literal",
                        [
                            0,
                            0.5
                        ]
                    ]
                ],
                "text-anchor": [
                    "match",
                    [
                        "get",
                        "stop_type"
                    ],
                    "entrance",
                    "left",
                    "top"
                ],
                "text-field": [
                    "step",
                    [
                        "zoom"
                    ],
                    "",
                    12,
                    [
                        "match",
                        [
                            "get",
                            "mode"
                        ],
                        [
                            "rail",
                            "metro_rail"
                        ],
                        [
                            "coalesce",
                            [
                                "get",
                                "name_ja"
                            ],
                            [
                                "get",
                                "name"
                            ]
                        ],
                        ""
                    ],
                    16,
                    [
                        "match",
                        [
                            "get",
                            "mode"
                        ],
                        [
                            "bus",
                            "bicycle"
                        ],
                        "",
                        [
                            "coalesce",
                            [
                                "get",
                                "name_ja"
                            ],
                            [
                                "get",
                                "name"
                            ]
                        ]
                    ],
                    18,
                    [
                        "coalesce",
                        [
                            "get",
                            "name_ja"
                        ],
                        [
                            "get",
                            "name"
                        ]
                    ]
                ],
                "text-letter-spacing": 0.01,
                "text-max-width": [
                    "match",
                    [
                        "get",
                        "stop_type"
                    ],
                    "entrance",
                    15,
                    9
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "transit",
                "mapbox:group": "Transit, transit-labels"
            },
            "filter": [
                "step",
                [
                    "zoom"
                ],
                [
                    "all",
                    [
                        "match",
                        [
                            "get",
                            "mode"
                        ],
                        "rail",
                        true,
                        "metro_rail",
                        true,
                        false
                    ],
                    [
                        "!=",
                        [
                            "get",
                            "stop_type"
                        ],
                        "entrance"
                    ]
                ],
                15,
                [
                    "all",
                    [
                        "match",
                        [
                            "get",
                            "mode"
                        ],
                        "rail",
                        true,
                        "metro_rail",
                        true,
                        "ferry",
                        true,
                        "light_rail",
                        true,
                        false
                    ],
                    [
                        "!=",
                        [
                            "get",
                            "stop_type"
                        ],
                        "entrance"
                    ]
                ],
                16,
                [
                    "all",
                    [
                        "match",
                        [
                            "get",
                            "mode"
                        ],
                        "bus",
                        false,
                        true
                    ],
                    [
                        "!=",
                        [
                            "get",
                            "stop_type"
                        ],
                        "entrance"
                    ]
                ],
                17,
                [
                    "!=",
                    [
                        "get",
                        "stop_type"
                    ],
                    "entrance"
                ],
                19,
                true
            ],
            "type": "symbol",
            "source": "composite",
            "id": "transit-label",
            "paint": {
                "text-halo-color": "hsl(30, 25%, 100%)",
                "text-color": [
                    "match",
                    [
                        "get",
                        "network"
                    ],
                    "tokyo-metro",
                    "hsl(180, 50%, 30%)",
                    "mexico-city-metro",
                    "hsl(25, 100%, 63%)",
                    [
                        "barcelona-metro",
                        "delhi-metro",
                        "hong-kong-mtr",
                        "milan-metro",
                        "osaka-subway"
                    ],
                    "hsl(0, 90%, 47%)",
                    [
                        "boston-t",
                        "washington-metro"
                    ],
                    "hsl(230, 18%, 20%)",
                    [
                        "chongqing-rail-transit",
                        "kiev-metro",
                        "singapore-mrt",
                        "taipei-metro"
                    ],
                    "hsl(140, 90%, 25%)",
                    "#45435b"
                ],
                "text-halo-blur": 0.5,
                "text-halo-width": 1,
                "text-opacity": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "filterrank"
                        ],
                        [
                            0,
                            1,
                            2,
                            3
                        ],
                        1,
                        0
                    ],
                    14,
                    1
                ],
                "icon-opacity": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "filterrank"
                        ],
                        [
                            0,
                            1,
                            2,
                            3
                        ],
                        1,
                        0
                    ],
                    14,
                    1
                ]
            },
            "source-layer": "transit_stop_label"
        },
        {
            "minzoom": 8,
            "layout": {
                "text-line-height": 1.1,
                "text-size": [
                    "step",
                    [
                        "get",
                        "sizerank"
                    ],
                    18,
                    9,
                    12
                ],
                "icon-image": [
                    "get",
                    "maki"
                ],
                "text-font": [
                    "Noto Sans CJK JP Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-offset": [
                    0,
                    0.75
                ],
                "text-rotation-alignment": "viewport",
                "text-anchor": "top",
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_zh-Hans"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ],
                "text-letter-spacing": 0.01,
                "text-max-width": 9
            },
            "metadata": {
                "mapbox:featureComponent": "transit",
                "mapbox:group": "Transit, transit-labels"
            },
            "filter": [
                "match",
                [
                    "get",
                    "class"
                ],
                [
                    "military",
                    "civil"
                ],
                [
                    "match",
                    [
                        "get",
                        "worldview"
                    ],
                    [
                        "all",
                        "CN"
                    ],
                    true,
                    false
                ],
                [
                    "disputed_military",
                    "disputed_civil"
                ],
                [
                    "all",
                    [
                        "==",
                        [
                            "get",
                            "disputed"
                        ],
                        "true"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "worldview"
                        ],
                        [
                            "all",
                            "CN"
                        ],
                        true,
                        false
                    ]
                ],
                false
            ],
            "type": "symbol",
            "source": "composite",
            "id": "airport-label",
            "paint": {
                "text-color": "rgb(74, 87, 150)",
                "text-halo-color": "rgb(255, 255, 255)",
                "text-halo-width": 1
            },
            "source-layer": "airport_label"
        },
        {
            "minzoom": 10,
            "layout": {
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_zh-Hans"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ],
                "text-transform": "uppercase",
                "text-font": [
                    "Noto Sans CJK JP Regular",
                    "Arial Unicode MS Regular"
                ],
                "text-letter-spacing": [
                    "match",
                    [
                        "get",
                        "type"
                    ],
                    "suburb",
                    0.15,
                    0.1
                ],
                "text-max-width": 7,
                "text-padding": 3,
                "text-size": [
                    "interpolate",
                    [
                        "cubic-bezier",
                        0.5,
                        0,
                        1,
                        1
                    ],
                    [
                        "zoom"
                    ],
                    11,
                    [
                        "match",
                        [
                            "get",
                            "type"
                        ],
                        "suburb",
                        11,
                        10.5
                    ],
                    15,
                    [
                        "match",
                        [
                            "get",
                            "type"
                        ],
                        "suburb",
                        15,
                        14
                    ]
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "place-labels",
                "mapbox:group": "Place labels, place-labels"
            },
            "maxzoom": 15,
            "filter": [
                "all",
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "settlement_subdivision",
                    [
                        "match",
                        [
                            "get",
                            "worldview"
                        ],
                        [
                            "all",
                            "CN"
                        ],
                        true,
                        false
                    ],
                    "disputed_settlement_subdivision",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "disputed"
                            ],
                            "true"
                        ],
                        [
                            "match",
                            [
                                "get",
                                "worldview"
                            ],
                            [
                                "all",
                                "CN"
                            ],
                            true,
                            false
                        ]
                    ],
                    false
                ],
                [
                    "<=",
                    [
                        "get",
                        "filterrank"
                    ],
                    4
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "settlement-subdivision-label",
            "paint": {
                "text-halo-color": "hsla(30, 25%, 100%, 0.75)",
                "text-halo-width": 1,
                "text-color": "rgb(134, 134, 134)",
                "text-halo-blur": 0.5
            },
            "source-layer": "place_label"
        },
        {
            "minzoom": 3,
            "layout": {
                "text-line-height": 1.1,
                "text-size": [
                    "interpolate",
                    [
                        "cubic-bezier",
                        0.2,
                        0,
                        0.9,
                        1
                    ],
                    [
                        "zoom"
                    ],
                    3,
                    [
                        "step",
                        [
                            "get",
                            "symbolrank"
                        ],
                        13.200000000000001,
                        9,
                        12.100000000000001,
                        10,
                        11.55,
                        12,
                        10.450000000000001,
                        14,
                        9.350000000000001,
                        16,
                        7.15,
                        17,
                        4.4
                    ],
                    13,
                    [
                        "step",
                        [
                            "get",
                            "symbolrank"
                        ],
                        25.3,
                        9,
                        23.1,
                        10,
                        20.900000000000002,
                        11,
                        18.700000000000003,
                        12,
                        17.6,
                        13,
                        16.5,
                        15,
                        14.3
                    ]
                ],
                "text-radial-offset": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "capital"
                        ],
                        2,
                        0.6,
                        0.55
                    ],
                    8,
                    0
                ],
                "icon-image": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "case",
                        [
                            "==",
                            [
                                "get",
                                "capital"
                            ],
                            2
                        ],
                        "border-dot-13",
                        [
                            "step",
                            [
                                "get",
                                "symbolrank"
                            ],
                            "dot-11",
                            9,
                            "dot-10",
                            11,
                            "dot-9"
                        ]
                    ],
                    8,
                    ""
                ],
                "text-font": [
                    "Noto Sans CJK JP Regular",
                    "Arial Unicode MS Regular"
                ],
                "text-justify": "auto",
                "visibility": "none",
                "text-anchor": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "get",
                        "text_anchor"
                    ],
                    8,
                    "center"
                ],
                "text-field": [
                    "match",
                    [
                        "get",
                        "iso_3166_1"
                    ],
                    [
                        "IN"
                    ],
                    [
                        "coalesce",
                        [
                            "get",
                            "name_zh-Hans"
                        ],
                        [
                            "get",
                            "name"
                        ]
                    ],
                    [
                        "coalesce",
                        [
                            "get",
                            "name_zh-Hans"
                        ],
                        [
                            "get",
                            "name"
                        ]
                    ]
                ],
                "text-max-width": 7
            },
            "metadata": {
                "mapbox:featureComponent": "place-labels",
                "mapbox:group": "Place labels, place-labels"
            },
            "maxzoom": 13,
            "filter": [
                "all",
                [
                    "<=",
                    [
                        "get",
                        "filterrank"
                    ],
                    3
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "settlement",
                    [
                        "match",
                        [
                            "get",
                            "worldview"
                        ],
                        [
                            "all",
                            "CN"
                        ],
                        true,
                        false
                    ],
                    "disputed_settlement",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "disputed"
                            ],
                            "true"
                        ],
                        [
                            "match",
                            [
                                "get",
                                "worldview"
                            ],
                            [
                                "all",
                                "CN"
                            ],
                            true,
                            false
                        ]
                    ],
                    false
                ],
                [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        ">",
                        [
                            "get",
                            "symbolrank"
                        ],
                        6
                    ],
                    4,
                    [
                        ">=",
                        [
                            "get",
                            "symbolrank"
                        ],
                        7
                    ],
                    6,
                    [
                        ">=",
                        [
                            "get",
                            "symbolrank"
                        ],
                        8
                    ],
                    7,
                    [
                        ">=",
                        [
                            "get",
                            "symbolrank"
                        ],
                        10
                    ],
                    10,
                    [
                        ">=",
                        [
                            "get",
                            "symbolrank"
                        ],
                        11
                    ],
                    11,
                    [
                        ">=",
                        [
                            "get",
                            "symbolrank"
                        ],
                        13
                    ],
                    12,
                    [
                        ">=",
                        [
                            "get",
                            "symbolrank"
                        ],
                        15
                    ]
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "settlement-minor-label",
            "paint": {
                "text-color": "rgb(62, 62, 62)",
                "text-halo-color": "hsl(30, 25%, 100%)",
                "text-halo-width": 1,
                "text-halo-blur": 1
            },
            "source-layer": "place_label"
        },
        {
            "minzoom": 3,
            "layout": {
                "text-line-height": 1.1,
                "text-size": [
                    "interpolate",
                    [
                        "cubic-bezier",
                        0.2,
                        0,
                        0.9,
                        1
                    ],
                    [
                        "zoom"
                    ],
                    3,
                    [
                        "step",
                        [
                            "get",
                            "symbolrank"
                        ],
                        14.3,
                        6,
                        13.200000000000001
                    ],
                    6,
                    [
                        "step",
                        [
                            "get",
                            "symbolrank"
                        ],
                        17.6,
                        6,
                        16.5,
                        7,
                        15.400000000000002
                    ],
                    8,
                    [
                        "step",
                        [
                            "get",
                            "symbolrank"
                        ],
                        19.8,
                        9,
                        18.700000000000003,
                        10,
                        16.5
                    ],
                    15,
                    [
                        "step",
                        [
                            "get",
                            "symbolrank"
                        ],
                        25.3,
                        9,
                        24.200000000000003,
                        10,
                        22,
                        11,
                        19.8,
                        12,
                        17.6,
                        13,
                        16.5,
                        15,
                        14.3
                    ]
                ],
                "text-radial-offset": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "capital"
                        ],
                        2,
                        0.6,
                        0.55
                    ],
                    8,
                    0
                ],
                "icon-image": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "case",
                        [
                            "==",
                            [
                                "get",
                                "capital"
                            ],
                            2
                        ],
                        "border-dot-13",
                        [
                            "step",
                            [
                                "get",
                                "symbolrank"
                            ],
                            "dot-11",
                            9,
                            "dot-10",
                            11,
                            "dot-9"
                        ]
                    ],
                    8,
                    ""
                ],
                "text-font": [
                    "Noto Sans CJK JP Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-justify": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "text_anchor"
                        ],
                        [
                            "left",
                            "bottom-left",
                            "top-left"
                        ],
                        "left",
                        [
                            "right",
                            "bottom-right",
                            "top-right"
                        ],
                        "right",
                        "center"
                    ],
                    8,
                    "center"
                ],
                "text-anchor": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "get",
                        "text_anchor"
                    ],
                    8,
                    "center"
                ],
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_zh-Hans"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ],
                "text-max-width": 7
            },
            "metadata": {
                "mapbox:featureComponent": "place-labels",
                "mapbox:group": "Place labels, place-labels"
            },
            "maxzoom": 15,
            "filter": [
                "all",
                [
                    "<=",
                    [
                        "get",
                        "filterrank"
                    ],
                    3
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "settlement",
                    [
                        "match",
                        [
                            "get",
                            "worldview"
                        ],
                        [
                            "all",
                            "CN"
                        ],
                        true,
                        false
                    ],
                    "disputed_settlement",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "disputed"
                            ],
                            "true"
                        ],
                        [
                            "match",
                            [
                                "get",
                                "worldview"
                            ],
                            [
                                "all",
                                "CN"
                            ],
                            true,
                            false
                        ]
                    ],
                    false
                ],
                [
                    "step",
                    [
                        "zoom"
                    ],
                    false,
                    3,
                    [
                        "<=",
                        [
                            "get",
                            "symbolrank"
                        ],
                        6
                    ],
                    4,
                    [
                        "<",
                        [
                            "get",
                            "symbolrank"
                        ],
                        7
                    ],
                    6,
                    [
                        "<",
                        [
                            "get",
                            "symbolrank"
                        ],
                        8
                    ],
                    7,
                    [
                        "<",
                        [
                            "get",
                            "symbolrank"
                        ],
                        10
                    ],
                    10,
                    [
                        "<",
                        [
                            "get",
                            "symbolrank"
                        ],
                        11
                    ],
                    11,
                    [
                        "<",
                        [
                            "get",
                            "symbolrank"
                        ],
                        13
                    ],
                    12,
                    [
                        "<",
                        [
                            "get",
                            "symbolrank"
                        ],
                        15
                    ],
                    13,
                    [
                        ">=",
                        [
                            "get",
                            "symbolrank"
                        ],
                        11
                    ],
                    14,
                    [
                        ">=",
                        [
                            "get",
                            "symbolrank"
                        ],
                        15
                    ]
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "settlement-major-label",
            "paint": {
                "text-color": "rgb(62, 62, 62)",
                "text-halo-color": "hsl(30, 25%, 100%)",
                "text-halo-width": 1,
                "text-halo-blur": 1
            },
            "source-layer": "place_label"
        },
        {
            "minzoom": 3,
            "layout": {
                "text-size": [
                    "interpolate",
                    [
                        "cubic-bezier",
                        0.85,
                        0.7,
                        0.65,
                        1
                    ],
                    [
                        "zoom"
                    ],
                    4,
                    [
                        "step",
                        [
                            "get",
                            "symbolrank"
                        ],
                        10,
                        6,
                        9.5,
                        7,
                        9
                    ],
                    9,
                    [
                        "step",
                        [
                            "get",
                            "symbolrank"
                        ],
                        21,
                        6,
                        16,
                        7,
                        13
                    ]
                ],
                "text-transform": "uppercase",
                "text-font": [
                    "Noto Sans CJK JP Bold",
                    "Arial Unicode MS Bold"
                ],
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_zh-Hans"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ],
                "text-letter-spacing": 0.15,
                "text-max-width": 6
            },
            "metadata": {
                "mapbox:featureComponent": "place-labels",
                "mapbox:group": "Place labels, place-labels"
            },
            "maxzoom": 9,
            "filter": [
                "match",
                [
                    "get",
                    "class"
                ],
                "state",
                [
                    "match",
                    [
                        "get",
                        "worldview"
                    ],
                    [
                        "all",
                        "CN"
                    ],
                    true,
                    false
                ],
                "disputed_state",
                [
                    "all",
                    [
                        "==",
                        [
                            "get",
                            "disputed"
                        ],
                        "true"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "worldview"
                        ],
                        [
                            "all",
                            "CN"
                        ],
                        true,
                        false
                    ]
                ],
                false
            ],
            "type": "symbol",
            "source": "composite",
            "id": "state-label",
            "paint": {
                "text-color": "rgb(62, 62, 62)",
                "text-halo-color": "hsl(30, 25%, 100%)",
                "text-halo-width": 1
            },
            "source-layer": "place_label"
        },
        {
            "minzoom": 1,
            "layout": {
                "icon-image": "",
                "text-field": [
                    "coalesce",
                    [
                        "get",
                        "name_zh-Hans"
                    ],
                    [
                        "get",
                        "name"
                    ]
                ],
                "text-line-height": 1.1,
                "text-max-width": 6,
                "text-font": [
                    "Noto Sans CJK JP Medium",
                    "Arial Unicode MS Regular"
                ],
                "text-radial-offset": [
                    "step",
                    [
                        "zoom"
                    ],
                    0.6,
                    8,
                    0
                ],
                "text-justify": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "text_anchor"
                        ],
                        [
                            "left",
                            "bottom-left",
                            "top-left"
                        ],
                        "left",
                        [
                            "right",
                            "bottom-right",
                            "top-right"
                        ],
                        "right",
                        "center"
                    ],
                    7,
                    "auto"
                ],
                "text-size": [
                    "interpolate",
                    [
                        "cubic-bezier",
                        0.2,
                        0,
                        0.7,
                        1
                    ],
                    [
                        "zoom"
                    ],
                    1,
                    [
                        "step",
                        [
                            "get",
                            "symbolrank"
                        ],
                        11,
                        4,
                        9,
                        5,
                        8
                    ],
                    9,
                    [
                        "step",
                        [
                            "get",
                            "symbolrank"
                        ],
                        22,
                        4,
                        19,
                        5,
                        17
                    ]
                ]
            },
            "metadata": {
                "mapbox:featureComponent": "place-labels",
                "mapbox:group": "Place labels, place-labels"
            },
            "maxzoom": 10,
            "filter": [
                "match",
                [
                    "get",
                    "class"
                ],
                "country",
                [
                    "match",
                    [
                        "get",
                        "worldview"
                    ],
                    [
                        "all",
                        "CN"
                    ],
                    true,
                    false
                ],
                "disputed_country",
                [
                    "all",
                    [
                        "==",
                        [
                            "get",
                            "disputed"
                        ],
                        "true"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "worldview"
                        ],
                        [
                            "all",
                            "CN"
                        ],
                        true,
                        false
                    ]
                ],
                false
            ],
            "type": "symbol",
            "source": "composite",
            "id": "country-label",
            "paint": {
                "icon-opacity": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "case",
                        [
                            "has",
                            "text_anchor"
                        ],
                        1,
                        0
                    ],
                    7,
                    0
                ],
                "text-color": "rgb(62, 62, 62)",
                "text-halo-color": [
                    "interpolate",
                    [
                        "linear"
                    ],
                    [
                        "zoom"
                    ],
                    2,
                    "hsla(30, 25%, 100%, 0.75)",
                    3,
                    "hsl(30, 25%, 100%)"
                ],
                "text-halo-width": 1.25
            },
            "source-layer": "place_label"
        },
        {
            "minzoom": 3,
            "layout": {
                "text-line-height": 1.1,
                "text-size": [
                    "interpolate",
                    [
                        "cubic-bezier",
                        0.2,
                        0,
                        0.9,
                        1
                    ],
                    [
                        "zoom"
                    ],
                    3,
                    [
                        "step",
                        [
                            "get",
                            "symbolrank"
                        ],
                        13.200000000000001,
                        9,
                        12.100000000000001,
                        10,
                        11.55,
                        12,
                        10.450000000000001,
                        14,
                        9.350000000000001,
                        16,
                        7.15,
                        17,
                        4.4
                    ],
                    13,
                    [
                        "step",
                        [
                            "get",
                            "symbolrank"
                        ],
                        25.3,
                        9,
                        23.1,
                        10,
                        20.900000000000002,
                        11,
                        18.700000000000003,
                        12,
                        17.6,
                        13,
                        16.5,
                        15,
                        14.3
                    ]
                ],
                "text-radial-offset": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "match",
                        [
                            "get",
                            "capital"
                        ],
                        2,
                        0.6,
                        0.55
                    ],
                    8,
                    0
                ],
                "icon-image": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "case",
                        [
                            "==",
                            [
                                "get",
                                "capital"
                            ],
                            2
                        ],
                        "border-dot-13",
                        [
                            "step",
                            [
                                "get",
                                "symbolrank"
                            ],
                            "dot-11",
                            9,
                            "dot-10",
                            11,
                            "dot-9"
                        ]
                    ],
                    8,
                    ""
                ],
                "text-font": [
                    "Noto Sans CJK JP Regular",
                    "Arial Unicode MS Regular"
                ],
                "text-justify": "auto",
                "text-anchor": [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        "get",
                        "text_anchor"
                    ],
                    8,
                    "center"
                ],
                "text-field": [
                    "match",
                    [
                        "get",
                        "iso_3166_1"
                    ],
                    [
                        "IN"
                    ],
                    [
                        "coalesce",
                        [
                            "get",
                            "name_zh-Hans"
                        ],
                        [
                            "get",
                            "name"
                        ]
                    ],
                    [
                        "coalesce",
                        [
                            "get",
                            "name_zh-Hans"
                        ],
                        [
                            "get",
                            "name"
                        ]
                    ]
                ],
                "text-max-width": 7
            },
            "maxzoom": 13,
            "filter": [
                "all",
                [
                    "<=",
                    [
                        "get",
                        "filterrank"
                    ],
                    3
                ],
                [
                    "match",
                    [
                        "get",
                        "class"
                    ],
                    "settlement",
                    [
                        "match",
                        [
                            "get",
                            "worldview"
                        ],
                        [
                            "all",
                            "CN"
                        ],
                        true,
                        false
                    ],
                    "disputed_settlement",
                    [
                        "all",
                        [
                            "==",
                            [
                                "get",
                                "disputed"
                            ],
                            "true"
                        ],
                        [
                            "match",
                            [
                                "get",
                                "worldview"
                            ],
                            [
                                "all",
                                "CN"
                            ],
                            true,
                            false
                        ]
                    ],
                    false
                ],
                [
                    "step",
                    [
                        "zoom"
                    ],
                    [
                        ">",
                        [
                            "get",
                            "symbolrank"
                        ],
                        6
                    ],
                    4,
                    [
                        ">=",
                        [
                            "get",
                            "symbolrank"
                        ],
                        7
                    ],
                    6,
                    [
                        ">=",
                        [
                            "get",
                            "symbolrank"
                        ],
                        8
                    ],
                    7,
                    [
                        ">=",
                        [
                            "get",
                            "symbolrank"
                        ],
                        10
                    ],
                    10,
                    [
                        ">=",
                        [
                            "get",
                            "symbolrank"
                        ],
                        11
                    ],
                    11,
                    [
                        ">=",
                        [
                            "get",
                            "symbolrank"
                        ],
                        13
                    ],
                    12,
                    [
                        ">=",
                        [
                            "get",
                            "symbolrank"
                        ],
                        15
                    ]
                ],
                [
                    "match",
                    [
                        "get",
                        "iso_3166_1"
                    ],
                    [
                        "IN"
                    ],
                    false,
                    true
                ]
            ],
            "type": "symbol",
            "source": "composite",
            "id": "settlement-minor-label copy",
            "paint": {
                "text-color": "rgb(62, 62, 62)",
                "text-halo-color": "hsl(30, 25%, 100%)",
                "text-halo-width": 1,
                "text-halo-blur": 1
            },
            "source-layer": "place_label"
        }
    ],
    "protected": false,
    "draft": false
}