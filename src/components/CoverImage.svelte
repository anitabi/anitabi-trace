<script>
	import { onMount } from "svelte";
    import { lazyLoad } from '../functions/lazyLoad.js'

    export let src = '';
    export let alt = '';
    export let className = '';
    export let color = '#EEE';
    export let style = '';
    let loading = true;


    if(!src) color = '#EEE';

    const onLoad = () => {
        loading = false;
    }

    // onMount(() => {
    //     console.log(
    //         `Cover component mounted with src:${src}`
    //     )
    // });
</script>
<div
    class={`ui-cover ${className}`}
    style={`color:${color||'#EEE'};${style}`}
    data-loading={loading}  >
    {#if src}
        <img src={src} 
            alt={alt||'封面'} 
            on:load={onLoad}>
    {/if}
</div>