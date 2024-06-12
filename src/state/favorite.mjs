import { writable } from "svelte/store";


// 曲目收藏部分
export const favoriteTracks = writable([]);

export const addFavoriteAlbumTrack = ( { album, track, seek } ) => {
    favoriteTracks.update(_favoriteTracks => {
        if(_favoriteTracks.find(t => t.trackId === track.id)) return _favoriteTracks;

        const favoriteTrack = {
            albumId: album.id,
            trackId: track.id,
            seek, // 收藏时的播放进度
            created: getUnixTimestamp(),
        };

        // 保存到 indexedDB

        return [..._favoriteTracks, favoriteTrack];
    });
}


favoriteTracks.subscribe(tracks => {
    // 目前是打算存储到 indexedDB

    // localStorage.setItem("favoriteTracks", JSON.stringify(tracks));
});




// 专辑收藏部分
export const favoriteAlbums = writable([]);