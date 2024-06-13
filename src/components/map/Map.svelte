<script>


	import { onMount } from "svelte";
	import { Marker, createMap } from "./createMap";
	let container;
	// const style = 'mapbox://styles/itorr/cltlpf5d2015g01oidhgl1mzm';

	let center = [ 139.4, 36.5 ];
	let zoom = 5.7;
	let map;
	export const flyTo = (center, zoom) => {
		map.flyTo({ center, zoom });
	};

	export const setPadding = (padding) => {
		map.setPadding(padding);
	};

	// 添加 marker
	const el = document.createElement('div');
	el.className = 'marker';
	const marker = new Marker({
		// element: el,
		color: 'currentColor',
		draggable: true,
	});

	onMount(() => {
		console.log('container',container)
		map = createMap({
			container,
			center,
			zoom,
		});

		map.on('click', (e) => {
			console.log('e', e);

			console.log(marker)
			marker
				.setLngLat(e.lngLat)
				.addTo(map);

			
		});
	});
</script>
	
<div class="map" bind:this={container}>

</div>

<style global lang="less">
.map{
	height: 800px;
	outline: none;
}
</style>