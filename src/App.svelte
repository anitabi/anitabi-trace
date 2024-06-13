<script>
	import Header from "./components/Header.svelte";
	import Router from 'svelte-spa-router'
	import { routes } from "./routes";
	import Footer from "./components/Footer.svelte";
	import Map from "./components/map/Map.svelte";
	
	export let map;

	const flyTo = (center, zoom) => {
		map.flyTo( center, zoom );
	};

</script>

<main>
	<Header />
	<Router {routes} restoreScrollState={true} />
	<Map bind:this={map} />
	<div class="ctrl-box">
		<button on:click={() => flyTo([139.6, 36.4], 10)}>FlyTo</button>
	</div>
	<Footer />
</main>