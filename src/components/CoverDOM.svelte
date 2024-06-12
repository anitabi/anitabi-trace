<script>
	import { createEventDispatcher, onMount } from "svelte";
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

    const dispatch = createEventDispatcher()
    const onClick = (e) => {
        dispatch('click', e);
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
    on:click={onClick}
    data-loading={loading}  >
    {#if src}
        <div style={`background-image:url(${src})`}
            alt={alt||'封面'} 
            on:load={onLoad}></div>
    {/if}
</div>
