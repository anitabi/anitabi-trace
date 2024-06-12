import { albumBurnNumber, albumLightNumber, hax2burn, hax2light, hax2rgba } from "./colors.mjs";
import { BASE_MUSIC_ALBUMS_URL  } from "./config.mjs"


export const getTrackMediaURL = ( album, track ) => {
    return `${BASE_MUSIC_ALBUMS_URL}${album.fname}/aac96/${track.fname.replace(/\.[^\.]+$/, '.m4a')}`;
}


export const getAlbumCoverURL = (album) => {
    return `${BASE_MUSIC_ALBUMS_URL}${album.fname}/cover-w520h520.jpg`;
}


export const getArtistByAlbumTrack = (album, track) => {
    return [...new Set([
        track.artist,
        album.artist
    ].flat().filter(a=>a))].find(v => v && v.length) || 'Reza!';
}


const documentElementStyle = document.documentElement.style;


export let albumColor = 'rgba(0,0,0,0)';
export let albumColorDark = albumColor;
export let albumColorLight = albumColor;
export let albumColorAlpha05 = albumColor;
export let albumColorAlpha02 = albumColor;


export const setDocumentAlbumColor = (color)=>{
    if(!color) {
        documentElementStyle.cssText = '';
        return;
    }
    albumColor = '#' + color;

    
    // const darkColor = '#' + hax2burn(color,albumBurnNumber);
    // const lightColor = '#' + hax2light(color,albumLightNumber);
    albumColorDark = '#' + hax2burn(color,albumBurnNumber);
    albumColorLight = '#' + hax2light(color,albumLightNumber);
    albumColorAlpha05 = hax2rgba(albumColorDark,.5);
    albumColorAlpha02 = hax2rgba(albumColorDark,.2);

    documentElementStyle.setProperty('--album-color', '#'+color);
    documentElementStyle.setProperty('--album-color-dark', albumColorDark);
    documentElementStyle.setProperty('--album-color-light', albumColorLight);
    documentElementStyle.setProperty('--album-color-alpha-05', albumColorAlpha05);
    documentElementStyle.setProperty('--album-color-alpha-02', albumColorAlpha02);
}


setDocumentAlbumColor('777777');
















