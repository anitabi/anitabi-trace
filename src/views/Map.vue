<template>
    <div ref="mapContainer"></div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import mapboxgl from 'mapbox-gl';
import { useMapStore } from '../stores/map';
import { throttle } from '../helpers/common';

const mapStore = useMapStore();
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const mapContainer = ref();
onMounted(() => {
    const map = new mapboxgl.Map({ ...mapStore.initParameters, ...{ container: mapContainer.value }});
    mapStore.setupMap(map);    
    mapStore.initalize(window.innerHeight);
    window.onresize = throttle(mapStore.adjustPadding, 100)(window.innerHeight);
});

</script>