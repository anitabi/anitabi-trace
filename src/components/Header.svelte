<script>
import active from "svelte-spa-router/active";

</script>

<header class="head-bar">
	<nav>
		<a href="#/" use:active>anitabi!</a>
		<!-- <a href="#/search" use:active>Search</a> -->
		<!-- <a href="#/me" use:active>Me</a> -->
	</nav>
</header>

<style global lang="less">
.head-bar{
		padding: 10px 10px 5px;
	nav{
		a{
			font-size: 18px;
			margin-right: 10px;

			// https://stackoverflow.com/questions/68499862/can-i-keep-unused-css-selector
			:global(&.active){
				font-weight: bold;
			}
		}
	}
}
</style>