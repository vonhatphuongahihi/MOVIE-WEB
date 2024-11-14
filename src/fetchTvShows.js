import axios from 'axios';
import { db } from './firebase';
import { collection, addDoc } from "firebase/firestore";

const TMDB_API_KEY = 'eb0f8271724ec7dd08c6387a87b297b8';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchTvShows = async () => {
    try {
        const categories = ['popular', 'airing_today', 'on_the_air', 'top_rated'];

        for (let category of categories) {
            const response = await axios.get(`${BASE_URL}/tv/${category}`, {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'vi-VN',
                    page: 1
                }
            });

            const tvShows = response.data.results;
            const tvShowsCollection = collection(db, 'tvshows');
            
            for (const show of tvShows) {
                try {
                    // Gọi API chi tiết cho từng TV Show
                    const detailResponse = await axios.get(`${BASE_URL}/tv/${show.id}`, {
                        params: {
                            api_key: TMDB_API_KEY,
                            language: 'vi-VN'
                        }
                    });
                    
                    const showDetail = detailResponse.data;

                    // Lưu thông tin TV Show vào Firestore
                    await addDoc(tvShowsCollection, {
                        id: showDetail.id,
                        name: showDetail.name,
                        overview: showDetail.overview,
                        first_air_date: showDetail.first_air_date,
                        poster_path: showDetail.poster_path,
                        backdrop_path: showDetail.backdrop_path,
                        vote_average: showDetail.vote_average,
                        vote_count: showDetail.vote_count,
                        genres: showDetail.genres ? showDetail.genres.map(genre => genre.name) : [],
                        country: showDetail.origin_country ? showDetail.origin_country : [],
                        episode_run_time: showDetail.episode_run_time ? showDetail.episode_run_time[0] : null, // Sử dụng runtime đầu tiên nếu có nhiều
                        seasons: showDetail.seasons ? showDetail.seasons.length : 0,
                        category: category
                    });
                    console.log(`Đã lưu TV Show: ${showDetail.name}`);
                } catch (innerError) {
                    console.error(`Lỗi khi lưu TV Show ${show.name}:`, innerError);
                }
            }
        }

        console.log("Hoàn thành lưu tất cả các TV Shows vào Firestore.");
    } catch (error) {
        console.error("Lỗi khi lấy hoặc lưu TV Shows:", error);
    }
};

export default fetchTvShows;
