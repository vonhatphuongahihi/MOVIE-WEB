const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3',
    apiKey: 'eb0f8271724ec7dd08c6387a87b297b8',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
};
export default apiConfig;