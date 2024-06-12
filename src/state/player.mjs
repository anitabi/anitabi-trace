import { get, writable } from 'svelte/store';
import { getAlbumCoverURL, getArtistByAlbumTrack, getTrackMediaURL, setDocumentAlbumColor } from "../functions/albums.mjs";


export const audio = new Audio();
export const playlist = writable([]);
export const current = writable(null);
export const mode = writable('loop');
export const volume = writable(1);
export const paused = writable(true);
export const currentTrackId = writable(null);




audio.crossOrigin = 'anonymous';

let audioCtx;
let audioSource;
let analyser;
let bufferLength;
let frequencyData;

export const setAudioContextAndSourceOnPlay = () => {
    if(isMobile) return;
    if(isIOS) return;

    if(!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        audioSource = audioCtx.createMediaElementSource(audio);
        
        analyser = audioCtx.createAnalyser();

        analyser.fftSize = 2048;
        bufferLength = analyser.frequencyBinCount * 0.66;
        frequencyData = new Uint8Array(bufferLength);

        audioSource.connect(analyser);
        analyser.connect(audioCtx.destination);
    }
    return {
        audioCtx,
        audioSource,
        bufferLength,
        frequencyData,
    };
}

export const getFrequencyData = () => {
    if(!analyser) return null;
    analyser.getByteFrequencyData(frequencyData);
    return frequencyData;
}

export function seek(time) {
    audio.currentTime = time;
}

export function setVolume(volume) {
    audio.volume = volume;
}

export function getVolume() {   
    return audio.volume;
}

export function getDuration() {
    return audio.duration;
}

export function getCurrentTime() {
    return audio.currentTime;
}

export function pause() {
    audio.pause();
}

export function pauseOrPlay() {
    if(!audio.src) return;
    
    if(audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

export function stop() {
    audio.pause();
    audio.currentTime = 0;
}














current.subscribe((v) => {
    if(v === null) return;

    currentTrackId.set(v.track.id);

    const album = v.album;
    setDocumentAlbumColor(album.colors[0]);
});


export function setPlaylist(_playlist,_current) {
    playlist.set(_playlist);
    current.set(_current);
}


import { clearMediaSession, setMediaSession } from "../functions/media.mjs";
import { setDocumentTitle, setPlayingTitle } from '../functions/document-title';
import { isIOS, isMobile } from '@/functions/os.mjs';

export function playCurrent(_current) {
    
    current.set(_current);
    const { track, album } = _current;
    audio.src = getTrackMediaURL(album,track);
    audio.play();

    const artist = getArtistByAlbumTrack(album,track);

    setMediaSession({
        title: track.title,
        artist,
        album: album.title,
        coverURL: getAlbumCoverURL(album)
    });
};

export function setPlaylistAndPlay(_playlist,_current) {
    if(!_current) return;

    setPlaylist(_playlist,_current);

    playCurrent(_current);
}


export function clearPlaylistAndStop() {
    playlist.set([]);
    current.set(null);
    stop();
    clearMediaSession();
    setDocumentTitle();
    setDocumentAlbumColor(null);
}


export function playItem(item) {
    if(!get(playlist).includes(item)) return;

    current.set(item);
    playCurrent(item);
}

export function playIndex(index) {
    const _playlist = get(playlist);
    if(index < 0 || index >= _playlist.length) return;

    playItem(_playlist[index]);
}


export function next() {

    const _playlist = get(playlist);
    const _current = get(current);
    const _mode = get(mode);
    const index = _playlist.indexOf(_current);

    let nextIndex;
    if(_mode === 'loop') {
        nextIndex = (index + 1) % _playlist.length;
        // current.set(_playlist[(index + 1) % _playlist.length]);
    } else if(_mode === 'random') {
        nextIndex = Math.floor(Math.random() * _playlist.length);
        // current.set(_playlist[Math.floor(Math.random() * _playlist.length)]);
    } else {
        return;
    }
    
    playIndex(nextIndex);
}

export function prev() {
    const _playlist = get(playlist);
    const _current = get(current);
    const _mode = get(mode);
    const index = _playlist.indexOf(_current);

    let prevIndex;
    if(_mode === 'loop') {
        prevIndex = (index - 1 + _playlist.length) % _playlist.length;
        // current.set(_playlist[(index - 1 + _playlist.length) % _playlist.length]);
    } else if(_mode === 'random') {
        prevIndex = Math.floor(Math.random() * _playlist.length);
        // current.set(_playlist[Math.floor(Math.random() * _playlist.length)]);
    } else {
        return;
    }

    playIndex(prevIndex);
}

export function setMode(v) {
    mode.set(v);
}

export function switchMode() {
    const _mode = get(mode);
    if(_mode === 'loop') {
        mode.set('random');
    } else if(_mode === 'random') {
        mode.set('loop');
    }
}

export function addPlaylistItems(v) {
    playlist.update((state) => {
        state.push(...v);
        return state;
    });
}

export function removePlaylistItem(v) {
    playlist.update((state) => {
        const index = state.indexOf(v);
        if(index === -1) return state;

        state.splice(index, 1);
        return state;
    });
}




audio.addEventListener('ended', () => {

    console.log('播放结束，尝试下一首')
    next();

});
audio.addEventListener('pause', () => {
    paused.set(true);
    setPlayingTitle(true,get(current));
});
audio.addEventListener('play', () => {
    paused.set(false);
    setAudioContextAndSourceOnPlay();
    setPlayingTitle(false,get(current));
});
// audio.addEventListener('timeupdate', () => {
//     console.log('timeupdate',audio.currentTime);
// });
audio.addEventListener('error', (e) => {
    console.log('audio error',e)
});