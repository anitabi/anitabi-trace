<template>
    <div ref="mapContainer"></div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
onMounted(() => {
    initMap();
});
const mapContainer = ref();
const initMap = () => {
    // 初始为地球投影模式
    const map = new mapboxgl.Map({
        container: mapContainer.value,
        style: 'mapbox://styles/mapbox/streets-v9',
        projection: 'globe',
        zoom: 2.5,
        center: [0, 0]
    });

    map.scrollZoom.disable(); // 动画期间禁止用户滚轮缩放
    // map.addControl(new mapboxgl.NavigationControl());

    map.on('style.load', () => {
        map.setFog({
            'horizon-blend': 0.02,
            'star-intensity': 0.1
        }); // 设置大气
    });
    // 设置 padding 使页面显示地球上半部分
    const viewportHeight = window.innerHeight;
    const paddingParameters = {
        top: viewportHeight
    };
    map.flyTo({
        padding: paddingParameters
    });
    // The following values can be changed to control rotation speed:
    
    // At low zooms, complete a revolution every two minutes.
    const secondsPerRevolution = 240;
    // Above zoom level 5, do not rotate.
    const maxSpinZoom = 5;
    // Rotate at intermediate speeds between zoom levels 3 and 5.
    const slowSpinZoom = 3;

    let userInteracting = false;
    const spinEnabled = true;
    
    function spinGlobe() {
        const zoom = map.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
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
            map.easeTo({ center, duration: 1000, easing: (n) => n, padding: paddingParameters });
        }
    }
    map.on('load', () => {
        spinGlobe();
    });
    // spinGlobe();
    map.on('moveend', () => {
        spinGlobe();
    });
};
</script>