
import Home from "./views/home/Home.svelte";

import NotFound from "./views/NotFound.svelte";

// https://github.com/ItalyPaleAle/svelte-spa-router
export const routes = new Map();

routes.set('/', Home);
routes.set('*', NotFound);
