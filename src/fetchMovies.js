import axios from 'axios';
import { db } from './firebase';
import { collection, addDoc } from "firebase/firestore";

const TMDB_API_KEY = 'eb0f8271724ec7dd08c6387a87b297b8';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovies = async () => {
    try {
        const categories = ['popular', 'now_playing', 'upcoming', 'top_rated'];

        for (let category of categories) {
            const response = await axios.get(`${BASE_URL}/movie/${category}`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'vi-VN',
                    page: 1
                }
            });

            const movies = response.data.results;
            const moviesCollection = collection(db, 'movies');
            
            for (const movie of movies) {
                try {
                    // Gọi API chi tiết cho từng phim
                    const detailResponse = await axios.get(`${BASE_URL}/movie/${movie.id}`, {
                        params: {
                            api_key: TMDB_API_KEY,
                            language: 'vi-VN'
                        }
                    });
                    
                    const movieDetail = detailResponse.data;

                    // Gọi API để lấy danh sách diễn viên
                    const castResponse = await axios.get(`${BASE_URL}/movie/${movie.id}/credits`, {
                        params: {
                            api_key: TMDB_API_KEY,
                            language: 'vi-VN'
                        }
                    });
                    const cast = castResponse.data.cast.map(member => ({
                        name: member.name,
                        character: member.character,
                        profile_path: member.profile_path
                    }));

                    // Gọi API để lấy video
                    const videoResponse = await axios.get(`${BASE_URL}/movie/${movie.id}/videos`, {
                        params: {
                            api_key: TMDB_API_KEY,
                            language: 'vi-VN'
                        }
                    });
                    const video = videoResponse.data.results.find(v => v.type === "Trailer" && v.site === "YouTube");
                    const videoUrl = video ? `https://www.youtube.com/watch?v=${video.key}` : "";

                    // Lưu thông tin phim vào Firestore
                    await addDoc(moviesCollection, {
                        id: movieDetail.id,
                        title: movieDetail.title,
                        overview: movieDetail.overview,
                        release_date: movieDetail.release_date,
                        poster_path: movieDetail.poster_path,
                        backdrop_path: movieDetail.backdrop_path,
                        vote_average: movieDetail.vote_average,
                        vote_count: movieDetail.vote_count,
                        genres: movieDetail.genres ? movieDetail.genres.map(genre => genre.name) : [],
                        country: movieDetail.production_countries ? movieDetail.production_countries.map(country => country.name) : [],
                        runtime: movieDetail.runtime,
                        category: category,
                        cast: cast, // Thêm danh sách diễn viên
                        video: videoUrl // Thêm URL video
                    });

                    console.log(`Đã lưu phim: ${movieDetail.title}`);
                } catch (innerError) {
                    console.error(`Lỗi khi lưu phim ${movie.title}:`, innerError);
                }
            }
        }
        
        console.log("Hoàn thành lưu tất cả các phim vào Firestore.");
    } catch (error) {
        console.error("Lỗi khi lấy hoặc lưu phim:", error);
    }
};

export default fetchMovies;
