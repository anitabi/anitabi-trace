export const preloadImage = (imageUrl: string) => {
    const preloadLink = document.createElement("link");
    preloadLink.href = imageUrl;
    preloadLink.rel = "preload";
    preloadLink.as = "image";
    document.head.appendChild(preloadLink);
};