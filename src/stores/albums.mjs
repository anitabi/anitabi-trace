import { get, writable } from "svelte/store";
import { BASE_MUSIC_URL } from "../functions/config.mjs";
import { fetchJSON } from "../functions/fetch.mjs";



export const albums = writable([]);


export const fetchAlbums = async () => {
    let _albums = await fetchJSON(`${BASE_MUSIC_URL}albums.json`);

    _albums = _albums.filter(album=>album.colors);

    return _albums;
}


let albumsLoadPromise = null;
const updateAlbums = async () => {
    if(!albumsLoadPromise){
        albumsLoadPromise = fetchAlbums();
    }

    const albumsData = await albumsLoadPromise;
    albums.set(albumsData);
}

updateAlbums();

export const getAlbumById = async (id) => {
    await updateAlbums();

    return get(albums).find( album => album.id === id );
}


export const getAlbumsByRandom = async (count) => {
    await updateAlbums();

    return get(albums).sort( () => Math.random() - 0.5 ).slice(0, count);
    
}


import { randArrayByNumberRand100 } from "../functions/random.mjs";

export const getAlbumsByRandomSeed = async (seed,count) => {
    await updateAlbums();
    return randArrayByNumberRand100(get(albums),seed,count);
}