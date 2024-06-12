<script>
	import Header from "./components/Header.svelte";
	import Router from 'svelte-spa-router'
	import { routes } from "./routes";
	
</script>

<main>
	<Header />
	<Router {routes} restoreScrollState={true} />
</main>