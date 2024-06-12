
// navigator.mediaSession.metadata = new MediaMetadata({
//     title: track.title,
//     artist: track.artist || album.artist,
//     album: album.title,
//     artwork: [
//         {
//             src: coverURL,
//             sizes: '520x520',
//             type: 'image/jpeg'
//         }
//     ]
// });


export const setMediaSession = ({
    title,
    artist,
    album,
    coverURL,
}) => {
    navigator.mediaSession.metadata = new MediaMetadata({
        title,
        artist,
        album,
        artwork: [
            {
                src: coverURL,
                sizes: '520x520',
                type: 'image/jpeg'
            }
        ]
    });
}


export const clearMediaSession = () => {
    navigator.mediaSession.metadata = null;
}


